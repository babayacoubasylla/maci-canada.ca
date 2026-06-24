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
    const dateLimite = formData.get("dateLimite") as string;
    const fichier = formData.get("fichier") as File;

    if (!titre || !classeId || !matiereId || !dateLimite) {
        return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    try {
        // Pour l'instant, on stocke juste le nom du fichier
        const fichierUrl = fichier ? `/uploads/${fichier.name}` : null;

        await prisma.devoir.create({
            data: {
                titre,
                description: description || null,
                fichierUrl,
                dateLimite: new Date(dateLimite),
                classeId,
                matiereId,
                enseignantId: session.id as string,
            },
        });

        return NextResponse.redirect(new URL("/espace-enseignant/devoirs", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la création du devoir" }, { status: 500 });
    }
}