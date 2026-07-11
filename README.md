# AN Subscriber Observability — List Panel Demo

Standalone Vite + React + TypeScript demo of an **AN Subscriber Experience** left list panel. No backend, no map, no private design-system packages — hardcoded data and Connect-like styling.

## Live URL (permanent)

Production (stays live; auto-redeploys on push to `main`):

**https://an-subscriber-list-demo.vercel.app**

Embed-ready:

- https://an-subscriber-list-demo.vercel.app/?embed=1
- https://an-subscriber-list-demo.vercel.app/?embed=1&theme=dark

Repo: https://github.com/ranakrishna26/an-subscriber-list-demo

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Embed in Framer

Use a **desktop / MacBook-sized** frame. The page looks like the browser: empty space around a centered 518×760 panel (not stretched, not cropped).

Recommended Framer frame size: **1440 × 900** (MacBook-like).

```html
<iframe
  src="https://an-subscriber-list-demo.vercel.app/?embed=1"
  title="AN Subscriber List"
  width="1440"
  height="900"
  style="border:0;width:1440px;height:900px;display:block;background:#f5f5f5;"
  loading="lazy"
></iframe>
```

Dark page chrome: `?embed=1&theme=dark` (and use a dark background on the iframe if you want).

Do **not** set the iframe to `width/height: 100%` of a small frame — that crops/zooms the UI. Size the Framer Embed to ~1440×900 so the full centered panel is visible.

## What you can try

1. Type in search — list filters in real time
2. Switch **Impacted subscribers** ↔ **Worst cells** — rows and placeholder change
3. Pick an impact type (Connectivity, etc.) — fewer rows and icons reorder
4. Click a worst cell — drill into subscribers in that cell (back returns to cells)
5. Click rows — selection highlight (`aria-selected`)
6. Scroll the list when it overflows
7. Toggle light/dark (non-embed) — or use `?theme=dark` in the iframe URL

## Project layout

```
src/
  demoData.ts              # types + hardcoded data + helpers
  SubscriberListDemo.tsx   # main panel
  App.tsx                  # page shell + embed/theme query params
  components/              # SegmentedControl, ImpactTypeFilter, rows, icons
  styles/listPanel.css     # Connect tokens + BEM styles
```
