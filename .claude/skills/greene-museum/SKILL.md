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

### 1.1 · Build destination — single-source world kernel (PWA)

> **North Star (from `docs/architecture-blueprint.html`):** "Add a room once.
> Place it once. Classify it once. Build everything."

The three-repo setup is the **current working model**, not the final form.
The endgame is a **single installable PWA** — one source repo, one build
script, three outputs:

```
ONE source repo  ──▶ scripts/build.mjs ─┬─▶ PUBLIC site  (→ Pages / greene-halls)
  museum shell                          ├─▶ OFFLINE PWA  (vendored, service-worker cached)
  halls/  models/  art/  gallery/       └─▶ STANDALONE wrappers  (shareable single pages)
  halls.json  (single spatial truth)
```

**Conventions to hold now so the migration is mechanical, not a rewrite:**
- Self-contained, path-relative halls (no hardcoded origins) ✓
- Vendorable Three.js — one pinned version, swappable CDN ↔ local ✓
- `halls.json` — converging the museum's monument list, layout map's hosted
  panel, and `works.json` into one machine-readable registry (in progress)
- Asset discipline: Draco `.glb`, webp textures, procedural audio where possible
- Privacy gate (`npm run check:privacy`) stays the publish filter — 4 private
  exhibits never leave the source repo

**The heaviest single lift when flipping the switch:** unify Three.js —
museum r128 (inline) → r160 (ES module), matching the hall renderer.

**Reference docs** (read before architectural decisions):
- `docs/architecture-blueprint.html` — full spatial + system masterplan
- `docs/PWA-ROADMAP.md` — sequenced migration steps and caching strategy
- `docs/layout-map.svg` — canonical spatial blueprint (rooms in world-space)

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

## 4 · Current state (auto-generated — `npm run build:state`)

The hall inventory below is regenerated by `scripts/build_state.mjs` (Paleo),
which scans all three repos, refreshes the block between the markers, and
re-syncs this skill into every repo so the copies never drift. Run it after any
hall add/rename/retire. **Don't hand-edit between the markers.**

<!-- STATE:START -->
_Generated 2026-06-18 by `scripts/build_state.mjs` — do not hand-edit._

**`greene-halls`** (public · Pages · CDN three.js) — 10 halls

| hall | opens from |
|---|---|
| `ancient-basilica-sanctuary.html` | `file://` or served |
| `hall-of-archangels.html` | served (fetches assets) |
| `hall-of-the-nephilim.html` | served (fetches assets) |
| `hall-of-the-watchers.html` | served (fetches assets) |
| `hall-of-ufos.html` | `file://` or served |
| `human-psi-operations-room.html` | `file://` or served |
| `the-greene-virtual-library.html` | `file://` or served |
| `the-lyceum.html` | `file://` or served |
| `the-revelation.html` | `file://` or served |
| `the-temple-of-solomon.html` | served (fetches assets) |


**`Greene-Paleogenomic-Museum-VR`** (full build · museum r128 inline · halls r160 local `vendor/`)

_Theology-Wing vault (`works/`, manifest order):_

| work | title | kind |
|---|---|---|
| `the-fall.html` | THE FALL | standalone |
| `archetype-profile.html` | ARCHETYPE PROFILE | standalone |
| `4d-helix.html` | 4D HELIX | standalone |
| `hall-of-the-watchers.html` | HALL OF THE WATCHERS | server |
| `the-revelation.html` | THE REVELATION | standalone |
| `human-psi-operations-room.html` | PSI OPERATIONS ROOM | standalone |
| `the-temple-of-solomon.html` | THE TEMPLE OF SOLOMON | server |
| `hall-of-archangels.html` | _(unlisted)_ | server |

_Root standalone halls:_ `ancient-basilica-sanctuary.html`, `empyrean-ascent.html`, `hall-of-the-nephilim.html`, `the-lyceum.html`

_Other:_ gallery paintings: **21** · museum file present: **yes** · vendor/three: **yes** · layout map: **yes**


**`greene-museum-offline`** (offline bundle · local `vendor/` · zero network)

| hall | offline status |
|---|---|
| `hall-of-archangels.html` | local-only ✓ |
| `hall-of-the-watchers.html` | local-only ✓ |
| `hall-of-ufos.html` | local-only ✓ |
| `human-psi-operations-room.html` | local-only ✓ |
| `the-greene-virtual-library.html` | local-only ✓ |
| `the-revelation.html` | local-only ✓ |
| `the-temple-of-solomon.html` | local-only ✓ |

_halls/vendor/three present: **yes**_


**Hall parity** (shared halls, normalized for CDN↔vendor + nav) — ⚠ **drift detected, reconcile below**

| hall | present in | status |
|---|---|---|
| `ancient-basilica-sanctuary.html` | greene-halls, paleo:root | ⚠ DIVERGES — {greene-halls} ≠ {paleo:root} |
| `hall-of-archangels.html` | greene-halls, paleo:works, offline | ✓ in sync (3) |
| `hall-of-the-nephilim.html` | greene-halls, paleo:root | ✓ in sync (2) |
| `hall-of-the-watchers.html` | greene-halls, paleo:works, offline | ✓ in sync (3) |
| `hall-of-ufos.html` | greene-halls, offline | ✓ in sync (2) |
| `human-psi-operations-room.html` | greene-halls, paleo:works, offline | ✓ in sync (3) |
| `the-greene-virtual-library.html` | greene-halls, offline | ⚠ DIVERGES — {greene-halls} ≠ {offline} |
| `the-lyceum.html` | greene-halls, paleo:root | ⚠ DIVERGES — {greene-halls} ≠ {paleo:root} |
| `the-revelation.html` | greene-halls, paleo:works, offline | ✓ in sync (3) |
| `the-temple-of-solomon.html` | greene-halls, paleo:works, offline | ⚠ DIVERGES — {greene-halls, offline} ≠ {paleo:works} |

<!-- STATE:END -->

**Curated notes** (kept by hand): in Paleo, `archetype-profile` and `4d-helix`
are **relocated into the main museum** as private exhibits, not Theology-Wing
monuments. Heavy halls (flagged *server* — they fetch `.glb/.fbx/.mp3`) are
**linked out** to their hosted `greene-halls` URL from the museum, never embedded.
**Layout** (`docs/layout-map.svg`): Main Museum at center (Gene Hall, Voices,
Centerpiece, the **PSI Operations Room** node); Temple of Resonance south; Art
Gallery + Lyceum north; Theology Wing + Resonance Archive flanking; hosted
`greene-halls` shown as an external panel that Wing monuments link out to.

---

## 5 · Naming conventions

- Hall filenames: **lowercase, hyphen-separated, no spaces** (e.g.
  `human-psi-operations-room.html`). The `works/` builder *requires* clean names.
- Keep a hall's filename **identical across all three repos** so cross-links and
  the propagation matrix stay trivial. (The basilica was normalized to
  `ancient-basilica-sanctuary.html` everywhere; greene-halls keeps a tiny
  redirect stub at the old `ancientbasilicasanctuary.html` so the public URL
  still resolves. `build:state` skips redirect stubs and flags any new drift.)
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

### F · Refresh the cross-repo inventory (Paleo)
```bash
cd Greene-Paleogenomic-Museum-VR
npm run build:state   # scans all three repos, rewrites §4 between the STATE markers,
                      # and re-copies this skill into greene-halls + greene-museum-offline
```
Run after any hall add/rename/retire. It auto-classifies each hall as *standalone*
(`file://`-safe) or *server* (fetches `.glb/.fbx/.mp3`), and flags any offline
copy that still references a CDN. Sibling repos are found as `../greene-halls` and
`../greene-museum-offline` (override with `GREENE_HALLS` / `GREENE_OFFLINE` env
vars); missing repos are skipped, not failed.

---

## 8 · Propagation matrix — when you add/rename/remove a hall

| Action | greene-halls | Paleo (`works/` + codex) | offline (`halls/`) | layout map |
|---|---|---|---|---|
| New **self-contained** hall | author it + index door | playbook **B** | playbook **C** | playbook **E** if it gets a node |
| New **asset-fetching** hall | author it + index door | **link out** to hosted URL (don't embed) | bundle only if assets are vendored | optional |
| Rename a hall | rename file + index href | rename in `works/` + `works.json`, rerun B | rename in `halls/` + hub href | update label |
| Retire a hall | remove door (keep file or 410) | remove from `works.json`, rerun B | remove door + file | remove node |

After **any** change touching Paleo: `npm run verify`. Then `npm run build:state`
to refresh §4 and re-sync this skill across the three repos (playbook **F**).

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
- **Code drift** between a hall's copies (a fix landing in one repo only — the
  movement bug) is caught by the **Hall parity** table in §4: run
  `npm run build:state` and reconcile anything marked ⚠ DIVERGES.
- **Honesty firewall** (§3.2) is non-negotiable; it's what separates this museum
  from sensationalism.
- The 10 MB museum file: surgical edits only, unique context strings, follow
  `curator/museum-curator-SKILL.md`.

## 11 · Roadmap & cross-session handoff

Living notes for work that spans sessions. Kept here (outside the STATE block)
so it survives context resets and `build:state` runs.

> **Session reminder:** after any hall add, rename, retire, or content change
> that touches more than one repo, run:
> ```bash
> cd Greene-Paleogenomic-Museum-VR && npm run build:state
> ```
> This refreshes the §4 inventory, flags parity drift, and re-syncs this skill
> into greene-halls and greene-museum-offline so the copies never drift.

### The Temple of Solomon — DONE (2026-06-16)
- New self-contained hall `the-temple-of-solomon.html`: a walkable replica of the
  First Temple (Jachin & Boaz, Menorah, veiled Holy of Holies, Molten Sea) plus a
  clearly-labeled esoteric archive (Seal/Signet, the *Lesser Key*/Ars Goetia, Tree
  of Life). **Public** — lives in greene-halls.
- Shipped to all three repos and **in sync (3)**: greene-halls (CDN), Paleo
  `works/` (embedded in the Theology-Wing codex), offline `halls/` (vendored).
  Filenames are identical per repo except the path prefix (`the-temple-of-solomon.html`
  / `works/the-temple-of-solomon.html` / `halls/the-temple-of-solomon.html`).
- The rare-science **Lyceum** (`the-lyceum.html`) was left intact; the Temple is a
  *distinct* hall, not a replacement. Easy to promote it to the Lyceum's successor
  later if desired.

### Basilica → Temple secret door — DONE (2026-06-16)
- **Shipped.** The Basilica (`ancient-basilica-sanctuary.html`) now hosts a concealed
  "Solomon books → Temple" link into `the-temple-of-solomon.html` (greene-halls
  `585dd34`/`7be89af`); the Temple's public hub door was **removed** so the only
  navigation path is through the Basilica (`68e5483`).
- **Scope is greene-halls (public site) only** (owner decision, 2026-06-16): the
  offline bundle keeps its normal Temple hub door (it has no Basilica), and the Paleo
  museum keeps the Temple as an open Theology-Wing codex monument. Do not remove those.
- **Caveat — hidden ≠ private:** the Temple file is still served at its public Pages
  URL; the door removal hides it from navigation but does not block direct-URL access.

_Original design notes (historical):_
- Agreed design: a **hidden crypt descent** in the Basilica that opens into **The
  Temple of Solomon** — the Temple as the architectural/theological ancestor of the
  church (sanctuary, veil → screen, altar, menorah). **Opt-in and concealed**, with
  the way back up to the light always available, so the Basilica's calm/safe tone is
  never disturbed.
- Placement (best first): crypt/undercroft stair off a side chapel or behind the
  apse → emerge in the Temple court; or a concealed panel behind the altar opened by
  lighting candles in sequence; or a single clickable foundation-stone/icon.
- **Open decision for the working session:** which Basilica artifact hosts the door —
  the museum hall `ancient-basilica-sanctuary.html` (in *these* repos) **or** the
  separate **Immersive VR basilica experience** (different repo, currently being
  art-tuned, in production — do not edit its art). As of this note the connection
  target is unconfirmed; the user has a parallel session working the Basilica repo.
- **Constraints when wiring:**
  - The Basilica is in production — treat it as read-only until the user greenlights.
  - `ancient-basilica-sanctuary.html` is **not** in the offline bundle (parity:
    greene-halls + paleo:root only). The Temple **is** offline. So any Temple→Basilica
    *return* link must degrade gracefully offline (hide/disable when the Basilica file
    isn't reachable) rather than dead-link.
  - Honesty firewall (§3.2): the secret passage leads to esoteric content; keep it
    opt-in and lean on the Temple's own Discernment panel — no occult material bleeds
    into the sanctuary itself.
- The Basilica's ⚠ DIVERGES row in §4 (greene-halls ≠ paleo:root) is **intentional**
  (in production / art fine-tuning) — do not auto-reconcile it.

### Fields & Resonance Lab + library/lyceum reconciliation — 2026-06-16
- New external hall **Laboratory of Fields & Resonance** lives in its **own repo**
  (`sturdy-system`), deployed to GitHub Pages at
  `https://atxgreene.github.io/sturdy-system/`. It is a multi-file ES-module app, so
  it is **linked out, not embedded**: a door in `greene-halls/index.html` + a
  "Continue to the Laboratory" link in `the-lyceum.html`'s intro. Registry-API
  alignment (`window.museum.registerHall`) is deferred — see `HANDOFF.md` in
  `sturdy-system`. Treat `sturdy-system` as a 4th, satellite repo.
- **`the-lyceum.html` ⚠ DIVERGES is INTENTIONAL.** greene-halls carries the outbound
  lab link; the paleo:root copy deliberately does not (the museum links external halls
  via its Codex hosted panel; the offline bundle must not dead-link to a live URL).
  Otherwise the copies match — paleo's mobile/fallback/reduced-motion layer was synced
  into greene-halls. **Do not "reconcile" this row by removing the link.**
- **Virtual Library reconciled.** 4 bundled texts (Conflict of Adam & Eve, Abramelin,
  Master Key System, E S and E S P) backfilled into the offline bundle, and the EPUB/
  DOCX reader engines (jszip 3.10.1, epub.js 0.3.93, mammoth 1.6.0) vendored into
  `offline/halls/vendor/` so the library reads those formats **fully offline**.
- Privacy guard: kept `main`'s approach (basilica added to ALLOW). An alternative
  whole-token matcher was considered and dropped to avoid overriding the merged fix.

