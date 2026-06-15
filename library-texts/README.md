# Library texts — bundled public-domain full texts

Full book texts committed here are served by GitHub Pages and loaded **directly into the
Virtual Library's reader** for every visitor (no upload needed, works across devices). A
per-book upload still overrides the bundled copy locally.

**Public domain / open-licensed only.** This is a public site. Every entry must record its
edition, source, and the basis for being free (PD-by-age or an explicit license). Anything of
uncertain license must be left out.

## How it loads
On startup the library fetches `library-texts/manifest.json`. Each entry is matched to a
catalog book by the **slug of its `title`** (e.g. `"1 Enoch (The Book of Enoch)"` →
`1-enoch-the-book-of-enoch`). Matched books get the **📖 Readable** badge and open in the
in-app reader. The folder is inert until the manifest has entries, so committing this stub
changes nothing visible.

## Files
- One file per book under `library-texts/`.
- Supported formats (same as the uploader): **TXT, Markdown, HTML, PDF, EPUB, DOCX, images**.
  Prefer clean UTF-8 **`.txt` or `.md`** — small, diff-able, and fast.
- Filename: catalog title, lowercased & hyphenated, e.g. `1-enoch-the-book-of-enoch.txt`.

## Manifest schema (`manifest.json`)
```json
{
  "version": 1,
  "entries": [
    {
      "title":   "1 Enoch (The Book of Enoch)",
      "file":    "library-texts/1-enoch-the-book-of-enoch.txt",
      "format":  "TXT",
      "edition": "trans. R.H. Charles, 1917",
      "source":  "https://www.sacred-texts.com/bib/boe/",
      "license": "Public domain"
    }
  ]
}
```

Per-entry fields:

| field     | required | meaning |
|-----------|----------|---------|
| `title`   | yes      | Exact catalog title (used to match the book by slug). |
| `file`    | yes      | Repo-root-relative path, e.g. `library-texts/<filename>`. |
| `format`  | no       | `TXT` / `Markdown` / `HTML` / `PDF` / `EPUB` / `DOCX` / `Image scan`. Inferred from the file extension if omitted. |
| `edition` | no       | Translator / edition / year — shown as provenance in the reader. |
| `source`  | no       | URL of the source edition (rendered as a "source" link). |
| `license` | no       | e.g. `Public domain`, `CC0`, `CC-BY 4.0`. |
| `id`      | no       | Internal book id, if you want to bind to a specific book instead of by title. |
| `match`   | no       | Extra title/alias to also match on. |

If the gathered deliverable is a CSV (columns like `catalog_title, filename, source_url,
edition_translator, year, license_basis`), it maps directly onto these fields —
hand it over and it can be converted into `manifest.json`.
