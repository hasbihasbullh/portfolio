import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "WAKATIME_API_KEY is not set" }, { status: 500 });
  }

  try {
    const authHeader = `Basic ${Buffer.from(apiKey).toString("base64")}`;
    
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: authHeader,
      },
      // Revalidate every 1 hour (3600 seconds) to avoid hitting WakaTime rate limits
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`WakaTime API returned ${response.status}`);
    }

    const data = await response.json();
    
    // We only need top languages and total time
    const stats = data.data;
    
    // Pick top 4 languages safely
    const languages = (stats?.languages || []).slice(0, 4).map((lang: { name: string; percent: number; color?: string }) => ({
      name: lang.name,
      percent: lang.percent,
      color: lang.color || "#4ade80", // fallback color
    }));

    return NextResponse.json({
      languages,
      total_time: stats.human_readable_total_including_other_language || stats.human_readable_total
    });

  } catch (error) {
    console.error("WakaTime fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch WakaTime stats" }, { status: 500 });
  }
}
