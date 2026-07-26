# Portfolio Website

My personal portfolio, built in React and deployed to GitHub Pages.

**Live:** [cansahin.dev](https://cansahin.dev)

## Stack

- React 19 with Vite 7
- Tailwind CSS for all styling
- Framer Motion for animation and layout transitions
- Hand-written WebGL for the particle hero, plus [ogl](https://github.com/oframe/ogl) for the aurora background
- Formspree for the contact form

## What's in it

**Bilingual EN/FR.** A language toggle swaps the whole site. English copy lives in `src/constants/index.js`, French in `src/translations.js`, and `src/context/LanguageContext.jsx` holds the current language.

**Particle hero.** The hero animation is a WebGL point cloud that morphs between shapes and reacts to the cursor. It runs on a raw `webgl` context with GLSL shaders I wrote by hand, no 3D library. When the browser supports `transferControlToOffscreen`, the whole render loop moves to a Web Worker so scrolling stays smooth, and it falls back to the main thread when it doesn't.

**An interactive terminal.** Bottom-right corner, draggable, and double-clicking the title bar maximizes it. `help` lists the commands it admits to, including three playable games (dino, snake, breakout). There are several it doesn't list, so have a poke around. It's desktop only: `Terminal.jsx` returns `null` when `(hover: none)` matches, so touch devices never load it.

**Sections.** Hero, experience timeline, tech, projects, contact.

## Running it

```bash
npm install
npm run dev
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output |
| `npm run lint` | ESLint |

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds on Node 24 and publishes to GitHub Pages. The custom domain is set through `CNAME`.
