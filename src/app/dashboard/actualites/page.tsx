"use client";

import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PublierActualite() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Actualité publiée avec succès !");
        // Ici on ajoutera plus tard la logique pour sauvegarder en base de données
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-4xl">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Publier une Actualité</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-6">

                    {/* Titre */}
                    <div>
                        <Label>Titre de l’actualité</Label>
                        <Input placeholder="Ex: Journée portes ouvertes 2025" required />
                    </div>

                    {/* Catégorie */}
                    <div>
                        <Label>Catégorie / Rubrique</Label>
                        <select className="w-full border h-10 rounded-md px-3" required>
                            <option value="">-- Choisir une catégorie --</option>
                            <option>Actualité</option>
                            <option>Communiqué officiel</option>
                            <option>Événement</option>
                            <option>Vie scolaire</option>
                            <option>Résultats</option>
                        </select>
                    </div>

                    {/* Image */}
                    <div>
                        <Label>Image principale (optionnel)</Label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border p-2 rounded-md"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Aperçu"
                                    className="max-h-64 rounded-lg border"
                                />
                            </div>
                        )}
                    </div>

                    {/* Contenu */}
                    <div>
                        <Label>Contenu de l’actualité</Label>
                        <textarea
                            className="w-full border rounded-md p-3 min-h-[220px]"
                            placeholder="Rédigez le contenu de l’actualité ici..."
                            required
                        />
                    </div>

                    {/* Date et heure automatique */}
                    <div className="text-sm text-slate-500">
                        Date de publication : <span className="font-medium">{new Date().toLocaleDateString('fr-CA')} à {new Date().toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <Button type="submit" className="w-full bg-[#C41E3A] hover:bg-[#a01830] text-lg py-6">
                        Publier l’actualité
                    </Button>
                </form>
            </div>
        </div>
    );
}