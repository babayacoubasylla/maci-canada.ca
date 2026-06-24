import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";

export default async function GererUtilisateurs() {
    // Récupérer la session avec JWT
    const session = await getSession();

    // Si pas de session ou pas d'utilisateur, rediriger vers connexion
    if (!session || !session.id) {
        redirect("/connexion");
    }

    // Vérifier si l'utilisateur est ADMIN
    if (session.role !== "ADMIN") {
        redirect("/dashboard");
    }

    // Récupérer tous les utilisateurs
    const utilisateurs = await prisma.user.findMany({
        orderBy: { nom: "asc" },
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-6xl">
                {/* Bouton Retour */}
                <div className="mb-4">
                    <Link href="/dashboard">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Retour au tableau de bord
                        </Button>
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">
                        Gestion des utilisateurs
                    </h1>
                    <Link href="/dashboard/utilisateurs/nouveau">
                        <Button className="bg-[#0f2942] hover:bg-[#1a3a5a]">
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvel utilisateur
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Nom</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Email</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Rôle</th>
                                <th className="text-left p-4 text-sm font-semibold text-slate-600">Statut</th>
                                <th className="text-right p-4 text-sm font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilisateurs.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-slate-50">
                                    <td className="p-4">
                                        {user.prenom} {user.nom}
                                    </td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "ADMIN" ? "bg-red-100 text-red-700" :
                                                user.role === "ENSEIGNANT" ? "bg-blue-100 text-blue-700" :
                                                    user.role === "PARENT" ? "bg-green-100 text-green-700" :
                                                        "bg-gray-100 text-gray-700"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.actif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}>
                                            {user.actif ? "Actif" : "Inactif"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/dashboard/utilisateurs/${user.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}