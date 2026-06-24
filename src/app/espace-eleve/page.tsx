import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function EspaceEleve() {
    return (
        <div>
            <Header />
            <div className="container py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Bienvenue, Jean Dupont</h1>
                    <p className="text-slate-600">6ème A • Collège</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/espace-eleve/cours" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Mes Cours</h3>
                        <p className="text-sm text-slate-600">Consulter les cours de ma classe</p>
                    </Link>

                    <Link href="/espace-eleve/devoirs" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Mes Devoirs</h3>
                        <p className="text-sm text-slate-600">Voir et rendre mes devoirs</p>
                    </Link>

                    <Link href="/espace-eleve/notes" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Mes Notes</h3>
                        <p className="text-sm text-slate-600">Consulter mes notes et moyennes</p>
                    </Link>

                    <Link href="/espace-eleve/planning" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Planning &amp; Évaluations</h3>
                        <p className="text-sm text-slate-600">Voir les dates d’évaluations</p>
                    </Link>

                    <Link href="/messagerie" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Messagerie</h3>
                        <p className="text-sm text-slate-600">Communiquer avec mes enseignants</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}