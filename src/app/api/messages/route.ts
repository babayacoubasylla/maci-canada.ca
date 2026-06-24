import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { expediteurId: session.id as string },
                { destinataireId: session.id as string },
            ],
        },
        orderBy: { createdAt: "asc" },
        include: {
            expediteur: { select: { prenom: true, nom: true } },
            destinataire: { select: { prenom: true, nom: true } },
        },
    });

    return NextResponse.json(messages);
}

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const { destinataireId, contenu } = await request.json();

    const message = await prisma.message.create({
        data: {
            expediteurId: session.id as string,
            destinataireId,
            contenu,
        },
    });

    return NextResponse.json(message);
}