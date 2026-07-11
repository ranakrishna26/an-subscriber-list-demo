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

Make the iframe fill the Framer frame (100% × 100%). The panel stretches to match.

```html
<iframe
  src="https://an-subscriber-list-demo.vercel.app/?embed=1"
  title="AN Subscriber List"
  style="border:0;width:100%;height:100%;display:block;background:transparent;"
  loading="lazy"
></iframe>
```

In Framer: size the Embed/Frame to whatever you want — the UI fills that box. Dark: add `&theme=dark` to the URL.

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
