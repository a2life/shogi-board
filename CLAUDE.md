# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with demo (index.html has multi-board examples)
npm run build    # TypeScript compile + Vite build → dist/
npm run serve    # Preview the built output
```

There are no tests in this project.

## Architecture Overview

This is a **TypeScript + Preact + Vite** app that renders interactive shogi boards on a webpage. It is a pure client-side library — no backend.

### Entry & Rendering Pipeline

`main.tsx` → finds all `.board-app` divs → renders a `BoardRenderer` per div using global array `initialSetup__ts81`

```
main.tsx
  └─ BoardRenderer (boardRenderer.tsx)
       ├─ Parses input: kifu string → KifuParser | SFEN string → parseSFEN | direct params
       ├─ Normalizes props via xlationMap (sOnBoard→senteOnBoard, etc.)
       ├─ Fetches remote kifu if `url` param set (fetchFile.ts)
       └─ Board (components/ShogiBoard.tsx)  ← main stateful component
            ├─ MoveHandlers.ts     — moveParser(), moveAndRemember()
            ├─ renderPiece.tsx     — RenderPiece, RenderBoard, MarkerAt
            ├─ ShowBranches.tsx    — branch-point dropdown UI
            ├─ bookmarks.tsx       — bookmark navigation
            ├─ CustomContextMenu.tsx — right-click menu
            ├─ createSFEN.ts       — board state → SFEN export
            ├─ createBOD.ts        — board state → BOD text export
            └─ Icons.tsx           — SVG icons for button bar
```

### Piece/Board State Encoding

Pieces are stored as a single comma-joined string throughout the app (not arrays or objects). The format:

- **On-board piece**: `s53b` = sente bishop at column 5, row 3
- **On-hand piece**: `sgSg` = sente has a gold in hand (repeated pattern)
- Uppercase letter in position 3 indicates a **promoted** piece

`unifyPieces()` in `utils.ts` combines the four input strings (senteOnBoard, goteOnBoard, senteOnHand, goteOnHand) into this unified format used by `Board`.

### Move String Format (internal)

`MoveObject` type (`customeTypes.d.ts`): `{ move: string, hand?, comment?, bookmark?, endOfGame?, step? }`

Move string format: `[side][action][to][from/piece]`
- side: `s` (sente/black) or `g` (gote/white)
- action: `-` (normal), `+` (promote), `d` (drop)
- to: 2-char grid coordinate (e.g., `52`)
- from: 2-char grid coordinate for `-`/`+`, piece letter for `d`

`preProcessMoves()` in `utils.ts` converts string/string[] input → `MoveObject[]`.

### Branching

Branches are encoded with `J` (branch point) and `C:N` markers inside the moves array. `prepBranchPoints()` in `utils.ts` builds the branch lookup map; `ShowBranches.tsx` renders the dropdown.

### KifuParser (`components/KifuParser.ts`)

Translates standard Kakinoki-style `.kif`/`.kifu` files (Japanese notation) into internal `MoveObject[]` format. Handles kanji piece names, board diagrams, hand pieces, branching, comments, and bookmarks.

### Image Selection (`components/SetImageSelection.ts`)

`buildGraphicPaths()` maps numeric indices (0–N) to image paths under `/assets/img/`. Parameters `koma`, `ban`, `grid`, `marker` in setup data select from fixed arrays (e.g., 8 koma sets, 11 ban styles, 6 grid styles, 14 marker styles).

### Input Parameter Aliases

`BoardRenderer` translates legacy/short names before passing to `Board`:
- `sOnBoard` → `senteOnBoard`, `gOnBoard` → `goteOnBoard`
- `sOnHand` → `senteOnHand`, `gOnHand` → `goteOnHand`
- `smooth` → `animate`, `startAt` → `tesuu`, `comment` → `initialComment`

### CSS-Based Piece Positioning

Piece position is set via CSS classes `c{col} r{row}` on `<img>` tags. Moving a piece = changing its class attributes. The browser handles the visual transition. Grid coordinates in code use column-first notation (e.g., `52` = column 5, row 2).

### Build Output

Vite splits output into `index.[hash].js` and `vendor.[hash].js` (custom rollup config in `vite.config.ts`). Assets go to `assets/shogi-board/`. The host page must define the global `initialSetup__ts81` array and include `.board-app` div placeholders.

### `data-input` Delayed Input

A board div can have `data-input="inputId"` for dynamic data injection post-render. The host page stuffs a hidden `<input id="inputId">` with `encodeURIComponent(JSON.stringify(kifuDataObject))` then dispatches a `change` event.
