import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NouvelleMatiere() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-2xl">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Ajouter une Matière</h1>

                <form action="/api/matieres/create" method="POST" className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Nom de la matière</Label>
                        <Input name="nom" placeholder="Mathématiques" required />
                    </div>

                    <div>
                        <Label>Enseignant</Label>
                        <select name="enseignantId" className="w-full border h-10 rounded-md px-3">
                            <option value="">-- Sélectionner un enseignant --</option>
                            {/* On peut remplir dynamiquement avec les enseignants */}
                        </select>
                    </div>

                    <Button type="submit" className="w-full bg-[#C41E3A] py-6">
                        Créer la matière
                    </Button>
                </form>
            </div>
        </div>
    );
}