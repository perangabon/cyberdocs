# SPEC_08: Modern Grid Listing (Pages Catégories)

## 🎯 Objectif

Créer une interface de navigation moderne pour explorer les notes de chaque catégorie sans utiliser de listes textuelles classiques.

## 🛠 Architecture de la Page

- **Route :** `/category/[slug]/page.tsx`
- **Header :** Titre de la catégorie en grand (Anglais) avec une brève description (Français).
- **Le Listing (Grid) :** Une grille de "Note Cards" (mini-blocs) organisée de façon aérée.

## 📦 Composant "Note Card"

Chaque carte de note doit contenir :

- **Top :** Une icône d'outil (ex: icône `Database` pour SQL Injection).
- **Center :** Titre de la note (Français).
- **Bottom :** Badges technologiques (ex: #Web, #Exploit) et indicateur de complexité.
- **Hover :** Un résumé de 2 lignes de la note apparaît ou la carte s'illumine.

## 📜 Instructions pour l'IA

- "Utilise un système de filtrage automatique basé sur les tags des fichiers MDX."
- "Les cartes doivent avoir le même style 'Engineering' que la Landing Page : noir pur, bordures fines, typographie Geist Sans."
- "Ajoute une animation de 'Layout' via Framer Motion pour que les cartes se réorganisent joliment si on change de filtre."
