# hyperframes-cli（HyperFrames 命令行）

Installed for Muse at the user's request on 2026-11-03, from the engineering batch he first listed for Codex plus Superpowers. Adapted for Muse.

## When to use it

- Use together with the hyperframes skill whenever a composition is scaffolded, validated, previewed or rendered, and when a render fails and doctor or check must explain why.

## How to run it

- Natural sequence: npx hyperframes init for a new project, write the composition, npx hyperframes lint and check (check reports violations with a Fix line), npx hyperframes preview to see it in the Studio, then npx hyperframes render for the MP4.

- Environment verified on Muse's machine on 2026-11-03: Node v24 and FFmpeg are present, which covers the stated Node 22+ and FFmpeg requirements. Run npx hyperframes doctor first when anything fails, and npx hyperframes usage --json at a new video's start to report remaining plan usage, saying unknown when it is.

- For an existing project, npx hyperframes timeline --json shows what plays when, and history shows what the user changed since your last turn. Build on his changes, do not overwrite them.

- Cloud render and Lambda render exist upstream for long videos; they spend HeyGen plan usage or AWS money, so get the user's explicit approval before using either. Local render is the default.

## Source

- Upstream https://github.com/heygen-com/hyperframes (Apache 2.0), skills/hyperframes-cli. Commands verified against the upstream skill text on 2026-11-03; the CLI itself was not run yet.

## Available connectors

- Use `muse.skill_search` for sibling skills (grill_me, grill_with_docs, brainstorming, find_skills) and `muse.exec` for git, node and ffmpeg work.
