# SPEC_04: Command Center (Recherche CMD+K)

## 🎯 Objectif

Implémenter une barre de recherche ultra-rapide et esthétique, accessible via un raccourci clavier, pour naviguer instantanément dans les notes.

## 🛠 Étapes Techniques

- **Composant :** Utiliser `Command` de Shadcn/UI (basé sur `cmdk`).
- **Interface :** - Titre du widget : "Command Center".
  - Placeholder : "Search for a vulnerability, tool, or protocol..."
- **Fonctionnalités :** - Groupement des résultats par catégories (Réseau, Attaque, Défense).
  - Raccourci `CMD+K` (Mac) ou `CTRL+K` (Windows).
  - Floutage du fond (Backdrop blur) lors de l'ouverture.

## 💡 Instructions pour l'IA

- "L'interface doit être épurée. Les résultats de recherche doivent avoir des icônes correspondant à leur catégorie."
