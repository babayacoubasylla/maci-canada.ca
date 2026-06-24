import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const formData = await request.formData();

    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as any;

    if (!prenom || !nom || !email || !password || !role) {
        return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    try {
        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        await prisma.user.create({
            data: {
                prenom,
                nom,
                email,
                password: hashedPassword,
                role,
                actif: true,
            },
        });

        return NextResponse.redirect(new URL("/dashboard/utilisateurs", request.url));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
    }
}