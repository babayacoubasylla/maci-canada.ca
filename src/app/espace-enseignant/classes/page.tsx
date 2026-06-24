import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MesClasses() {
    const classes = [
        {
            id: "1",
            nom: "6ème A",
            niveau: "Collège",
            nombreEleves: 28,
            matieres: ["Mathématiques", "Physique"],
        },
        {
            id: "2",
            nom: "5ème B",
            niveau: "Collège",
            nombreEleves: 25,
            matieres: ["Mathématiques"],
        },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Mes Classes</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {classes.map((classe) => (
                        <div key={classe.id} className="bg-white p-8 rounded-xl border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-semibold text-[#0f2942]">{classe.nom}</h3>
                                    <p className="text-slate-600">{classe.niveau}</p>
                                </div>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">
                                    {classe.nombreEleves} élèves
                                </span>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-slate-500 mb-2">Matières enseignées :</p>
                                <div className="flex gap-2 flex-wrap">
                                    {classe.matieres.map((matiere, index) => (
                                        <span key={index} className="bg-[#0f2942] text-white text-xs px-3 py-1 rounded-full">
                                            {matiere}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button asChild variant="outline" className="flex-1">
                                    <Link href={`/espace-enseignant/classes/${classe.id}/eleves`}>
                                        Voir les élèves
                                    </Link>
                                </Button>
                                <Button asChild className="flex-1 bg-[#C41E3A]">
                                    <Link href={`/espace-enseignant/classes/${classe.id}/devoirs`}>
                                        Gérer les devoirs
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}