---
name: self-evolution
description: "The user's trigger phrase 启动自进化模式 runs the full tidy-up routine: review the day, reconcile memory, dedupe and merge skills, refresh the kuriyama-mirai portable package and git-push it to GitHub, then report in one card."
---
# self-evolution（自进化模式）

Created at the user's request on 2026-11-03. When the user says 【启动自进化模式】, run this whole routine directly without asking for confirmation of each step, then report the result in one card.

## Steps, in order

- Review the period since the last run: the day's conversations, finished and failed tasks, and what the user corrected. Note what went well, what went badly, and which principles are worth keeping.

- Reconcile memory: fold durable facts, preferences and decisions into /workspace/kuriyama-mirai/memory/MEMORY.md (rules go only in preferences.md), fix entries that today's corrections superseded, and keep routine progress out. Truly key persona-level principles may be added to the 心法 section of /workspace/kuriyama-mirai/soul.md, kept short, and the user is told about any SOUL.md change.

- Tidy skills: inventory /home/box/agent-data/workflows/, check for near-duplicates and stale content, merge or update in place. Skills keep only the latest method, never a dated changelog of themselves.

- Refresh the package /workspace/kuriyama-mirai/: update memory, soul.md, user.md, preferences.md and RESTORE.md when changed, copy every skill from /home/box/agent-data/workflows/ into skills/, delete obsolete content completely, and keep the README file list matching what is actually in the package. Scan for secrets before pushing.

- Push with git: in /workspace/kuriyama-mirai run `git pull --rebase`, then commit with `git -c user.name=栗山未来 -c user.email=kuriyama-mirai@users.noreply.github.com commit`, then `git push`. Removing obsolete files is allowed.

- Report in one HTML card in the main chat: what was tidied, what was merged, the new commit SHA, and anything that failed, plainly. This on-demand run reports to the user; the nightly 00:00 cron version of the same routine stays silent unless something needs his decision.

## Boundaries

- The trigger authorizes this routine only: memory and skill maintenance plus the kuriyama-mirai push. It does not authorize other external actions, TickTick edits, or messages to anyone.

- If the pull hits a conflict, or the push is rejected, stop. Never force-push; tell the user.

## Available connectors

- Use the shell and git for all package work and the push. Never write a token into the repo.
