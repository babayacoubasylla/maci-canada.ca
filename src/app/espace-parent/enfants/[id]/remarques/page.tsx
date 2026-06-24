import { Header } from "@/components/layout/Header";

export default function RemarquesEnfant() {
    const remarques = [
        {
            id: 1,
            date: "15 juin 2025",
            enseignant: "Mme Tremblay",
            matiere: "Mathématiques",
            contenu: "Jean a fait de gros progrès en géométrie. Il est plus participatif en classe.",
        },
        {
            id: 2,
            date: "10 juin 2025",
            enseignant: "M. Laurent",
            matiere: "Français",
            contenu: "Attention à l’orthographe. Jean doit relire ses copies avant de les rendre.",
        },
    ];

    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Jean Dupont</h1>
                <p className="text-slate-600 mb-8">Remarques des enseignants</p>

                <div className="space-y-6">
                    {remarques.map((remarque) => (
                        <div key={remarque.id} className="bg-white border rounded-xl p-8">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <span className="font-semibold text-[#0f2942]">{remarque.enseignant}</span>
                                    <span className="text-sm text-slate-500 ml-2">({remarque.matiere})</span>
                                </div>
                                <span className="text-sm text-slate-500">{remarque.date}</span>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{remarque.contenu}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}