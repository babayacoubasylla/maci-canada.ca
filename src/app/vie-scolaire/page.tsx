import { Header } from "@/components/layout/Header";

export default function VieScolaire() {
    return (
        <div>
            <Header />
            <div className="container py-16">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-10">Vie Scolaire</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            titre: "Calendrier Académique",
                            desc: "Consultez les dates importantes de l’année scolaire 2025-2026.",
                        },
                        {
                            titre: "Règlement Intérieur",
                            desc: "Règles de vie, code de conduite et valeurs de l’établissement.",
                        },
                        {
                            titre: "Événements",
                            desc: "Activités culturelles, sorties pédagogiques et célébrations scolaires.",
                        },
                        {
                            titre: "Clubs et Activités",
                            desc: "Découvrez les clubs sportifs, artistiques et scientifiques disponibles.",
                        },
                        {
                            titre: "Service d’Orientation",
                            desc: "Accompagnement des élèves dans leur projet d’orientation.",
                        },
                        {
                            titre: "Restauration",
                            desc: "Informations sur la cantine et les menus de la semaine.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="border p-8 rounded-xl">
                            <h3 className="text-xl font-semibold text-[#0f2942] mb-3">{item.titre}</h3>
                            <p className="text-slate-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}