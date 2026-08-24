import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { t } from "../src/translations.js";

const SITE = "https://cansahin.dev";
const NAME = "Can Şahin";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Plain markup mirroring what the app renders, so a crawler reading the raw
// response sees the same copy a visitor sees. Nothing here is hidden: React
// clears #root on its first render, so this only ever paints while the bundle
// is still downloading.
const block = (lang) => {
  const tr = t[lang];
  const bio = `${tr.hero.bio1}${tr.hero.bioUni}${tr.hero.bio2}`;

  const experiences = tr.experiences
    .map(
      (e) =>
        `<article><h3>${esc(e.title)}, ${esc(e.company_name)}</h3>` +
        `<p>${esc(e.date)}</p>` +
        `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></article>`
    )
    .join("");

  const projects = tr.projects
    .map(
      (p) =>
        `<article><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p></article>`
    )
    .join("");

  // The hero fills the viewport so that during the load window a visitor sees
  // only the name and bio, roughly where the real hero puts them. Everything
  // else flows below the fold: still in the document, just not on screen.
  return (
    `<div id="seo-fallback">` +
    `<div class="seo-hero">` +
    `<p class="seo-brand">${esc(NAME)}</p>` +
    `<div class="seo-hero-body">` +
    `<h1>${esc(tr.hero.greeting)} <span class="seo-name">${esc(NAME)}</span></h1>` +
    `<p class="seo-bio">${esc(bio)}</p>` +
    `</div>` +
    `</div>` +
    `<h2>${esc(tr.experience.head)}</h2>${experiences}` +
    `<h2>${esc(tr.works.head)}</h2>${projects}` +
    `</div>`
  );
};

// Background is left transparent so the body gradient from the render-blocking
// stylesheet shows through: the fallback then sits on the same ground the real
// hero does, which keeps the handover to React from reading as a flash.
const FALLBACK_CSS = `
#seo-fallback {
  padding: 1.5rem 1.5rem 4rem;
  color: #ffffff;
  font-family: "Space Grotesk", sans-serif;
}
#seo-fallback .seo-hero {
  min-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
}
#seo-fallback .seo-brand {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.02em;
}
#seo-fallback .seo-hero-body { margin-top: 22vh; max-width: 32rem; }
#seo-fallback h1 {
  font-family: "Archivo", sans-serif;
  font-weight: 900;
  font-size: clamp(34px, 5vw, 72px);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  max-width: 26rem;
}
#seo-fallback .seo-name {
  display: block;
  background-image: linear-gradient(to right, #1cb9d7, #804dee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
#seo-fallback .seo-bio { color: #a6afc3; line-height: 1.6; }
#seo-fallback h2 { margin: 2rem 0 0.5rem; font-family: "Archivo", sans-serif; }
#seo-fallback h3 { margin-top: 1rem; }
#seo-fallback p, #seo-fallback li { color: #a6afc3; line-height: 1.6; }
#seo-fallback ul { padding-left: 1.25rem; }
@media (min-width: 640px) {
  #seo-fallback { padding-left: 4rem; padding-right: 4rem; }
}`;

const rewriteHeadForFr = (html) => {
  const { title, description } = t.fr.meta;
  const url = `${SITE}/fr/`;
  return html
    .replace(/<html lang="[^"]*"/, '<html lang="fr"')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
      `$1${esc(description)}$2`
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${esc(title)}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
      `$1${esc(description)}$2`
    );
};

export default function seoFallback() {
  let outDir;

  return {
    name: "seo-fallback",
    apply: "build",

    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },

    transformIndexHtml(html) {
      return html
        .replace("</head>", `<style>${FALLBACK_CSS}</style>\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${block("en")}</div>`);
    },

    // /fr/ is the same bundle with French head tags and French fallback copy,
    // written where GitHub Pages serves it for a direct hit on /fr/.
    closeBundle() {
      const enPath = resolve(outDir, "index.html");
      const en = readFileSync(enPath, "utf8");
      const enBlock = block("en");

      if (!en.includes(enBlock)) {
        throw new Error(
          "seo-fallback: EN block not found in built index.html, /fr/ not written"
        );
      }

      const fr = rewriteHeadForFr(en).replace(enBlock, block("fr"));
      mkdirSync(resolve(outDir, "fr"), { recursive: true });
      writeFileSync(resolve(outDir, "fr", "index.html"), fr, "utf8");
    },
  };
}
