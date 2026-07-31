import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        encre: "#1E2433",       // texte principal — encre de stylo
        marine: "#20356B",      // bleu institutionnel confiance
        marineFonce: "#16244A",
        papier: "#FBFAF7",      // fond papier administratif
        ligne: "#E4E1D8",       // filets de formulaire
        fluo: "#FFE24D",        // surligneur jaune — signature du site
        fluoFonce: "#F5CE00",
        vertNet: "#0B7A43",     // vert du résultat validé
        griseNote: "#6B7080"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        tab: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        fiche: "0 1px 0 #E4E1D8, 0 8px 24px rgba(30,36,51,0.07)"
      }
    }
  },
  plugins: []
};
export default config;
