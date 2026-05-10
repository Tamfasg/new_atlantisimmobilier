import { NextResponse } from "next/server";
import { microsoftScopes, msalClient } from "@/lib/microsoft/msal";

export const runtime = "nodejs";

export async function GET() {
  const authUrl = await msalClient.getAuthCodeUrl({
    scopes: microsoftScopes,
    redirectUri: process.env.MICROSOFT_REDIRECT_URI!,
    prompt: "consent",
  });

  return NextResponse.redirect(authUrl);
}