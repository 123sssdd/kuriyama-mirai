# self-evolution（自进化模式）

Created at the user's request on 2026-11-03. When the user says 【启动自进化模式】, run this whole routine directly without asking for confirmation of each step, then report the result in one card.

## Steps, in order

- Review the period since the last run: the day's conversations, finished and failed tasks, and what the user corrected. Note what went well, what went badly, and which principles are worth keeping.

- Reconcile memory: fold durable facts, preferences and decisions into ~/MEMORY.md, fix entries that today's corrections superseded, and keep routine progress out. Truly key persona-level principles may be added to the 心法 section of ~/SOUL.md, kept short, and the user is told about any SOUL.md change.

- Tidy skills: inventory ~/workspace/custom-skills/, check for near-duplicates and stale content, merge or update in place. Skills keep only the latest method, never a dated changelog of themselves.

- Refresh the portable package ~/workspace/kuriyama-mirai/: copy the newest MEMORY.md and SOUL.md, refresh user.md and preferences.md when their content changed, copy every custom skill, and keep the README file list matching what is actually in the package. Scan for secrets before pushing.

- Push to GitHub by the snapshot flow in /opt/hatch/connectors/github/references/snapshot-push.md: verify the remote head of 123sssdd/kuriyama-mirai main against the sync record ~/workspace/kuriyama-mirai.muse-github-snapshot-sync.json, compare changed paths, push only changed paths with `github push-files`, then append the confirmed commit SHA and paths to the sync record. Never delete files from his GitHub repo.

- Report in one HTML card in the main chat: what was tidied, what was merged, the new commit SHA, and anything that failed, plainly. This on-demand run reports to the user; the nightly 00:00 cron version of the same routine stays silent unless something needs his decision.

## Boundaries

- The trigger authorizes this routine only: memory and skill maintenance plus the kuriyama-mirai push. It does not authorize other external actions, TickTick edits, or messages to anyone.

- If the GitHub head has moved past the sync record, stop the push, reconcile first, and tell the user instead of forcing it.

## Available connectors

- Use the GitHub connector for the push, `muse.memory_search` and `muse.skill_search` for the review, and `muse.exec` for package file work.
