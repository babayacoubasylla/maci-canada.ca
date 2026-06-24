import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
    const session = await getSession();

    if (!session || session.role !== "ENSEIGNANT") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await request.formData();

    const titre = formData.get("titre") as string;
    const description = formData.get("description") as string;
    const classeId = formData.get("classeId") as string;
    const matiereId = formData.get("matiereId") as string;
    const fichier = formData.get("fichier") as File;

    if (!titre || !classeId || !matiereId || !fichier) {
        return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    try {
        // Pour l'instant, on stocke juste le nom du fichier
        // Plus tard on pourra utiliser un vrai service de stockage (Supabase, Vercel Blob, etc.)
        const fichierUrl = `/uploads/${fichier.name}`;

        await prisma.cours.create({
            data: {
                titre,
                description: description || null,
                fichierUrl,
                classeId,
                matiereId,
                enseignantId: session.id as string, // ID de l'enseignant connecté
            },
        });

        return NextResponse.redirect(new URL("/espace-enseignant/cours", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la publication" }, { status: 500 });
    }
}