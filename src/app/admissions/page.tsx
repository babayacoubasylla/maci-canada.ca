"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    nomEleve: z.string().min(2, "Le nom est requis"),
    prenomEleve: z.string().min(2, "Le prénom est requis"),
    niveau: z.enum(["PRESCOLAIRE", "PRIMAIRE", "COLLEGE", "LYCEE"]),
    nomParent: z.string().min(2, "Le nom du parent est requis"),
    emailParent: z.string().email("Email invalide"),
    telephone: z.string().min(8, "Téléphone invalide"),
});

type FormData = z.infer<typeof formSchema>;

export default function Admissions() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));

        const res = await fetch("/api/preinscription", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Demande envoyée avec succès !");
        } else {
            alert("Erreur lors de l'envoi.");
        }
    };

    return (
        <div>
            <Header />
            <div className="container py-16 max-w-3xl">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-8">Demande d’Admission</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 border rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label>Nom de l’élève</Label>
                            <Input {...register("nomEleve")} />
                            {errors.nomEleve && <p className="text-red-500 text-sm">{errors.nomEleve.message}</p>}
                        </div>
                        <div>
                            <Label>Prénom de l’élève</Label>
                            <Input {...register("prenomEleve")} />
                            {errors.prenomEleve && <p className="text-red-500 text-sm">{errors.prenomEleve.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label>Niveau souhaité</Label>
                        <select {...register("niveau")} className="w-full border h-10 rounded-md px-3">
                            <option value="PRESCOLAIRE">Préscolaire</option>
                            <option value="PRIMAIRE">Primaire</option>
                            <option value="COLLEGE">Collège</option>
                            <option value="LYCEE">Lycée</option>
                        </select>
                    </div>

                    <div><Label>Nom du parent</Label><Input {...register("nomParent")} /></div>
                    <div><Label>Email</Label><Input type="email" {...register("emailParent")} /></div>
                    <div><Label>Téléphone</Label><Input {...register("telephone")} /></div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#C41E3A] py-6">
                        {isSubmitting ? "Envoi..." : "Soumettre ma demande"}
                    </Button>
                </form>
            </div>
        </div>
    );
}