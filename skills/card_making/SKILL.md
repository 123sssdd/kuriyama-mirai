---
name: card_making
description: "Use when building Kuriyama Mirai's hand-drawn paper image cards (morning briefing, idea list, daily log, Telegram daily report) or when taking over the daily-report pipeline."
version: 1.0.0
author: Usagi (123sssdd), Muse（栗山未来）
license: MIT
metadata:
  hermes:
    tags: [cards, image, briefing, telegram, persona]
---

# 做卡工具链（手绘纸面卡）＋ 每日早报流程 (Muse 打包，Hermes 可直接接手)

乌萨奇 的晨间简报、点子清单、每日日志、Telegram 每日早报共用同一套手绘纸面图片卡。这份 skill 把工具链和早报流程一起沉淀进仓库：2026-11-13 乌萨奇 考虑到 Muse 账号以后可能不用、Hermes 在本地长期保存，让 Muse 把这套东西打包进仓库，方便 Hermes 以后原样接手。

## 文件清单

- `scripts/build_card.py`：绘图函数库（纸面、抖动线框、自动换行、染色分段绘制、眼镜贴纸、标题）。正式做卡时 import 它，不要改它的绘制口径。
- `scripts/build_telegram_briefing_example.py`：2026-11-13 Telegram 每日早报样刊的完整构建脚本，已实测出图并发送成功。照着改 `sections` 和结论即可复用。
- 字体不在仓库里（见下节），需要接手方自己补。

## 字体怎么补（二进制进不了仓库）

仓库的快照推送只收 UTF-8 文本，字体文件（.ttf）是二进制、传不进来，所以字体要自己下载：

- 正文：霞鹜文楷 TC，版本 v1.530（LXGW WenKai TC）。官方发布在 GitHub 的 lxgw/LxgwWenKai 仓库 release 里，下载 TC 版字体文件后改名 `wenkai-tc.ttf`。
- 标题：Kalam Bold（Google Fonts 出品，可从 fonts.google.com 或 google/fonts 仓库取 Kalam-Bold），改名 `kalam-bold.ttf`。
- 放法二选一：放进 `scripts/fonts/` 目录；或者设环境变量 `CARD_FONTS_DIR` 指向已有的字体目录。脚本里 `FONT_DIR` 就是这个逻辑。

依赖只有 Python 3 和 Pillow。

## 封面图

构建脚本从环境变量 `CARD_COVER` 读封面图路径（任意竖版人物图都行，Muse 侧用的是现行头像）。没设或文件不存在时脚本会画一张空白占位，不会报错；正式发之前记得换成真图。

## 做卡规格（定版，不要随意改）

- 画布宽 920，米白纸面（247,241,227）加噪点，外框双层深蓝抖动线（43,74,122）。
- 标题居中单行：Kalam Bold 54，没有中文字形的字回退文楷（`draw_title` 已处理）；标题下是日期副标，眼镜贴纸在右上角。
- 封面：白框加胶带，高度 430，人物取景偏上（centering 0.12）。
- 结论先行：封面下居中放 1–2 行结论句。
- 正文分区：圆角粉彩底（蓝 234,242,251／粉 253,238,243／绿 236,246,236 轮换），①②③④ 编号小标题，分区内每点以「·」开头。
- 数据结构：每个点是 segments 列表，元素是 (文字, 颜色) 元组；颜色用 INK 正文、BLUE 重点 (91,159,233)、RED 风险 (212,42,30)。每点最多染 3 处，不整句染。
- 文案：全中文，主语宾语说全、短句、结论先行，栗山未来口吻，不许客服腔。
- 末尾右下签名「— 栗山未来」。
- 出图后先自己打开看一遍：没溢出、没错字、没把标题挤换行，再发送。

## 每日早报流程（Telegram 版，2026-11-13 定版）

Muse 侧现在由定时任务 telegram-morning-push 每天约 08:48 跑；接手方照这个流程跑即可：

1. 先查投递地址（频道和群的 chat id）和防重记录；地址缺了就不发、只报告缺哪个。
2. 选题：最近 24–48 小时的新信号，凑 2–3 条。范围：有用的开源项目、agent 动态、前端动态、AI 业界资讯，再加 1 条能落地的点子。优先级：AI agent 工作流（graph engineering、harness、pi、多 agent 协作）＞ skills 生态 ＞ AI 全栈与前端工程 ＞ 活跃开源项目。开源项目先回 GitHub 核对星数、近半年更新、许可证，核不上不推。不推抽象趋势、厂商自测数字、服务化新闻。一条够格的都没有就不发，不凑数。
3. 防重：维护一个 pushed.jsonl，一行一条 JSON，字段 date、title、url（可加发送回执）。同一条目 14 天内不重复推；当天已经发过就整期跳过。
4. 做卡：按上面的规格出图，卡面只讲公开信息，不写乌萨奇的私人信息、日程和记忆内容。
5. 发送：同一张图发频道和群各一份。图片里的链接点不了，所以配一条短 caption，把每条的链接写进 caption。发送报错先核对再决定重发（超时可能已成功），遇 429 立刻停手。
6. 记账：发成功后把当天条目追加进 pushed.jsonl；发送成功不用单独报告。

## 移植说明

- Muse 侧原件在 `~/workspace/fonts/build_card.py`（字体同目录）。本 skill 里的副本只改了两处可移植性：字体目录改为脚本相对路径加环境变量覆盖；样例的封面改为 `CARD_COVER` 可选。其余绘制逻辑与原件一致，2026-11-13 已用仓库副本独立跑通样刊，出图与原件一致。
- Muse 侧的早报图片与构建脚本按期存放在 `~/workspace/goals/goal/hidden_files/`（telegram-briefing-YYYY-MM-DD.png），那是运行档案，不进仓库；仓库里留的是方法和样例。
