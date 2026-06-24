import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const formData = await request.formData();

    const nom = formData.get("nom") as string;
    const niveau = formData.get("niveau") as any;
    const anneeScolaire = formData.get("anneeScolaire") as string;

    if (!nom || !niveau || !anneeScolaire) {
        return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    try {
        await prisma.classe.create({
            data: {
                nom,
                niveau,
                anneeScolaire,
            },
        });

        return NextResponse.redirect(new URL("/dashboard/classes", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
    }
}