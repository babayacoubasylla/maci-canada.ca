import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function ModifierClasse({ params }: Props) {
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

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Modifier la classe</h1>

                <form
                    action={`/api/classes/${classe.id}/update`}
                    method="POST"
                    className="bg-white p-8 rounded-xl border space-y-6"
                >
                    <div>
                        <Label>Nom de la classe</Label>
                        <Input name="nom" defaultValue={classe.nom} required />
                    </div>

                    <div>
                        <Label>Niveau</Label>
                        <select
                            name="niveau"
                            defaultValue={classe.niveau}
                            className="w-full border h-10 rounded-md px-3"
                            required
                        >
                            <option value="PRESCOLAIRE">Préscolaire</option>
                            <option value="PRIMAIRE">Primaire</option>
                            <option value="COLLEGE">Collège</option>
                            <option value="LYCEE">Lycée</option>
                        </select>
                    </div>

                    <div>
                        <Label>Année scolaire</Label>
                        <Input name="anneeScolaire" defaultValue={classe.anneeScolaire} required />
                    </div>

                    <Button type="submit" className="w-full bg-[#0f2942] py-6">
                        Enregistrer les modifications
                    </Button>
                </form>
            </div>
        </div>
    );
}