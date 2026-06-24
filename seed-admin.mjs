import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    const password = await bcrypt.hash("Admin123!", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@maci-canada.ca" },
        update: {},
        create: {
            email: "admin@maci-canada.ca",
            password,
            nom: "Principal",
            prenom: "Admin",
            role: "ADMIN",
        },
    });

    console.log("✅ Admin créé :", admin.email);
    console.log("📧 Email : admin@maci-canada.ca");
    console.log("🔑 Mot de passe : Admin123!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());