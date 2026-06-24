"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/BackButton";
import { ArrowLeft, UserPlus, X, AlertCircle, CheckCircle } from "lucide-react";

interface Classe {
    id: string;
    nom: string;
    niveau: string;
    anneeScolaire: string;
}

interface Enseignant {
    id: string;
    userId: string;
    user: {
        prenom: string;
        nom: string;
        email: string;
    };
    specialite: string | null;
    matieres: Matiere[];
}

interface Matiere {
    id: string;
    nom: string;
    code: string | null;
}

interface Assignation {
    id: string;
    classeId: string;
    enseignantId: string;
    matiereId: string;
    classe: Classe;
    enseignant: {
        id: string;
        userId: string;
        user: { prenom: string; nom: string };
        specialite: string | null;
    };
    matiere: Matiere;
}

export default function AssignerProfesseur() {
    const router = useRouter();
    const [classes, setClasses] = useState<Classe[]>([]);
    const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
    const [matieres, setMatieres] = useState<Matiere[]>([]);
    const [assignations, setAssignations] = useState<Assignation[]>([]);

    const [selectedClasse, setSelectedClasse] = useState("");
    const [selectedEnseignant, setSelectedEnseignant] = useState("");
    const [selectedMatiere, setSelectedMatiere] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [classesRes, enseignantsRes, matieresRes, assignationsRes] = await Promise.all([
                fetch("/api/classes").then(res => res.json()),
                fetch("/api/enseignants").then(res => res.json()),
                fetch("/api/matieres").then(res => res.json()),
                fetch("/api/classes/assignations").then(res => res.json()),
            ]);

            setClasses(classesRes);
            setEnseignants(enseignantsRes);
            setMatieres(matieresRes);
            setAssignations(assignationsRes);
        } catch (error) {
            setError("Erreur lors du chargement des données");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async () => {
        if (!selectedClasse || !selectedEnseignant || !selectedMatiere) {
            setError("Veuillez sélectionner une classe, un enseignant et une matière");
            return;
        }

        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/classes/assigner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    classeId: selectedClasse,
                    enseignantId: selectedEnseignant,
                    matiereId: selectedMatiere,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erreur lors de l'assignation");
            }

            setSuccess("Professeur assigné avec succès !");
            setSelectedClasse("");
            setSelectedEnseignant("");
            setSelectedMatiere("");
            await loadData();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemove = async (assignationId: string) => {
        if (!confirm("Voulez-vous vraiment retirer ce professeur ?")) return;

        try {
            const response = await fetch(`/api/classes/assigner/${assignationId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression");
            }

            setSuccess("Professeur retiré avec succès");
            await loadData();
        } catch (error) {
            setError("Erreur lors de la suppression");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500">Chargement...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-6xl">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">
                    Assigner des professeurs
                </h1>

                <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
                    {/* Formulaire d'assignation */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Classe
                            </label>
                            <select
                                value={selectedClasse}
                                onChange={(e) => setSelectedClasse(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="">Sélectionner...</option>
                                {classes.map((classe) => (
                                    <option key={classe.id} value={classe.id}>
                                        {classe.nom} - {classe.niveau}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Professeur
                            </label>
                            <select
                                value={selectedEnseignant}
                                onChange={(e) => setSelectedEnseignant(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="">Sélectionner...</option>
                                {enseignants.map((ens) => (
                                    <option key={ens.id} value={ens.id}>
                                        {ens.user.prenom} {ens.user.nom} - {ens.specialite || "Sans spécialité"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Matière
                            </label>
                            <select
                                value={selectedMatiere}
                                onChange={(e) => setSelectedMatiere(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="">Sélectionner...</option>
                                {matieres.map((mat) => (
                                    <option key={mat.id} value={mat.id}>
                                        {mat.nom} {mat.code ? `(${mat.code})` : ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleAssign}
                            disabled={submitting || !selectedClasse || !selectedEnseignant || !selectedMatiere}
                            className="bg-[#0f2942] hover:bg-[#1a3a5a] gap-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            {submitting ? "Assignation..." : "Assigner"}
                        </Button>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md">
                            <CheckCircle className="w-4 h-4" />
                            {success}
                        </div>
                    )}
                </div>

                {/* Liste des assignations */}
                <div className="mt-8 bg-white rounded-xl border shadow-sm p-6">
                    <h2 className="text-xl font-bold text-[#0f2942] mb-4">
                        Professeurs assignés ({assignations.length})
                    </h2>

                    {assignations.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">
                            Aucun professeur assigné pour le moment
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left p-3 text-sm font-semibold">Classe</th>
                                        <th className="text-left p-3 text-sm font-semibold">Professeur</th>
                                        <th className="text-left p-3 text-sm font-semibold">Matière</th>
                                        <th className="text-right p-3 text-sm font-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignations.map((assignation) => (
                                        <tr key={assignation.id} className="border-t hover:bg-slate-50">
                                            <td className="p-3">
                                                {assignation.classe.nom}
                                                <span className="text-xs text-slate-500 ml-2">
                                                    ({assignation.classe.niveau})
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {assignation.enseignant.user.prenom} {assignation.enseignant.user.nom}
                                            </td>
                                            <td className="p-3">{assignation.matiere.nom}</td>
                                            <td className="p-3 text-right">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleRemove(assignation.id)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}