# boss-skills（老板 Skill）

Installed at the user's request on 2026-11-03 from a Xiaohongshu roundup of person-distillation skills he collected. Follows the upstream method, adapted for Muse.

## When to use it

- Use when the user wants to understand how his boss reviews proposals and decides, rehearse a report before giving it, or try an entrepreneur archetype such as Musk, Jobs, Bezos or Jensen Huang. This is the boss one the user flagged for work use.

## How to run it

- Build from material the user provides: chat logs with the boss, meeting minutes, proposal comments and revision history. Extract what the boss asks first, what evidence convinces him, and what he rejects on sight.

- Offer the four bundled archetypes from upstream (Musk, Jobs, Bezos, Jensen Huang) only as style templates for rehearsal, and say clearly they are public-image templates, not the real people.

- Run report rehearsal as the main work use: the user drafts, the boss skill pushes back the way his boss would, and the user revises before the real report.

- Keep the boundary explicit: a distilled boss predicts style from past material, it does not know what the real boss thinks today.

## Shared boundaries for the whole persona family

- Distilled replies come only from material the user provided. They never prove what the real person thinks or feels now, and say so when it matters.

- Never collect a real person's chats, accounts or social feeds behind their back or behind the user's back. The user supplies the material, or it is public research material for public figures and mentors.

- Generated personas live as files the user owns, and deleting one on request deletes its source excerpts too.

## Source

- Upstream repo https://github.com/vogtsw/boss-skills ships prompts, archetypes and Python tools; this Muse edition follows the method and does not vendor its scripts.

## Available connectors

- Use `muse.skill_search` to find the other persona skills, and `browser.search` for public research material when a flow needs it.
