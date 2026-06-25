import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function DashboardAdmin() {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
        redirect("/connexion");
    }

    // Sécurité : s'assurer que session.name est une chaîne de caractères
    const userName = (session.name as string) || "Utilisateur";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-xl font-semibold text-[#0f2942]">Tableau de bord - Administrateur</h1>
                    <form action="/api/logout" method="POST">
                        <Button variant="outline" type="submit">Déconnexion</Button>
                    </form>
                </div>
            </div>

            <div className="container py-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#0f2942]">
                        Bienvenue, {userName}
                    </h2>
                    <p className="text-slate-600">Vous êtes connecté en tant qu&apos;administrateur.</p>
                </div>

                {/* Statistiques */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { titre: "Utilisateurs", valeur: "248" },
                        { titre: "Demandes d&apos;admission", valeur: "34" },
                        { titre: "Articles publiés", valeur: "12" },
                        { titre: "Messages non lus", valeur: "7" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border">
                            <p className="text-sm text-slate-500">{stat.titre}</p>
                            <p className="text-4xl font-bold text-[#0f2942] mt-1">{stat.valeur}</p>
                        </div>
                    ))}
                </div>

                {/* Actions rapides */}
                <h3 className="text-xl font-semibold mb-4 text-[#0f2942]">Actions rapides</h3>
                <div className="flex flex-wrap gap-4">
                    <Button className="bg-[#0f2942]">Gérer les utilisateurs</Button>
                    <Button variant="outline">Publier une actualité</Button>
                    <Button variant="outline">Gérer les admissions</Button>
                    <Button variant="outline">Voir les statistiques</Button>
                </div>
            </div>
        </div>
    );
}