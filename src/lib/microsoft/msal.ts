import * as msal from "@azure/msal-node";

export const microsoftScopes = [
  "User.Read",
  "Mail.Send",
  "Mail.ReadWrite",
  "offline_access",
];

export const msalClient = new msal.ConfidentialClientApplication({
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    authority: "https://login.microsoftonline.com/consumers",
  },
});