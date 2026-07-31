# SimulMalin — simulmalin.net

Site de calculateurs finance & administratif français. Next.js 14 (App Router) + Tailwind CSS.

## Démarrer en local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Déployer sur Vercel (gratuit)

1. Crée un repo GitHub et pousse ce dossier :
   ```bash
   git init && git add . && git commit -m "Session 1 : fondations + calculateur brut-net"
   git remote add origin https://github.com/TON_COMPTE/simulmalin.git
   git push -u origin main
   ```
2. Sur vercel.com : "Add New Project" → importe le repo → Deploy (aucune config nécessaire).
3. Dans Vercel → Settings → Domains : ajoute `simulmalin.net` et suis les instructions DNS
   chez ton registrar (OVH/Namecheap).

## Ce qui est inclus (Session 1)

- ✅ Design system complet (palette "papier administratif + surligneur fluo", polices Archivo / Public Sans / IBM Plex Mono)
- ✅ Page d'accueil
- ✅ Calculateur **brut → net** complet : mensuel/annuel/horaire, 3 statuts, temps partiel,
  prélèvement à la source, détail des cotisations ligne par ligne, mode inverse net → brut
- ✅ **86 pages programmatiques** `/salaire/brut-net/1500/` → `/10000/` (générées au build)
- ✅ Contenu SEO : explications + FAQ avec balisage Schema.org FAQPage
- ✅ Pages légales AdSense : mentions légales, confidentialité, à propos, contact
- ✅ sitemap.xml et robots.txt automatiques

## ✅ BARÈMES VÉRIFIÉS (juillet 2026)

Vérifiés contre les sources officielles :
- **Barème IR 2026** (11 600 / 29 579 / 84 577 / 181 917 €) — service-public.gouv.fr, loi de finances 2026.
  Test de validation : 30 000 € imposable, 1 part → **2 103,99 €**, identique à l'exemple officiel (écart 0,00 €).
- **SMIC** : 12,31 €/h — 1 867,02 €/mois (revalorisation du 1er juin 2026)
- **PASS** : 48 060 € / PMSS 4 005 € (arrêté du 22 décembre 2025)
- **Abattement 10 %** : min 495 € / max 14 171 € · **Décote** : seuil 1 982 €, forfait 897 €
- **Plafonnement quotient familial** : 1 791 € par demi-part
- **Auto-entrepreneur** : 12,3 % vente / 21,2 % BIC / 23,1 % BNC hors CIPAV ; plafonds micro 203 100 € et 83 600 € (période 2026-2028)
- **Franchise TVA** : 85 000 / 93 500 € (vente), 37 500 / 41 250 € (services) — inchangés, projet de seuil unique à 25 000 € abandonné

Restent à confirmer avant mise en ligne (valeurs plausibles mais non vérifiées à la source) :
taux de cotisations salariales détaillés, barème des émoluments de notaire, taux DMTO par département
(majorations votées depuis 2025), constantes ARE, PTZ et prime d'activité. Les fichiers concernés
portent un commentaire ⚠️.

## ⚠️ CHECKLIST AVANT MISE EN LIGNE

1. **Vérifier les mentions légales** : `app/mentions-legales/page.tsx` est pré-rempli avec
   l'option « éditeur particulier sans adresse publiée » (légale, LCEN art. 6-III-2).
   → Vérifiez l'orthographe du nom.
   → Si vous exploitez le site via une structure enregistrée, remplacez le statut et ajoutez
     le numéro d'identification + l'adresse du siège : la dispense d'adresse ne vaut que
     pour les éditeurs non professionnels.
   → L'identité déclarée ici doit correspondre au titulaire du compte AdSense.

