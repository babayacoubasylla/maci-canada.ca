import { Header } from "@/components/layout/Header";

export default function PlanningEleve() {
    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Planning &amp; Évaluations</h1>

                <div className="bg-white rounded-xl border p-8">
                    <h2 className="font-semibold mb-6">Évaluations à venir</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">Contrôle de Mathématiques</p>
                                <p className="text-sm text-slate-500">Chapitre 3 - Les fractions</p>
                            </div>
                            <span className="text-sm text-[#C41E3A] font-medium">02 juillet 2025</span>
                        </div>
                        <div className="flex justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">Interrogation de Français</p>
                                <p className="text-sm text-slate-500">Orthographe et grammaire</p>
                            </div>
                            <span className="text-sm text-[#C41E3A] font-medium">05 juillet 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}