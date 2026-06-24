import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function DetailsEleve({ params }: Props) {
    const eleve = await prisma.eleve.findUnique({
        where: { id: params.id },
        include: {
            user: true,
            classe: true,
        },
    });

    if (!eleve) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-4xl">
                <BackButton />

                <div className="bg-white p-8 rounded-xl border">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-[#0f2942]">{eleve.user.prenom} {eleve.user.nom}</h1>
                            <p className="text-slate-600">{eleve.classe?.nom} • {eleve.classe?.niveau}</p>
                        </div>
                        <Button variant="outline">Modifier</Button>
                    </div>

                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500">Matricule</p>
                            <p className="font-medium">{eleve.matricule}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="font-medium">{eleve.user.email}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="font-semibold mb-4">Actions rapides</h3>
                        <div className="flex gap-4">
                            <Button variant="outline">Voir les notes</Button>
                            <Button variant="outline">Voir les absences</Button>
                            <Button variant="outline">Contacter le parent</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}