# diagram-design（图表设计）

Installed for Muse at the user's request on 2026-11-03. Doubao installed its own copy in its workspace (.user_skills); this is Muse's own adapted copy, and the user said the skill descriptions could follow Doubao's summary.

## When to use it

- Use first for any diagram the user asks for: flows, architecture, sequences, dependencies. It needs no external service, so it is the most hassle-free route and the default choice in this visual family.

## How to run it

- Output one self-contained HTML file with inline SVG, so it opens anywhere and can be dropped into docs, decks and web pages as-is.

- Pick the diagram type to fit the content, not the other way round: sequence for interactions over time, dependency graph for module relations, flowchart for decisions.

- Export PNG only when he needs an image file; that step needs Playwright on the machine, so check before promising it, the HTML itself never needs it.

- Keep diagrams readable for him: few words per node, strong labels, no dense walls of text inside boxes.

## Source

- Upstream https://github.com/cathrynlavery/diagram-design. Description follows the summary the user relayed from Doubao's install on 2026-11-03, cross-checked with the repo name and purpose.

## Available connectors

- Use `muse.skill_search` for the sibling visual skills, the `media` tools for image generation backends, and `artifact` tools when the deliverable is a file he keeps.
