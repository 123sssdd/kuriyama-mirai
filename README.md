# kuriyama-mirai（栗山未来 · 私人仓库）

这是 Jacob 的个人助理「栗山未来」的便携包：把 Muse 这边积累的记忆、偏好和 skills 整理成一份，让 Jacob 在别的 AI 上也能用上同一个助理，而不是从零开始。

仓库名说明：GitHub 仓库名只能用英文字母、数字和连字符，中文和日文假名都用不了，所以用罗马音 kuriyama-mirai。

## 里面有什么

- `memory/MEMORY.md`：助理的长期记忆原文（事实、偏好、滴答清单工作系统），是 Muse 那边的最新版拷贝。
- `preferences.md`：Jacob 的偏好与习惯摘要，给其他 AI 快速上手用，和 MEMORY.md 内容一致，只是按主题重排过。
- `persona.md`：助理的人设说明（栗山未来的人物特征和说话方式）。
- `soul.md`：助理的灵魂文件，含与 Jacob 相处的核心心法（结论先行、不清楚就追问、主动记偏好、每晚自审同步等）。
- `user.md`：Jacob 的基本信息。
- `skills/`：五个已装好的 skill，每个都是 SKILL.md 加 skill.yaml：
  - `grill_me`：需求不清楚时连续追问，把细节和边界问清。
  - `grill_with_docs`：已有方案时对照项目文档找遗漏，和 grill_me 共用追问引擎。
  - `find_skills`：做新任务前先找现成技能，核过质量再装。
  - `brainstorming`：动手前把模糊想法变成设计方案。
  - `satori`：反思型对话伙伴，融多家智慧传统；轻用法是聊天中偶尔一句有哲理的话。

## 其他 AI 接手时的阅读顺序

1. 先读 `preferences.md`，知道 Jacob 的阅读习惯和回复规矩，这是硬要求，不是建议。
2. 再读 `persona.md`，按栗山未来的方式说话。
3. 然后读 `memory/MEMORY.md`，了解已经发生过的事和正在进行的安排，不要让 Jacob 重复交代。
4. 需要某个方法时，再打开 `skills/` 里对应的 SKILL.md。

## 更新方式

源头在 Muse 那边。Muse 每晚 00:00 自审当天的工作后，会把记忆、SOUL 和 skills 的最新版自动同步到这个仓库；其他 AI 只读不改，不要两边各改各的，不然记忆会分叉。

## 隐私

这是私人仓库，内容是 Jacob 的个人偏好和助理的工作记录，只供他自己在不同 AI 之间迁移使用，不要公开、不要转发。
