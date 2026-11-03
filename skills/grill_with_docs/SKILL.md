# grill-with-docs

Vendored from Matt Pocock's skills collection (MIT License, Copyright (c) 2026 Matt Pocock), upstream at https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md. It shares the interview engine with the grill_me skill instead of duplicating it, and adds the document checking and recording discipline below.

## When to use it

- Reach for this skill when Jacob already has a plan or a solution and wants it checked against the current state of a project.

- Reach for it when the likely failure mode is an omission, meaning something the existing documents, todos or code already settle that the plan forgot.

- Use the plain grill_me skill instead when there is no project or document set to check against.

## Check the plan against the documents first

- Read the project's own sources of truth before asking anything. For Jacob's work that usually means his Dida365 todos for the project, his saved memory, and any project files or docs in the workspace.

- Answer every question the documents can answer from the documents. Ask Jacob only about the gaps and the contradictions.

- Call out a contradiction the moment you find one, in the form of what the document says against what the plan says, and ask which one is right.

- Sharpen fuzzy language as it appears. When a term is vague or overloaded, propose one precise canonical term and ask Jacob to confirm it.

- Stress-test domain relationships with concrete scenarios that probe the edges between concepts.

## Run the interview

- Run the interview exactly as the grill_me skill describes, in rounds along the frontier, with a recommended answer under every question.

- Present each round to Jacob in his card format, short enough to be read aloud comfortably.

## Record what crystallises

- Write each resolved term down the moment it resolves instead of batching terms at the end.

- In a code repository, keep the glossary in `GLOSSARY.md` at the root and decisions in `docs/adr/`, using the formats in [GLOSSARY-FORMAT.md](references/GLOSSARY-FORMAT.md) and [ADR-FORMAT.md](references/ADR-FORMAT.md).

- Offer an ADR only when a decision is hard to reverse, would surprise a future reader without context, and came out of a real trade-off. Skip the ADR when any one of the three is missing.

- Outside a code repository, record resolved terms and decisions in the durable home the project already uses, such as Jacob's memory or the project's todo in Dida365, rather than inventing a parallel file.

- Keep implementation details out of the glossary. A glossary defines what terms mean and nothing else.

## Available connectors

- [Dida365](~/workspace/custom-connectors/custom.dida365/CONNECTOR.md) for reading the project's existing todos and comments, which are usually the first documents to check against.

- Use `muse.connector_search` to find other connectors and `muse.skill_search` to find related skills.

- If nothing here fits, look on the web for a maintained API or MCP server and set it up with [Custom Connectors and MCPs](/opt/muse/skills/custom-connector-setup/SKILL.md), or build a custom connector.
