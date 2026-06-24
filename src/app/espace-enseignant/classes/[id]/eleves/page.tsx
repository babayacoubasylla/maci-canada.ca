import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";

export default function ListeEleves() {
    const eleves = [
        { id: "1", nom: "Jean Dupont", matricule: "MACI2025012" },
        { id: "2", nom: "Sophie Tremblay", matricule: "MACI2025034" },
        { id: "3", nom: "Lucas Bernard", matricule: "MACI2025078" },
        { id: "4", nom: "Amina Koné", matricule: "MACI2025091" },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0f2942]">6ème A</h1>
                        <p className="text-slate-600">28 élèves</p>
                    </div>
                    <Button variant="outline">Exporter la liste</Button>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">N°</th>
                                <th className="text-left p-4">Nom et Prénom</th>
                                <th className="text-left p-4">Matricule</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eleves.map((eleve, index) => (
                                <tr key={eleve.id} className="border-t hover:bg-slate-50">
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4 font-medium">{eleve.nom}</td>
                                    <td className="p-4 text-sm text-slate-600">{eleve.matricule}</td>
                                    <td className="p-4 text-right">
                                        <Button variant="outline" size="sm">Voir le profil</Button>
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