import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    pages: {
        signIn: "/connexion",
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            authorize: async (credentials) => {
                console.log("=== Tentative de connexion ===");
                console.log("Email reçu:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("❌ Email ou mot de passe manquant");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                console.log("Utilisateur trouvé ?", !!user);

                if (!user) {
                    console.log("❌ Aucun utilisateur trouvé avec cet email");
                    return null;
                }

                if (!user.actif) {
                    console.log("❌ Compte inactif");
                    return null;
                }

                const valid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                console.log("Mot de passe valide ?", valid);

                if (!valid) {
                    console.log("❌ Mot de passe incorrect");
                    return null;
                }

                console.log("✅ Connexion réussie !");
                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.prenom} ${user.nom}`,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = (user as { role: string }).role;
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as { role?: string }).role = token.role as string;
                (session.user as { id?: string }).id = token.id as string;
            }
            return session;
        },
    },
});