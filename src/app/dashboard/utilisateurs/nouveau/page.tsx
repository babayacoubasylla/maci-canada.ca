"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NouvelUtilisateur() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("/api/utilisateurs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Une erreur est survenue");
            }

            router.push("/dashboard/utilisateurs");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-2xl">
                {/* Bouton Retour */}
                <div className="mb-4">
                    <Link href="/dashboard/utilisateurs">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Retour à la liste
                        </Button>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">
                    Nouvel utilisateur
                </h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border space-y-6">
                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input id="prenom" name="prenom" required />
                        </div>
                        <div>
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" name="nom" required />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>

                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>

                    <div>
                        <Label htmlFor="role">Rôle</Label>
                        <select
                            id="role"
                            name="role"
                            defaultValue="ELEVE"
                            className="w-full border h-10 rounded-md px-3"
                        >
                            <option value="ELEVE">Élève</option>
                            <option value="PARENT">Parent</option>
                            <option value="ENSEIGNANT">Enseignant</option>
                            <option value="ADMIN">Administrateur</option>
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            className="bg-[#0f2942] flex-1"
                            disabled={isPending}
                        >
                            {isPending ? "Création..." : "Créer l'utilisateur"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => router.push("/dashboard/utilisateurs")}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}