"use client";

import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PublierCours() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            // Accepter uniquement PDF et images
            if (!selectedFile.type.includes("pdf") && !selectedFile.type.includes("image")) {
                alert("Seuls les fichiers PDF et les images sont acceptés.");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Veuillez sélectionner un fichier.");
            return;
        }
        alert(`Cours "${file.name}" publié avec succès !`);
    };

    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10 max-w-3xl">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Publier un Cours</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Titre du cours</Label>
                        <Input name="titre" placeholder="Ex: Les fractions - Chapitre 3" required />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label>Matière</Label>
                            <select name="matiere" className="w-full border h-10 rounded-md px-3" required>
                                <option>Mathématiques</option>
                                <option>Français</option>
                                <option>Sciences</option>
                            </select>
                        </div>
                        <div>
                            <Label>Classe</Label>
                            <select name="classe" className="w-full border h-10 rounded-md px-3" required>
                                <option>6ème A</option>
                                <option>5ème B</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label>Fichier du cours</Label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="w-full border p-2 rounded-md"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Formats acceptés : PDF ou Images (photos de cours manuscrits)
                        </p>
                        {file && (
                            <p className="text-sm text-green-600 mt-2">✓ {file.name}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full bg-[#C41E3A] py-6 text-lg">
                        Publier le cours
                    </Button>
                </form>
            </div>
        </div>
    );
}