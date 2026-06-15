# Credits & Licensing

## 3D models (in `models/`)
Several are **Creative Commons Attribution (CC-BY) — credit is required**. Verify each
model's exact license on its Sketchfab page before relying on it publicly, and keep this
file (and ideally a visible in-app credits line) intact.

| File | Work / Author | Note |
|------|---------------|------|
| `veiled-fallen-angel.glb` | "Fallen Angel" — **Giordani_Mathieu** (Sketchfab) | **CC-BY — must credit** |
| `cemetery-angel.glb` | Cemetery angel — Furey / "misterdevious" (Sketchfab) | confirm license |
| `winged-angel.glb` | Winged angel — ItsKrish7 (Sketchfab) | confirm license |
| `grim-reaper.glb` | Grim Reaper — Pigcraft (Sketchfab, ~59 MB) | confirm license |
| `demon-knight/source/Sensenmonster.fbx` | "Fallen Angel Demon Knight" (Sketchfab FBX) | confirm license |
| `giant.glb` | Farnese Hercules — Deepak C C (Sketchfab) | used for the Nephilim |

> If any model's license turns out to be more restrictive than CC-BY (e.g. no
> redistribution), replace it before public hosting — the procedural fallback figures
> always work without any model.

## Audio
- **Narration** (`audio/*.mp3`, 24 Watchers + 12 Archangels): generated locally via Windows SAPI TTS ("Microsoft David Desktop") — no third-party rights.
- **`music-archangels.mp3`**: "Angelic Choir" — **Pixabay** (track #179081), Pixabay Content License (royalty-free; attribution not required, credited here). The Watchers hall uses a generative WebAudio score (no asset).
- **Hall of UFOs**: entirely **procedural WebAudio** (sub-bass hum, radar pings, room tone, faint
  chatter, per-room ambience) generated in-browser — no audio asset files, no third-party rights.

## Hall of UFOs — content & framing
- **No model or image assets**: all 3D and 2D visuals are procedural (Three.js geometry, GLSL
  shaders, and `<canvas>` reconstructions). Craft renderings are explicitly labeled
  *Artistic Reconstruction*.
- **Cases & documents** referenced are matters of public record (e.g. Project Blue Book, the
  Condon Report, the DoD-released Navy sensor videos, the 2021 ODNI preliminary assessment,
  NASA's 2023 UAP study, AARO). Each is framed as documented history with its evidence tier and
  open questions stated — no claim is presented as proven beyond its source.
- **Engine**: Three.js r160 (MIT) via jsDelivr CDN, as with the other halls.

## Text / lore
Public domain: *1 Enoch* (R.H. Charles, 1917), *Book of Giants*, Genesis 6, Leviticus 16.
Later-tradition figures (Metatron, Sandalphon, Raziel, etc.) are labeled as Kabbalah /
3 Enoch tradition in-app.

## Bundled full texts (Virtual Library)
The Virtual Library serves complete public-domain editions from `library-texts/` — see
[`library-texts/SOURCES.md`](library-texts/SOURCES.md) for full per-title provenance
(translator, year, source URL, and PD basis). All 14 bundled texts are public domain by age
(R.H. Charles, G.R.S. Mead, Marcus Dods, E.B. Pusey, Longfellow, the 1611/1769 KJV, etc.); the
Testament of Solomon reuses Joseph H. Peterson's **CC-BY** hosting of Conybeare's 1898 PD text.
Copyrighted modern editions were deliberately excluded (the Robinson Nag Hammadi translation,
the Soncino Zohar, Doreal's Emerald Tablets). Titles with no pre-1928 PD English translation
(3 Enoch, the Book of Giants, the Zohar) are left unbundled and remain on the metadata view.

## Engine
Three.js r160 (MIT) via jsDelivr CDN.

## Backdrop art (public domain)
- Gustave Doré — The Deluge (Hall of the Watchers) and Paradiso / The Empyrean (Hall of the Archangels), 1860s engravings, via Wikimedia Commons. Public domain.
