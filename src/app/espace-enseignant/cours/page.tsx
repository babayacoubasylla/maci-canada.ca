import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MesCours() {
    const cours = [
        {
            id: "1",
            titre: "Les fractions - Chapitre 3",
            matiere: "Mathématiques",
            classe: "6ème A",
            date: "22 juin 2025",
            type: "pdf",
            fichierUrl: "#",
        },
        {
            id: "2",
            titre: "Notes manuscrites - Géométrie",
            matiere: "Mathématiques",
            classe: "5ème B",
            date: "20 juin 2025",
            type: "image",
            fichierUrl: "#",
        },
    ];

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Mes Cours</h1>
                    <Link href="/espace-enseignant/cours/publier">
                        <Button className="bg-[#C41E3A]">+ Publier un cours</Button>
                    </Link>
                </div>

                {cours.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cours.map((coursItem) => (
                            <div key={coursItem.id} className="bg-white border rounded-xl overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-[#0f2942]">{coursItem.titre}</h3>
                                            <p className="text-sm text-slate-500">{coursItem.matiere} • {coursItem.classe}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs rounded-full ${coursItem.type === "pdf"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {coursItem.type === "pdf" ? "PDF" : "Image"}
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-500 mb-4">Publié le {coursItem.date}</p>

                                    <div className="flex gap-3">
                                        <Button variant="outline" className="flex-1">Voir</Button>
                                        <Button className="flex-1 bg-[#0f2942]">Télécharger</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-xl border text-center">
                        <p className="text-slate-500">Vous n'avez publié aucun cours pour le moment.</p>
                        <Link href="/espace-enseignant/cours/publier">
                            <Button className="mt-6 bg-[#C41E3A]">Publier mon premier cours</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}