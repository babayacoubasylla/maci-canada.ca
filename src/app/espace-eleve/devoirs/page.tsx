import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MesDevoirs() {
    const devoirs = [
        { id: "1", titre: "Exercice sur les fractions", matiere: "Mathématiques", dateLimite: "28 juin 2025", statut: "À rendre" },
        { id: "2", titre: "Lecture - Chapitre 5", matiere: "Français", dateLimite: "25 juin 2025", statut: "Rendu" },
    ];

    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Mes Devoirs</h1>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Devoir</th>
                                <th className="text-left p-4">Matière</th>
                                <th className="text-left p-4">Date limite</th>
                                <th className="text-left p-4">Statut</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devoirs.map((d) => (
                                <tr key={d.id} className="border-t hover:bg-slate-50">
                                    <td className="p-4 font-medium">{d.titre}</td>
                                    <td className="p-4">{d.matiere}</td>
                                    <td className="p-4 text-sm">{d.dateLimite}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm ${d.statut === "Rendu" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            {d.statut}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {d.statut === "À rendre" ? (
                                            <Button asChild className="bg-[#C41E3A]">
                                                <Link href={`/espace-eleve/devoirs/${d.id}/rendre`}>Rendre</Link>
                                            </Button>
                                        ) : (
                                            <Button variant="outline" size="sm">Voir ma copie</Button>
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