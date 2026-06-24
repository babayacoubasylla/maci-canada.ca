import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const formData = await request.formData();

    const nomEleve = formData.get("nomEleve") as string;
    const prenomEleve = formData.get("prenomEleve") as string;
    const dateNaissance = formData.get("dateNaissance") as string;
    const niveau = formData.get("niveau") as any;
    const nomParent = formData.get("nomParent") as string;
    const emailParent = formData.get("emailParent") as string;
    const telephone = formData.get("telephone") as string;
    const message = formData.get("message") as string;

    try {
        await prisma.preinscription.create({
            data: {
                nomEleve,
                prenomEleve,
                dateNaissance: dateNaissance ? new Date(dateNaissance) : null,
                niveau,
                nomParent,
                emailParent,
                telephone,
                message,
                statut: "NOUVEAU",
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}