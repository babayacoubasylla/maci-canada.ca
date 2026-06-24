"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(
    prevState: string | undefined,
    formData: FormData
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return "Email et mot de passe requis.";
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.actif) {
        return "Email ou mot de passe incorrect.";
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return "Email ou mot de passe incorrect.";
    }

    // Créer la session
    await createSession({
        id: user.id,
        email: user.email,
        name: `${user.prenom} ${user.nom}`,
        role: user.role,
    });

    // Redirection selon le rôle
    switch (user.role) {
        case "ADMIN":
            redirect("/dashboard");
        case "ENSEIGNANT":
            redirect("/espace-enseignant");
        case "ELEVE":
            redirect("/espace-eleve");
        case "PARENT":
            redirect("/espace-parent");
        default:
            redirect("/connexion");
    }
}