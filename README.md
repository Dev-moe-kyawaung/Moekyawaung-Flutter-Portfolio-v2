# 🐦 Moe Kyaw Aung — Flutter Portfolio Pro Max V2
### Senior Android & Flutter Engineer · Tachileik, Myanmar 🇲🇲
### Obsidian × Cyan × Gold Design System

---

## 🚀 GitHub Pages — Quick Deploy (3 Steps)

### Step 1 — Create Repository
```
Option A (root domain):   your-username.github.io
Option B (subpath):       moe-portfolio-v2
```

### Step 2 — Upload These Files
```
flutter-portfolio-v2/
├── index.html        ← Main portfolio (upload this)
├── manifest.json     ← PWA manifest (upload this)
├── sw.js             ← Service Worker (upload this)
├── icon-192.png      ← App icon 192×192 (create + upload)
└── icon-512.png      ← App icon 512×512 (create + upload)
```

### Step 3 — Enable GitHub Pages
```
Repo → Settings → Pages
→ Source: Deploy from a branch
→ Branch: main / (root)
→ Save
→ Wait 60s → Visit https://your-username.github.io
```

---

## 📱 PWA Install Flow

### Android (Chrome):
1. Visit your GitHub Pages URL
2. Banner appears after 4 seconds → tap **Install**
3. OR: ⋮ Menu → **Add to Home Screen**

### iOS (Safari):
1. Open in Safari
2. Tap **Share** → **Add to Home Screen** → **Add**

### Desktop (Chrome / Edge):
1. Click the ⊕ icon in the address bar
2. Click **Install**

---

## 🎨 Create PWA Icons (Free)

### Option A — Favicon Generator
1. Go to https://realfavicongenerator.net
2. Upload a 512×512 Flutter logo PNG
3. Download package → rename:
   - `android-chrome-192x192.png` → `icon-192.png`
   - `android-chrome-512x512.png` → `icon-512.png`

### Option B — Quick Flutter Logo SVG → PNG
Use https://squoosh.app or https://cloudconvert.com

### Option C — Create a simple placeholder:
Any solid 192×192 and 512×512 image named `icon-192.png` and `icon-512.png` works.

---

## 🌐 Custom Domain Setup

```bash
# 1. Create CNAME file in repo root:
echo "moekyawaung.dev" > CNAME

# 2. DNS Settings (at your registrar):
CNAME  www   →  your-username.github.io
A      @     →  185.199.108.153
A      @     →  185.199.109.153
A      @     →  185.199.110.153
A      @     →  185.199.111.153

# 3. GitHub → Settings → Pages → Custom domain → Save
# 4. Check "Enforce HTTPS"
```

---

## ✏️ Customization Checklist

| Item | Location in index.html |
|------|----------------------|
| Photo | `about-avatar-fallback` → add `<img>` tag |
| Email | Search `moekyawaung@gmail.com` |
| LinkedIn URL | Search `linkedin.com/in/moekyawaung` |
| GitHub accounts | `#github` section |
| Project links | `href="#"` in project cards |
| Certificates | `#certs` section |

---

## ⚡ V2 Features

| Feature | Status |
|---------|--------|
| Obsidian × Cyan × Gold design system | ✅ |
| Multi-layer noise texture overlay | ✅ |
| Animated particle canvas (mouse-reactive) | ✅ |
| Flutter Widget Inspector phone mockup | ✅ |
| Cinematic hero with gradient headline | ✅ |
| Custom tri-layer cursor (dot + ring + trail) | ✅ |
| Scroll progress bar | ✅ |
| Preloader with counter | ✅ |
| Typing animation (8 roles) | ✅ |
| Animated stat counters | ✅ |
| Animated skill bars | ✅ |
| Dual-direction cert marquee | ✅ |
| Glass morphism cards | ✅ |
| Navbar auto-hide on scroll | ✅ |
| Dark / Light mode toggle | ✅ |
| Mobile hamburger menu | ✅ |
| PWA install toast | ✅ |
| Advanced Service Worker (v5 strategies) | ✅ |
| Background sync support | ✅ |
| Push notification handler | ✅ |
| Scroll reveal animations | ✅ |
| Floating device badges | ✅ |
| Sticky hire me + scroll-top | ✅ |
| Contact form → mailto | ✅ |
| 43 GitHub accounts grid | ✅ |
| 82+ Certificates (marquee + grid) | ✅ |
| Fully responsive (mobile-first) | ✅ |

---

## 🔧 Service Worker Cache Strategies

| Asset Type | Strategy |
|-----------|---------|
| HTML pages | Stale-While-Revalidate |
| JS / CSS | Cache-First |
| Google Fonts | Cache-First (long-lived) |
| Images / Cloudinary | Cache-First |
| External APIs | Network-First |
| Offline fallback | `/index.html` |

---

Built with 🐦 Flutter Spirit · Obsidian × Cyan × Gold
© 2026 Moe Kyaw Aung · Senior Android & Flutter Engineer

