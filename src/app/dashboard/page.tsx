import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileSpreadsheet, UserPlus, School, Users, BookOpen } from "lucide-react";

export default async function DashboardAdmin() {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        redirect("/connexion");
    }

    // Statistiques réelles
    const [totalEleves, totalEnseignants, totalClasses, totalMatieres] = await Promise.all([
        prisma.eleve.count(),
        prisma.enseignant.count(),
        prisma.classe.count(),
        prisma.matiere.count(),
    ]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b bg-white">
                <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-xl font-semibold text-[#0f2942]">Administration - MACI Canada</h1>
                    <form action="/api/logout" method="POST">
                        <Button variant="outline" type="submit">Déconnexion</Button>
                    </form>
                </div>
            </div>

            <div className="container py-10">
                <h2 className="text-2xl font-bold mb-8 text-[#0f2942]">Tableau de bord</h2>

                {/* Statistiques */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Élèves</p>
                                <p className="text-4xl font-bold text-[#0f2942] mt-1">{totalEleves}</p>
                            </div>
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Enseignants</p>
                                <p className="text-4xl font-bold text-[#0f2942] mt-1">{totalEnseignants}</p>
                            </div>
                            <School className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Classes</p>
                                <p className="text-4xl font-bold text-[#0f2942] mt-1">{totalClasses}</p>
                            </div>
                            <BookOpen className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Total Matières</p>
                                <p className="text-4xl font-bold text-[#0f2942] mt-1">{totalMatieres}</p>
                            </div>
                            <BookOpen className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Actions Rapides */}
                <h3 className="text-xl font-semibold mb-4 text-[#0f2942]">Actions rapides</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Link href="/dashboard/eleves/importer">
                        <Button className="w-full h-24 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
                            <FileSpreadsheet className="w-6 h-6" />
                            <span>Importer élèves (Excel)</span>
                        </Button>
                    </Link>
                    <Link href="/dashboard/classes/assigner">
                        <Button className="w-full h-24 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                            <UserPlus className="w-6 h-6" />
                            <span>Assigner professeur</span>
                        </Button>
                    </Link>
                </div>

                {/* Menu principal */}
                <h3 className="text-xl font-semibold mb-4 text-[#0f2942]">Gestion de l'établissement</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/dashboard/utilisateurs" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h4 className="font-semibold text-lg mb-2">Utilisateurs</h4>
                        <p className="text-sm text-slate-600">Créer et gérer les comptes (Admin, Enseignant, Parent, Élève)</p>
                    </Link>

                    <Link href="/dashboard/classes" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h4 className="font-semibold text-lg mb-2">Classes</h4>
                        <p className="text-sm text-slate-600">Créer et gérer les classes de l'établissement</p>
                    </Link>

                    <Link href="/dashboard/matieres" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h4 className="font-semibold text-lg mb-2">Matières</h4>
                        <p className="text-sm text-slate-600">Gérer les matières et coefficients</p>
                    </Link>

                    <Link href="/dashboard/admissions" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h4 className="font-semibold text-lg mb-2">Admissions</h4>
                        <p className="text-sm text-slate-600">Gérer les demandes d'inscription</p>
                    </Link>

                    <Link href="/dashboard/actualites" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h4 className="font-semibold text-lg mb-2">Actualités</h4>
                        <p className="text-sm text-slate-600">Publier des actualités sur le site</p>
                    </Link>

                    <Link href="/dashboard/statistiques" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h4 className="font-semibold text-lg mb-2">Statistiques</h4>
                        <p className="text-sm text-slate-600">Voir les statistiques globales de l'école</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}