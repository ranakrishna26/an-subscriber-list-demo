# AN Subscriber Observability — List Panel Demo

Standalone Vite + React + TypeScript demo of an **AN Subscriber Experience** left list panel. No backend, no map, no private design-system packages — hardcoded data and Connect-like styling.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Permanent hosting (GitHub + Vercel)

Push this repo to GitHub, then import it in [Vercel](https://vercel.com) as a **production** project (not a one-off preview). Production `*.vercel.app` URLs stay live until you delete the project.

1. Create a public GitHub repo named `an-subscriber-list-demo`
2. Push `main`
3. Vercel → **Add New Project** → import the repo
4. Build command: `npm run build` · Output: `dist`
5. Deploy

After deploy, your stable URL looks like:

`https://an-subscriber-list-demo.vercel.app`

## Embed in Framer

Use the **production** URL with embed params:

```
https://YOUR-PROJECT.vercel.app/?embed=1
https://YOUR-PROJECT.vercel.app/?embed=1&theme=dark
```

- `embed=1` — hides the theme toggle, fills the iframe, removes page chrome
- `theme=dark` or `theme=light` — sets Connect tokens (default light)

In Framer, add an **Embed** and paste:

```html
<iframe
  src="https://YOUR-PROJECT.vercel.app/?embed=1"
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
