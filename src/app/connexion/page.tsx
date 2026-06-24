"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, AlertCircle } from "lucide-react";

export default function ConnexionPage() {
    const [state, formAction, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-[#0f2942] text-white w-14 h-14 rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl">MACI Canada</CardTitle>
                    <CardDescription>Connectez-vous à votre espace personnel</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        {state && (
                            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                <AlertCircle className="w-4 h-4" />
                                {state}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
                            disabled={isPending}
                        >
                            {isPending ? "Connexion..." : "Se connecter"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}