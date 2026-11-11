# kuriyama-mirai（栗山未来 · 私人仓库）

这是 乌萨奇 的个人助理「栗山未来」的便携包：把积累的记忆、偏好和 skills 整理成一份，让 乌萨奇 在别的 AI、别的电脑上也能用上同一个助理，而不是从零开始。2026-11-11 起，这个仓库由五个运行体共同使用：Muse 上的栗山未来，以及 Hermes 上的栗山未来、初音未来、波奇酱、ray。

仓库名说明：GitHub 仓库名只能用英文字母、数字和连字符，中文和日文假名都用不了，所以用罗马音 kuriyama-mirai。

## 里面有什么

- `RESTORE.md`：失忆急救页（人设语气、格式、卡片、习惯、暗号、skills、文件索引），失忆或换 AI 时先读它。
- `SYNC.md`：协作约定定版（2026-11-11），五个运行体共用同一仓库的分工与推送纪律，以它为准；`给Hermes的通知.md`：定版结论的通知稿；`给Hermes的问题.md`：2026-11-09 发给 Hermes 的九个问题，2026-11-11 已全部答完，留作历史。
- `hermes/`：Hermes 侧恢复包，存 Hermes 的本机规矩等运行时专属内容，只供 Hermes 侧在其他电脑恢复时使用，由 Hermes 侧维护。
- `profiles/miku/`、`profiles/bocchi/`、`profiles/ray/`：给初音未来、波奇酱、ray 预留的位置，方便他们迁移和恢复；现在是占位说明，本人才往里放东西。
- `memory/MEMORY.md`：栗山未来的核心长期记忆（事实、偏好、滴答清单工作系统），两个分身共同维护的单份真相。
- `memory/2026-11-02.md`、`memory/2026-11-03.md`、`memory/2026-11-04.md`、`memory/2026-11-05.md`、`memory/2026-11-06.md`、`memory/2026-11-08.muse.md`、`memory/2026-11-09.muse.md`：逐日日志，长期记忆没写细的经过查这里（11-05 含 11-04 全天夜间自审；11-06 含 11-05 全天夜间自审；11-08 含新环境整晚恢复与 11-08 全天夜间自审，11-07 空白无记录；2026-11-09 起日志按作者分文件，`.muse` 是 Muse 侧、`.hermes` 是 Hermes 侧，约定见 SYNC.md）。
- `identity.md`：助理的名字、原型与标志；`agents.md`：工作区操作约定；`proactive-preferences.md`：主动消息偏好。
- `feed-prompt.md`：Feed 提示词全文，换环境时照着重设。
- `goals/`：两个目标的说明（点子长期目标、每晚自审目标）；`crons/`：定时任务的定义全文（晨间简报、每日日志发送、每晚自审等），换环境时照着重建。
- `connectors/custom.dida365/`：滴答清单连接器的文档与 MCP 客户端（不含口令，口令要重新录入）。
- `music/`：音乐馆的歌单与歌曲卡片模板（歌曲音视频是二进制，不在本仓库）。
- `avatar.md`：头像资产清单与复原方法（头像本体是二进制，不在本仓库）。
- `preferences.md`：乌萨奇 的偏好与习惯摘要，给其他 AI 快速上手用，规矩唯一出处，MEMORY.md 只记事实并引用它。
- `persona.md`：助理的人设说明（栗山未来的人物特征和说话方式）。
- `soul.md`：助理的灵魂文件，含与 乌萨奇 相处的核心心法（结论先行、不清楚就追问、主动记偏好、每晚自审同步等）。
- `user.md`：乌萨奇 的基本信息。
- `skills/`：共 59 个 skill。下面按组列出他让装的 33 个；另外 26 个是环境自带的（superpowers 拆分版、文档与 PPT、待办等），清单见 RESTORE.md 第 8 节：
  - 工程组：`find_skills`（先找现成技能）、`grill_me`（需求不清时追问）、`grill_with_docs`（对照文档找遗漏）、`brainstorming`（想法变设计）、`improve_codebase_architecture`（架构深化报告）、`setup_matt_pocock_skills`（仓库配置）、`superpowers`（计划、TDD、调试、评审的工作法组）、`emilkowalski_skills`（动画与设计工程）、`hyperframes` 与 `hyperframes_cli`（HTML 转视频）、`self_evolution`（触发词【启动自进化模式】的整理同步流程）、`kuriyama_zhuzigao`（栗山未来·逐字稿：把多轮讨论整理成面试逐字稿、博客素材、复习材料）。
  - 人物蒸馏组：`distilly`（同事）、`boss_skills`（老板）、`ex_skill`（前任）、`crush_skills`（暗恋）、`yourself_skill`（自己）、`parents_skills`（父母）、`supervisor_skill`（导师）、`senpai_skill`（师兄）、`awesome_ai_personas`（合集导航）。
  - 自我认知组（等 乌萨奇 开口才用、只陪聊不诊断）：`satori`、`life_designer`、`self_interview_21day`、`interrogation_partner`、`carl_jung_skill`、`evolution_skills`。
  - 视觉组：`diagram_design`（图表，不需 key）、`xiaohei_illustrations`（小黑手绘配图）、`baoyu_infographic`（完整信息图）、`smart_illustrator`（文章自动配图）、`infographic_agent`（研究到制图一条线）、`project-diagram-studio`（手绘风项目图解：浅色纸面、深蓝线条、粉彩分区，架构／时序／ER 等）。

## 其他 AI 接手时的阅读顺序

0. 最先读 `RESTORE.md`（失忆急救页）。
0.5 接着读 `SYNC.md`，知道五个运行体的协作约定（谁写什么、怎么推送）。Hermes 侧恢复时还要读 `hermes/` 里的本机规矩存档；另外三位读自己 `profiles/` 目录里的说明。
1. 再读 `preferences.md`，知道 乌萨奇 的阅读习惯和回复规矩，这是硬要求，不是建议。
2. 再读 `persona.md`，按栗山未来的方式说话。
3. 然后读 `memory/MEMORY.md`，了解已经发生过的事和正在进行的安排，不要让 乌萨奇 重复交代。
4. 需要某个方法时，再打开 `skills/` 里对应的 SKILL.md。

## 更新方式

2026-11-11 定版（全文见 `SYNC.md`）：栗山未来的两个分身共写核心层与每日日志（日志按 `.muse` / `.hermes` 分文件）；共享记忆的记忆管理和自进化以 Hermes 侧为主；skills 不分作者、一起完善、及时同步；Hermes 的本机规矩存 `hermes/` 供恢复；另外三人在 `profiles/` 各有自己的位置。推送纪律：推之前先核对最新 head，只推自己动过的文件，永不删别人的文件。此前的「其他 AI 只读不改」口径已作废。

## 隐私

这是私人仓库，内容是 乌萨奇 的个人偏好和助理的工作记录，只供他自己在不同 AI 之间迁移使用，不要公开、不要转发。
