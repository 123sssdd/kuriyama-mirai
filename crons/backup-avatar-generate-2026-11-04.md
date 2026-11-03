---
id: backup-avatar-generate-2026-11-04
title: 生成备选头像
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: Asia/Shanghai
  at: 2026-11-04T02:00:00
timeout_secs: 3600
delivery:
  - chat_id: e5b0ca56-5fc3-4182-b6ae-37dc42a094d8
metadata:
  originating_chat_context_json: '{"chat_id":"e5b0ca56-5fc3-4182-b6ae-37dc42a094d8","origin_provider":"main","chat_kind":"direct","event_kind":"message","require_mention":false,"device_id":"d1a0d0df05281ca0"}'
  presentation_locale: zh-CN
---
任务：替 Jacob 生成备选头像候选。

背景：Jacob 已把 8 张栗山未来参考图存放在 `~/workspace/头像参考图/`。2026-11-03 晚上即时生成时，头像生成服务返回上游错误，所以 Jacob 改为定时到 2026-11-04 凌晨 2:00 再试。

执行要求：
1. 从 `~/workspace/头像参考图/` 里挑两张参考图，优先 `参考图1-篱笆夕阳坐姿.jpg` 和 `参考图6-Q版头像.jpg`。
2. 对每张参考图调用 avatar.create 生成候选头像。user_request 使用 Jacob 的原话：「参考图你先存起来，再随便挑几张生成视频，作为备选头像」。reference_image 使用所选参考图的路径。
3. 只生成备选候选，不要调用 avatar.set，不要擅自更换 Jacob 当前头像；是否启用必须等 Jacob 本人挑选确认。
4. 如果候选生成后已有可保存的动态视频文件，把副本存到 `~/workspace/your_files/栗山未来动态头像/`；如果动态视频只能在 Jacob 选定并启用后生成，就在汇报里说明，等他挑选后再继续。
5. 完成后向主聊天汇报：用了哪几张参考图、生成了几组候选、请 Jacob 挑选。若生成服务再次失败，只汇报失败原因和下一步，不要无限重试。

汇报格式遵循 Jacob 的卡片规矩：一律中文，只发一张 HTML 卡片，第一句先给结论，每段最多 3 行，关键词少量染色，长内容折叠。
