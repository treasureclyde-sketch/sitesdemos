# Skills & MCP setup

This repo ships bundled Claude Code skills and one MCP server so they load
automatically in every Claude Code session on this project.

## Installed skills (`.claude/skills/`)

From **ui-ux-pro-max-skill** (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill):
`ui-ux-pro-max`, `design`, `design-system`, `brand`, `banner-design`, `slides`, `ui-styling`

From **emilkowalski/skills** (https://github.com/emilkowalski/skills):
`animate`, `animation-vocabulary`, `apple-design`, `ask-sonner`, `emil-design-eng`,
`find-animation-opportunities`, `improve-animations`, `pick-ui-library`, `prototype`,
`review-animations`

These are picked up automatically at session start — no extra step.

## MCP server (`.mcp.json`)

`21st` — https://21st.dev/api/mcp (HTTP transport).

**Requires an API key.** The config reads it from the `API_KEY_21ST` environment
variable (`x-api-key` header); the key itself is intentionally NOT committed.

To activate:
1. Set `API_KEY_21ST` in the environment (Claude Code on the web: environment
   variables in the environment settings; locally: export it before launching).
2. Start a new session (or `/mcp` reconnect). Approve the `21st` server when prompted.

Equivalent local command:
```
claude mcp add --transport http 21st https://21st.dev/api/mcp --header "x-api-key: $API_KEY_21ST"
```
