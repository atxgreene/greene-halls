# Greene Halls — hosted experiences

High-fidelity, multi-file WebGL experiences served over **GitHub Pages** so the
[Greene Paleogenomic Museum VR](https://github.com/atxgreene/Greene-Paleogenomic-Museum-VR)
can open them at a real `https://` URL (the museum's Codex Hall monuments link here).

These can't be inlined into the museum: they load Three.js r160 from a CDN and **fetch
`.glb`/`.fbx` models + `.mp3` voice over http** (`file://` blocks those fetches), so they
must be *served*. Pages does exactly that.

## Live URLs (after the first push + Pages build)
- Hub: `https://atxgreene.github.io/greene-halls/`
- **Virtual Library:** `https://atxgreene.github.io/greene-halls/the-greene-virtual-library.html`
- Watchers: `https://atxgreene.github.io/greene-halls/hall-of-the-watchers.html`
- Archangels: `https://atxgreene.github.io/greene-halls/hall-of-archangels.html`

## The Greene Virtual Library (`the-greene-virtual-library.html`)
A single-file "Temple of Living Books" — a sacred reading hall + research command center for
theology, apocrypha/Enochic literature, Hermetica, occult history, symbolism, and personal study.

- **Self-contained.** One HTML file; embedded CSS/JS. The full catalog, search, filters, book
  detail panels, study paths, compare, knowledge graph, the **Archivist** assistant, and the
  import flow all work **without** any assets or server. The Three.js temple (r160 from the
  jsDelivr CDN) is a progressive-enhancement backdrop and **degrades gracefully** if WebGL or the
  CDN is unavailable.
- **Your data stays local.** Books, notes, ratings, study paths, and projects persist in the
  browser's `localStorage`. Nothing is uploaded.
- **Sample books are clearly labeled** and meant to be replaced with your own collection (use
  **Add**, or **Edit metadata → upload a file**). The point this repo lives near:
  `C:\Users\austi\iCloudDrive\Book Library`. The app cannot reach a local drive — import the files
  through the in-app intake ritual.
- **The Archivist** is a disciplined, catalog-grounded helper. It works only from your metadata and
  cautious general scholarship; it never invents book contents and flags interpretation, tradition,
  and speculation as such.
- Keyboard: `/` search · `g` graph · `a` Archivist · `i` add book · `c` compare · `Esc` close.
  Includes reduced-motion and audio toggles, ARIA labels, and a mobile layout.

## Pushing the content (from the Windows authoring PC)

The source lives in `C:\Users\austi\iCloudDrive\Kabbalah\`. Push its **contents** to this
repo root (so `index.html` is at the root and `models/` + `audio/` sit beside the HTMLs):

**Copy ONLY the files the halls need — never the whole `Kabbalah\` folder** (it holds
unrelated/private files that must not go public):

```powershell
git clone https://github.com/atxgreene/greene-halls.git
cd greene-halls
$src = "C:\Users\austi\iCloudDrive\Kabbalah"
robocopy "$src\models" ".\models" /E
robocopy "$src\audio"  ".\audio"  /E
Copy-Item "$src\index.html" .
Copy-Item "$src\hall-of-the-watchers.html" .
Copy-Item "$src\hall-of-archangels.html" .
Copy-Item "$src\music-archangels.mp3" .
git status            # review exactly what is staged before committing — public repo
git add -A
git commit -m "Publish Watchers + Archangels halls (models, audio, music, hub)"
git push
```

### Important
- **Do NOT use Git LFS.** GitHub Pages does not serve LFS-stored files. Commit the models
  as normal git objects — every file here is under GitHub's 100 MB limit (largest is the
  ~59 MB `grim-reaper.glb`), and Pages' ~1 GB repo budget covers the ~140 MB total.
- Keep the folder structure: relative paths (`models/...`, `audio/...`) must resolve.
- Pages rebuilds automatically on each push (~1 min). Check the **Actions** tab for status.

## Attribution
See [`CREDITS.md`](CREDITS.md). Several models are **CC-BY (attribution required)** — that
file must stay, and a visible credit line in-app is recommended now that this is public.
