# SPEC_09: Data Ingestion (PDF to MDX)

## 🎯 Objectif

Extraire l'intégralité du contenu du document `Pentesting.pdf` et le transformer en fiches techniques MDX prêtes à l'emploi.

## 📂 Mapping des Contenus (Sources)

[cite_start]Utiliser les chapitres identifiés dans le PDF[cite: 5, 7, 12]:

1. [cite_start]**OSINT :** Google Dorking [cite: 16][cite_start], WHOIS [cite: 34][cite_start], DNS Lookup[cite: 45].
2. [cite_start]**Network Scanning :** Nmap (Techniques de scan et états des ports)[cite: 143, 194].
3. [cite_start]**Exploitation :** Metasploit (Modules, Payloads, Commandes)[cite: 259, 264, 274].
4. [cite_start]**Proxy & Analyse :** Burp Suite (Repeater, Intruder, Decoder)[cite: 455, 488, 569].
5. [cite_start]**Web Vulnerabilities :** XSS, LFI/RFI, SQL Injection, Command Injection[cite: 778, 808, 852, 899, 915].

## 📝 Format des Fiches MDX

- **Frontmatter :** Title (FR), Category, Tags, Author (@loucas, @peran, ou @vladimir).
- **Structure :** - Introduction brève en français.
  - Blocs de commandes (English flags) avec le composant `CodeSnippet`.
  - Explications des mécanismes techniques en français.

## 📜 Instructions pour l'IA

- "Analyse le fichier `Pentesting.pdf` fourni."
- "Génère un fichier .mdx pour chaque sous-section majeure du PDF."
- [cite_start]"Assure-toi que les tableaux de types d'attaques (ex: Sniper, Pitchfork) sont convertis en tableaux Markdown propres ou composants React." [cite: 525, 537]
