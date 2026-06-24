import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = "admin@maci-canada.ca";
    const password = "Admin123!";

    // Supprimer l'ancien compte s'il existe
    await prisma.user.deleteMany({ where: { email } });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouveau compte
    const admin = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            nom: "Principal",
            prenom: "Admin",
            role: "ADMIN",
            actif: true,
        },
    });

    console.log("✅ Compte admin créé avec succès !");
    console.log("📧 Email    :", admin.email);
    console.log("🔑 Mot de passe :", password);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());