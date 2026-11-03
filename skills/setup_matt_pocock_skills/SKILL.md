# setup-matt-pocock-skills（工程技能仓库配置）

Installed for Muse at the user's request on 2026-11-03, from the engineering batch he first listed for Codex plus Superpowers. Adapted for Muse.

## When to use it

- Run once per repository before leaning on the other mattpocock-style engineering skills (grill_with_docs, improve_codebase_architecture) in that repo, or when the user asks to set a repo up for agent work.

## How to run it

- Explore first and assume nothing: git remote, AGENTS.md or CLAUDE.md, existing GLOSSARY.md, docs/adr/, docs/agents/, and monorepo signals such as pnpm-workspace.yaml or packages/*.

- Confirm three choices with the user before writing: where issues live (GitHub by default, local markdown also works), the triage label strings, and where GLOSSARY and ADRs live.

- Write the configuration into the repo's agent docs (an Agent skills section) so later sessions inherit it, and offer to rename legacy CONTEXT.md files to GLOSSARY.md when they exist.

- It is a prompt-driven setup, not a script. Present what you found, get his confirmation, then write. Once per repo is enough.

## Source

- Upstream https://github.com/mattpocock/skills (MIT), skills/engineering/setup-matt-pocock-skills.

## Available connectors

- Use `muse.skill_search` for sibling skills (grill_me, grill_with_docs, brainstorming, find_skills) and `muse.exec` for git, node and ffmpeg work.
