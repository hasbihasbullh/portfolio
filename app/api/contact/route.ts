import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY || "";
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "";
const senderEmail = process.env.RESEND_FROM || "";

const resend = new Resend(resendApiKey);

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; firstRequestAt: number }>();

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0].trim();
  return ip || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  if (now - entry.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(req: Request) {
  if (!resendApiKey || !receiverEmail) {
    return NextResponse.json({ message: "Email service not configured" }, { status: 500 });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429, headers: { "Retry-After": "300" } });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const safeMessage = String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");

    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#111">
        <h2>New contact message</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <div>${safeMessage}</div>
      </div>
    `;

    const resp = await resend.emails.send({
      from: `HSB <${senderEmail}>`,
      to: receiverEmail,
      subject: subject,
      html,
    });

    const respRecord = resp as Record<string, unknown> | null;
    const id = respRecord && typeof respRecord === "object" && typeof respRecord.id === "string" ? (respRecord.id as string) : null;

    return NextResponse.json({ message: "Message sent", id }, { status: 200 });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
