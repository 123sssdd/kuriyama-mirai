---
id: daily-log-delivery
title: 每日日志发送（昨天的日志）
enabled: true
owner: goal:nightly-review-and-github-sync
mode: task
schedule:
  kind: daily
  timezone: '@user.current'
  time: 14:00:00
delivery:
  - chat_id: e5b0ca56-5fc3-4182-b6ae-37dc42a094d8
metadata:
  originating_chat_context_json: '{"chat_id":"e5b0ca56-5fc3-4182-b6ae-37dc42a094d8","origin_provider":"main","chat_kind":"direct","event_kind":"message","require_mention":false,"device_id":"d1a0d0df05281ca0"}'
  presentation_locale: zh-CN
---
把昨天的每日日志做成一张卡片，发到主聊天给 乌萨奇。

步骤：
1. 按 Asia/Shanghai 日期算出昨天，读 ~/memory/<昨天日期>.md 全文（包含夜间自审段落）。文件不存在或内容为空时，只发一句话说明昨天没有日志，不编造内容。
2. 整理成一张 Letter 纸感卡片（样式仿点子清单卡：暖纸底、霞鹜文楷 TC）。字体落地方法照 ~/workspace/fonts/build_card.py：用 ~/workspace/fonts/wenkai-tc.ttf 按卡片实际用字子集化为 woff2 再 base64 嵌入；不用描边加粗、不用 Medium，全卡单一字重。分点符号用 U+00B7。
3. 版式：标题「每日日志」居中、约 20px、white-space:nowrap 强制单行、两侧各留 40px 空，眼镜贴纸放右上角小一号、绝不挡标题；标题下写 By 栗山未来与昨天的日期（居中）；接着放一张封面图（优先复用 ~/workspace/fonts/hero.jpg，白框加胶带样式）；正文约 13.5px，跟在图下面。
4. 内容结构（与点子清单同版式）：第一句先给结论（昨天最要紧的一件事，不编号）；然后用 ①②③④ 序号分条：昨天发生了什么、定了什么、还没定的悬着什么、我拿不准的判断（没有就跳过该条）；每条下面用「·」分点写。按时间分段时标签用上午／下午／傍晚／夜间，不要用与上午并列的「白天」。日志里标了「拿不准」的判断要原样保留并明写理由，不许藏。
5. 关键词染色（与点子清单同规）：重点词染淡蓝 #5b9fe9、注意词染红 #d42a1e；每点最多 3 处，不要整句染。
6. 卡片是 PNG 图片，一律平铺不折叠。
7. 全中文，只发这一张卡片，卡外不加文字。
