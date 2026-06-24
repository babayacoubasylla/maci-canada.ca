import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
    const session = await getSession();

    if (!session || session.role !== "ELEVE") {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const formData = await request.formData();
    const devoirId = formData.get("devoirId") as string;
    const fichier = formData.get("fichier") as File;

    if (!devoirId || !fichier) {
        return NextResponse.json({ error: "Devoir et fichier requis" }, { status: 400 });
    }

    try {
        const fichierUrl = `/uploads/${fichier.name}`;

        await prisma.soumission.create({
            data: {
                devoirId,
                eleveId: session.id as string,
                fichierUrl,
            },
        });

        return NextResponse.redirect(new URL("/espace-eleve/devoirs", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la soumission" }, { status: 500 });
    }
}