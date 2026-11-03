# smart-illustrator（智能配图）

Installed for Muse at the user's request on 2026-11-03. Doubao installed its own copy in its workspace (.user_skills); this is Muse's own adapted copy, and the user said the skill descriptions could follow Doubao's summary.

## When to use it

- Use when the user hands over a finished article and wants it illustrated end to end, or wants a PPT infographic or cover in the same pass.

## How to run it

- Read the whole article first, then propose the 3 to 5 spots and the route for each (Gemini for imagery, Excalidraw for sketchy diagrams, Mermaid for structural ones) and let him veto before generating.

- Full generation needs GEMINI_API_KEY, free to apply at https://aistudio.google.com/apikey . Never ask him to paste a key in chat; use the secure vault flow when he wants it set up.

- Without a key, run the prompt-only route (upstream --prompt-only): produce the prompts so he can generate in the Gemini web app himself, and say clearly that is the mode being used.

## Source

- Upstream https://github.com/sss-hust/skills. Description follows the summary the user relayed from Doubao's install on 2026-11-03.

## Available connectors

- Use `muse.skill_search` for the sibling visual skills, the `media` tools for image generation backends, and `artifact` tools when the deliverable is a file he keeps.
