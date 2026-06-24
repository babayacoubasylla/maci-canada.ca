import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const enseignants = await prisma.enseignant.findMany({
            include: {
                user: {
                    select: {
                        prenom: true,
                        nom: true,
                        email: true,
                    },
                },
                matieres: true,
            },
        });

        return NextResponse.json(enseignants);
    } catch (error) {
        console.error("Erreur récupération enseignants:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération" },
            { status: 500 }
        );
    }
}