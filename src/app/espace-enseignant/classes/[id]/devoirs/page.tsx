import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DevoirsClasse() {
    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0f2942]">Devoirs - 6ème A</h1>
                        <p className="text-slate-600">Gérer les devoirs de la classe</p>
                    </div>
                    <Button asChild className="bg-[#C41E3A]">
                        <Link href="/espace-enseignant/devoirs/creer">+ Nouveau devoir</Link>
                    </Button>
                </div>

                <div className="bg-white rounded-xl border p-8">
                    <p className="text-slate-500">Aucun devoir créé pour cette classe pour le moment.</p>
                </div>
            </div>
        </div>
    );
}