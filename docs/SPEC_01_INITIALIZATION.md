# SPEC_01: Initialisation & Bento Foundation

## 🎯 Objectif

Mettre en place l'environnement de développement et créer la structure visuelle de la page d'accueil avec une Bento Grid respectant le style "Premium SaaS".

## 🛠 Étapes Techniques

### 1. Setup du Projet

- Installer Next.js (dernière version) avec TypeScript, ESLint, et Tailwind CSS.
- Installer les dépendances : `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`.
- Initialiser **Shadcn/UI** (`npx shadcn-ui@latest init`).
  - Style: New York
  - Base Color: Slate
  - CSS Variables: Yes

### 2. Configuration Tailwind & Design System

Modifier `tailwind.config.js` pour inclure :

- `colors`:
  - `brand-blue`: `#00D4FF`
  - `brand-border`: `#1A1A1A`
  - `brand-bg`: `#000000`
- Configurer une animation de "border-beam" ou de "glow" subtile.

### 3. Layout de Base (`app/layout.tsx`)

- Appliquer la classe `bg-black text-white` au body.
- Ajouter un composant `BackgroundGrid` : une grille de points (`dot-pattern`) grise très sombre (opacity 0.1) fixe en arrière-plan.

### 4. La Bento Grid (Landing Page)

Sur `app/page.tsx`, créer une grille responsive (cols-1 en mobile, cols-4 en desktop) avec un gap de 6 (24px).

- **Bloc 1 (Span 2x2) - Welcome:** Titre "CyberVault" en dégradé de blanc, petite description de l'expertise, et un bouton avec une bordure animée.
- **Bloc 2 (Span 2x1) - Network Pulse:** Un graphique de ligne animé (SVG/Framer Motion) simulant un trafic réseau en temps réel (couleur #00D4FF).
- **Bloc 3 (Span 1x1) - Status:** Un badge pulsant vert "System Online - Secure Connection".
- **Bloc 4 (Span 1x1) - Tech Stack:** Une liste d'icônes minimalistes des outils utilisés.
- **Bloc 5 (Span 2x1) - Quick Access:** Liens vers les catégories Réseau, Offensif, Défensif.

## 💡 Instructions pour l'IA

- "Utilise un style minimaliste : pas d'ombres portées lourdes, utilise uniquement des bordures de 1px `#1A1A1A`."
- "Assure-toi que chaque bloc a un léger effet de lueur (radial-gradient) qui suit la souris si possible, ou reste statique et élégant."
- "Toutes les polices doivent être nettes et professionnelles."
