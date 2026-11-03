# supervisor（导师 Skill）

Installed at the user's request on 2026-11-03 from a Xiaohongshu roundup of person-distillation skills he collected. Follows the upstream method, adapted for Muse.

## When to use it

- Use when the user wants a mentor or supervisor profile for research discussions, paper reading, experiment design or choosing a direction.

## How to run it

- Build mainly from public material: the mentor's papers, talks, interviews and public pages, plus notes the user provides. Name the generated profile after the mentor.

- Analyze research taste: what problems he values, what methods he trusts, how he critiques drafts, using upstream's analyzer prompts as the checklist.

- Use the profile to rehearse group-meeting questions and paper discussions, labeling answers as inferred from public work, not the mentor's private views.

- Upstream ships no SKILL.md and needs its own API setup; this Muse edition follows its prompt method with web search instead.

## Shared boundaries for the whole persona family

- Distilled replies come only from material the user provided. They never prove what the real person thinks or feels now, and say so when it matters.

- Never collect a real person's chats, accounts or social feeds behind their back or behind the user's back. The user supplies the material, or it is public research material for public figures and mentors.

- Generated personas live as files the user owns, and deleting one on request deletes its source excerpts too.

## Source

- Upstream repo https://github.com/ybq22/supervisor (MIT per its README); this Muse edition follows the method only.

## Available connectors

- Use `muse.skill_search` to find the other persona skills, and `browser.search` for public research material when a flow needs it.
