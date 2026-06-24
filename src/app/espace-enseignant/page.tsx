import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import Link from "next/link";

export default function EspaceEnseignant() {
    return (
        <div className="min-h-screen bg-slate-50">
            <EnseignantHeader />

            <div className="container mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#0f2942]">Bienvenue, Mme Tremblay</h1>
                    <p className="text-slate-600">Enseignante - Mathématiques</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mes Classes */}
                    <Link
                        href="/espace-enseignant/classes"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Mes Classes
                                </h3>
                                <p className="text-sm text-slate-600">Gérer mes classes et voir les élèves</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Mes Cours */}
                    <Link
                        href="/espace-enseignant/cours"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Mes Cours
                                </h3>
                                <p className="text-sm text-slate-600">Publier et gérer mes cours</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Mes Devoirs */}
                    <Link
                        href="/espace-enseignant/devoirs"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Mes Devoirs
                                </h3>
                                <p className="text-sm text-slate-600">Créer, corriger et noter les devoirs</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Saisie des Notes */}
                    <Link
                        href="/espace-enseignant/notes"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Saisie des Notes
                                </h3>
                                <p className="text-sm text-slate-600">Saisir et exporter les notes des élèves</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Génération de Bulletins - NOUVEAU LIEN */}
                    <Link
                        href="/espace-enseignant/bulletins"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Génération de Bulletins
                                </h3>
                                <p className="text-sm text-slate-600">Générer les bulletins PDF des élèves</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Messagerie */}
                    <Link
                        href="/messagerie"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Messagerie
                                </h3>
                                <p className="text-sm text-slate-600">Communiquer avec les élèves et parents</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Statistiques */}
                    <Link
                        href="/espace-enseignant/statistiques"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Statistiques
                                </h3>
                                <p className="text-sm text-slate-600">Voir les performances de mes classes</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Emploi du Temps */}
                    <Link
                        href="/espace-enseignant/emploi-du-temps"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Emploi du Temps
                                </h3>
                                <p className="text-sm text-slate-600">Voir mon emploi du temps</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    {/* Ressources Pédagogiques */}
                    <Link
                        href="/espace-enseignant/ressources"
                        className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg hover:border-[#C41E3A] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-[#0f2942] mb-2 group-hover:text-[#C41E3A] transition-colors">
                                    Ressources Pédagogiques
                                </h3>
                                <p className="text-sm text-slate-600">Accéder aux ressources et supports de cours</p>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-[#C41E3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                </div>

                {/* Section des notifications ou informations supplémentaires */}
                <div className="mt-12 bg-gradient-to-r from-[#0f2942] to-[#1a3a5c] rounded-xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">📊 Nouveauté : Génération de Bulletins</h2>
                            <p className="text-slate-300 opacity-90">
                                Vous pouvez désormais générer les bulletins PDF de vos élèves directement depuis votre espace.
                            </p>
                        </div>
                        <Link
                            href="/espace-enseignant/bulletins"
                            className="bg-white text-[#0f2942] px-6 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
                        >
                            Essayer maintenant
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}