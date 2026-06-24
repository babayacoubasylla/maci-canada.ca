import { EnseignantHeader } from "@/components/layout/EnseignantHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NoterSoumission() {
    return (
        <div>
            <EnseignantHeader />

            <div className="container py-10 max-w-2xl">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-2">Noter la copie</h1>
                <p className="text-slate-600 mb-8">Jean Dupont • Exercice sur les fractions</p>

                <div className="bg-white p-8 rounded-xl border mb-8">
                    <p className="text-sm text-slate-500 mb-2">Fichier soumis :</p>
                    <Button variant="outline">Télécharger la copie</Button>
                </div>

                <form action="/api/devoirs/noter" method="POST" className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Note sur 20</Label>
                        <Input type="number" name="note" min="0" max="20" step="0.5" placeholder="Ex: 15.5" required />
                    </div>

                    <div>
                        <Label>Commentaire (optionnel)</Label>
                        <textarea
                            name="commentaire"
                            className="w-full border rounded-md p-3 min-h-[120px]"
                            placeholder="Commentaire pour l'élève..."
                        />
                    </div>

                    <Button type="submit" className="w-full bg-[#C41E3A] py-6 text-lg">
                        Enregistrer la note
                    </Button>
                </form>
            </div>
        </div>
    );
}