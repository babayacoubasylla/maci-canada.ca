import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default async function DetailsDemande({ params }: Props) {
    const demande = await prisma.preinscription.findUnique({
        where: { id: params.id },
    });

    if (!demande) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-3xl">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Détails de la demande</h1>

                <div className="bg-white p-8 rounded-xl border space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500">Nom de l’élève</p>
                            <p className="font-medium">{demande.prenomEleve} {demande.nomEleve}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Niveau souhaité</p>
                            <p className="font-medium">{demande.niveau}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500">Nom du parent</p>
                            <p className="font-medium">{demande.nomParent}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="font-medium">{demande.emailParent}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">Téléphone</p>
                        <p className="font-medium">{demande.telephone}</p>
                    </div>

                    {demande.message && (
                        <div>
                            <p className="text-sm text-slate-500">Message</p>
                            <p className="mt-1 p-4 bg-slate-50 rounded-md">{demande.message}</p>
                        </div>
                    )}

                    <div className="pt-4 border-t flex gap-4">
                        {demande.statut === "NOUVEAU" && (
                            <>
                                <form action={`/api/admissions/${demande.id}/accepter`} method="POST">
                                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                        Accepter la demande
                                    </Button>
                                </form>
                                <form action={`/api/admissions/${demande.id}/refuser`} method="POST">
                                    <Button type="submit" variant="destructive">
                                        Refuser la demande
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}