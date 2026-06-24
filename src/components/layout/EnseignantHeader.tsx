"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function EnseignantHeader() {
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    // Mettre à jour l'heure et la date en temps réel
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            // Heure
            const time = now.toLocaleTimeString("fr-CA", {
                hour: "2-digit",
                minute: "2-digit",
            });
            setCurrentTime(time);

            // Date
            const date = now.toLocaleDateString("fr-CA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            setCurrentDate(date);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000); // Mise à jour chaque seconde

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="container flex items-center justify-between h-20">
                {/* Logo + Nom de l'école */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0f2942] rounded-lg flex items-center justify-center text-white font-bold">
                        MC
                    </div>
                    <div>
                        <span className="font-semibold text-xl text-[#0f2942]">MACI Canada</span>
                        <span className="text-sm text-slate-500 block -mt-1">Espace Enseignant</span>
                    </div>
                </div>

                {/* Date et Heure */}
                <div className="text-right hidden md:block">
                    <div className="text-lg font-semibold text-[#0f2942]">{currentTime}</div>
                    <div className="text-sm text-slate-500 capitalize">{currentDate}</div>
                </div>

                {/* Profil de l'enseignant */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="font-semibold text-[#0f2942]">Marie Tremblay</p>
                        <p className="text-xs text-slate-500">Enseignante - Mathématiques</p>
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C41E3A]">
                        <img
                            src="https://picsum.photos/id/1005/48/48"
                            alt="Photo de l'enseignant"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}