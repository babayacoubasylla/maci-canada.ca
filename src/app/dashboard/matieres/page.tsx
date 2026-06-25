import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function GestionMatieres() {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        redirect("/connexion");
    }

    const matieres = await prisma.matiere.findMany({
        include: {
            enseignant: {
                include: {
                    user: {
                        select: {
                            prenom: true,
                            nom: true,
                        }
                    }
                }
            },
            _count: {
                select: {
                    cours: true,
                    devoirs: true,
                }
            }
        },
        orderBy: { nom: "asc" },
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-6xl">
                <BackButton />

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">
                        Gestion des matières
                    </h1>
                    <Link href="/dashboard/matieres/nouveau">
                        <Button className="bg-[#0f2942] hover:bg-[#1a3a5a]">
                            + Nouvelle matière
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Matière</th>
                                <th className="text-left p-4">Code</th>
                                <th className="text-left p-4">Coefficient</th>
                                <th className="text-left p-4">Enseignant</th>
                                <th className="text-left p-4">Cours</th>
                                <th className="text-left p-4">Devoirs</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matieres.length > 0 ? (
                                matieres.map((matiere) => (
                                    <tr key={matiere.id} className="border-t hover:bg-slate-50">
                                        <td className="p-4 font-medium">{matiere.nom}</td>
                                        <td className="p-4">{matiere.code || "-"}</td>
                                        <td className="p-4">{matiere.coefficient}</td>
                                        <td className="p-4">
                                            {matiere.enseignant?.user ? (
                                                `${matiere.enseignant.user.prenom} ${matiere.enseignant.user.nom}`
                                            ) : (
                                                <span className="text-slate-400">Non assigné</span>
                                            )}
                                        </td>
                                        <td className="p-4">{matiere._count.cours}</td>
                                        <td className="p-4">{matiere._count.devoirs}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <Link href={`/dashboard/matieres/${matiere.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    Modifier
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={async () => {
                                                    if (confirm("Voulez-vous vraiment supprimer cette matière ?")) {
                                                        await fetch(`/api/matieres/${matiere.id}`, {
                                                            method: "DELETE",
                                                        });
                                                        window.location.reload();
                                                    }
                                                }}
                                            >
                                                Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">
                                        Aucune matière trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}