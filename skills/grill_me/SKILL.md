# grill-me

Vendored from Matt Pocock's skills collection (MIT License, Copyright (c) 2026 Matt Pocock), upstream at https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md. Adapted to this workspace and to Jacob's standing instruction to use it whenever a requirement or a plan is unclear, mid-task or after a task.

## When to use it

- Reach for this skill when Jacob's idea has a rough shape but its details and boundaries are not settled.

- Reach for it at a decision point in the middle of a task when the next step depends on a choice only Jacob can make.

- Reach for it after a task when the result exposed open questions that are worth settling before the next round of work.

- Skip it when the missing piece is a fact you can look up yourself. Facts are your job, never the user's.

## Run the interview

- Interview the user relentlessly until you reach a shared understanding. Map the topic as a design tree where every decision branches into the decisions that hang off it.

- Work the tree in rounds. The frontier is every decision whose prerequisites are already settled, meaning the questions you can ask now without guessing at answers you have not heard yet.

- Ask the whole frontier in one round. Number each question and give your recommended answer with a short reason, then wait for the user's answers before the next round.

- Word each question so that "yes" accepts your recommended answer.

- Recompute the frontier after each round. A question whose answer depends on another question still open in this round belongs to a later round, not this one.

- Dispatch a subagent to find any fact the frontier needs from files, tools or the web. Keep asking the rest of the frontier while it runs, and hold only the questions downstream of that fact.

- End the session when the frontier is empty and every branch has been visited, with nothing left silently assumed. Do not act on the plan until the user confirms the shared understanding.

## Present questions to Jacob

- Present each round in Jacob's card format, one card only, with short paragraphs and the conclusion first.

- Keep each question short enough to be read aloud comfortably, because Jacob often listens to text instead of reading it.

- Give the recommended answer right under each question so a one-word reply from Jacob can settle it.

## Available connectors

- [Dida365](~/workspace/custom-connectors/custom.dida365/CONNECTOR.md) for reading Jacob's existing todos when a question can be answered from a list instead of asking him.

- Use `muse.connector_search` to find other connectors and `muse.skill_search` to find related skills.

- If nothing here fits, look on the web for a maintained API or MCP server and set it up with [Custom Connectors and MCPs](/opt/muse/skills/custom-connector-setup/SKILL.md), or build a custom connector.

## 提问表单（呈现方式）

grill-me 需要他逐条点选确认时，用生成式 HTML 表单呈现，模板在 ~/workspace/表单模板/grill-me提问表单.html（只给 grill-me 用）：改 QUESTIONS 数组换题，他点选后用 widget.state 回读答案。样式已正式定版为手绘风（project-diagram-studio 规范：米白纸面、深蓝线条、粉彩分区）：外壳写死静态 HTML、脚本只填题，宽度 400、选项行带手绘风深蓝边框，不写多余的话。
