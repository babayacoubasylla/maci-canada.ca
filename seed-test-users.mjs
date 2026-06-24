import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const users = [
        {
            email: "admin@maci-canada.ca",
            password: "Admin123!",
            prenom: "Admin",
            nom: "Principal",
            role: "ADMIN",
        },
        {
            email: "enseignant@maci-canada.ca",
            password: "Enseignant123!",
            prenom: "Marie",
            nom: "Tremblay",
            role: "ENSEIGNANT",
        },
        {
            email: "eleve@maci-canada.ca",
            password: "Eleve123!",
            prenom: "Jean",
            nom: "Dupont",
            role: "ELEVE",
        },
        {
            email: "parent@maci-canada.ca",
            password: "Parent123!",
            prenom: "Sophie",
            nom: "Dupont",
            role: "PARENT",
        },
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Supprimer l'utilisateur s'il existe déjà
        await prisma.user.deleteMany({ where: { email: user.email } });

        // Créer l'utilisateur
        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                prenom: user.prenom,
                nom: user.nom,
                role: user.role,
                actif: true,
            },
        });

        console.log(`✅ Compte créé : ${user.email} (${user.role})`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());