# Superpowers（工程工作法技能组）

Installed for Muse at the user's request on 2026-11-03, from the engineering batch he first listed for Codex plus Superpowers. Adapted for Muse.

## When to use it

- Use for disciplined engineering work on the user's projects: turning an approved design into a plan, executing it step by step, debugging by evidence, and finishing branches cleanly. For idea review before a design exists, use brainstorming or grill_me; this skill starts once direction is set.

## How to run it

- Plan route: write the plan as small verifiable steps (writing-plans), execute with checkpoints (executing-plans), and use subagent-driven development or dispatching-parallel-agents when steps are independent.

- Quality routes: test-driven-development (failing test first), systematic-debugging (reproduce, hypothesize, verify, never guess-fix), and verification-before-completion (show the command output that proves it works, do not claim success without it).

- Review routes: requesting-code-review before merging, and receiving-code-review by checking feedback against the code instead of blindly applying it.

- Branch routes: using-git-worktrees for parallel work and finishing-a-development-branch with tests green before offering merge or cleanup options.

## Source

- Upstream https://github.com/obra/superpowers (MIT) ships about fourteen separate skills; per the user's merge rule they live here as routes in one skill, except brainstorming which he already has as its own entry.

## Available connectors

- Use `muse.skill_search` for sibling skills (grill_me, grill_with_docs, brainstorming, find_skills) and `muse.exec` for git, node and ffmpeg work.
