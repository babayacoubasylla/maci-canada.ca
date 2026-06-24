import { BackButton } from "@/components/ui/BackButton";

export default function Statistiques() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Statistiques</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { titre: "Total Élèves", valeur: "312" },
                        { titre: "Total Enseignants", valeur: "28" },
                        { titre: "Taux de réussite", valeur: "94%" },
                        { titre: "Demandes en attente", valeur: "34" },
                        { titre: "Messages ce mois", valeur: "87" },
                        { titre: "Événements planifiés", valeur: "12" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl border">
                            <p className="text-sm text-slate-500">{stat.titre}</p>
                            <p className="text-5xl font-bold text-[#0f2942] mt-3">{stat.valeur}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}