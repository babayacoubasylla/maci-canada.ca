"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function NotesEnfant() {
  const notes = [
    { matiere: "Mathématiques", note: 15.5 },
    { matiere: "Français", note: 14 },
    { matiere: "Sciences", note: 17 },
    { matiere: "Histoire", note: 12.5 },
  ];

  const moyenne = (notes.reduce((acc, n) => acc + n.note, 0) / notes.length).toFixed(2);

  // Fonction pour générer et télécharger le PDF
  const telechargerBulletin = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Bulletin Scolaire - Trimestre 3", 20, 20);

    doc.setFontSize(14);
    doc.text("Élève : Jean Dupont", 20, 35);
    doc.text("Classe : 6ème A", 20, 43);
    doc.text(`Moyenne générale : ${moyenne}/20`, 20, 51);

    doc.setFontSize(12);
    let y = 70;

    notes.forEach((note) => {
      doc.text(`${note.matiere} : ${note.note}/20`, 20, y);
      y += 10;
    });

    doc.save("bulletin_jean_dupont.pdf");
  };

  return (
    <div>
      <Header />
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0f2942]">Jean Dupont</h1>
            <p className="text-slate-600">6ème A • Collège</p>
          </div>
          <Button onClick={telechargerBulletin} className="bg-[#C41E3A]">
            Télécharger le Bulletin (PDF)
          </Button>
        </div>

        <div className="bg-white rounded-xl border p-8">
          <h2 className="font-semibold mb-6">Notes du trimestre</h2>
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="flex justify-between border-b pb-3">
                <span>{note.matiere}</span>
                <span className="font-semibold">{note.note}/20</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t flex justify-between items-center">
            <span className="font-semibold">Moyenne générale</span>
            <span className="text-2xl font-bold text-[#0f2942]">{moyenne}/20</span>
          </div>
        </div>
      </div>
    </div>
  );
}