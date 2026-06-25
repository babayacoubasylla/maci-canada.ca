import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // ⚠️ Important : on attend la résolution de la promesse
        const { id } = await params;

        await prisma.classeEnseignant.delete({
            where: { id: id },
        });

        return NextResponse.json({ message: "Supprimé avec succès" });
    } catch (error) {
        console.error("Erreur suppression:", error);
        return NextResponse.json(
            { error: "Erreur lors de la suppression" },
            { status: 500 }
        );
    }
}