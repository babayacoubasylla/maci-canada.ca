import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function GestionClasses() {
    const classes = await prisma.classe.findMany({
        include: {
            _count: {
                select: { eleves: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container">
                <BackButton />

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Gestion des Classes</h1>
                    <Button asChild className="bg-[#C41E3A]">
                        <Link href="/dashboard/classes/nouveau">+ Créer une classe</Link>
                    </Button>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Nom de la classe</th>
                                <th className="text-left p-4">Niveau</th>
                                <th className="text-left p-4">Année scolaire</th>
                                <th className="text-left p-4">Élèves</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.length > 0 ? (
                                classes.map((classe) => (
                                    <tr key={classe.id} className="border-t hover:bg-slate-50">
                                        <td className="p-4 font-medium">{classe.nom}</td>
                                        <td className="p-4">{classe.niveau}</td>
                                        <td className="p-4">{classe.anneeScolaire}</td>
                                        <td className="p-4">{classe._count.eleves}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/dashboard/classes/${classe.id}/edit`}>Modifier</Link>
                                            </Button>

                                            <form action={`/api/classes/${classe.id}/delete`} method="POST">
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        if (!confirm("Voulez-vous vraiment supprimer cette classe ?")) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Supprimer
                                                </Button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        Aucune classe trouvée.
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