# SPEC_03: Content Engine (MDX & Notes)

## 🎯 Objectif

Transformer des fichiers Markdown simples en pages de notes ultra-stylisées et interactives.

## 🛠 Étapes Techniques

### 1. Setup MDX

- Installer `@next/mdx` ou une solution plus flexible comme `contentlayer2` ou `next-mdx-remote`.
- Créer un dossier `/content` où seront stockés les fichiers `.mdx`.

### 2. Custom Components MDX

Créer des composants React à utiliser dans le Markdown :

- `CheatSheetCode` : Bloc de code avec bouton de copie et titre du fichier.
- `TechBadge` : Badge coloré pour les flags (ex: `-p` pour port).
- `NetworkDiagram` : Un placeholder pour insérer des schémas.

### 3. Coloration Syntaxique

- Intégrer `Rehype-pretty-code` ou `Shiki` avec un thème "Dark Plus" ou "Tokyo Night" pour une esthétique pro.

## 💡 Instructions pour l'IA

- "Le design des notes doit être très aéré. Utilise une typographie impeccable."
- "Implémente une fonction 'Table des matières' (TOC) automatique à droite de chaque note."
