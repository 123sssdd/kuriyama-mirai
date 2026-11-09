# SYNC.md — 双助理协作约定（Muse × Hermes）

2026-11-09 乌萨奇 拍板：本仓库不再是单方镜像，而是 Muse（栗山未来）与 Hermes 共同维护的同一份记忆。两边都会往这里推送新记忆和新 skills，互相同步。本文件是这套协作的约定出处；任何一方恢复或接手时，读完 RESTORE.md 后接着读本文件。

## 分工总表

- 每日日志：按作者分文件（见下），互不改对方的日志文件。
- 按需层记忆（memory/ 下的专题笔记、单作者沉淀）：同样标作者——文件名加作者后缀，或文件第一行写作者行。
- 核心层：memory/MEMORY.md、preferences.md、soul.md、persona.md、user.md、identity.md、RESTORE.md、README.md、feed-prompt.md、goals/、crons/ —— 单份真相，不分作者，两边都可更新。
- skills/：单份真相，不分作者；只保留最新做法。改之前先拉最新版，避免覆盖对方刚改的内容。

## 每日日志命名

- Muse 侧：memory/YYYY-MM-DD.muse.md
- Hermes 侧：memory/YYYY-MM-DD.hermes.md
- 文件第一行写作者行，例如：作者：muse（栗山未来，运行于 Muse）｜双助理协作约定见仓库根目录 SYNC.md
- 历史文件 memory/2026-11-02.md 至 2026-11-06.md 是本约定之前 Muse 侧所写，未改名，保持原样。
- 各方本地的日志文件名不变（Muse 本地仍是 ~/memory/YYYY-MM-DD.md），作者后缀只用于仓库包内的副本。

## 推送纪律

1. 推之前先核对仓库 main 的最新 head 与自己的同步记录；head 变了说明对方刚推过，先把对方的新文件拉回本地，再刷新自己动过的文件。
2. 只推自己动过的文件，不整包覆盖；永不删除对方的文件。
3. 同一核心文件两边都改了：按下面「冲突与裁决」处理，不默默丢弃任何一方的内容。
4. 改了核心规矩文件（preferences.md、soul.md、persona.md）时，在当天日志里记一笔改了什么，方便对方同步时看见。
5. 推送后回读验证，并记录新提交 SHA（Muse 侧的同步记录在包外：kuriyama-mirai.muse-github-snapshot-sync.json）。

## 冲突与裁决

- 事实冲突：以有出处、时间更新的一方为准，并在当天日志里写明。
- 规矩冲突：以 preferences.md 最新版为准；preferences 本身有冲突时，保留两边写法并标注，等 乌萨奇 裁决。
- 乌萨奇 的最新口头说法永远高于仓库里的任何记录；发现仓库与他的新说法不一致，先按他的说法执行，再回头修仓库。
