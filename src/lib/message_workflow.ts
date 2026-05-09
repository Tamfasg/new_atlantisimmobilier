import { prisma } from "@/lib/prisma";

type LeadType = "contact" | "investir" | "project" | "actualites";

type LeadWorkflowInput = {
  type: LeadType;

  nom: string;
  email: string;
  telephone?: string | null;

  ville?: string | null;
  projet?: string | null;
  interet?: string | null;
  message?: string | null;

  vousEtes?: string | null;
  consent?: boolean | null;

  profil?: string | null;
  budget?: string | null;
  objectif?: string | null;
  delai?: string | null;

  brand?: string | null;
  sujet?: string | null;
};

type GraphFolder = {
  id: string;
  displayName: string;
};

type GraphFolderList = {
  value: GraphFolder[];
};

const GRAPH_BASE_URL = "https://graph.microsoft.com/v1.0";

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

function getAccessToken() {
  return requireEnv("MICROSOFT_GRAPH_ACCESS_TOKEN");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeLabel(value: string) {
  return value
    .trim()
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

function getLeadTitle(type: LeadType) {
  const titles: Record<LeadType, string> = {
    contact: "Contact",
    investir: "Investir",
    project: "Project",
    actualites: "Actualites",
  };

  return titles[type];
}

function getTopLevelFolderName(type: LeadType) {
  const folders: Record<LeadType, string> = {
    contact: "Contact",
    investir: "Investir",
    project: "Project",
    actualites: "Actualites",
  };

  return folders[type];
}

function getProjectLabel(lead: LeadWorkflowInput) {
  const label =
    lead.brand ||
    lead.projet ||
    lead.interet ||
    lead.objectif ||
    lead.sujet ||
    lead.ville ||
    "General";

  return normalizeLabel(label);
}

function getFolderPath(lead: LeadWorkflowInput) {
  return [getTopLevelFolderName(lead.type), getProjectLabel(lead)];
}

function getFolderLabel(lead: LeadWorkflowInput) {
  return getFolderPath(lead).join(" / ");
}

function getSafeText(value?: string | null) {
  return value && value.trim().length > 0 ? value : "—";
}

async function graphFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${GRAPH_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(
      `Microsoft Graph error ${res.status}: ${JSON.stringify(json)}`,
    );
  }

  return json as T;
}

function buildAdminLeadHtml(lead: LeadWorkflowInput) {
  const rows = [
    ["Dossier", getFolderLabel(lead)],
    ["Type", getLeadTitle(lead.type)],
    ["Nom", lead.nom],
    ["Email", lead.email],
    ["Téléphone", lead.telephone],
    ["Ville", lead.ville],
    ["Projet", lead.projet],
    ["Intérêt", lead.interet],
    ["Vous êtes", lead.vousEtes],
    ["Profil", lead.profil],
    ["Budget", lead.budget],
    ["Objectif", lead.objectif],
    ["Délai", lead.delai],
    ["Marque", lead.brand],
    ["Sujet", lead.sujet],
    ["Consentement", lead.consent ? "Oui" : "Non"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;background:#060F0D;padding:32px;color:#F5F0E8;">
      <div style="max-width:720px;margin:auto;border:1px solid rgba(201,169,110,.35);padding:28px;background:#0B2B26;">
        <p style="color:#C9A96E;text-transform:uppercase;letter-spacing:3px;font-size:12px;margin:0 0 12px;">
          Nouveau lead Atlantis Immobilier
        </p>

        <h1 style="font-family:Georgia,serif;font-style:italic;font-weight:400;color:#F5F0E8;margin:0 0 24px;font-size:32px;">
          ${escapeHtml(lead.nom)}
        </h1>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="border-bottom:1px solid rgba(245,240,232,.08);padding:10px 0;color:rgba(245,240,232,.45);font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">
                    ${escapeHtml(label)}
                  </td>
                  <td style="border-bottom:1px solid rgba(245,240,232,.08);padding:10px 0;color:#F5F0E8;font-size:14px;text-align:right;">
                    ${escapeHtml(getSafeText(value))}
                  </td>
                </tr>
              `,
            )
            .join("")}
        </table>

        <div style="border:1px solid rgba(201,169,110,.22);padding:18px;background:rgba(255,255,255,.03);">
          <p style="margin:0 0 8px;color:#C9A96E;text-transform:uppercase;letter-spacing:2px;font-size:11px;">
            Message
          </p>
          <p style="margin:0;line-height:1.7;color:rgba(245,240,232,.72);">
            ${escapeHtml(getSafeText(lead.message))}
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildClientAutoReplyHtml(lead: LeadWorkflowInput) {
  return `
    <div style="font-family:Arial,sans-serif;background:#060F0D;padding:32px;color:#F5F0E8;">
      <div style="max-width:640px;margin:auto;border:1px solid rgba(201,169,110,.35);padding:28px;background:#0B2B26;">
        <p style="color:#C9A96E;text-transform:uppercase;letter-spacing:3px;font-size:12px;margin:0 0 16px;">
          Atlantis Immobilier
        </p>

        <h1 style="font-family:Georgia,serif;font-style:italic;font-weight:400;color:#C9A96E;margin:0 0 20px;font-size:34px;">
          Merci ${escapeHtml(lead.nom)}.
        </h1>

        <p style="line-height:1.8;color:rgba(245,240,232,.72);font-size:15px;">
          Nous avons bien reçu votre demande. Un conseiller Atlantis Immobilier
          vous contactera sous 24 heures ouvrées.
        </p>

        <p style="line-height:1.8;color:rgba(245,240,232,.55);font-size:14px;">
          Votre demande concerne :
          <strong style="color:#F5F0E8;">
            ${escapeHtml(getProjectLabel(lead))}
          </strong>
        </p>

        <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,169,110,.45),transparent);margin:24px 0;"></div>

        <p style="margin:0;color:rgba(245,240,232,.38);font-size:12px;line-height:1.7;">
          Vos données sont traitées dans le strict respect de la loi 09-08
          relative à la protection des données personnelles.
        </p>
      </div>
    </div>
  `;
}

async function saveLeadToDatabase(lead: LeadWorkflowInput) {
  if (lead.type === "contact") {
    return prisma.contactMessage.create({
      data: {
        nom: lead.nom,
        email: lead.email,
        telephone: lead.telephone || "",
        ville: lead.ville || null,
        projet: lead.projet || null,
        interet: lead.interet || null,
        message: lead.message || null,
        vousEtes: lead.vousEtes || null,
        consent: Boolean(lead.consent),
      },
    });
  }

  if (lead.type === "investir") {
    return prisma.investirDemande.create({
      data: {
        nom: lead.nom,
        email: lead.email,
        telephone: lead.telephone || "",
        ville: lead.ville || null,
        profil: lead.profil || null,
        budget: lead.budget || null,
        objectif: lead.objectif || null,
        delai: lead.delai || null,
        message: lead.message || null,
        consent: Boolean(lead.consent),
      },
    });
  }

  if (lead.type === "project") {
    return prisma.projectLead.create({
      data: {
        nom: lead.nom,
        email: lead.email,
        telephone: lead.telephone || "",
        brand: lead.brand || null,
        ville: lead.ville || null,
        type: lead.projet || null,
      },
    });
  }

  if (lead.type === "actualites") {
    return prisma.actualitesLead.create({
      data: {
        nom: lead.nom,
        email: lead.email,
        telephone: lead.telephone || null,
        sujet: lead.sujet || null,
      },
    });
  }

  throw new Error("Unknown lead type");
}

async function sendMail({
  to,
  subject,
  html,
  importance = "normal",
}: {
  to: string;
  subject: string;
  html: string;
  importance?: "low" | "normal" | "high";
}) {
  await graphFetch("/me/sendMail", {
    method: "POST",
    body: JSON.stringify({
      message: {
        subject,
        importance,
        body: {
          contentType: "HTML",
          content: html,
        },
        toRecipients: [
          {
            emailAddress: {
              address: to,
            },
          },
        ],
      },
      saveToSentItems: true,
    }),
  });
}

async function getChildFolders(parentFolderId: string) {
  return graphFetch<GraphFolderList>(
    `/me/mailFolders/${encodeURIComponent(parentFolderId)}/childFolders?$top=100`,
  );
}

async function createChildFolder(parentFolderId: string, displayName: string) {
  return graphFetch<GraphFolder>(
    `/me/mailFolders/${encodeURIComponent(parentFolderId)}/childFolders`,
    {
      method: "POST",
      body: JSON.stringify({
        displayName: normalizeLabel(displayName),
      }),
    },
  );
}

async function getOrCreateChildFolder(
  parentFolderId: string,
  displayName: string,
) {
  const cleanName = normalizeLabel(displayName);
  const folders = await getChildFolders(parentFolderId);

  const existing = folders.value.find(
    (folder) => folder.displayName.toLowerCase() === cleanName.toLowerCase(),
  );

  if (existing) {
    return existing.id;
  }

  const created = await createChildFolder(parentFolderId, cleanName);
  return created.id;
}

async function ensureFolderPath(path: string[]) {
  let parentFolderId = "msgfolderroot";

  for (const folderName of path) {
    parentFolderId = await getOrCreateChildFolder(parentFolderId, folderName);
  }

  return parentFolderId;
}

async function createLeadMessageInFolder(
  folderId: string,
  lead: LeadWorkflowInput,
) {
  await graphFetch(`/me/mailFolders/${encodeURIComponent(folderId)}/messages`, {
    method: "POST",
    body: JSON.stringify({
      subject: `🚨 [${getFolderLabel(lead)}] Nouveau message — ${lead.nom}`,
      importance: "high",
      body: {
        contentType: "HTML",
        content: buildAdminLeadHtml(lead),
      },
      toRecipients: [
        {
          emailAddress: {
            address: requireEnv("LEADS_ADMIN_EMAIL"),
          },
        },
      ],
    }),
  });
}

export async function handleLeadWorkflow(lead: LeadWorkflowInput) {
  const savedLead = await saveLeadToDatabase(lead);

  const folderPath = getFolderPath(lead);
  const folderId = await ensureFolderPath(folderPath);

  await createLeadMessageInFolder(folderId, lead);

  await sendMail({
    to: lead.email,
    subject: "Nous avons bien reçu votre demande — Atlantis Immobilier",
    html: buildClientAutoReplyHtml(lead),
  });

  await sendMail({
    to: requireEnv("LEADS_ADMIN_EMAIL"),
    subject: `🚨 [${getFolderLabel(lead)}] Nouveau message — ${lead.nom}`,
    html: buildAdminLeadHtml(lead),
    importance: "high",
  });

  return {
    success: true,
    savedLead,
    folderPath,
  };
}