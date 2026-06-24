import { Header } from "@/components/layout/Header";

export default function APropos() {
    return (
        <div>
            <Header />
            <div className="container py-16 max-w-3xl">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-8">À propos de MACI Canada</h1>

                <div className="space-y-6 text-lg text-slate-600">
                    <p>
                        Fondée en 2010, MACI Canada est un établissement scolaire privé reconnu
                        pour son engagement envers l’excellence académique, le développement
                        personnel et les valeurs humaines.
                    </p>
                    <p>
                        Nous accueillons les élèves du préscolaire au secondaire dans un environnement
                        sécuritaire, stimulant et bienveillant. Notre mission est de former des
                        citoyens responsables, curieux et épanouis.
                    </p>
                    <p>
                        Nos valeurs : <strong>Excellence • Respect • Intégrité • Innovation</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}