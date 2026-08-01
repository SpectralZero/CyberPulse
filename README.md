# 🛡️ CyberPulse — Real-Time Threat Intelligence Dashboard

A zero-cost, open-source threat intelligence dashboard that aggregates top IT security news, CVEs, exploits, and security tool releases from 14+ sources in real-time. Built for Red & Blue team operators.

**[🚀 Live Demo →](https://spectralzero.github.io/CyberPulse/)**

![CyberPulse Dashboard](https://img.shields.io/badge/CyberPulse-v1.0-00e5ff?style=for-the-badge&logo=shield&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-ff2d78?style=for-the-badge)
![Cost](https://img.shields.io/badge/Cost-%240-39ff14?style=for-the-badge)

---

## ⚡ Features

### Core
- 📡 **14 threat intel sources** — RSS feeds + GitHub API, fetched in parallel
- 🔄 **Auto-refresh** — configurable intervals (15m / 30m / 1h / 2h) with countdown ring
- 🧠 **Smart classification** — AI-powered severity (Critical/High/Medium/Info) & category tagging
- 📺 **Live ticker** — breaking news marquee with severity dots

### Data Sources
| Source | Type | Focus |
|--------|------|-------|
| The Hacker News | RSS | Breaking cyber news |
| BleepingComputer | RSS | Malware, ransomware |
| Krebs on Security | RSS | Investigations |
| CISA Advisories | RSS | Gov alerts |
| Dark Reading | RSS | Enterprise security |
| SecurityWeek | RSS | Industry news |
| Schneier on Security | Atom | Crypto & policy |
| SANS ISC | RSS | Daily handlers diary |
| Cisco Talos | Atom | Threat research |
| WeLiveSecurity | RSS | ESET research |
| Naked Security | RSS | Sophos analysis |
| GitHub Advisories | API | CVE disclosures |
| GitHub Trending | API | New hacking tools |

### UI & UX
- 🎨 **3 themes** — Dark (cyberpunk), Light, Hacker (matrix green)
- 🔍 **Instant search** — filter as you type across all articles
- 📂 **7 category tabs** — All / News / CVEs / Tools / Malware / Breaches / Advisories
- 🎚️ **Advanced filters** — by severity, time range, sort order
- 📋 **Card & list views** — toggle between layouts
- ✨ **Glassmorphic design** — frosted glass panels, neon accents, particle background
- 📱 **Responsive** — works on desktop, tablet, and mobile

### Productivity
- ⭐ **Bookmarks** — save articles, persisted in localStorage
- 📖 **Read tracking** — visual dimming for read articles
- 📋 **Copy links** — one-click clipboard copy
- 📤 **Export** — download bookmarks as JSON
- 🔔 **Desktop notifications** — browser alerts for critical threats
- ⌨️ **Keyboard shortcuts** — j/k navigate, s save, o open, / search, r refresh, t theme

---

## 🚀 Deploy to GitHub Pages (Free)

### Quick Start

```bash
# 1. Clone or download this repo
git clone https://github.com/yourusername/cyberpulse.git
cd cyberpulse

# 2. Push to GitHub
git init
git add .
git commit -m "Initial release"
git remote add origin https://github.com/yourusername/cyberpulse.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to Settings → Pages → Source: Deploy from branch → main → / (root) → Save
```

Your dashboard will be live at `https://yourusername.github.io/cyberpulse/` within minutes.

### Local Development

Just open `index.html` in your browser. No build step, no npm, no Node.js needed.

For local server (recommended for CORS testing):
```bash
npx -y http-server . -p 8888 -c-1 --cors
# Open http://localhost:8888
```

---

## 🏗️ Architecture

```
cyberpulse/
├── index.html          # Main HTML structure (semantic, SEO-optimized)
├── css/
│   └── styles.css      # Complete design system (3 themes, animations)
├── js/
│   └── app.js          # Application engine (zero dependencies)
└── README.md
```

**Zero dependencies.** Pure HTML5 + CSS3 + ES6 JavaScript. No npm, no build tools, no frameworks.

### How it works
1. RSS feeds are fetched via CORS proxy chain (`corsproxy.io` → fallback)
2. GitHub API is called directly (native CORS support)
3. XML/Atom feeds are parsed using browser's built-in `DOMParser`
4. Articles are classified by severity and category using keyword matching
5. Results are cached in `localStorage` with TTL for performance
6. UI renders dynamically with staggered animations

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `J` | Next article |
| `K` | Previous article |
| `O` / `Enter` | Open selected article |
| `S` | Bookmark selected |
| `R` | Refresh feeds |
| `/` | Focus search |
| `T` | Cycle theme |
| `B` | Toggle bookmarks |
| `G` | Go to top |
| `1`–`7` | Switch category tab |
| `?` | Show shortcuts |
| `Esc` | Close modal |

---

## 📄 License

MIT License. Free to use, modify, and distribute.

---

Built with ❤️ for the cybersecurity community. No API keys. No subscriptions. Just pure threat intelligence.
