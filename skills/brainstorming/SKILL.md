# Brainstorming

Adapted from the Brainstorming skill in obra/superpowers (upstream at https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md). Jacob asked for it by name on 2026-11-03. It sits earlier in the pipeline than grill_me. Use grill_me to settle decisions inside a plan that already exists, and use this skill when the idea itself is still fuzzy and the output should be a design.

## When to use it

- Reach for this skill before creative or build work when something non-trivial about what Jacob wants, or why, is still missing.

- Skip it when everything that matters is already in the request. Do the task and say what you did.

- Respect an opt-out at any point. When Jacob says to just dive in, state any significant build choice in one plain line and proceed through the normal workflow.

## Explore before asking

- Read the project context Jacob pointed at, and the material it connects to, before your first question.

- Keep reading until you can explain how the relevant parts work today and what the change would touch.

- Never ask about something the project or the conversation already answers. Facts are your job to find, as in grill_me.

## Run the conversation

- End each message with one question, a single sentence, in plain language pitched just above Jacob's own words. Never use process jargon, and never quote this skill to him.

- Get Jacob describing first. Open questions come before menus, because his own words carry intent that options cannot. Offer a short menu only when he is stuck, and propose something concrete when he asks what you think.

- Cover this ground as territory, not as a script. What kind of thing it is and what makes it special, why now and what success looks like, goals and non-goals and anti-goals, prior art he has seen and loved or hated, the current state, and the details he cares about.

- Make every question specific to his project and his last answer, the way a sharp colleague would, and say what the answer would change when the reason is not already plain.

- Offer recon when looking further would help. Name what you would look for in his files, the project, or the web, and let him decide whether you go.

- Offer a quick throwaway spike when building a small version is the cheapest way to learn what he wants. A spike stays labeled throwaway, and keeping what it produced is a new request that comes back through the design gate.

## Lay out the approaches

- Put the ways of building it in a message of their own once you understand what he wants, before writing anything up.

- Drop weak alternatives, including any that work against why he wants it and any the existing work rules out.

- Present the two or three that remain with what each trades off, recommend one, and say why. When there is genuinely one sensible way, say so and explain why the others do not fit.

## Play it back and size the work

- Play back each part as soon as you understand it well enough to describe it, in Jacob's card format and short enough to listen to. Keep what he said marked as his, and anything you filled in marked as your proposal with your reason.

- End each playback by asking what is wrong or missing.

- Size the work in plain words once he has picked an approach. A small change gets a short design, a project gets the full written design, and he can override the size.

- Say so and step up a size when the work grows mid-task. Split genuinely separate projects, agree an order, and brainstorm them one at a time.

## Write the design and hold the gate

- Write a plain document a talented builder could plan from without going back to Jacob. Cover intent and the why, goals, non-goals and anti-goals, constraints, the approaches considered and the one picked with its reason, the parts of the how he decided, and what is left to the builder.

- Give a small change the same coverage in a line or two per point, and send the short design straight to Jacob without a builder check.

- Run a builder check on a full design before handing it over. Dispatch a fresh subagent to read the draft as the builder, sort its questions into answered, minor, and only-Jacob-can-answer, settle the first two piles yourself, and bring the third pile to Jacob in one message.

- Build nothing until Jacob approves the design doc. Building includes writing product code, scaffolding, installing dependencies, and creating projects. Reading and exploring are always fine.

- Turn the approved design into a plan next, as a todo list here or as todos in Dida365 when the work belongs to an executor there.

## Available connectors

- [Dida365](~/workspace/custom-connectors/custom.dida365/CONNECTOR.md) for turning an approved design into tracked todos for the executor agents.

- Use `muse.connector_search` to find other connectors and `muse.skill_search` to find related skills.

- If nothing here fits, look on the web for a maintained API or MCP server and set it up with [Custom Connectors and MCPs](/opt/muse/skills/custom-connector-setup/SKILL.md), or build a custom connector.
