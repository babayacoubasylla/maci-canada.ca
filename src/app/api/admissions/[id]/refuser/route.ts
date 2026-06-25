import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // ⚠️ Important : on attend la résolution de la promesse
    const { id } = await params;

    try {
        await prisma.preinscription.update({
            where: { id },
            data: { statut: "REFUSE" },
        });

        return NextResponse.redirect(new URL("/dashboard/admissions", request.url));
    } catch (error) {
        return NextResponse.json({ error: "Erreur" }, { status: 500 });
    }
}