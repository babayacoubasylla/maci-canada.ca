"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    href?: string;
    label?: string;
    className?: string;
}

export function BackButton({
    href,
    label = "Retour",
    className = ""
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleClick}
            className={`flex items-center gap-2 mb-6 ${className}`}
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </Button>
    );
}