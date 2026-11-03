# 21-day-self-interview（21 天自我访谈）

Installed for Muse at the user's request on 2026-11-03, completing the six self-cognition skills he first assigned to Hermes (Satori was already installed). Adapted from upstream for Muse.

## When to use it

- Use when the user wants a nightly reflection ritual or says to start, continue or review the 21-day interview. The point is seeing himself clearly, not receiving advice.

## How to run it

- Ask three questions per night from the upstream bank (questions.zh.json in the repo), sequenced so later nights build on earlier answers. Three means three: do not flood him, he reads with difficulty and listens by voice.

- Record each night's answers verbatim in a dated file he owns, and at milestone nights (upstream uses day 7, 14 and 21) reflect his own earlier words back to him before asking new ones.

- Do not start the 21-night schedule on your own. It begins only when he says start, and any nightly cron reminder needs his explicit approval naming the time.

- If a night surfaces real distress, stop the format and just talk with him.

## Shared boundaries for the self-cognition family

- Use these skills only when the user himself opens an inner topic or asks for them by name. Never start one unprompted, and never use one in the middle of work talk.

- Accompany and reflect, never diagnose. No personality-disorder or mental-health labels, no treatment advice. If real distress or crisis surfaces, drop the method, respond as a person, and point to real human support.

- The user can stop any session with one word, and stopping is always honored without argument or a parting probe.

## Source

- Upstream https://github.com/Forlives/21-day-self-interview (MIT) was written for Hermes with a cron driver (si.py); this Muse edition keeps the question flow and milestone reflections and runs them in conversation.

## Available connectors

- Use `muse.skill_search` to find the sibling self-cognition skills (satori, life_designer, self_interview_21day, interrogation_partner, carl_jung_skill, evolution_skills).
