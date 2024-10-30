import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { validateSessionToken } from "@/lib/auth/session";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const { user } = await validateSessionToken(token);
  return NextResponse.json({ user });
}
