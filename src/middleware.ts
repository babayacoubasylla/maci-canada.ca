import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";

export async function middleware(request: NextRequest) {
    const session = await getSession();

    const { pathname } = request.nextUrl;

    // Protection des dashboards
    if (pathname.startsWith("/dashboard") && (!session || session.role !== "ADMIN")) {
        return NextResponse.redirect(new URL("/connexion", request.url));
    }

    if (pathname.startsWith("/espace-eleve") && (!session || session.role !== "ELEVE")) {
        return NextResponse.redirect(new URL("/connexion", request.url));
    }

    if (pathname.startsWith("/espace-enseignant") && (!session || session.role !== "ENSEIGNANT")) {
        return NextResponse.redirect(new URL("/connexion", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/espace-eleve/:path*", "/espace-enseignant/:path*"],
};