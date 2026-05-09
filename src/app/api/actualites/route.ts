import { handleLeadWorkflow } from "@/lib/message_workflow";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const newsletterSchema = z.object({
  nom: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("Email invalide"),

  telephone: z.string().optional().nullable(),
  sujet: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = newsletterSchema.parse(body);

    const result = await handleLeadWorkflow({
      type: "actualites",
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      sujet: data.sujet,
      projet: data.sujet || "Actualites",
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Actualites workflow error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Données invalides",
          details: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur serveur",
      },
      { status: 500 },
    );
  }
}