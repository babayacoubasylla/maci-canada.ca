import { Header } from "@/components/layout/Header";

export default function NotesParent() {
    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Notes &amp; Bulletins</h1>

                <div className="bg-white rounded-xl border p-8">
                    <h3 className="font-semibold mb-4">Jean Dupont - 6ème A</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                            <span>Mathématiques</span>
                            <span className="font-semibold">15.5 / 20</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Français</span>
                            <span className="font-semibold">14 / 20</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Sciences</span>
                            <span className="font-semibold">17 / 20</span>
                        </div>
                    </div>

                    <button className="mt-6 w-full bg-[#C41E3A] text-white py-3 rounded-lg">
                        Télécharger le bulletin du trimestre
                    </button>
                </div>
            </div>
        </div>
    );
}