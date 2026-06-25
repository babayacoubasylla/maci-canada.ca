"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/BackButton";
import { FileSpreadsheet, Upload, AlertCircle, CheckCircle, Download } from "lucide-react";
import * as XLSX from 'xlsx';

interface Classe {
    id: string;
    nom: string;
    niveau: string;
    anneeScolaire: string;
}

export default function ImporterEleves() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [preview, setPreview] = useState<any[]>([]);
    const [classeId, setClasseId] = useState("");
    const [classes, setClasses] = useState<Classe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/classes")
            .then(res => {
                if (!res.ok) throw new Error("Erreur lors du chargement");
                return res.json();
            })
            .then(data => {
                setClasses(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur lors du chargement des classes");
                setLoading(false);
            });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validExtensions = ['.xlsx', '.xls'];
        const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!validExtensions.includes(extension)) {
            setError("Veuillez sélectionner un fichier Excel (.xlsx ou .xls)");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Le fichier est trop volumineux (max 5MB)");
            return;
        }

        setFile(file);
        setError("");
        setSuccess("");

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                if (json.length === 0) {
                    setError("Le fichier est vide");
                    return;
                }

                const requiredColumns = ['prenom', 'nom'];
                // Correction : Typer json[0] comme any
                const firstRow = json[0] as any;
                const headers = firstRow ? Object.keys(firstRow).map(k => k.toLowerCase()) : [];
                const missingColumns = requiredColumns.filter(col => !headers.includes(col));

                if (missingColumns.length > 0) {
                    setError(`Colonnes manquantes : ${missingColumns.join(', ')}. Colonnes requises : prenom, nom (email et dateNaissance sont optionnels)`);
                    return;
                }

                const invalidRows = json.filter((row: any) => !row.prenom?.trim() || !row.nom?.trim());
                if (invalidRows.length > 0) {
                    setError(`${invalidRows.length} ligne(s) ont des prénoms ou noms manquants`);
                    return;
                }

                setPreview(json);
                setSuccess(`${json.length} élèves trouvés dans le fichier`);
            } catch (err) {
                setError("Erreur lors de la lecture du fichier. Vérifiez le format.");
                console.error(err);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleImport = async () => {
        if (!file || !classeId) {
            setError("Veuillez sélectionner un fichier et une classe");
            return;
        }

        setIsPending(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("classeId", classeId);

            const response = await fetch("/api/eleves/importer", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erreur lors de l'import");
            }

            const result = await response.json();

            if (result.errors && result.errors.length > 0) {
                setSuccess(`${result.imported} élèves importés avec succès, mais ${result.errors.length} erreurs rencontrées`);
                console.error("Erreurs d'import:", result.errors);
            } else {
                setSuccess(`${result.imported} élèves importés avec succès !`);
            }

            setFile(null);
            setPreview([]);

            const fileInput = document.getElementById("file-upload") as HTMLInputElement;
            if (fileInput) fileInput.value = "";

            setTimeout(() => router.push("/dashboard/classes"), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
        } finally {
            setIsPending(false);
        }
    };

    const downloadTemplate = () => {
        try {
            const template = [
                { prenom: "Jean", nom: "Dupont", email: "jean.dupont@email.com", dateNaissance: "2010-05-15" },
                { prenom: "Marie", nom: "Martin", email: "marie.martin@email.com", dateNaissance: "2011-08-22" },
            ];

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(template);
            XLSX.utils.book_append_sheet(wb, ws, "Eleves");

            ws['!cols'] = [
                { wch: 15 },
                { wch: 15 },
                { wch: 25 },
                { wch: 15 },
            ];

            XLSX.writeFile(wb, "template_import_eleves.xlsx");
        } catch (err) {
            setError("Erreur lors du téléchargement du template");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500">Chargement des classes...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="container max-w-4xl">
                <BackButton label="Retour aux classes" href="/dashboard/classes" />

                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">
                    Importer des élèves (Excel)
                </h1>

                <div className="bg-white rounded-xl border shadow-sm p-8 space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-2">
                            📋 Format attendu du fichier Excel :
                        </h3>
                        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                            <li>Colonnes requises : <strong>prenom</strong>, <strong>nom</strong></li>
                            <li>Colonnes optionnelles : <strong>email</strong>, <strong>dateNaissance</strong></li>
                            <li>La première ligne doit contenir les en-têtes</li>
                            <li>Exemple : prenom | nom | email | dateNaissance</li>
                            <li>Taille max : 5MB</li>
                        </ul>
                    </div>

                    <div>
                        <Button
                            variant="outline"
                            onClick={downloadTemplate}
                            className="gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Télécharger le modèle Excel
                        </Button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Classe d'affectation *
                        </label>
                        <select
                            value={classeId}
                            onChange={(e) => setClasseId(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0f2942] focus:border-transparent"
                            required
                        >
                            <option value="">Sélectionner une classe...</option>
                            {classes.map((classe) => (
                                <option key={classe.id} value={classe.id}>
                                    {classe.nom} - {classe.niveau} ({classe.anneeScolaire})
                                </option>
                            ))}
                        </select>
                        {classes.length === 0 && (
                            <p className="text-sm text-amber-600 mt-1">
                                ⚠️ Aucune classe disponible. Créez une classe d'abord.
                            </p>
                        )}
                    </div>

                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-[#0f2942] transition-colors">
                        <FileSpreadsheet className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                        <div className="space-y-2">
                            <label
                                htmlFor="file-upload"
                                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 ${classes.length === 0
                                    ? 'bg-slate-300 cursor-not-allowed'
                                    : 'bg-[#0f2942] hover:bg-[#1a3a5a]'
                                    } text-white rounded-lg transition`}
                            >
                                <Upload className="w-4 h-4" />
                                Choisir un fichier Excel
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={classes.length === 0}
                            />
                            {file && (
                                <p className="text-sm text-slate-600 mt-2">
                                    📎 Fichier sélectionné : {file.name} ({(file.size / 1024).toFixed(1)} KB)
                                </p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-start gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{success}</span>
                        </div>
                    )}

                    {preview.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">
                                Aperçu ({preview.length} élèves)
                            </h3>
                            <div className="border rounded-lg overflow-x-auto max-h-60 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 sticky top-0">
                                        <tr>
                                            {Object.keys(preview[0]).map((key) => (
                                                <th key={key} className="p-2 text-left font-semibold border-b">
                                                    {key}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {preview.slice(0, 10).map((row, index) => (
                                            <tr key={index} className="border-t hover:bg-slate-50">
                                                {Object.values(row).map((value: any, i) => (
                                                    <td key={i} className="p-2">
                                                        {value || '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        {preview.length > 10 && (
                                            <tr className="border-t">
                                                <td colSpan={Object.keys(preview[0]).length} className="p-2 text-center text-slate-500">
                                                    ... et {preview.length - 10} autres lignes
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                                * Les mots de passe par défaut sont : password123
                            </p>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button
                            onClick={handleImport}
                            className="bg-[#0f2942] flex-1 hover:bg-[#1a3a5a] disabled:opacity-50"
                            disabled={!file || !classeId || isPending || preview.length === 0}
                        >
                            {isPending ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Import en cours...
                                </>
                            ) : (
                                "Importer les élèves"
                            )}
                        </Button>
                        <Link href="/dashboard/classes" className="flex-1">
                            <Button type="button" variant="outline" className="w-full">
                                Annuler
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}