# improve-codebase-architecture（代码库架构深化）

Installed for Muse at the user's request on 2026-11-03, from the engineering batch he first listed for Codex plus Superpowers. Adapted for Muse.

## When to use it

- Use when the user wants an architecture review of a real codebase: where the friction is, which modules are shallow, and what refactor would pay off in testability and AI-navigability.

## How to run it

- Scope before scanning, YAGNI style: if the user names a module or pain point, go there; otherwise read recent git history to find hot spots and let them pull attention first.

- Read the project's GLOSSARY.md and ADRs first, and use the design vocabulary exactly: module, interface, depth, seam, adapter, leverage, locality. Apply the deletion test and the rule that one adapter is a hypothetical seam, two make it real.

- Present findings as a visual HTML report the user can scan, ranked by payoff, then grill him through the one he picks (the grill_me engine) before any code changes.

- Do not re-litigate decisions already recorded in ADRs. Surface the conflict instead and let him decide.

## Source

- Upstream https://github.com/mattpocock/skills (MIT), skills/engineering/improve-codebase-architecture, which depends on its codebase-design vocabulary skill; the vocabulary is folded into this Muse edition.

## Available connectors

- Use `muse.skill_search` for sibling skills (grill_me, grill_with_docs, brainstorming, find_skills) and `muse.exec` for git, node and ffmpeg work.
