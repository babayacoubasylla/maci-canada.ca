import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MesDevoirs() {
    const devoirs = [
        {
            id: "1",
            titre: "Exercice sur les fractions",
            classe: "6ème A",
            dateLimite: "28 juin 2025",
            totalEleves: 28,
            soumissions: 22,
            corriges: 15,
        },
        {
            id: "2",
            titre: "Contrôle de géométrie",
            classe: "5ème B",
            dateLimite: "30 juin 2025",
            totalEleves: 25,
            soumissions: 18,
            corriges: 0,
        },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Mes Devoirs</h1>
                    <Button asChild className="bg-[#C41E3A]">
                        <Link href="/espace-enseignant/devoirs/creer">+ Créer un devoir</Link>
                    </Button>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Devoir</th>
                                <th className="text-left p-4">Classe</th>
                                <th className="text-left p-4">Date limite</th>
                                <th className="text-left p-4">Soumissions</th>
                                <th className="text-left p-4">Corrigés</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devoirs.map((devoir) => (
                                <tr key={devoir.id} className="border-t hover:bg-slate-50">
                                    <td className="p-4 font-medium">{devoir.titre}</td>
                                    <td className="p-4">{devoir.classe}</td>
                                    <td className="p-4 text-sm">{devoir.dateLimite}</td>
                                    <td className="p-4 text-sm">{devoir.soumissions}/{devoir.totalEleves}</td>
                                    <td className="p-4 text-sm">{devoir.corriges}</td>
                                    <td className="p-4 text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/espace-enseignant/devoirs/${devoir.id}`}>
                                                Voir les copies
                                            </Link>
                                        </Button>
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