# Chandan Satapathy — Personal Portfolio

A personal portfolio site built with **React + Vite**, styled with **Tailwind CSS**, and hosted on **GitHub Pages**. Content is editable via a built-in Admin panel that commits changes directly to this repo via the GitHub API.

## Live Site

→ https://chandan-satapathy.github.io

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS + CSS variables |
| Build | Vite |
| Hosting | GitHub Pages |
| CMS | GitHub Contents API (admin panel → git commit) |
| Blog format | Markdown (react-markdown) |

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/chandan-satapathy/chandan-satapathy.github.io
cd chandan-satapathy.github.io
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_GITHUB_TOKEN=ghp_your_pat_here
VITE_GITHUB_REPO=chandan-satapathy/chandan-satapathy.github.io
VITE_ADMIN_TOKEN=your-secret-admin-password
```

**Creating a GitHub PAT:**
1. Go to GitHub → Settings → Developer Settings → Personal access tokens → Fine-grained tokens
2. Grant **Read & Write** access to **Contents** for this repository
3. Copy the token into `VITE_GITHUB_TOKEN`

### 3. Run locally

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

---

## Deployment (GitHub Pages)

### Automatic (recommended)

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys on every push to `main`.

**One-time setup:**
1. Go to your repo → **Settings → Pages**
2. Set source to **GitHub Actions**
3. Go to **Settings → Secrets and variables → Actions** and add:
   - `VITE_GITHUB_TOKEN`
   - `VITE_GITHUB_REPO`
   - `VITE_ADMIN_TOKEN`

Push to `main` → site deploys automatically.

---

## Content Editing

### Resume / Homepage

Edit `src/data/resume.json` directly, or use the **Admin panel** at `/admin`.

### Adding Blog Posts

**Via Admin panel (recommended):**
1. Navigate to `/admin`
2. Enter your admin token
3. Fill in title, slug, and markdown content
4. Click "Publish & Deploy" — this commits to GitHub and triggers a redeploy

**Via file:**
- Add an entry to `src/data/blogs.json`
- Optionally create `src/data/blogs/<slug>.md` for full content

### Theme

Two themes are built in:
- **Dark** (default): near-black background, crimson red + gold yellow accents
- **Light**: warm paper background, red + black

Toggle with the button in the top-right corner. Preference is saved to `localStorage`.

---

## Project Structure

```
/
├── .github/workflows/deploy.yml   GitHub Actions deploy pipeline
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             Sticky nav with scroll behaviour
│   │   └── ScrollReveal.jsx       Intersection Observer reveal wrapper
│   ├── data/
│   │   ├── resume.json            All resume content (edit this)
│   │   └── blogs.json             Blog posts index
│   ├── pages/
│   │   ├── Home.jsx               Hero + metrics
│   │   ├── Work.jsx               Tabbed resume view
│   │   ├── Blogs.jsx              Blog list + detail
│   │   └── Admin.jsx              Auth-gated admin panel
│   ├── utils/
│   │   ├── auth.js                Token-based auth (sessionStorage)
│   │   ├── github.js              GitHub Contents API integration
│   │   └── useReveal.js           Scroll reveal hook
│   ├── App.jsx                    Router + theme provider
│   ├── main.jsx                   Entry point
│   └── index.css                  Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
└── .env.example                   Copy to .env and fill in secrets
```

---

## Security Notes

- `.env` is in `.gitignore` — secrets are never committed
- The Admin token lives only in `sessionStorage` (cleared on tab close)
- GitHub PAT should have minimal scopes (Contents read/write on this repo only)
- For production, consider upgrading to GitHub OAuth for stronger auth
