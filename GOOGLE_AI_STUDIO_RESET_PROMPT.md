# Google AI Studio — Context Reset Prompt

Copy everything between the dashed lines and paste it as your first message in a new Google AI Studio session before making any trading journal changes.

---

CONTEXT RESET — please read carefully before doing anything.

Ignore all assumptions, memory, or conclusions from previous chat sessions. The files currently loaded in this project are the only source of truth.

Before you do any work, re-read the following files in this order:

1. `AI_STUDIO_RULES.md` (if it exists in this repo) — contains standing rules that override default behaviour.
2. `CHANGELOG.md` (if it exists in this repo) — shows what has already been changed and what is pending.
3. `package.json` — reflects current dependencies. Do not assume any package is or is not installed without checking this file.

Then, before touching any specific feature or component, read the relevant source files for that feature.

Carry forward these standing behaviours for this session:

- **CHANGELOG.md**: Every time you change any file, append an entry to `CHANGELOG.md`. Format: `## [Date] — [Short title]` followed by a bullet list of changed files and what changed. If `CHANGELOG.md` does not exist, create it.

- **Changed files list**: After every edit in a response, include a short list at the bottom: "Files changed: [file1, file2, ...]"

- **Personal website sync flag**: After each response, state one of the following:
  - "Portfolio sync needed: YES — [reason]" if your changes may need to be synced into the personal website repo at `/Users/warrenlimzhanfeng/my-portfolio/src/journal/`
  - "Portfolio sync needed: NO" if the changes are self-contained and do not affect anything that has been integrated.

- **Do not ask for permission** to read files, run the dev server, or run lint. Just do it and report the result.

- **Do not explain what you are about to do before doing it.** Take the action, then report what you did and what the result was.

The personal website integration context (for the sync flag above):
- The trading journal is integrated into a separate personal website repo at `warrenlimzf.com/journal`.
- The personal website repo lives at `/Users/warrenlimzhanfeng/my-portfolio/`.
- Journal files are copied into `src/journal/` in that repo.
- Integration details are documented in `/Users/warrenlimzhanfeng/my-portfolio/JOURNAL_INTEGRATION.md`.
- When files under `src/` of this trading-journal repo change, the corresponding files in `src/journal/` of the personal website repo may need to be updated.

---
