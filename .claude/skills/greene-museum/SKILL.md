---
name: greene-museum
description: >-
  Use when working on ANY Greene Museum repository — greene-halls (public),
  Greene-Paleogenomic-Museum-VR (the full build), or greene-museum-offline
  (the offline bundle). Covers authoring or editing a hall, adding an exhibit
  or painting, wiring the layout map, and — above all — keeping the three
  repos consistent as the museum scales. Read this before adding or moving a
  hall, so a change lands in every place it needs to.
---

# The Greene Museum — Keeper's Skill

A single museum lives across three Git repos. This skill is the system of record
for *what the museum is*, *what exists today*, and *the rules that keep the three
repos in sync*. When in doubt, follow the invariants and the propagation matrix
below rather than improvising.

> This is the cross-repo Claude Code skill. The deeper, single-file editing
> ritual for the 10 MB museum HTML (Nessie/Argos, surgical patching) lives in
> `curator/museum-curator-SKILL.md` in the Paleo repo — defer to it for edits
> *inside* `The Greene Paleogenomic Museum VR.html`.

---

## 1 · Goal / North Star

A walkable, self-contained **digital temple** — paleogenomics, sacred geometry,
acoustics/cymatics, theology, natural philosophy, and human potential — that
anyone can open in a browser, phone, or VR headset with **no install, no login,
no account, nothing leaving the machine**. It must feel native, reverent, and
premium (Apple-launch-demo polish), and it must stay **honest** (see §3).

Every hall is a **single self-contained HTML file** that runs on its own. The
museum is the sum of these halls, presented three ways for three audiences.

---

## 2 · The three repositories (roles & system of record)

| Repo | Role | Audience | Three.js | Build tooling |
|---|---|---|---|---|
| **`greene-halls`** | Public hosted halls, served over GitHub Pages so the museum can open them at a real `https://` URL. The **authoring home** for new standalone halls. | Public | r160 from **CDN** | None — pure static |
| **`Greene-Paleogenomic-Museum-VR`** | The **full build**: the 10 MB walkable museum + the `works/` vault + gallery + layout map. Halls become Theology-Wing monument-portals here. | Personal / showcase | museum is **r128 inlined**; halls use r160 (local `vendor/`) | `scripts/*` + `npm run verify` + CI |
| **`greene-museum-offline`** | A **zero-network** bundle of the museum + halls for private, fully-offline use (runs from a tiny local server). | Personal / offline | r128 inline museum; halls r160 from **local `vendor/`** | regenerated bundle |

**How they relate.** The museum's Codex Hall links *heavy* halls (those that fetch
`.glb/.fbx/.mp3`) out to their hosted `greene-halls` URLs, and *embeds* the
self-contained ones as blobs. The offline bundle replaces every hosted link with
a local copy and vendors Three.js by path, so it makes **zero** network requests.

---

## 3 · Invariants — never break these

1. **Single-file halls.** Each hall is one `.html` with embedded CSS/JS. No build
   step required to open it. Preserve self-containment unless a hall genuinely
   needs model/audio assets (and then it must degrade gracefully).
2. **Honest content / separate registers** (the credibility firewall). Motifs
   (resonance, sacred geometry, "Above Black", Gateway states) may freely drive
   *visuals*. But any plaque / voice line / HUD text making a **factual** claim
   keeps measured fact and metaphor apart. Label set-dressing as set-dressing.
   Use evidence tiers where relevant (*Confirmed / Witnessed / Contested /
   Speculative / Artistic Reconstruction*). Training/wellness halls say
   **"simulation, not certainty / not medical treatment."** Never assert a
   connection the evidence does not carry.
3. **Graceful fallback.** No-WebGL must not blank the page — show a readable
   fallback and keep any 2D content reachable. Never autoplay audio before a
   user gesture; always provide a master stop.
4. **The house engine** (modern halls): `importmap` → `three@0.160.0` +
   `three/addons/`, ES-module `<script type="module">`, `VRButton` for WebXR,
   procedural **Web Audio** (no audio files where avoidable), a Three.js hub +
   HTML-overlay module pattern, WASD + pointer-lock + mobile + VR navigation,
   `localStorage` for any persistence (local only).
5. **Verify before you trust it.** Parsing clean is *never* enough — a load-order
   /TDZ bug parses fine and still crashes. Run Gate A **and** Gate B (§6).
6. **Don't hand-edit the 10 MB museum** for content that has a drop-zone
   (paintings → `gallery/`, halls → `works/`). Use the builders.

---

## 4 · Current state (keep this updated)

**`greene-halls`** — `index.html` hub + halls:
`the-greene-virtual-library.html`, `hall-of-the-watchers.html`*,
`hall-of-archangels.html`*, `hall-of-ufos.html`, `ancientbasilicasanctuary.html`,
`the-lyceum.html`, `human-psi-operations-room.html`.
(* need a server — they fetch models/audio from `models/`, `audio/`,
`music-archangels.mp3`. The rest run from `file://` too.)

**`Greene-Paleogenomic-Museum-VR`** — `The Greene Paleogenomic Museum VR.html`
(the walkable museum), `index.html` front door, `ancient-basilica-sanctuary.html`,
`the-lyceum.html`. Vault `works/`: `the-fall`, `archetype-profile`, `4d-helix`,
`hall-of-the-watchers`, `the-revelation`, `human-psi-operations-room` (manifest
`works.json`; `_nav.js` + `index.html` auto-generated). `gallery/` (paintings +
`gallery.json`), `vendor/three/` (r160), `docs/layout-map.*` + `make-map.mjs`,
`scripts/`, `curator/`, CI in `.github/workflows/{verify,pages}.yml`.
Note: `archetype-profile` and `4d-helix` are **relocated to the main museum**
(private exhibits), not the Theology Wing.

**`greene-museum-offline`** — `index.html` (museum, r128 inlined), `halls/`
(`index.html` hub, `hall-of-the-watchers`, `hall-of-archangels`,
`human-psi-operations-room`, `vendor/three/` r160, `models/`, `audio/`),
`start.command` / `start.bat`, `README.md`.

**Layout** (see `docs/layout-map.svg`): Main Museum at center (Gene Hall, Voices,
Centerpiece, the **PSI Operations Room** node); Temple of Resonance south; Art
Gallery + Lyceum north; Theology Wing + Resonance Archive flanking; hosted
`greene-halls` shown as an external panel that Wing monuments link out to.

---

## 5 · Naming conventions

- Hall filenames: **lowercase, hyphen-separated, no spaces** (e.g.
  `human-psi-operations-room.html`). The `works/` builder *requires* clean names.
- Keep a hall's filename **identical across all three repos** so cross-links and
  the propagation matrix stay trivial. (Known exception to be careful of: the
  basilica is `ancientbasilicasanctuary.html` in greene-halls but
  `ancient-basilica-sanctuary.html` in Paleo — don't propagate that drift.)
- `works.json` color is a 6-digit hex **without** `#`.

---

## 6 · Verification (mandatory — Paleo repo)

```bash
cd Greene-Paleogenomic-Museum-VR
npm install            # first time only — Puppeteer + bundled Chromium
npm run verify         # Gate A (script parses) + Gate B (loads in headless Chromium, no runtime errors)
```

Both gates must pass before committing. `node_modules/` is gitignored — never
commit it. CI (`.github/workflows/verify.yml`) re-runs both gates on every
push/PR. For a standalone hall outside Paleo, at minimum extract its module and
`node --check` it, and confirm balanced markup.

---

## 7 · Playbooks

### A · Author a new public hall (greene-halls)
1. Write one self-contained `<name>.html` in the house style (§3.4). Model it on
   `hall-of-ufos.html` (procedural audio, fully self-contained) or
   `human-psi-operations-room.html`.
2. Add a `<a class="door ...">` to `greene-halls/index.html`.
3. Sanity-check: balanced tags + `node --check` on the module script.
4. It deploys to Pages on merge to `main`.

### B · Promote a hall into the full museum (Paleo)
```bash
cd Greene-Paleogenomic-Museum-VR
cp <path>/<name>.html works/<name>.html
# add a line to works/works.json: { "file":"<name>.html","title":"…","sub":"…","color":"RRGGBB" }
node scripts/build_halls.mjs     # repoints CDN three.js -> ../vendor/three, injects _nav.js, regenerates works/{_nav.js,index.html}
python3 scripts/build_codex.py   # base64-embeds the hall as a Theology Wing monument-portal
npm run verify                   # Gate A + Gate B
```
- Embedded monuments load Three.js from the **CDN** at runtime (build_codex
  normalizes the vendor path back to CDN for the blob view) — fine for the
  online museum, same as siblings.
- **Only embed self-contained halls.** A hall that fetches `.glb/.fbx/.mp3`
  should be **linked out** to its hosted `greene-halls` URL instead (add it to
  the hosted panel / `FIXED.post` in `build_halls.mjs`), not embedded.

### C · Add it to the offline bundle (greene-museum-offline)
```bash
cd greene-museum-offline
cp <path>/<name>.html halls/<name>.html
# repoint its importmap: replace  https://cdn.jsdelivr.net/npm/three@0.160.0/  with  vendor/three/
# add a door to halls/index.html ; update the README inventory
```
Only bundle **offline-safe** halls (procedural audio, no asset fetches) unless
you also vendor their assets locally. Confirm zero `http(s)://` requests remain.

### D · Add a painting (Paleo)
Drop a `.jpg/.png/.webp` into `gallery/`, optionally add `{file,title,artist}` to
`gallery/gallery.json` (order = hang order; one `feature:true` = end wall), then
`npm run build:gallery && npm run verify`. Never hand-edit the museum HTML for art.

### E · Update the layout map (Paleo)
Edit `docs/make-map.mjs` (world coords, +Z = north, 1 unit ≈ 1 m), then:
```bash
node docs/make-map.mjs           # writes docs/layout-map.svg (the canonical, README-referenced map)
# rasterize a matching PNG (run from the repo root so node_modules resolves):
node -e 'import("puppeteer").then(async p=>{const fs=require("fs");const svg=fs.readFileSync("docs/layout-map.svg","utf8");const m=svg.match(/width=\"(\d+)\" height=\"(\d+)\"/);const b=await p.default.launch({args:["--no-sandbox"]});const pg=await b.newPage();await pg.setViewport({width:+m[1],height:+m[2],deviceScaleFactor:2});await pg.setContent(`<body style=margin:0>${svg}`,{waitUntil:"networkidle0"});await (await pg.$("svg")).screenshot({path:"docs/layout-map.png"});await b.close()})'
```

---

## 8 · Propagation matrix — when you add/rename/remove a hall

| Action | greene-halls | Paleo (`works/` + codex) | offline (`halls/`) | layout map |
|---|---|---|---|---|
| New **self-contained** hall | author it + index door | playbook **B** | playbook **C** | playbook **E** if it gets a node |
| New **asset-fetching** hall | author it + index door | **link out** to hosted URL (don't embed) | bundle only if assets are vendored | optional |
| Rename a hall | rename file + index href | rename in `works/` + `works.json`, rerun B | rename in `halls/` + hub href | update label |
| Retire a hall | remove door (keep file or 410) | remove from `works.json`, rerun B | remove door + file | remove node |

After **any** change touching Paleo: `npm run verify`. Update §4 of this skill so
the inventory stays true.

---

## 9 · Branch / PR / merge workflow

- Branch per change (`claude/<short-topic>`), commit with a clear message, push
  with `git push -u origin <branch>` (retry with backoff on network errors).
- Open a PR to `main`; let CI (`verify`) go green before merging. Pages
  redeploys greene-halls and Paleo on merge to `main`.
- Don't commit `node_modules/`, `.DS_Store`, or `*.bak` (already gitignored).
- Don't create a PR unless asked; don't merge without the user's go-ahead.

---

## 10 · Pitfalls

- **Gate A is not enough** — always run Gate B.
- **CDN vs vendor**: greene-halls = CDN; Paleo `works/` = local vendor (the
  builder handles the rewrite); offline = local vendor (you rewrite it). Never
  ship the offline bundle pointing at a CDN.
- **Don't embed heavy halls** into the museum codex — link them out.
- **Filename drift** across repos breaks links — keep names identical (§5).
- **Honesty firewall** (§3.2) is non-negotiable; it's what separates this museum
  from sensationalism.
- The 10 MB museum file: surgical edits only, unique context strings, follow
  `curator/museum-curator-SKILL.md`.
