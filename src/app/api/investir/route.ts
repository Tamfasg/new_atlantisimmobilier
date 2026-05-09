import { handleLeadWorkflow } from "@/lib/message_workflow";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const investirSchema = z.object({
  nom: z.string().min(2, "Le nom est obligatoire"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(6, "Le téléphone est obligatoire"),

  ville: z.string().optional().nullable(),

  profil: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  objectif: z.string().optional().nullable(),
  delai: z.string().optional().nullable(),

  message: z.string().optional().nullable(),

  consent: z.boolean().refine((value) => value === true, {
    message: "Le consentement est obligatoire",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = investirSchema.parse(body);

    const result = await handleLeadWorkflow({
      type: "investir",
      ...data,
      projet: data.objectif || "Investissement",
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Investir workflow error:", error);

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