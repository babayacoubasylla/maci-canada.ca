import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // ⚠️ On attend la résolution de la promesse
    const { id } = await params;
    const formData = await request.formData();

    const nom = formData.get("nom") as string;
    const niveau = formData.get("niveau") as any;
    const anneeScolaire = formData.get("anneeScolaire") as string;

    try {
        await prisma.classe.update({
            where: { id },
            data: {
                nom,
                niveau,
                anneeScolaire,
            },
        });

        return NextResponse.redirect(new URL("/dashboard/classes", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
    }
}