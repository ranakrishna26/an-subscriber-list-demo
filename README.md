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

```html
<iframe
  src="https://an-subscriber-list-demo.vercel.app/?embed=1"
  title="AN Subscriber List"
  width="518"
  height="760"
  style="border:0;border-radius:8px;overflow:hidden;background:transparent;"
  loading="lazy"
></iframe>
```

Size the Framer frame to about **518 × 760**.

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
