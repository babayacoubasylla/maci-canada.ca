"use client";

import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CreerDevoir() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        if (file) formData.append("fichier", file);

        try {
            const res = await fetch("/api/devoirs/creer", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Devoir créé avec succès !");
                window.location.href = "/espace-enseignant/devoirs";
            } else {
                alert("Erreur lors de la création du devoir.");
            }
        } catch (error) {
            alert("Erreur de connexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10 max-w-3xl">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Créer un Devoir</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Titre du devoir</Label>
                        <Input name="titre" placeholder="Ex: Exercice sur les fractions" required />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <textarea
                            name="description"
                            className="w-full border rounded-md p-3 min-h-[100px]"
                            placeholder="Instructions pour les élèves..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label>Classe</Label>
                            <select name="classeId" className="w-full border h-10 rounded-md px-3" required>
                                <option value="">-- Sélectionner une classe --</option>
                                <option value="classe1">6ème A</option>
                                <option value="classe2">5ème B</option>
                            </select>
                        </div>
                        <div>
                            <Label>Matière</Label>
                            <select name="matiereId" className="w-full border h-10 rounded-md px-3" required>
                                <option value="">-- Sélectionner une matière --</option>
                                <option value="math">Mathématiques</option>
                                <option value="francais">Français</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label>Date limite</Label>
                        <Input type="date" name="dateLimite" required />
                    </div>

                    <div>
                        <Label>Fichier du devoir (PDF ou Image)</Label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.png"
                            className="w-full border p-2 rounded-md"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#C41E3A] py-6 text-lg"
                        disabled={loading}
                    >
                        {loading ? "Création en cours..." : "Publier le devoir"}
                    </Button>
                </form>
            </div>
        </div>
    );
}