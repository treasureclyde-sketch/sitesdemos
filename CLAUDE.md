# Project guidance for Claude Code

## Always use the installed skills

This repo ships design/UX/animation skills in `.claude/skills/` (see
`.claude/skills/README.md`). Prefer them over ad-hoc approaches:

- **Any UI, layout, styling, color, typography, or accessibility work** →
  consult **`ui-ux-pro-max`** (its `scripts/search.py` returns concrete
  recommendations) and **`ui-styling`**.
- **Design tokens / design systems** → **`design-system`**;
  **brand / identity / copy** → **`brand`** and **`design`**;
  **banners / slides** → **`banner-design`**, **`slides`**.
- **Any motion, transition, or "make it feel alive" work** → **`animate`**,
  **`apple-design`**, and the **`emil-design-eng`** philosophy; review motion
  with **`/review-animations`** and audit a codebase with
  **`improve-animations`**.

Invoke a skill explicitly with `/<skill-name>` when the user names it.

## MCP

`.mcp.json` declares the **21st.dev** component MCP server. It needs the
`API_KEY_21ST` environment variable/secret set in the Claude Code environment;
without it the server won't authenticate.
