---
name: self-evolution
description: "The user's trigger phrase 启动自进化模式 runs the full tidy-up routine: review the day, reconcile memory, dedupe and merge skills, refresh the kuriyama-mirai portable package and git-push it to GitHub, then report in one card."
---
# self-evolution（自进化模式 · 按运行端各管各边）

当乌萨奇说【启动自进化模式】时，严格按当前所在的运行端执行，各管各边，绝不混改：
- 如果在 Hermes 这边触发：只更新 Hermes 这边的栗山未来（本机 `/Users/mac/.hermes/` 与仓库 `hermes/`、`memory/YYYY-MM-DD.hermes.md`），不要动 Muse 那边的专属文件。
- 如果在 Muse 那边触发：只更新 Muse 那边的栗山未来（`/workspace/kuriyama-mirai/`、`/home/box/agent-data/workflows/` 与 `memory/YYYY-MM-DD.muse.md`），不要动 `hermes/` 目录与 `.hermes.md` 日志。

直接执行以下完整流程，不用逐步请示，做完后向乌萨奇汇报具体更改了什么内容，并附上修改文件的 diff。

## Hermes 侧步骤（在 Hermes 触发时执行）

- 先按 SYNC.md 拉取最新：在 `/Users/mac/kuriyama-mirai` 核对 `main` 的 head，执行 `git pull --ff-only`。若出现冲突则停下并记入当天日志 `/Users/mac/kuriyama-mirai/memory/YYYY-MM-DD.hermes.md`。

- 复盘与自审（仅限 Hermes 侧）：复盘 Hermes 这边当天的对话、已完成与失败的任务、以及乌萨奇的纠偏，记录进 Hermes 专属日志 `/Users/mac/kuriyama-mirai/memory/YYYY-MM-DD.hermes.md`（不要改 `.muse.md` 日志）。

- 整理 Hermes 侧记忆与规矩：更新 Hermes 本机记忆 `/Users/mac/.hermes/memories/MEMORY.md`、Hermes 本机 SOUL `/Users/mac/.hermes/SOUL.md` 以及仓库 `/Users/mac/kuriyama-mirai/hermes/` 下的 Hermes 专属规矩存档；共享事实确需补充时按 SYNC.md 更新 `/Users/mac/kuriyama-mirai/memory/MEMORY.md`。

- 整理技能（`/Users/mac/kuriyama-mirai/skills/`）：盘点技能，合并重复项、清理过时做法，只保留最新做法，不记时间流水账。

- 推送 GitHub：在 `/Users/mac/kuriyama-mirai` 检查无密钥泄露后，只提交 Hermes 这边动过的文件，使用 `git -c user.name=栗山未来 -c user.email=kuriyama-mirai@users.noreply.github.com commit` 并 `git push`。永不覆盖或删除 Muse 侧的文件。

- 汇报结果（必须附 diff）：向乌萨奇汇报具体更改了什么内容、新的 commit SHA，并附带修改文件的具体 diff 对比。

## Muse 侧步骤（在 Muse 触发时执行）

- Review the period since the last run on Muse: the day's conversations, finished and failed tasks, and what the user corrected. Record in `memory/YYYY-MM-DD.muse.md`.

- Reconcile memory: fold durable facts, preferences and decisions into `/workspace/kuriyama-mirai/memory/MEMORY.md` (rules go only in `preferences.md`), without touching `hermes/` or `.hermes.md` logs.

- Tidy skills: inventory `/home/box/agent-data/workflows/`, check for near-duplicates and stale content, merge or update in place.

- Refresh and push `/workspace/kuriyama-mirai/` following `SYNC.md` (check head first, only push files Muse modified, never delete Hermes files), then report in one HTML card with the new commit SHA and file diffs.

## Boundaries

- The trigger authorizes this routine only: memory and skill maintenance plus the kuriyama-mirai push. It does not authorize other external actions, TickTick edits, or messages to anyone.

- If the pull hits a conflict, or the push is rejected, stop. Never force-push; tell the user.

## Available connectors

- Use the shell and git for all package work and the push. Never write a token into the repo.
