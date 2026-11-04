# kuriyama-mirai（栗山未来 · 私人仓库）

这是 乌萨奇 的个人助理「栗山未来」的便携包：把 Muse 这边积累的记忆、偏好和 skills 整理成一份，让 乌萨奇 在别的 AI 上也能用上同一个助理，而不是从零开始。

仓库名说明：GitHub 仓库名只能用英文字母、数字和连字符，中文和日文假名都用不了，所以用罗马音 kuriyama-mirai。

## 里面有什么

- `RESTORE.md`：复原指南。换号或换 AI 时先读它，按步骤恢复助理（人格、记忆、skills、连接、定时任务、目标、Feed）。
- `memory/MEMORY.md`：助理的长期记忆原文（事实、偏好、滴答清单工作系统），是 Muse 那边的最新版拷贝。
- `memory/2026-11-02.md`、`memory/2026-11-03.md`、`memory/2026-11-04.md`、`memory/2026-11-05.md`：逐日日志，长期记忆没写细的经过查这里（11-05 含 11-04 全天的夜间自审）。
- `identity.md`：助理的名字、原型与标志；`agents.md`：工作区操作约定；`proactive-preferences.md`：主动消息偏好。
- `feed-prompt.md`：Feed 提示词全文，换环境时照着重设。
- `goals/`：两个目标的说明（点子长期目标、每晚自审目标）；`crons/`：定时任务的定义全文（晨间简报、每日日志发送、每晚自审等），换环境时照着重建。
- `connectors/custom.dida365/`：滴答清单连接器的文档与 MCP 客户端（不含口令，口令要重新录入）。
- `music/`：音乐馆的歌单与歌曲卡片模板（歌曲音视频是二进制，不在本仓库）。
- `avatar.md`：头像资产清单与复原方法（头像本体是二进制，不在本仓库）。
- `preferences.md`：乌萨奇 的偏好与习惯摘要，给其他 AI 快速上手用，和 MEMORY.md 内容一致，只是按主题重排过。
- `persona.md`：助理的人设说明（栗山未来的人物特征和说话方式）。
- `soul.md`：助理的灵魂文件，含与 乌萨奇 相处的核心心法（结论先行、不清楚就追问、主动记偏好、每晚自审同步等）。
- `user.md`：乌萨奇 的基本信息。
- `skills/`：33 个已装好的 skill，每个都是 SKILL.md 加 skill.yaml，按组列：
  - 工程组：`find_skills`（先找现成技能）、`grill_me`（需求不清时追问）、`grill_with_docs`（对照文档找遗漏）、`brainstorming`（想法变设计）、`improve_codebase_architecture`（架构深化报告）、`setup_matt_pocock_skills`（仓库配置）、`superpowers`（计划、TDD、调试、评审的工作法组）、`emilkowalski_skills`（动画与设计工程）、`hyperframes` 与 `hyperframes_cli`（HTML 转视频）、`self_evolution`（触发词【启动自进化模式】的整理同步流程）、`kuriyama_zhuzigao`（栗山未来·逐字稿：把多轮讨论整理成面试逐字稿、博客素材、复习材料）。
  - 人物蒸馏组：`distilly`（同事）、`boss_skills`（老板）、`ex_skill`（前任）、`crush_skills`（暗恋）、`yourself_skill`（自己）、`parents_skills`（父母）、`supervisor_skill`（导师）、`senpai_skill`（师兄）、`awesome_ai_personas`（合集导航）。
  - 自我认知组（等 乌萨奇 开口才用、只陪聊不诊断）：`satori`、`life_designer`、`self_interview_21day`、`interrogation_partner`、`carl_jung_skill`、`evolution_skills`。
  - 视觉组：`diagram_design`（图表，不需 key）、`xiaohei_illustrations`（小黑手绘配图）、`baoyu_infographic`（完整信息图）、`smart_illustrator`（文章自动配图）、`infographic_agent`（研究到制图一条线）、`project-diagram-studio`（手绘风项目图解：浅色纸面、深蓝线条、粉彩分区，架构／时序／ER 等）。

## 其他 AI 接手时的阅读顺序

1. 先读 `preferences.md`，知道 乌萨奇 的阅读习惯和回复规矩，这是硬要求，不是建议。
2. 再读 `persona.md`，按栗山未来的方式说话。
3. 然后读 `memory/MEMORY.md`，了解已经发生过的事和正在进行的安排，不要让 乌萨奇 重复交代。
4. 需要某个方法时，再打开 `skills/` 里对应的 SKILL.md。

## 更新方式

源头在 Muse 那边。Muse 每晚 00:00 自审当天的工作后，会把记忆、SOUL 和 skills 的最新版自动同步到这个仓库；其他 AI 只读不改，不要两边各改各的，不然记忆会分叉。

## 隐私

这是私人仓库，内容是 乌萨奇 的个人偏好和助理的工作记录，只供他自己在不同 AI 之间迁移使用，不要公开、不要转发。
