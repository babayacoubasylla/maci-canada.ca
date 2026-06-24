import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function MesEnfants() {
    const enfants = [
        { id: "1", nom: "Jean Dupont", classe: "6ème A", niveau: "Collège" },
        { id: "2", nom: "Sophie Dupont", classe: "4ème B", niveau: "Collège" },
        { id: "3", nom: "Lucas Dupont", classe: "2nde C", niveau: "Lycée" },
        { id: "4", nom: "Emma Dupont", classe: "CM2", niveau: "Primaire" },
    ];

    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Mes Enfants</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {enfants.map((enfant) => (
                        <div key={enfant.id} className="bg-white p-8 rounded-xl border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-semibold text-[#0f2942]">{enfant.nom}</h3>
                                    <p className="text-slate-600 mt-1">{enfant.classe} • {enfant.niveau}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <Link
                                    href={`/espace-parent/enfants/${enfant.id}/notes`}
                                    className="bg-[#0f2942] text-white text-center py-3 rounded-lg text-sm font-medium hover:bg-[#1e4a7a]"
                                >
                                    Notes &amp; Bulletins
                                </Link>
                                <Link
                                    href={`/espace-parent/enfants/${enfant.id}/absences`}
                                    className="border text-center py-3 rounded-lg text-sm font-medium hover:bg-slate-50"
                                >
                                    Absences
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}