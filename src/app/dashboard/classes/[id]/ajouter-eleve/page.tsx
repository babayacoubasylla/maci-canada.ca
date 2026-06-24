import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function AjouterEleve({ params }: Props) {
    const classe = await prisma.classe.findUnique({
        where: { id: params.id },
    });

    if (!classe) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-2xl">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Ajouter un élève</h1>
                <p className="text-slate-600 mb-8">Classe : {classe.nom}</p>

                <form action={`/api/classes/${classe.id}/ajouter-eleve`} method="POST" className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Matricule de l’élève</Label>
                        <Input name="matricule" placeholder="Ex: MACI2025001" required />
                    </div>

                    <div>
                        <Label>Utilisateur (Élève)</Label>
                        <select name="userId" className="w-full border h-10 rounded-md px-3" required>
                            <option value="">-- Sélectionner un utilisateur --</option>
                            {/* On affichera ici les utilisateurs avec le rôle ELEVE qui n'ont pas encore de classe */}
                        </select>
                    </div>

                    <Button type="submit" className="w-full bg-[#C41E3A] py-6">
                        Ajouter à la classe
                    </Button>
                </form>
            </div>
        </div>
    );
}