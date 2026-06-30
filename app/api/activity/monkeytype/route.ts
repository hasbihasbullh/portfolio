import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "hasbixyz"; // Based on the user's username
    const response = await fetch(`https://api.monkeytype.com/users/${username}/profile`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Monkeytype: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
