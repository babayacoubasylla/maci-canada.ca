import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

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