import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import * as XLSX from 'xlsx';
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || session.role !== "ADMIN") {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;
        const classeId = formData.get("classeId") as string;

        if (!file || !classeId) {
            return NextResponse.json(
                { error: "Fichier et classe requis" },
                { status: 400 }
            );
        }

        // Vérifier que la classe existe
        const classe = await prisma.classe.findUnique({
            where: { id: classeId },
        });

        if (!classe) {
            return NextResponse.json(
                { error: "Classe non trouvée" },
                { status: 404 }
            );
        }

        // Lire le fichier Excel
        const buffer = Buffer.from(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length === 0) {
            return NextResponse.json(
                { error: "Le fichier est vide" },
                { status: 400 }
            );
        }

        // Vérifier les colonnes requises
        const requiredColumns = ['prenom', 'nom'];
        const headers = Object.keys(data[0]).map(k => k.toLowerCase());
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));

        if (missingColumns.length > 0) {
            return NextResponse.json(
                { error: `Colonnes manquantes : ${missingColumns.join(', ')}. Colonnes requises : prenom, nom` },
                { status: 400 }
            );
        }

        let imported = 0;
        let errors: string[] = [];
        let skipped = 0;

        // Importer chaque élève
        for (const row of data) {
            try {
                const prenom = row.prenom?.toString().trim();
                const nom = row.nom?.toString().trim();
                const email = row.email?.toString().trim() || `${prenom?.toLowerCase()}.${nom?.toLowerCase()}@exemple.com`;
                const dateNaissance = row.dateNaissance ? new Date(row.dateNaissance) : null;

                if (!prenom || !nom) {
                    errors.push(`Ligne: prénom ou nom manquant`);
                    skipped++;
                    continue;
                }

                // Vérifier si l'email existe déjà
                let user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    // Générer un matricule unique
                    const matricule = `MACI${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

                    // Mot de passe par défaut
                    const defaultPassword = "password123";
                    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

                    // Créer l'utilisateur
                    user = await prisma.user.create({
                        data: {
                            email,
                            password: hashedPassword,
                            nom,
                            prenom,
                            role: "ELEVE",
                            actif: true,
                        },
                    });

                    // Créer le profil élève
                    await prisma.eleve.create({
                        data: {
                            userId: user.id,
                            matricule,
                            classeId: classeId,
                            dateNaissance: dateNaissance,
                        },
                    });

                    imported++;
                } else {
                    // L'utilisateur existe déjà, vérifier s'il a un profil élève
                    const existingEleve = await prisma.eleve.findUnique({
                        where: { userId: user.id },
                    });

                    if (!existingEleve) {
                        // Créer le profil élève
                        const matricule = `MACI${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
                        await prisma.eleve.create({
                            data: {
                                userId: user.id,
                                matricule,
                                classeId: classeId,
                                dateNaissance: dateNaissance,
                            },
                        });
                        imported++;
                    } else {
                        errors.push(`L'utilisateur ${prenom} ${nom} (${email}) a déjà un profil élève`);
                        skipped++;
                    }
                }
            } catch (error) {
                errors.push(`Erreur pour ${row.prenom} ${row.nom}: ${error}`);
                skipped++;
            }
        }

        // Mise à jour de l'effectif SUPPRIMÉE car la colonne n'existe pas
        // L'effectif sera calculé dynamiquement avec _count.eleves

        return NextResponse.json({
            imported,
            skipped,
            errors: errors.length > 0 ? errors : undefined,
            message: `${imported} élèves importés avec succès${skipped > 0 ? `, ${skipped} ignorés` : ''}`,
            total: data.length,
        });

    } catch (error) {
        console.error("Erreur import:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'import" },
            { status: 500 }
        );
    }
}