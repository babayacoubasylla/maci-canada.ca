import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function GererAdmissions() {
    const demandes = await prisma.preinscription.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container">
                <BackButton />

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Demandes d’Admission</h1>
                    <Button variant="outline">Exporter en Excel</Button>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Élève</th>
                                <th className="text-left p-4">Niveau</th>
                                <th className="text-left p-4">Parent</th>
                                <th className="text-left p-4">Date</th>
                                <th className="text-left p-4">Statut</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.length > 0 ? (
                                demandes.map((demande) => (
                                    <tr key={demande.id} className="border-t hover:bg-slate-50">
                                        <td className="p-4 font-medium">
                                            {demande.prenomEleve} {demande.nomEleve}
                                        </td>
                                        <td className="p-4">{demande.niveau}</td>
                                        <td className="p-4 text-sm">{demande.nomParent}</td>
                                        <td className="p-4 text-sm text-slate-500">
                                            {new Date(demande.createdAt).toLocaleDateString("fr-CA")}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${demande.statut === "ACCEPTE" ? "bg-green-100 text-green-700" :
                                                    demande.statut === "REFUSE" ? "bg-red-100 text-red-700" :
                                                        "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {demande.statut}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/dashboard/admissions/${demande.id}`}>
                                                    Voir
                                                </Link>
                                            </Button>

                                            {demande.statut === "NOUVEAU" && (
                                                <>
                                                    <form action={`/api/admissions/${demande.id}/accepter`} method="POST" className="inline">
                                                        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                                                            Accepter
                                                        </Button>
                                                    </form>
                                                    <form action={`/api/admissions/${demande.id}/refuser`} method="POST" className="inline">
                                                        <Button type="submit" size="sm" variant="destructive">
                                                            Refuser
                                                        </Button>
                                                    </form>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        Aucune demande d’admission pour le moment.
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