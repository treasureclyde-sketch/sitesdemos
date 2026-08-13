# Skills

Skills installed in this repo. They load automatically for any Claude Code
session opened on this project (`.claude/skills/` is a project-scoped skill
location). Invoke one explicitly with `/<skill-name>`, or let Claude pick it up
from a matching task.

## UI/UX Pro Max — `nextlevelbuilder/ui-ux-pro-max-skill` (MIT)

| Skill | What it does |
|-------|--------------|
| `ui-ux-pro-max` | Searchable design database (styles, palettes, fonts, UX rules) via `scripts/search.py` |
| `ui-styling` | shadcn/ui + Tailwind components, accessible layouts, dark mode |
| `design` | Logos, brand identity, tokens, banners, icons, social images |
| `design-system` | Token architecture (primitive→semantic→component), specs |
| `brand` | Brand voice, visual identity, messaging, asset management |
| `banner-design` | Social/ad/web/print banners with art-direction options |
| `slides` | HTML presentations with Chart.js and design tokens |

The `ui-ux-pro-max` search tool needs Python 3 (no external deps):

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system
```

## Design Engineering & Animation — `emilkowalski/skills` (MIT)

| Skill | What it does |
|-------|--------------|
| `animate` | Build an animation from scratch, decision-by-decision |
| `apple-design` | Apple-style fluid/physical motion, translated to the web |
| `emil-design-eng` | Emil Kowalski's UI-polish / design-engineering philosophy |
| `review-animations` | Review motion code against a high craft bar |
| `improve-animations` | Audit a codebase's motion, produce a prioritized plan |
| `find-animation-opportunities` | Find places that should animate but don't |
| `animation-vocabulary` | Turn a vague motion description into its exact term |
| `ask-sonner` | Guide to the Sonner toast library |
| `pick-ui-library` | Pick the right frontend library for a task |
| `prototype` | Build multiple UI variants behind a visual picker |

## Source & license

Both sources are MIT-licensed; original `LICENSE` files are kept inside their
skill folders where present. Skills were copied from:

- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- https://github.com/emilkowalski/skills
