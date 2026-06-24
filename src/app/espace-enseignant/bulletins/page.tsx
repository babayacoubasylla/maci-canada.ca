"use client";

import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import jsPDF from "jspdf";

export default function GenerationBulletins() {
    const [selectedClass, setSelectedClass] = useState("");
    const [trimestre, setTrimestre] = useState("Trimestre 3");

    // Données simulées
    const classes = [
        { id: "1", nom: "6ème A" },
        { id: "2", nom: "5ème B" },
    ];

    const eleves = [
        { id: "1", nom: "Jean Dupont", moyenne: 15.5 },
        { id: "2", nom: "Sophie Tremblay", moyenne: 14.2 },
        { id: "3", nom: "Lucas Bernard", moyenne: 16.8 },
    ];

    // Fonction pour générer un bulletin PDF
    const genererBulletin = (eleve: any) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("MACI Canada", 20, 20);
        doc.setFontSize(14);
        doc.text("Bulletin Scolaire", 20, 30);

        doc.setFontSize(12);
        doc.text(`Élève : ${eleve.nom}`, 20, 45);
        doc.text(`Classe : ${selectedClass || "6ème A"}`, 20, 52);
        doc.text(`Trimestre : ${trimestre}`, 20, 59);

        doc.text("Notes :", 20, 75);
        doc.text(`Moyenne générale : ${eleve.moyenne}/20`, 20, 85);

        doc.text("Commentaire de l'enseignant :", 20, 100);
        doc.text("Excellent travail ce trimestre. Continuez comme ça.", 20, 110);

        doc.save(`bulletin_${eleve.nom.replace(" ", "_")}.pdf`);
    };

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Génération de Bulletins</h1>

                {/* Sélection */}
                <div className="bg-white p-6 rounded-xl border mb-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm mb-2">Classe</label>
                            <select
                                className="w-full border h-10 rounded-md px-3"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">-- Sélectionner une classe --</option>
                                {classes.map((c) => (
                                    <option key={c.id} value={c.nom}>{c.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm mb-2">Trimestre</label>
                            <select
                                className="w-full border h-10 rounded-md px-3"
                                value={trimestre}
                                onChange={(e) => setTrimestre(e.target.value)}
                            >
                                <option>Trimestre 1</option>
                                <option>Trimestre 2</option>
                                <option>Trimestre 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Liste des élèves */}
                <div className="bg-white rounded-xl border overflow-hidden">
                    <div className="p-4 border-b bg-slate-50">
                        <h2 className="font-semibold">Élèves de la classe</h2>
                    </div>
                    <table className="w-full">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="text-left p-4">Nom de l’élève</th>
                                <th className="text-left p-4">Moyenne</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eleves.map((eleve) => (
                                <tr key={eleve.id} className="border-t hover:bg-slate-50">
                                    <td className="p-4 font-medium">{eleve.nom}</td>
                                    <td className="p-4">{eleve.moyenne}/20</td>
                                    <td className="p-4 text-right">
                                        <Button
                                            onClick={() => genererBulletin(eleve)}
                                            className="bg-[#C41E3A]"
                                        >
                                            Générer le Bulletin (PDF)
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}