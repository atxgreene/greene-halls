# Greene Halls — hosted experiences

High-fidelity, multi-file WebGL experiences served over **GitHub Pages** so the
[Greene Paleogenomic Museum VR](https://github.com/atxgreene/Greene-Paleogenomic-Museum-VR)
can open them at a real `https://` URL (the museum's Codex Hall monuments link here).

These can't be inlined into the museum: they load Three.js r160 from a CDN and **fetch
`.glb`/`.fbx` models + `.mp3` voice over http** (`file://` blocks those fetches), so they
must be *served*. Pages does exactly that.

## Live URLs (after the first push + Pages build)
- Hub: `https://atxgreene.github.io/greene-halls/`
- Watchers: `https://atxgreene.github.io/greene-halls/hall-of-the-watchers.html`
- Archangels: `https://atxgreene.github.io/greene-halls/hall-of-archangels.html`

## Pushing the content (from the Windows authoring PC)

The source lives in `C:\Users\austi\iCloudDrive\Kabbalah\`. Push its **contents** to this
repo root (so `index.html` is at the root and `models/` + `audio/` sit beside the HTMLs):

```powershell
git clone https://github.com/atxgreene/greene-halls.git
cd greene-halls
# copy the Kabbalah folder CONTENTS in (index.html, the two hall HTMLs, models\, audio\, start-museum.bat)
robocopy "C:\Users\austi\iCloudDrive\Kabbalah" . /E /XD .git
git add -A
git commit -m "Publish Watchers + Archangels halls (models, audio, hub)"
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
