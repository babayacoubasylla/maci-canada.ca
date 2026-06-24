import { Header } from "@/components/layout/Header";

export default function AbsencesEnfant() {
    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Jean Dupont</h1>
                <p className="text-slate-600 mb-8">Absences et retards</p>

                <div className="bg-white rounded-xl border p-8">
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">Absence non justifiée</p>
                                <p className="text-sm text-slate-500">12 juin 2025</p>
                            </div>
                            <span className="text-red-600 font-semibold">1 jour</span>
                        </div>
                        <div className="flex justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">Retard</p>
                                <p className="text-sm text-slate-500">18 juin 2025</p>
                            </div>
                            <span className="text-yellow-600 font-semibold">15 min</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}