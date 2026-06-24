import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

export default function MesCours() {
    const cours = [
        { id: "1", titre: "Les fractions - Chapitre 3", matiere: "Mathématiques", enseignant: "Mme Tremblay", date: "22 juin 2025", type: "pdf" },
        { id: "2", titre: "Notes manuscrites - Géométrie", matiere: "Mathématiques", enseignant: "Mme Tremblay", date: "20 juin 2025", type: "image" },
    ];

    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Mes Cours</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cours.map((c) => (
                        <div key={c.id} className="bg-white border rounded-xl p-6">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{c.titre}</h3>
                                    <p className="text-sm text-slate-500">{c.matiere}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs rounded-full ${c.type === "pdf" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                                    {c.type}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">Par {c.enseignant} • {c.date}</p>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1">Voir</Button>
                                <Button className="flex-1 bg-[#0f2942]">Télécharger</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}