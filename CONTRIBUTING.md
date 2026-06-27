# 🤝 Contributing to Moe Kyaw Aung — Flutter Portfolio Pro Max V2

Thank you for your interest in contributing! This document outlines the guidelines for contributing to this portfolio project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Contact](#contact)

---

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and professional environment. We follow the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

**Expected behavior:**
- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy toward other contributors

---

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- A code editor (VS Code recommended)
- Basic knowledge of HTML5, CSS3, and vanilla JavaScript
- Git installed on your machine
- A GitHub account

### Fork & Clone

```bash
# 1. Fork the repository on GitHub
# Click the "Fork" button at the top right of the repo page

# 2. Clone your fork locally
git clone https://github.com/YOUR-USERNAME/flutter-portfolio-v2.git

# 3. Navigate into the project
cd flutter-portfolio-v2

# 4. Add the upstream remote
git remote add upstream https://github.com/moekyawaung/flutter-portfolio-v2.git

# 5. Verify remotes
git remote -v
```

---

## 🛠️ Development Setup

This is a **single-file HTML project** — no build tools required!

```bash
# Option A: VS Code Live Server (recommended)
# 1. Install the "Live Server" extension in VS Code
# 2. Right-click index.html → "Open with Live Server"
# 3. Visit http://127.0.0.1:5500

# Option B: Python simple server
python3 -m http.server 8080
# Visit http://localhost:8080

# Option C: Node.js serve
npx serve .
# Visit http://localhost:3000
```

> ⚠️ **Important:** Always serve from a local server (not `file://`) to test Service Workers and PWA features correctly.

### Testing PWA Features

```bash
# Test Service Worker registration
# Open DevTools → Application → Service Workers

# Test PWA installability
# Open DevTools → Application → Manifest
# Look for "Add to Home Screen" prompt

# Run Lighthouse PWA audit
# DevTools → Lighthouse → PWA → Generate report
```

---

## 💡 How to Contribute

### Types of Contributions Welcome

| Type | Description |
|------|-------------|
| 🐛 Bug Fix | Fix broken layouts, JS errors, animation glitches |
| ✨ Enhancement | Improve existing features, performance, or UX |
| 📱 Responsive | Fix mobile/tablet layout issues |
| ♿ Accessibility | Improve ARIA labels, keyboard navigation, contrast |
| 🌐 i18n | Add Burmese (Myanmar) language support |
| 📝 Docs | Improve README, comments, or documentation |
| ⚡ Performance | Optimize animations, reduce paint, improve FPS |
| 🔒 Security | Fix CSP headers, XSS vulnerabilities |

### What NOT to Submit

- Complete portfolio redesigns (this is a personal brand)
- Replacing real personal data (GitHub accounts, certificates, contacts)
- Adding external dependencies or npm packages
- Changes that break existing PWA functionality
- Content unrelated to the portfolio purpose

---

## 🌿 Branch Naming Convention

```bash
# Bug fixes
git checkout -b fix/cursor-trail-mobile
git checkout -b fix/skill-bar-animation

# Features / Enhancements
git checkout -b feat/dark-mode-transitions
git checkout -b feat/section-progress-indicator

# Documentation
git checkout -b docs/update-deploy-guide

# Performance
git checkout -b perf/reduce-particle-count-mobile

# Accessibility
git checkout -b a11y/keyboard-nav-improvements
```

---

## 📝 Pull Request Process

### Step-by-Step

```bash
# 1. Sync with upstream before starting work
git fetch upstream
git checkout main
git merge upstream/main

# 2. Create your feature branch
git checkout -b feat/your-feature-name

# 3. Make your changes
# Edit index.html, sw.js, manifest.json, etc.

# 4. Test thoroughly
# - Chrome, Firefox, Safari, Edge
# - Mobile viewport (375px, 390px, 414px)
# - Tablet viewport (768px, 1024px)
# - PWA install flow
# - Offline mode
# - Dark/Light mode toggle
# - All animations and interactions

# 5. Commit with a clear message
git add .
git commit -m "feat: add section progress indicator to navbar"

# 6. Push to your fork
git push origin feat/your-feature-name

# 7. Open a Pull Request on GitHub
# Go to your fork → "Compare & pull request"
```

### PR Title Format

```
type(scope): short description

Examples:
feat(hero): add parallax mouse effect to phone mockup
fix(mobile): correct hamburger menu z-index overlap
perf(particles): reduce particle count on small screens
docs(readme): add Vercel deployment instructions
a11y(nav): add keyboard focus indicators
style(certs): improve marquee animation smoothness
```

### PR Description Template

```markdown
## What does this PR do?
Brief description of the changes.

## Type of change
- [ ] Bug fix
- [ ] New feature / Enhancement
- [ ] Performance improvement
- [ ] Accessibility improvement
- [ ] Documentation update

## Screenshots / Demo
<!-- Add before/after screenshots if visual changes -->

## Tested on
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop / iOS)
- [ ] Edge (Desktop)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Checklist
- [ ] My code follows the existing style
- [ ] I tested PWA functionality still works
- [ ] No console errors introduced
- [ ] Responsive at 375px, 768px, 1280px
- [ ] Dark mode and Light mode both work
```

---

## 🎨 Coding Standards

### CSS

```css
/* ✅ Good — use design system variables */
.my-element {
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 0.2s, transform 0.2s;
}

/* ❌ Bad — hardcoded values */
.my-element {
  background: #162035;
  color: #EEF2FF;
  border: 1px solid rgba(0,212,255,0.1);
}
```

```css
/* ✅ Use rem/em for typography */
font-size: 0.85rem;

/* ✅ Use CSS custom properties for colors */
color: var(--cyan);

/* ✅ Mobile-first media queries */
@media (min-width: 768px) { ... }

/* ✅ Prefer transform/opacity for animations (GPU composited) */
transform: translateY(-4px);
opacity: 0.8;

/* ❌ Avoid animating layout properties */
/* top, left, width, height, margin, padding */
```

### JavaScript

```javascript
// ✅ Use const/let, never var
const observer = new IntersectionObserver(...);
let counter = 0;

// ✅ Use passive event listeners for scroll/touch
window.addEventListener('scroll', handler, { passive: true });

// ✅ Prefer arrow functions for callbacks
document.querySelectorAll('.card').forEach(el => {
  el.addEventListener('click', () => { ... });
});

// ✅ Guard against missing elements
const el = document.getElementById('my-element');
if (el) el.classList.add('visible');

// ❌ Avoid blocking the main thread
// Don't use synchronous XHR, alert() in production, etc.
```

### HTML

```html
<!-- ✅ Always include ARIA labels on interactive elements -->
<button aria-label="Toggle dark mode" id="themeBtn">🌙</button>

<!-- ✅ Use semantic HTML -->
<section id="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About</h2>
</section>

<!-- ✅ Alt text on all images -->
<img src="avatar.jpg" alt="Moe Kyaw Aung, Senior Android Developer" />
```

### Comments

```javascript
/* ── SECTION NAME ── */   // Major sections (use this style)
// Single line comment     // Minor explanations
```

---

## 🐛 Reporting Bugs

When reporting a bug, please include:

1. **Browser & version** (e.g., Chrome 124, iOS Safari 17)
2. **Device & OS** (e.g., iPhone 14 Pro, Windows 11)
3. **Screen size** (e.g., 390×844)
4. **Steps to reproduce**
5. **Expected behavior**
6. **Actual behavior**
7. **Screenshots or screen recording** (if applicable)
8. **Console errors** (DevTools → Console)

**Open a bug report:** [GitHub Issues](https://github.com/moekyawaung/flutter-portfolio-v2/issues/new?template=bug_report.md)

---

## ✨ Feature Requests

Have an idea? Open a Feature Request issue with:

1. **Problem statement** — What problem does this solve?
2. **Proposed solution** — How should it work?
3. **Alternatives considered** — Other approaches you thought of
4. **Visual mockup** — Wireframe, sketch, or reference (optional but helpful)

**Open a feature request:** [GitHub Issues](https://github.com/moekyawaung/flutter-portfolio-v2/issues/new?template=feature_request.md)

---

## 📬 Contact

For questions about contributing, reach out directly:

| Platform | Link |
|----------|------|
| 📧 Email | moekyawaung@gmail.com |
| 💼 LinkedIn | [linkedin.com/in/moekyawaung](https://linkedin.com/in/moekyawaung) |
| 🐙 GitHub | [github.com/moekyawaung](https://github.com/moekyawaung) |
| 🦋 Bluesky | [@moekyawaung.bsky.social](https://bsky.app/profile/moekyawaung.bsky.social) |
| 📱 Telegram | [@moekyawaung](https://t.me/moekyawaung) |

---

## 🙏 Recognition

All contributors will be acknowledged in the project's README under a **Contributors** section. Your GitHub username and contribution type will be listed.

---

*Thank you for helping make this portfolio better! Every contribution, no matter how small, is valued and appreciated.* 🐦✨

**— Moe Kyaw Aung · Tachileik, Myanmar 🇲🇲**
