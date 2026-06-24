import { Header } from "@/components/layout/Header";

export default function Galerie() {
    return (
        <div>
            <Header />
            <div className="container py-16">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-10">Galerie</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center text-slate-400"
                        >
                            Photo {i}
                        </div>
                    ))}
                </div>

                <p className="text-center text-slate-500 mt-8">
                    Plus de photos et vidéos seront ajoutées prochainement.
                </p>
            </div>
        </div>
    );
}