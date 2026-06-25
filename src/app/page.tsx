import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Accueil() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ==================== HERO ==================== */}
      <section className="bg-[#0f2942] text-white py-24">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Bienvenue à <span className="text-white">MACI Canada</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Un établissement d'excellence offrant une éducation de qualité
            du préscolaire au secondaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-white text-[#0f2942] hover:bg-slate-100">
                Postuler maintenant
              </Button>
            </Link>
            <Link href="#apropos">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0f2942]">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== À PROPOS ==================== */}
      <section id="apropos" className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#0f2942]">À propos de MACI Canada</h2>
          <p className="text-lg text-slate-600">
            Fondée en 2010, MACI Canada est une école privée reconnue pour son
            engagement envers l'excellence académique, le développement personnel
            et les valeurs humaines.
          </p>
        </div>
      </section>

      {/* ==================== PROGRAMMES ==================== */}
      <section id="programmes" className="bg-slate-50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0f2942]">Nos Programmes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "ACADEMY MACI-CANADA DE CÔTE D'IVOIRE",
                logo: "/images/AMC.png",
                desc: "ACADEMY MACI-CANADA DE CÔTE D'IVOIRE accueille vos enfants dès la Petite Section de maternelle (2 ans). Elle compte trois classes maternelles (PS, MS et GS) et six classes élémentaires (CP1, CP2, CE1, CE2, CM1, CM2). Éveil, socialisation et apprentissage ludique"
              },
              {
                title: "CANADIAN HIGH SCHOOL OF COTE D'IVOIRE",
                logo: "/images/CHOFCI.png",
                desc: "Le collège CANADIAN HIGH SCHOOL OF COTE D'IVOIRE permet la consolidation des apprentissages. Il compte au total 7 classes, du secondaire 1 au secondaire 7 en Côte d'Ivoire de la 6e à la Terminale."
              },
              {
                title: "INSTITUT POLYTECHNIQUE MACI-CANADA",
                logo: "/images/ISPMC.png",
                desc: "L'institut Polytechnique Canadien est l'établissement de formation professionnelle qui accueille les élèves après la classe de terminale pour des formations appliquées comme soins infirmiers, bâtiments, pâtisserie, etc."
              },
              {
                title: "FORMATION CONTINUE",
                logo: null,
                desc: "La formation continue (ou formation professionnelle continue) désigne l'ensemble des actions de formation destinées aux adultes déjà engagés dans la vie active ou sortis du système scolaire. Elle s'inscrit dans une logique d'apprentissage tout au long de la vie."
              },
            ].map((prog, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border hover:shadow-md transition flex flex-col items-center text-center">
                {/* Logo au-dessus du titre */}
                {prog.logo && (
                  <div className="mb-4 flex items-center justify-center">
                    <Image
                      src={prog.logo}
                      alt={prog.title}
                      width={80}
                      height={80}
                      className="h-16 w-auto object-contain"
                      priority={i < 3}
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 text-[#0f2942]">{prog.title}</h3>
                <p className="text-slate-600 text-sm">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RÉSULTATS D'EXAMENS ==================== */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center text-[#0f2942] mb-10">Résultats 2025</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { examen: "BAC", taux: "96%", mention: "Très Bien" },
            { examen: "BEPC", taux: "94%", mention: "Bien" },
            { examen: "CEPE", taux: "98%", mention: "Excellent" },
          ].map((resultat, i) => (
            <div key={i} className="bg-white border rounded-xl p-8 text-center hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-[#0f2942]">{resultat.examen}</h3>
              <p className="text-5xl font-bold text-[#C41E3A] mt-4">{resultat.taux}</p>
              <p className="text-slate-600 mt-2">Taux de réussite • Mention {resultat.mention}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== MEILLEURS ÉLÈVES ==================== */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-[#0f2942] mb-10">Nos Meilleurs Élèves 2025</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { nom: "Amina Koné", classe: "Terminale S", moyenne: "19.2" },
              { nom: "Lucas Moreau", classe: "3ème A", moyenne: "18.8" },
              { nom: "Fatou Diallo", classe: "CM2", moyenne: "18.5" },
              { nom: "Samuel Bédié", classe: "Seconde L", moyenne: "18.3" },
            ].map((eleve, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border text-center hover:shadow-md transition">
                <div className="w-20 h-20 mx-auto bg-slate-200 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-[#0f2942]">
                  {eleve.nom.charAt(0)}
                </div>
                <h4 className="font-semibold text-lg">{eleve.nom}</h4>
                <p className="text-sm text-slate-500">{eleve.classe}</p>
                <p className="text-[#C41E3A] font-bold mt-2 text-xl">{eleve.moyenne}/20</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ACTUALITÉS ==================== */}
      <section id="actualites" className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#0f2942]">Actualités récentes</h2>
          <Link href="/actualites" className="text-[#C41E3A] hover:underline">Voir toutes les actualités →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Journée portes ouvertes 2025", date: "22 juin 2025", category: "Événement" },
            { title: "Rentrée scolaire 2025-2026", date: "15 septembre 2025", category: "Information" },
            { title: "Excellence académique 2025", date: "10 juin 2025", category: "Récompense" },
          ].map((item, i) => (
            <div key={i} className="border rounded-xl overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#C41E3A] mb-1">{item.category} • {item.date}</p>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ÉVÉNEMENTS ==================== */}
      <section className="bg-[#0f2942] text-white py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Événements à venir</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { date: "28 Juin", titre: "Cérémonie de remise des diplômes" },
              { date: "05 Juillet", titre: "Fête de fin d'année scolaire" },
              { date: "15 Septembre", titre: "Rentrée scolaire 2025-2026" },
            ].map((event, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition">
                <p className="text-[#C41E3A] font-semibold">{event.date}</p>
                <h4 className="text-xl font-medium mt-2">{event.titre}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ADMISSIONS ==================== */}
      <section id="admissions" className="container py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#0f2942]">Admissions 2025-2026</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
          Les inscriptions sont ouvertes. Rejoignez une communauté éducative
          dynamique et bienveillante.
        </p>
        <Link href="/admissions">
          <Button size="lg" className="bg-[#C41E3A] hover:bg-[#a01830]">
            Commencer ma demande d'admission
          </Button>
        </Link>
      </section>

      {/* ==================== GALERIE / MOMENTS MARQUANTS ==================== */}
      <section className="bg-slate-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-[#0f2942] mb-10">Moments marquants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-video bg-slate-200 rounded-xl hover:scale-105 transition-transform cursor-pointer"></div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/galerie" className="text-[#C41E3A] hover:underline">Voir toute la galerie →</Link>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="bg-[#0f2942] text-white py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Vous avez des questions ? N'hésitez pas à nous contacter.
            Notre équipe est à votre disposition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0f2942]">
                Accéder au formulaire de contact
              </Button>
            </Link>
            <Link href="tel:+2252722498383">
              <Button className="bg-[#C41E3A] hover:bg-[#a01830] border-0">
                📞 Nous appeler
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="bg-white py-16 text-center border-t">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#0f2942]">Rejoignez la famille MACI Canada</h2>
          <p className="mt-3 text-lg text-slate-600">Les inscriptions pour l'année 2025-2026 sont ouvertes.</p>
          <Link href="/admissions">
            <Button size="lg" className="mt-6 bg-[#C41E3A] hover:bg-[#a01830]">
              Commencer ma demande d'admission
            </Button>
          </Link>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#0f2942] text-white">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Colonne 1 - MACI Canada */}
            <div>
              <h4 className="font-bold text-2xl mb-4">MACI Canada</h4>
              <p className="text-slate-300 text-sm mb-4">
                Un établissement d'excellence offrant une éducation de qualité du préscolaire au secondaire.
              </p>
              <div className="space-y-2 text-sm text-slate-300">
                <p className="flex items-start gap-2">
                  <span>📍</span>
                  <span>ABIDJAN - COCODY Palmeraie: Rue Ministre</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>✉️</span>
                  <span>infos@maci-canada.ca</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>📞</span>
                  <span>(+225) 27 22 49 83 83 / 07 07 66 83 83</span>
                </p>
                <p className="flex items-start gap-2 pl-6 text-slate-400">
                  <span>📱</span>
                  <span>(+225) 05 06 11 83 83</span>
                </p>
              </div>
            </div>

            {/* Colonne 2 - Sièges */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Nos Sièges</h5>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <p className="font-medium text-white mb-1">🇨🇦 Siège Canada</p>
                  <p>2828 Boulevard Laurier, Tour 1, Suite 700</p>
                  <p>Québec, Québec, Qc, Canada</p>
                  <p className="text-slate-400">G1V 0B9</p>
                  <p className="text-slate-400 mt-1">📞 +1 581 892 8383</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">🇨🇮 Siège Côte d'Ivoire</p>
                  <p>Abidjan Cocody, Riviera Palmeraie</p>
                  <p>01 BP 10076 Abidjan 01</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">🌍 Siège Afrique de l'Ouest</p>
                  <p>BP 222 Yamoussoukro</p>
                  <p>📞 22 49 83 83 / 05 86 11 83 83 / 01 02 01 83 83</p>
                </div>
              </div>
            </div>

            {/* Colonne 3 - Liens rapides */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Liens rapides</h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/admissions" className="text-slate-300 hover:text-white transition">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link href="/actualites" className="text-slate-300 hover:text-white transition">
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link href="/galerie" className="text-slate-300 hover:text-white transition">
                    Galerie
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/programmes" className="text-slate-300 hover:text-white transition">
                    Programmes
                  </Link>
                </li>
                <li>
                  <Link href="/espace-eleve" className="text-slate-300 hover:text-white transition">
                    Espace Élève
                  </Link>
                </li>
              </ul>
            </div>

            {/* Colonne 4 - Newsletter */}
            <div>
              <h5 className="font-semibold text-lg mb-4">Newsletter</h5>
              <p className="text-sm text-slate-300 mb-4">
                Restez informés de nos dernières actualités en vous abonnant à notre newsletter.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#C41E3A] hover:bg-[#a01830]"
                >
                  S'abonner
                </Button>
              </form>
              <div className="mt-4 text-xs text-slate-400">
                <p>✉️ info@macicanada.org</p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== FOOTER BOTTOM ==================== */}
        <div className="border-t border-slate-700">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400 text-center md:text-left">
                © 2026 ACADÉMIE MACI CANADA. Tous droits réservés.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <Link href="/politique-confidentialite" className="hover:text-white transition">
                  Politique de confidentialité
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/conditions-utilisation" className="hover:text-white transition">
                  Conditions d'utilisation
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/plan-site" className="hover:text-white transition">
                  Plan du site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}