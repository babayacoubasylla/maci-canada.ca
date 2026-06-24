"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function RendreDevoir({ params }: { params: { id: string } }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Veuillez sélectionner un fichier.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("devoirId", params.id);
        formData.append("fichier", file);

        try {
            const res = await fetch("/api/devoirs/soumettre", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Devoir soumis avec succès !");
                window.location.href = "/espace-eleve/devoirs";
            } else {
                alert("Erreur lors de la soumission.");
            }
        } catch (error) {
            alert("Erreur de connexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="container py-10 max-w-2xl">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Rendre le devoir</h1>
                <p className="text-slate-600 mb-8">Date limite : 28 juin 2025</p>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Fichier de votre devoir (PDF ou Image)</Label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            accept=".pdf,.jpg,.png"
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#C41E3A] py-6 text-lg"
                        disabled={loading}
                    >
                        {loading ? "Soumission en cours..." : "Soumettre mon devoir"}
                    </Button>
                </form>
            </div>
        </div>
    );
}