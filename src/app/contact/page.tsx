import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Contact() {
    return (
        <div>
            <Header />
            <div className="container py-16 max-w-2xl">
                <h1 className="text-4xl font-bold text-[#0f2942] mb-8">Contactez-nous</h1>

                <form className="space-y-6">
                    <div>
                        <Label>Nom complet</Label>
                        <Input placeholder="Votre nom" />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="votre@email.com" />
                    </div>
                    <div>
                        <Label>Message</Label>
                        <textarea
                            className="w-full border rounded-md p-3 min-h-[120px]"
                            placeholder="Votre message..."
                        />
                    </div>
                    <Button className="bg-[#C41E3A] hover:bg-[#a01830] w-full">
                        Envoyer le message
                    </Button>
                </form>
            </div>
        </div>
    );
}