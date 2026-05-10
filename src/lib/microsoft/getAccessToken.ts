// src/lib/microsoft/getAccessToken.ts
import * as msal from "@azure/msal-node";

const microsoftScopes = [
  "User.Read",
  "Mail.Send",
  "Mail.ReadWrite",
  "offline_access",
];

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

const msalClient = new msal.ConfidentialClientApplication({
  auth: {
    clientId: requireEnv("MICROSOFT_CLIENT_ID"),
    clientSecret: requireEnv("MICROSOFT_CLIENT_SECRET"),
    authority: "https://login.microsoftonline.com/consumers",
  },
});

export async function getMicrosoftAccessToken() {
  const cacheBase64 = requireEnv("MSAL_CACHE_BASE64");
  const accountHomeId = requireEnv("MICROSOFT_ACCOUNT_HOME_ID");

  const cacheJson = Buffer.from(cacheBase64, "base64").toString("utf8");

  msalClient.getTokenCache().deserialize(cacheJson);

  const accounts = await msalClient.getTokenCache().getAllAccounts();

  const account = accounts.find((item) => item.homeAccountId === accountHomeId);

  if (!account) {
    throw new Error(
      "Microsoft account not found in MSAL cache. Login again and update MSAL_CACHE_BASE64.",
    );
  }

  const result = await msalClient.acquireTokenSilent({
    account,
    scopes: microsoftScopes,
  });

  if (!result?.accessToken) {
    throw new Error("Failed to acquire Microsoft Graph access token silently.");
  }

  return result.accessToken;
}