# SPEC_07: Triple Bento Landing (Refactor)

## 🎯 Objectif

Remplacer le bloc "Quick Access" actuel par une structure de trois blocs Bento indépendants et thématisés pour les catégories principales.

## 🛠 Détails Visuels

- **Structure :** Remplacer le conteneur unique par 3 cartes Bento cliquables.
- **Thématisation :**
  - **Bloc Réseau :** Accent Blue (#00D4FF), Icône `Wifi`, Titre "Network Infrastructure".
  - **Bloc Offensif :** Accent Red (#FF003C), Icône `Sword`, Titre "Offensive Operations".
  - **Bloc Défensif :** Accent Green (#00FF41), Icône `Shield`, Titre "Defensive Hardening".
- **Styles :** Chaque bloc doit posséder une bordure de 1px de sa couleur d'accent respective et un effet de lueur (glow) interne très léger.

## 🚀 Comportement (UX)

- **Hover Effect :** Au survol, la lueur s'intensifie et l'icône effectue une légère animation (ex: translation ou scale).
- **Navigation :** Redirige vers `/category/network`, `/category/offensive`, ou `/category/defensive`.

## 📜 Instructions pour l'IA

- "Supprime le composant Quick Access existant."
- "Implémente les trois nouveaux blocs en utilisant Framer Motion pour une entrée fluide (staggered fade-in)."
- "Utilise les couleurs d'accent définies dans le PROJECT_INSTRUCTION.md."
