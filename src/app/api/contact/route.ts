import { handleLeadWorkflow } from "@/lib/message_workflow";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";




const contactSchema = z.object({
  nom: z.string().min(3, "Le nom est obligatoire"),
  email: z.string().email("Email Invalid"),
  telephone: z.string().min(7),
  ville: z.string(),
  projet: z.string(),
  interet: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  vousEtes: z.string().optional().nullable(),
  consent: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const result = await handleLeadWorkflow({
      type: "contact",
      ...data,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Contact workflow error:", error);

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