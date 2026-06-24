import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const formData = await request.formData();

    const note = parseFloat(formData.get("note") as string);
    const commentaire = formData.get("commentaire") as string;

    if (!note && note !== 0) {
        return NextResponse.json({ error: "La note est requise" }, { status: 400 });
    }

    try {
        await prisma.soumission.update({
            where: { id },
            data: {
                note: note,
                commentaire: commentaire || null,
            },
        });

        // Redirection vers la liste des soumissions
        return NextResponse.redirect(new URL("/espace-enseignant/devoirs", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la notation" }, { status: 500 });
    }
}