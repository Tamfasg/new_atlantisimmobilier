import "dotenv/config";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

const KEY_NAME = "MICROSOFT_ADMIN_CONNECT_KEY";

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

function generateKey() {
  return crypto.randomBytes(64).toString("base64url");
}

function getPreview(key: string) {
  return `${key.slice(0, 8)}...${key.slice(-8)}`;
}

async function saveToDatabase(key: string) {
  return prisma.adminSecretKey.upsert({
    where: {
      name: KEY_NAME,
    },
    update: {
      value: key,
      preview: getPreview(key),
      active: true,
    },
    create: {
      name: KEY_NAME,
      value: key,
      preview: getPreview(key),
      active: true,
    },
  });
}

async function pushToVercelEnv(key: string) {
  const vercelToken = requireEnv("VERCEL_TOKEN");
  const projectIdOrName = requireEnv("VERCEL_PROJECT_ID_OR_NAME");
  const teamId = process.env.VERCEL_TEAM_ID;

  const url = new URL(
    `https://api.vercel.com/v10/projects/${projectIdOrName}/env`,
  );

  url.searchParams.set("upsert", "true");

  if (teamId) {
    url.searchParams.set("teamId", teamId);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: KEY_NAME,
      value: key,
      type: "encrypted",
      target: ["production", "preview"],
      comment: "Private key for Microsoft admin connect route",
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Vercel env update failed: ${res.status} ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

async function main() {
  const key = generateKey();

  const savedKey = await saveToDatabase(key);
  console.log("Saved key to database:");
  console.log(`${savedKey.name}=${savedKey.value}`);

  await pushToVercelEnv(key);
  console.log("Pushed key to Vercel env.");

  const liveDomain = process.env.VERCEL_LIVE_DOMAIN || "your-domain.vercel.app";

  console.log("");
  console.log("Use this URL:");
  console.log(
    `https://${liveDomain}/api/auth/microsoft/login?key=${savedKey.value}`,
  );

  console.log("");
  console.log("Important: redeploy Vercel now.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });