import { Header } from "@/components/layout/Header";
import Link from "next/link";

export default function EspaceParent() {
    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Espace Parent</h1>
                <p className="text-slate-600 mb-8">Bienvenue, Mme Dupont. Vous suivez 2 enfants.</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/espace-parent/enfants" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Mes Enfants</h3>
                        <p className="text-sm text-slate-600">Voir les informations de mes enfants</p>
                    </Link>

                    <Link href="/espace-parent/notes" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Notes &amp; Bulletins</h3>
                        <p className="text-sm text-slate-600">Consulter les notes et bulletins</p>
                    </Link>

                    <Link href="/espace-parent/absences" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Absences &amp; Retards</h3>
                        <p className="text-sm text-slate-600">Suivre les absences de mes enfants</p>
                    </Link>

                    <Link href="/messagerie" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Messagerie</h3>
                        <p className="text-sm text-slate-600">Communiquer avec les enseignants</p>
                    </Link>

                    <Link href="/espace-parent/documents" className="bg-white p-8 rounded-xl border hover:shadow-md transition">
                        <h3 className="font-semibold text-xl mb-2">Documents</h3>
                        <p className="text-sm text-slate-600">Télécharger les documents officiels</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}