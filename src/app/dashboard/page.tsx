import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Users,
    GraduationCap,
    BookOpen,
    FileText,
    MessageSquare,
    Calendar,
    UserPlus,
    School,
    ClipboardList,
    Settings,
    ArrowRight
} from "lucide-react";

export default async function DashboardPage() {
    const session = await getSession();

    if (!session || !session.id) {
        redirect("/connexion");
    }

    // Sécurité : s'assurer que session.name est une chaîne de caractères
    const userName = (session.name as string) || 'Utilisateur';

    // Statistiques (à remplacer par des données réelles)
    const stats = {
        totalEleves: 312,
        totalEnseignants: 28,
        totalClasses: 15,
        demandesEnAttente: 34,
        messagesNonLus: 12,
        coursAujourdhui: 8,
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-7xl">
                {/* En-tête */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#0f2942]">
                        Bienvenue, {userName}
                    </h2>
                    <p className="text-slate-600">Vous êtes connecté en tant qu'administrateur</p>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-sm text-slate-500">Élèves</p>
                        <p className="text-2xl font-bold text-[#0f2942]">{stats.totalEleves}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-sm text-slate-500">Enseignants</p>
                        <p className="text-2xl font-bold text-[#0f2942]">{stats.totalEnseignants}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-sm text-slate-500">Classes</p>
                        <p className="text-2xl font-bold text-[#0f2942]">{stats.totalClasses}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-sm text-slate-500">Demandes</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.demandesEnAttente}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-sm text-slate-500">Messages</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.messagesNonLus}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border">
                        <p className="text-sm text-slate-500">Cours aujourd'hui</p>
                        <p className="text-2xl font-bold text-[#0f2942]">{stats.coursAujourdhui}</p>
                    </div>
                </div>

                {/* Menu d'administration */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Gestion des admissions */}
                    <Link href="/dashboard/admissions" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Gestion des admissions</h3>
                        </div>
                        <p className="text-sm text-slate-500">Gérer les demandes d'inscription</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Voir les demandes <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Gestion des utilisateurs */}
                    <Link href="/dashboard/utilisateurs" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Gestion des utilisateurs</h3>
                        </div>
                        <p className="text-sm text-slate-500">Gérer les comptes utilisateurs</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Gérer les utilisateurs <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Gestion des classes */}
                    <Link href="/dashboard/classes" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <School className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Gestion des classes</h3>
                        </div>
                        <p className="text-sm text-slate-500">Créer et gérer les classes</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Gérer les classes <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Gestion des matières */}
                    <Link href="/dashboard/matieres" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <BookOpen className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Gestion des matières</h3>
                        </div>
                        <p className="text-sm text-slate-500">Gérer les matières et enseignants</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Gérer les matières <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Importer des élèves */}
                    <Link href="/dashboard/eleves/importer" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-teal-50 rounded-lg">
                                <UserPlus className="w-6 h-6 text-teal-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Importer des élèves</h3>
                        </div>
                        <p className="text-sm text-slate-500">Importer des élèves depuis Excel</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Importer maintenant <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Statistiques */}
                    <Link href="/dashboard/statistiques" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <ClipboardList className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Statistiques</h3>
                        </div>
                        <p className="text-sm text-slate-500">Voir les statistiques de l'école</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Voir les statistiques <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>

                    {/* Paramètres */}
                    <Link href="/dashboard/parametres" className="bg-white p-6 rounded-xl border hover:shadow-lg transition group">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <Settings className="w-6 h-6 text-gray-600" />
                            </div>
                            <h3 className="font-semibold text-[#0f2942]">Paramètres</h3>
                        </div>
                        <p className="text-sm text-slate-500">Configurer l'application</p>
                        <div className="mt-4 flex items-center text-sm text-[#0f2942] font-medium group-hover:translate-x-1 transition">
                            Configurer <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}