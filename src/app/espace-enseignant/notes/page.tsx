import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SaisieNotes() {
    const classes = [
        { id: "1", nom: "6ème A", matiere: "Mathématiques", eleves: 28 },
        { id: "2", nom: "5ème B", matiere: "Mathématiques", eleves: 25 },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Saisie des Notes</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {classes.map((classe) => (
                        <div key={classe.id} className="bg-white p-8 rounded-xl border">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#0f2942]">{classe.nom}</h3>
                                    <p className="text-slate-600">{classe.matiere}</p>
                                </div>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                                    {classe.eleves} élèves
                                </span>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button asChild variant="outline" className="flex-1">
                                    <Link href={`/espace-enseignant/notes/${classe.id}`}>
                                        Saisir les notes
                                    </Link>
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    Exporter (Excel)
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}