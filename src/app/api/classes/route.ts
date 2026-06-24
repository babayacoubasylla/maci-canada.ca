import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const classes = await prisma.classe.findMany({
            orderBy: { nom: "asc" },
            include: {
                _count: {
                    select: { eleves: true }
                }
            }
        });

        return NextResponse.json(classes);
    } catch (error) {
        console.error("Erreur récupération classes:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération" },
            { status: 500 }
        );
    }
}