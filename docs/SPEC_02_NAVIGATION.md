# SPEC_02: Navigation & Layout Système

## 🎯 Objectif

Créer une interface de navigation fluide et immersive qui permet de passer de la Landing Page aux différentes catégories de notes (Réseau, Attaque, Défense).

## 🛠 Étapes Techniques

### 1. Sidebar (Menu Latéral)

- Créer un composant `Sidebar` rétractable ou fixe à gauche (desktop).
- Liens de navigation : Accueil, Réseau, Offensif, Défensif, Outils.
- Design : Fond `#000000`, bordure droite `1px solid #1A1A1A`.
- Effet : L'élément actif doit avoir un texte blanc et une légère lueur bleue électrique sur la gauche.

### 2. Navbar (Barre Supérieure)

- Créer une `Navbar` avec effet `backdrop-blur` (Glassmorphism).
- Contenu : Logo à gauche (Icône Lucide `Shield`), Breadcrumbs au centre, et lien GitHub/Social à droite.

### 3. Layout Dynamique

- Configurer le `layout.tsx` pour que la Sidebar n'apparaisse pas sur la Landing Page (si on veut un effet plein écran) ou qu'elle soit persistante. _Conseil : Utilise des Route Groups `(dashboard)` dans Next.js._

## 💡 Instructions pour l'IA

- "Utilise `lucide-react` pour toutes les icônes."
- "Assure-toi que la navigation est parfaitement responsive : Menu Drawer (burger) sur mobile."
