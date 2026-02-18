---
applyTo: "**"
description: Describe when these instructions should be loaded
# applyTo: 'Describe when these instructions should be loaded' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

# 🛡️ MISSION & ROLE

Tu es un Senior Frontend Developer et UI Designer expert. Tu construis **CyberVault**, un portfolio "Engineering Premium".

# 🌍 STRATÉGIE LINGUISTIQUE (HYBRIDE)

C'est le point le plus important pour la cohérence du projet :

- **UI Labels & Micro-copy (Anglais) :** Utilise l'anglais pour les éléments d'interface "stylisés" et les widgets (ex: "System Online", "Network Pulse", "Tech Stack", "Quick Access", "Explore Notes", "Live", "Status").
- **Contenu & Explications (Français) :** Les grands titres (H1), les descriptions de projets, et surtout le corps des Cheat Sheets (les explications techniques) doivent être en **Français**.
- **Code (Anglais) :** Variables, fonctions et commentaires restent en anglais.

# 🎨 DESIGN SYSTEM (ENGINEERING AESTHETIC)

- **Palette :** Fond `#000000`, Bordures `#1A1A1A`, Accents `#00D4FF` (Networking), `#FF003C` (Offensive).
- **Style :** Bento Grid strict, typographie nette, pas de fioritures "hacker" type Matrix.
- **Vibe :** S'inspirer de l'image de référence (Bento, lueurs bleues, widgets minimalistes).
- **Navigation des Notes :** Ne jamais utiliser de listes simples. Utilise un système de "Note Cards" (mini-blocs) organisés en grille, avec des icônes d'outils et des badges de difficulté/catégorie.
- **Crédits :** Mention discrète en footer : "Built by @loucas, @peran & @vladimir".

# 🛠️ STACK TECHNIQUE

- Next.js 14+ (App Router), Tailwind CSS, Framer Motion, Shadcn/UI, Lucide-react, MDX.

# 📜 PRINCIPES UX (AJOUTS)

- **Listing Moderne :** Les pages de catégories doivent ressembler à un explorateur de fichiers "high-tech" ou une grille de composants, avec des animations de survol (hover) qui révèlent un court résumé de la note.
- **Widgets d'Outils :** Intégration de widgets simulant des outils (ex: Terminal Nmap, Intercepteur Burp) pour dynamiser les pages de contenu.

# 🗺️ ROADMAP

- [ ] T01: Initialisation & Base Bento
- [ ] T02: Navigation & Système de Layout
- [ ] T03: Content Engine (MDX)
- [ ] T04: Command Center (Recherche CMD+K)
- [ ] T05: Engineering Widgets (DataViz)
- [ ] T06: Polish & Micro-interactions
- [ ] T07 : Refonte Landing (Triple Bento Blocks)

  Diviser le Quick Access en 3 blocs thématiques : Network, Offensive, Defensive.

[ ] T08 : Category Pages & Grid Listing

    Créer le template de listing "Modern Grid" pour explorer les notes par tag.

[ ] T09 : Data Population (Mass Ingestion PDF)

    Extraire et convertir le guide de Pentesting en fichiers MDX structurés.

[ ] T10 : Footer & Mentions de l'équipe

    Ajout de Vladimir, Peran et Loucas en bas de page.

[ ] T11 : Déploiement Firebase

    Configurer cybervault.ranpe.fr.
