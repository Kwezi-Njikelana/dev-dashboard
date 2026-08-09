# dev.dashboard

A live, single-page status board for a developer's public presence — built with **React + Vite + TypeScript + Tailwind CSS**. No backend, no API keys, no accounts. Just two free public APIs rendered as an blue-phosphor terminal.

![status](https://img.shields.io/badge/status-online-4db2ff?style=flat-square)

## What it shows

| Widget | Source | Notes |
|---|---|---|
| GitHub profile | [GitHub REST API](https://docs.github.com/en/rest/users/users) | avatar, bio, followers, join date |
| Top repositories | GitHub REST API | top 5 owned repos, sorted by stars |
| Language breakdown | GitHub REST API | computed client-side from repo languages |
| Weather | [Open-Meteo](https://open-meteo.com/en/docs) | uses browser geolocation, falls back to a default city, or type a city yourself |
| Git Zen | `api.github.com/zen` | a random line of GitHub's own design philosophy |

All APIs are free, keyless, and CORS-enabled for direct browser calls — nothing is proxied through a server.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Make it yours

- Type any GitHub username into the field under the header and hit **load**.
- Type a city into the weather widget's input to override geolocation.
- The default username lives in `src/App.tsx` (`DEFAULT_USERNAME`) — change it to your own so the page loads pre-filled when you deploy it.

## Build

```bash
npm run build
```

Outputs a static `dist/` folder — deploy it anywhere (GitHub Pages, Vercel, Netlify).

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v3
- Zero runtime dependencies beyond React — every widget is a small `fetch` + a custom hook
