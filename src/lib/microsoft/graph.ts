type SendGraphMailInput = {
  accessToken: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendGraphMail({
  accessToken,
  subject,
  html,
  replyTo,
}: SendGraphMailInput) {
  const res = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject,
        body: {
          contentType: "HTML",
          content: html,
        },
        toRecipients: [
          {
            emailAddress: {
              address: process.env.OUTLOOK_EMAIL!,
            },
          },
        ],
        replyTo: replyTo
          ? [
              {
                emailAddress: {
                  address: replyTo,
                },
              },
            ]
          : undefined,
      },
      saveToSentItems: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Microsoft Graph sendMail failed: ${res.status} ${text}`);
  }

  return true;
}