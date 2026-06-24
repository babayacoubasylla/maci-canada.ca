import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function ClasseDetails({ params }: Props) {
    const classe = await prisma.classe.findUnique({
        where: { id: params.id },
        include: {
            eleves: {
                include: {
                    user: {
                        select: { prenom: true, nom: true, email: true },
                    },
                },
            },
        },
    });

    if (!classe) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container">
                <BackButton />

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0f2942]">{classe.nom}</h1>
                        <p className="text-slate-600">
                            {classe.niveau} • Année {classe.anneeScolaire}
                        </p>
                    </div>
                    <Button asChild className="bg-[#C41E3A]">
                        <Link href={`/dashboard/classes/${classe.id}/ajouter-eleve`}>
                            + Ajouter un élève
                        </Link>
                    </Button>
                </div>

                {/* Liste des élèves */}
                <div className="bg-white rounded-xl border overflow-hidden">
                    <div className="p-4 border-b bg-slate-50">
                        <h2 className="font-semibold">Élèves de la classe ({classe.eleves.length})</h2>
                    </div>

                    {classe.eleves.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="text-left p-4">Nom</th>
                                    <th className="text-left p-4">Email</th>
                                    <th className="text-left p-4">Matricule</th>
                                    <th className="text-right p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classe.eleves.map((eleve) => (
                                    <tr key={eleve.id} className="border-t hover:bg-slate-50">
                                        <td className="p-4 font-medium">
                                            {eleve.user.prenom} {eleve.user.nom}
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">{eleve.user.email}</td>
                                        <td className="p-4 text-sm">{eleve.matricule}</td>
                                        <td className="p-4 text-right">
                                            <Button variant="outline" size="sm">
                                                Voir le profil
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 text-center text-slate-500">
                            Aucun élève inscrit dans cette classe pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}