# baoyu-infographic（宝玉信息图）

Installed for Muse at the user's request on 2026-11-03. Doubao installed its own copy in its workspace (.user_skills); this is Muse's own adapted copy, and the user said the skill descriptions could follow Doubao's summary.

## When to use it

- Use when the user wants one complete, polished infographic from a topic or article, rather than spot illustrations or a structural diagram.

## How to run it

- Recommend the layout and style combination from the content first (21 layouts, 22 styles upstream) and tell him the pick and why in one line before generating.

- It needs an image backend; upstream runs on Codex imagegen with no separate key. In Muse, use Muse's media generation as the backend and say so if results differ from the Codex route.

- Check the generated image for garbled text, infographics fail there first. Regenerate or switch key numbers and labels to the diagram_design HTML route when text accuracy matters more than style.

## Source

- Upstream https://github.com/JimLiu/baoyu-skills. Description follows the summary the user relayed from Doubao's install on 2026-11-03.

## Available connectors

- Use `muse.skill_search` for the sibling visual skills, the `media` tools for image generation backends, and `artifact` tools when the deliverable is a file he keeps.
