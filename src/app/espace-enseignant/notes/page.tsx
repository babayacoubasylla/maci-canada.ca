import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SaisirNotesClasse() {
    const eleves = [
        { id: "1", nom: "Jean Dupont", note: 15.5 },
        { id: "2", nom: "Sophie Tremblay", note: "" },
        { id: "3", nom: "Lucas Bernard", note: 12 },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Saisie des Notes</h1>
                <p className="text-slate-600 mb-8">6ème A • Mathématiques • Trimestre 3</p>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">N°</th>
                                <th className="text-left p-4">Nom de l'élève</th>
                                <th className="text-left p-4">Note / 20</th>
                                <th className="text-left p-4">Commentaire</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eleves.map((eleve, index) => (
                                <tr key={eleve.id} className="border-t">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4 font-medium">{eleve.nom}</td>
                                    <td className="p-4 w-32">
                                        <Input type="number" defaultValue={eleve.note} step="0.5" min="0" max="20" />
                                    </td>
                                    <td className="p-4">
                                        <input type="text" className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Commentaire..." />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button className="bg-[#C41E3A] px-8">Enregistrer les notes</Button>
                </div>
            </div>
        </div>
    );
}