import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NouvelleClasse() {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-2xl">
                <BackButton />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Créer une nouvelle classe</h1>

                <form action="/api/classes/create" method="POST" className="bg-white p-8 rounded-xl border space-y-6">
                    <div>
                        <Label>Nom de la classe</Label>
                        <Input name="nom" placeholder="Ex: 6ème A" required />
                    </div>

                    <div>
                        <Label>Niveau</Label>
                        <select name="niveau" className="w-full border h-10 rounded-md px-3" required>
                            <option value="PRESCOLAIRE">Préscolaire</option>
                            <option value="PRIMAIRE">Primaire</option>
                            <option value="COLLEGE">Collège</option>
                            <option value="LYCEE">Lycée</option>
                        </select>
                    </div>

                    <div>
                        <Label>Année scolaire</Label>
                        <Input name="anneeScolaire" placeholder="2025-2026" required />
                    </div>

                    <Button type="submit" className="w-full bg-[#C41E3A] py-6">
                        Créer la classe
                    </Button>
                </form>
            </div>
        </div>
    );
}