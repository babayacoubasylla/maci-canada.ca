import { Header } from "@/components/layout/Header";

export default function MesNotes() {
    // Données simulées (plus tard on les récupérera de la base de données)
    const notes = [
        { matiere: "Mathématiques", devoir: "Exercice sur les fractions", note: 15.5, date: "20 juin 2025" },
        { matiere: "Français", devoir: "Lecture - Chapitre 5", note: 14, date: "18 juin 2025" },
        { matiere: "Sciences", devoir: "TP sur les végétaux", note: 17, date: "15 juin 2025" },
        { matiere: "Histoire", devoir: "Dissertation - Révolution française", note: 12.5, date: "12 juin 2025" },
    ];

    const moyenne = (notes.reduce((acc, n) => acc + n.note, 0) / notes.length).toFixed(2);

    return (
        <div>
            <Header />
            <div className="container py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Mes Notes</h1>
                    <div className="bg-white px-6 py-3 rounded-xl border">
                        <span className="text-sm text-slate-500">Moyenne générale</span>
                        <span className="ml-3 text-2xl font-bold text-[#0f2942]">{moyenne}/20</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Matière</th>
                                <th className="text-left p-4">Devoir</th>
                                <th className="text-left p-4">Note</th>
                                <th className="text-left p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={index} className="border-t hover:bg-slate-50">
                                    <td className="p-4 font-medium">{note.matiere}</td>
                                    <td className="p-4 text-sm text-slate-600">{note.devoir}</td>
                                    <td className="p-4">
                                        <span className="font-semibold text-[#0f2942]">{note.note}/20</span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">{note.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 text-sm text-slate-500">
                    * Les notes sont mises à jour par vos enseignants.
                </div>
            </div>
        </div>
    );
}