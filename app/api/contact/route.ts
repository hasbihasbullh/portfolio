import { Resend } from "resend";
import { NextResponse } from "next/server";
import { MAX_LENGTHS } from "@/common/constants/form";

const resendApiKey = process.env.RESEND_API_KEY || "";
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "";
const senderEmail = process.env.RESEND_FROM || "";

const resend = new Resend(resendApiKey);

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map<string, { count: number; firstRequestAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref?.();



function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_LENGTHS.email;
}

function getClientIp(req: Request) {
  const vercelForwarded = req.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) {
    return vercelForwarded.split(",")[0].trim() || "unknown";
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim() || "unknown";
  }

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      return parts[parts.length - 1];
    }
  }

  return "unknown";
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeHtmlWithBreaks(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}

function sanitizeSingleLine(value: string): string {
  return value.replace(/[\r\n\t\x00-\x1F\x7F]/g, " ").trim();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: Request) {
  if (!resendApiKey || !receiverEmail || !senderEmail) {
    console.error("/api/contact misconfigured: missing RESEND_API_KEY, CONTACT_RECEIVER_EMAIL, or RESEND_FROM");
    return NextResponse.json({ message: "Failed to send message. Please try again later." }, { status: 500 });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429, headers: { "Retry-After": "300" } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message, company } = body as Record<string, unknown>;
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  }

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(subject) || !isNonEmptyString(message)) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  if (
    name.length > MAX_LENGTHS.name ||
    subject.length > MAX_LENGTHS.subject ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json({ message: "One or more fields exceed the maximum allowed length" }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
  }

  try {
    const safeName = escapeHtml(sanitizeSingleLine(name));
    const safeEmail = escapeHtml(email.trim());
    const safeSubjectLine = sanitizeSingleLine(subject); 
    const safeSubjectHtml = escapeHtml(safeSubjectLine); 
    const safeMessage = escapeHtmlWithBreaks(message);

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #111; margin-top: 0;">New Message from Portfolio</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
          <p style="margin: 0;"><strong>Subject:</strong> ${safeSubjectHtml}</p>
        </div>
        <div style="font-size: 16px; line-height: 1.6; color: #444; white-space: pre-wrap;">
          ${safeMessage}
        </div>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">
          This message was sent via the contact form on your portfolio website.
        </p>
      </div>
    `;

    const text = `
New Message from Portfolio

From: ${safeName} (${safeEmail})
Subject: ${safeSubjectLine}

Message:
${sanitizeSingleLine(message)}
    `;

    const resp = await resend.emails.send({
      from: `HSB <${senderEmail}>`,
      to: receiverEmail,
      replyTo: email.trim(),
      subject: `[Portfolio Contact] ${safeSubjectLine}`,
      html,
      text,
    });

    if (resp?.error) {
      console.error("/api/contact resend error:", resp.error);
      return NextResponse.json({ message: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}