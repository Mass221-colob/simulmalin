/**
 * Illustrations SVG génératives pour les articles du blog.
 * Une illustration par catégorie, dans l'identité visuelle du site
 * (papier administratif, marine, surligneur fluo).
 * Aucun fichier image externe : léger, sans droits d'auteur, net sur tout écran.
 */

const MARINE = "#20356B";
const MARINE_CLAIR = "#5A7BC4";
const FLUO = "#FFE24D";
const LIGNE = "#E4E1D8";
const GRIS = "#9AA3B8";
const VERT = "#0B7A43";
const OCRE = "#C2801B";

export type Categorie =
  | "Salaire"
  | "Impôts"
  | "Immobilier"
  | "Emploi"
  | "Auto-entrepreneur"
  | "Épargne";

/** Illustration pleine largeur affichée en tête d'article. */
export function IllustrationArticle({
  categorie,
  className = "",
}: {
  categorie: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ligne bg-white ${className}`}>
      <svg viewBox="0 0 800 260" className="w-full" role="img" aria-label={`Illustration : ${categorie}`}>
        <rect width="800" height="260" fill="#FBFAF7" />
        <Motif categorie={categorie} />
      </svg>
    </div>
  );
}

/** Vignette compacte pour les cartes de l'index du blog. */
export function VignetteArticle({ categorie }: { categorie: string }) {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full" role="img" aria-label={`Illustration : ${categorie}`}>
      <rect width="240" height="120" fill="#FBFAF7" />
      <g transform="translate(-160, -70) scale(0.7)">
        <Motif categorie={categorie} />
      </g>
    </svg>
  );
}

function Motif({ categorie }: { categorie: string }) {
  switch (categorie) {
    case "Salaire":
      return <MotifSalaire />;
    case "Impôts":
      return <MotifImpots />;
    case "Immobilier":
      return <MotifImmobilier />;
    case "Emploi":
      return <MotifEmploi />;
    case "Auto-entrepreneur":
      return <MotifEntrepreneur />;
    case "Épargne":
      return <MotifEpargne />;
    default:
      return <MotifSalaire />;
  }
}

/* ---- Salaire : un bulletin de paie avec une ligne surlignée ---- */
function MotifSalaire() {
  return (
    <g>
      <rect x="250" y="30" width="300" height="200" rx="6" fill="#fff" stroke={LIGNE} strokeWidth="1.5" />
      <rect x="250" y="30" width="300" height="34" rx="6" fill={MARINE} />
      <rect x="250" y="52" width="300" height="12" fill={MARINE} />
      <rect x="270" y="42" width="90" height="8" rx="4" fill="#fff" opacity="0.85" />
      {[86, 108, 130, 152, 174].map((y, i) => (
        <g key={y}>
          <rect x="270" y={y} width={i % 2 === 0 ? 120 : 96} height="7" rx="3.5" fill={LIGNE} />
          <rect x={470 - (i % 3) * 14} y={y} width={40 + (i % 3) * 14} height="7" rx="3.5" fill={GRIS} opacity="0.5" />
        </g>
      ))}
      <rect x="262" y="192" width="276" height="26" rx="4" fill={FLUO} opacity="0.55" />
      <rect x="270" y="201" width="86" height="9" rx="4.5" fill={MARINE} />
      <rect x="452" y="201" width="78" height="9" rx="4.5" fill={MARINE} />
    </g>
  );
}

/* ---- Impôts : les tranches du barème en escalier ---- */
function MotifImpots() {
  const barres = [
    { x: 268, h: 26, c: GRIS },
    { x: 336, h: 62, c: MARINE_CLAIR },
    { x: 404, h: 108, c: MARINE },
    { x: 472, h: 148, c: OCRE },
  ];
  return (
    <g>
      <line x1="250" y1="212" x2="560" y2="212" stroke={LIGNE} strokeWidth="2" />
      {barres.map((b) => (
        <rect key={b.x} x={b.x} y={212 - b.h} width="48" height={b.h} rx="4" fill={b.c} />
      ))}
      <rect x="256" y="46" width="120" height="22" rx="4" fill={FLUO} opacity="0.55" />
      <rect x="264" y="53" width="72" height="8" rx="4" fill={MARINE} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={274 + i * 68} y="224" width="36" height="6" rx="3" fill={LIGNE} />
      ))}
    </g>
  );
}

/* ---- Immobilier : une façade avec la répartition des frais ---- */
function MotifImmobilier() {
  return (
    <g>
      <path d="M290 118 L400 52 L510 118 Z" fill={MARINE} />
      <rect x="312" y="118" width="176" height="98" rx="4" fill="#fff" stroke={LIGNE} strokeWidth="1.5" />
      <rect x="336" y="140" width="40" height="40" rx="3" fill={MARINE_CLAIR} opacity="0.35" />
      <rect x="424" y="140" width="40" height="40" rx="3" fill={MARINE_CLAIR} opacity="0.35" />
      <rect x="380" y="176" width="40" height="40" rx="3" fill={MARINE} opacity="0.8" />
      <rect x="290" y="228" width="220" height="14" rx="7" fill={LIGNE} />
      <rect x="290" y="228" width="132" height="14" rx="7" fill={MARINE} />
      <rect x="422" y="228" width="46" height="14" fill={OCRE} />
      <rect x="256" y="46" width="96" height="22" rx="4" fill={FLUO} opacity="0.55" />
    </g>
  );
}

/* ---- Emploi : un document contractuel et une signature ---- */
function MotifEmploi() {
  return (
    <g>
      <rect x="262" y="34" width="230" height="192" rx="6" fill="#fff" stroke={LIGNE} strokeWidth="1.5" />
      <rect x="286" y="60" width="120" height="10" rx="5" fill={MARINE} />
      {[88, 106, 124, 142].map((y, i) => (
        <rect key={y} x="286" y={y} width={i === 3 ? 108 : 182} height="7" rx="3.5" fill={LIGNE} />
      ))}
      <rect x="278" y="164" width="198" height="22" rx="4" fill={FLUO} opacity="0.5" />
      <path
        d="M292 210 q18 -22 34 -4 t32 -10 t30 6"
        fill="none"
        stroke={MARINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="512" y="96" width="46" height="46" rx="23" fill="none" stroke={VERT} strokeWidth="2.5" />
      <path d="M524 119 l8 9 l14 -18" fill="none" stroke={VERT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ---- Auto-entrepreneur : jauge de seuil et facture ---- */
function MotifEntrepreneur() {
  return (
    <g>
      <rect x="250" y="40" width="196" height="150" rx="6" fill="#fff" stroke={LIGNE} strokeWidth="1.5" />
      <rect x="272" y="64" width="88" height="9" rx="4.5" fill={MARINE} />
      {[90, 108, 126].map((y) => (
        <g key={y}>
          <rect x="272" y={y} width="96" height="6" rx="3" fill={LIGNE} />
          <rect x="386" y={y} width="38" height="6" rx="3" fill={GRIS} opacity="0.5" />
        </g>
      ))}
      <rect x="272" y="152" width="152" height="18" rx="4" fill={FLUO} opacity="0.55" />
      <text x="466" y="92" fontSize="11" fill={GRIS} fontFamily="sans-serif">
        seuil
      </text>
      <rect x="466" y="102" width="96" height="12" rx="6" fill={LIGNE} />
      <rect x="466" y="102" width="62" height="12" rx="6" fill={VERT} />
      <rect x="466" y="140" width="96" height="12" rx="6" fill={LIGNE} />
      <rect x="466" y="140" width="88" height="12" rx="6" fill={OCRE} />
      <rect x="466" y="178" width="96" height="12" rx="6" fill={LIGNE} />
      <rect x="466" y="178" width="34" height="12" rx="6" fill={MARINE} />
    </g>
  );
}

/* ---- Épargne : courbe de croissance des intérêts composés ---- */
function MotifEpargne() {
  return (
    <g>
      <line x1="262" y1="216" x2="556" y2="216" stroke={LIGNE} strokeWidth="2" />
      <line x1="262" y1="46" x2="262" y2="216" stroke={LIGNE} strokeWidth="2" />
      <path
        d="M262 216 L322 206 L382 192 L442 168 L502 126 L556 66 L556 216 Z"
        fill={MARINE}
        opacity="0.9"
      />
      <path
        d="M262 216 L322 208 L382 200 L442 190 L502 178 L556 164 L556 216 Z"
        fill={GRIS}
        opacity="0.55"
      />
      <path
        d="M262 216 L322 206 L382 192 L442 168 L502 126 L556 66"
        fill="none"
        stroke={MARINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="556" cy="66" r="6" fill={MARINE} />
      <rect x="278" y="60" width="104" height="22" rx="4" fill={FLUO} opacity="0.55" />
      <rect x="286" y="67" width="64" height="8" rx="4" fill={MARINE} />
    </g>
  );
}
