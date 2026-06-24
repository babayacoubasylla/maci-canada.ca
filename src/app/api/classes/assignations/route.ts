import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const assignations = await prisma.classeEnseignant.findMany({
            include: {
                classe: true,
                enseignant: {
                    include: {
                        user: {
                            select: {
                                prenom: true,
                                nom: true,
                            },
                        },
                    },
                },
                matiere: true,
            },
            orderBy: {
                classe: {
                    nom: "asc",
                },
            },
        });

        return NextResponse.json(assignations);
    } catch (error) {
        console.error("Erreur récupération assignations:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération" },
            { status: 500 }
        );
    }
}