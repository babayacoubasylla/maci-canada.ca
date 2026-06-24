import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const body = await req.json();
        const { classeId, enseignantId, matiereId } = body;

        if (!classeId || !enseignantId || !matiereId) {
            return NextResponse.json(
                { error: "Tous les champs sont requis" },
                { status: 400 }
            );
        }

        // Vérifier que la classe existe
        const classe = await prisma.classe.findUnique({
            where: { id: classeId },
        });

        if (!classe) {
            return NextResponse.json(
                { error: "Classe non trouvée" },
                { status: 404 }
            );
        }

        // Vérifier que l'enseignant existe
        const enseignant = await prisma.enseignant.findUnique({
            where: { id: enseignantId },
        });

        if (!enseignant) {
            return NextResponse.json(
                { error: "Enseignant non trouvé" },
                { status: 404 }
            );
        }

        // Vérifier que la matière existe
        const matiere = await prisma.matiere.findUnique({
            where: { id: matiereId },
        });

        if (!matiere) {
            return NextResponse.json(
                { error: "Matière non trouvée" },
                { status: 404 }
            );
        }

        // Créer l'assignation
        const assignation = await prisma.classeEnseignant.create({
            data: {
                classeId,
                enseignantId,
                matiereId,
            },
        });

        return NextResponse.json(assignation, { status: 201 });
    } catch (error) {
        console.error("Erreur assignation:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'assignation" },
            { status: 500 }
        );
    }
}

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