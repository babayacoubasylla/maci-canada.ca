import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // ⚠️ On attend la résolution de la promesse
    const { id } = await params;
    const formData = await request.formData();

    const matricule = formData.get("matricule") as string;
    const userId = formData.get("userId") as string;

    try {
        await prisma.eleve.create({
            data: {
                matricule,
                userId,
                classeId: id,
            },
        });

        return NextResponse.redirect(new URL(`/dashboard/classes/${id}`, request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de l'ajout" }, { status: 500 });
    }
}