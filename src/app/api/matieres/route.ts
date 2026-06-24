import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const matieres = await prisma.matiere.findMany({
            orderBy: { nom: "asc" },
        });

        return NextResponse.json(matieres);
    } catch (error) {
        console.error("Erreur récupération matières:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération" },
            { status: 500 }
        );
    }
}