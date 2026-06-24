import { Header } from "@/components/layout/Header";

export default function Actualites() {
    const actualites = [
        {
            id: 1,
            titre: "Journée portes ouvertes 2025",
            categorie: "Événement",
            date: "22 juin 2025",
            image: "https://picsum.photos/id/1015/800/400",
            resume: "Venez découvrir notre établissement et rencontrer notre équipe pédagogique.",
        },
        {
            id: 2,
            titre: "Excellents résultats aux examens",
            categorie: "Résultats",
            date: "15 juin 2025",
            image: "https://picsum.photos/id/1005/800/400",
            resume: "Nos élèves ont obtenu un taux de réussite de 96% aux examens de fin d’année.",
        },
        {
            id: 3,
            titre: "Inscriptions 2025-2026 ouvertes",
            categorie: "Communiqué",
            date: "10 juin 2025",
            image: "https://picsum.photos/id/201/800/400",
            resume: "Les inscriptions pour l’année scolaire 2025-2026 sont désormais ouvertes.",
        },
    ];

    return (
        <div>
            <Header />
            <div className="container py-16">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-10">Actualités</h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {actualites.map((actu) => (
                        <div key={actu.id} className="border rounded-2xl overflow-hidden hover:shadow-xl transition group">
                            <div className="relative">
                                <img
                                    src={actu.image}
                                    alt={actu.titre}
                                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-4 left-4 bg-[#C41E3A] text-white text-xs px-3 py-1 rounded-full">
                                    {actu.categorie}
                                </span>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-500 mb-2">{actu.date}</p>
                                <h3 className="text-xl font-semibold text-[#0f2942] mb-3 line-clamp-2">{actu.titre}</h3>
                                <p className="text-slate-600 text-sm line-clamp-3">{actu.resume}</p>
                                <button className="mt-4 text-[#C41E3A] font-medium hover:underline">
                                    Lire la suite →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}