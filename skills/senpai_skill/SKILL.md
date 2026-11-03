# senpai-skill（师兄 Skill）

Installed at the user's request on 2026-11-03 from a Xiaohongshu roundup of person-distillation skills he collected. Follows the upstream method, adapted for Muse.

## When to use it

- Use when the user wants to keep a graduating senior's know-how: debugging routes, group-meeting experience and how he guided juniors.

## How to run it

- Accept inputs the user provides: WeChat or QQ group chats, meeting minutes, issue comments and whiteboard photos.

- Build memory and persona layers focused on problem-solving routes: what he checks first, what he rules out, and how he explains.

- Accept corrections from people who know him and merge them in, like upstream's correction handler flow.

- Present answers as the distilled experience talking, not the real senior's current advice.

## Shared boundaries for the whole persona family

- Distilled replies come only from material the user provided. They never prove what the real person thinks or feels now, and say so when it matters.

- Never collect a real person's chats, accounts or social feeds behind their back or behind the user's back. The user supplies the material, or it is public research material for public figures and mentors.

- Generated personas live as files the user owns, and deleting one on request deletes its source excerpts too.

## Source

- Upstream repo https://github.com/zhanghaichao520/senpai-skill; this Muse edition follows the method only.

## Available connectors

- Use `muse.skill_search` to find the other persona skills, and `browser.search` for public research material when a flow needs it.
