// src/app/api/auth/microsoft/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { microsoftScopes, msalClient } from "@/lib/microsoft/msal";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (!key || key !== process.env.MICROSOFT_ADMIN_CONNECT_KEY) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const authUrl = await msalClient.getAuthCodeUrl({
    scopes: microsoftScopes,
    redirectUri: process.env.MICROSOFT_REDIRECT_URI!,
    prompt: "consent",
  });

  return NextResponse.redirect(authUrl);
}