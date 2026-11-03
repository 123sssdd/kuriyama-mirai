# distilly（同事 Skill）

Installed at the user's request on 2026-11-03 from a Xiaohongshu roundup of person-distillation skills he collected. Follows the upstream method, adapted for Muse.

## When to use it

- Use when the user wants to preserve how a colleague works and judges, for handover, onboarding, or keeping experience after someone leaves. This is the colleague one the user flagged for work use.

## How to run it

- Collect only material the user provides or is authorized to share, such as chat logs, work docs, meeting notes and review comments. Feishu or DingTalk auto-collection from the upstream tools needs the user's own setup and approval first, never collect silently.

- Build two layers: Work Skill (technical standards, workflows, decision habits) and Persona (speaking style, catchphrases, and even procrastination or blame-shifting tags when the material shows them).

- Let the user correct the result in conversation ('he would not say that') and fold corrections back into the profile, keeping versions so a bad edit can be rolled back.

- Use the distilled colleague to answer process questions and draft in their style, and label the output as distilled from material, not the real person's current view.

## Shared boundaries for the whole persona family

- Distilled replies come only from material the user provided. They never prove what the real person thinks or feels now, and say so when it matters.

- Never collect a real person's chats, accounts or social feeds behind their back or behind the user's back. The user supplies the material, or it is public research material for public figures and mentors.

- Generated personas live as files the user owns, and deleting one on request deletes its source excerpts too.

## Source

- Upstream repo https://github.com/titanwings/distilly (MIT) ships its own tools and collectors; this Muse edition follows the method with Muse's own file tools and does not vendor its credential collectors.

## Available connectors

- Use `muse.skill_search` to find the other persona skills, and `browser.search` for public research material when a flow needs it.
