import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CopiesDevoir() {
    const soumissions = [
        { id: "1", nom: "Jean Dupont", date: "25 juin 2025", note: 15.5, statut: "Corrigé" },
        { id: "2", nom: "Sophie Tremblay", date: "26 juin 2025", note: null, statut: "À corriger" },
        { id: "3", nom: "Lucas Bernard", date: "24 juin 2025", note: 12, statut: "Corrigé" },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Exercice sur les fractions</h1>
                <p className="text-slate-600 mb-8">6ème A • Date limite : 28 juin 2025</p>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Élève</th>
                                <th className="text-left p-4">Date de soumission</th>
                                <th className="text-left p-4">Note</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {soumissions.map((s) => (
                                <tr key={s.id} className="border-t hover:bg-slate-50">
                                    <td className="p-4 font-medium">{s.nom}</td>
                                    <td className="p-4 text-sm">{s.date}</td>
                                    <td className="p-4">
                                        {s.note !== null ? (
                                            <span className="font-semibold text-[#0f2942]">{s.note}/20</span>
                                        ) : (
                                            <span className="text-yellow-600">À corriger</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Button variant="outline" size="sm">Voir la copie</Button>

                                        {s.note === null && (
                                            <Button asChild size="sm" className="bg-[#C41E3A]">
                                                <Link href={`/espace-enseignant/devoirs/1/noter/${s.id}`}>
                                                    Noter
                                                </Link>
                                            </Button>
                                        )}
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