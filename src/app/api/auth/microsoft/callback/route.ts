// src/app/api/auth/microsoft/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { microsoftScopes, msalClient } from "@/lib/microsoft/msal";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error,
        description: req.nextUrl.searchParams.get("error_description"),
      },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing Microsoft auth code",
      },
      { status: 400 },
    );
  }

  const tokenResponse = await msalClient.acquireTokenByCode({
    code,
    scopes: microsoftScopes,
    redirectUri: process.env.MICROSOFT_REDIRECT_URI!,
  });

  const cacheJson = msalClient.getTokenCache().serialize();
  const cacheBase64 = Buffer.from(cacheJson, "utf8").toString("base64");

  return NextResponse.json({
    success: true,
    message: "Microsoft account connected. Copy these values to env.",
    account: tokenResponse?.account?.username,
    env: {
      MICROSOFT_ACCOUNT_HOME_ID: tokenResponse?.account?.homeAccountId,
      MSAL_CACHE_BASE64: cacheBase64,
    },
  });
}