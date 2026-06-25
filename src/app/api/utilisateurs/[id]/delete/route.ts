import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // ⚠️ On attend la résolution de la promesse
    const { id } = await params;

    try {
        // Supprimer l'utilisateur
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.redirect(new URL("/dashboard/utilisateurs", request.url));
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        return NextResponse.json(
            { error: "Impossible de supprimer cet utilisateur" },
            { status: 500 }
        );
    }
}