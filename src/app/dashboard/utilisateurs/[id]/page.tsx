import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
    params: { id: string };
}

export default async function ModifierUtilisateur({ params }: Props) {
    // Vérifier la session
    const session = await getSession();

    if (!session || !session.id) {
        redirect("/connexion");
    }

    if (session.role !== "ADMIN") {
        redirect("/dashboard");
    }

    const utilisateur = await prisma.user.findUnique({
        where: { id: params.id },
    });

    if (!utilisateur) {
        notFound();
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
                    Modifier l'utilisateur
                </h1>

                <form action={`/api/utilisateurs/${utilisateur.id}`} method="POST" className="bg-white p-8 rounded-xl border space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input
                                id="prenom"
                                name="prenom"
                                defaultValue={utilisateur.prenom}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="nom">Nom</Label>
                            <Input
                                id="nom"
                                name="nom"
                                defaultValue={utilisateur.nom}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={utilisateur.email}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="role">Rôle</Label>
                        <select
                            id="role"
                            name="role"
                            defaultValue={utilisateur.role}
                            className="w-full border h-10 rounded-md px-3"
                        >
                            <option value="ELEVE">Élève</option>
                            <option value="PARENT">Parent</option>
                            <option value="ENSEIGNANT">Enseignant</option>
                            <option value="ADMIN">Administrateur</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="actif">Statut</Label>
                        <select
                            id="actif"
                            name="actif"
                            defaultValue={utilisateur.actif ? "true" : "false"}
                            className="w-full border h-10 rounded-md px-3"
                        >
                            <option value="true">Actif</option>
                            <option value="false">Inactif</option>
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" className="bg-[#0f2942] flex-1">
                            Enregistrer les modifications
                        </Button>
                        <Link href="/dashboard/utilisateurs" className="flex-1">
                            <Button type="button" variant="outline" className="w-full">
                                Annuler
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}