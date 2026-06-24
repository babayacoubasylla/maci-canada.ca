import { Header } from "@/components/layout/Header";

export default function Programmes() {
    return (
        <div>
            <Header />
            <div className="container py-16">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-10">Nos Programmes</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { niveau: "Préscolaire", desc: "Éveil et socialisation des tout-petits" },
                        { niveau: "Primaire", desc: "Apprentissage fondamental et structuré" },
                        { niveau: "Collège", desc: "Développement des compétences académiques" },
                        { niveau: "Lycée", desc: "Préparation aux études supérieures" },
                    ].map((prog, i) => (
                        <div key={i} className="border p-8 rounded-xl">
                            <h3 className="text-2xl font-semibold text-[#0f2942] mb-3">{prog.niveau}</h3>
                            <p className="text-slate-600">{prog.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}