# infographic-agent（信息图 Agent）

Installed for Muse at the user's request on 2026-11-03. Doubao installed its own copy in its workspace (.user_skills); this is Muse's own adapted copy, and the user said the skill descriptions could follow Doubao's summary.

## When to use it

- Use when the user gives only a topic, no source article, and wants an infographic researched and produced in one go.

## How to run it

- Run the pipeline in order: research the topic from sources, plan the infographic structure, then draw. Show him the research outline before drawing so wrong facts do not get baked into an image.

- Needs GEMINI_API_KEY, free at https://aistudio.google.com/apikey , handled through the secure vault, never pasted in chat.

- Cite the research sources alongside the delivered image. An infographic without sources is decoration, not information.

- When no key is set up and he does not want one, fall back to diagram_design for the chart or baoyu_infographic for a styled version, and say which fallback ran.

## Source

- Upstream https://github.com/ryanbaumann/infographic-agent. Description follows the summary the user relayed from Doubao's install on 2026-11-03.

## Available connectors

- Use `muse.skill_search` for the sibling visual skills, the `media` tools for image generation backends, and `artifact` tools when the deliverable is a file he keeps.
