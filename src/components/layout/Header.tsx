import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden">
                        <Image
                            src="/images/logo.png"
                            alt="MACI Canada"
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                            priority
                        />
                    </div>
                    <span className="font-semibold text-xl text-[#0f2942]">MACI Canada</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/apropos" className="hover:text-[#1e4a7a]">À propos</Link>
                    <Link href="/programmes" className="hover:text-[#1e4a7a]">Programmes</Link>
                    <Link href="/admissions" className="hover:text-[#1e4a7a]">Admissions</Link>
                    <Link href="/actualites" className="hover:text-[#1e4a7a]">Actualités</Link>
                    <Link href="/contact" className="hover:text-[#1e4a7a]">Contact</Link>
                    <Link href="/messagerie" className="hover:text-[#1e4a7a]">Messagerie</Link>
                </nav>

                {/* Boutons */}
                <div className="flex items-center gap-3">
                    <Link href="/connexion">
                        <Button variant="outline" size="sm" className="border-[#0f2942] text-[#0f2942] hover:bg-[#0f2942] hover:text-white">
                            Se connecter
                        </Button>
                    </Link>
                    <Link href="/admissions">
                        <Button size="sm" className="bg-[#C41E3A] hover:bg-[#a01830]">
                            Postuler
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}