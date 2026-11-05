# 复原指南：换号或换 AI 时，怎么把「栗山未来」恢复回来

这个仓库是 乌萨奇 的个人助理「栗山未来」的便携包。目标：即使原 Muse 账号不续费，在新账号或别的 AI 上按下面步骤，也能快速恢复同一个助理。仓库本身不含任何密钥、令牌、密码；所有凭据都要由 乌萨奇 在新环境里重新录入。

## 第一步：人格与记忆（纯文本，直接套用）
- identity.md：助理的名字、原型、标志 emoji。
- persona.md：人设与说话方式。
- soul.md：助理的性格底色与「和 乌萨奇 在一起时的心法」。
- user.md：乌萨奇 的基本信息、称呼（乌萨奇为主，偶尔先輩）、职业与兴趣。
- preferences.md：回复格式、表达习惯、做事规矩（最重要，务必先读）。
- proactive-preferences.md：主动消息的偏好与时间窗。
- memory/MEMORY.md：长期记忆主文件；memory/2026-11-02.md、memory/2026-11-03.md、memory/2026-11-04.md、memory/2026-11-05.md 是逐日日志，细节查这里。
- agents.md：工作区操作约定（目前基本是模板）。

## 第二步：skills
- skills/ 下是全部 33 个自定义 skill（每个含 SKILL.md 与 skill.yaml），整体拷进新环境的 custom-skills 目录即可。
- 规矩：skills 只保留最新做法、重复及时合并，见 self_evolution 与 preferences.md。

## 第三步：重新连接（凭据不在包里）
- GitHub：新环境重新走 GitHub 连接器授权，目标仓库仍是 123sssdd/kuriyama-mirai（私有）。同步方式是快照推送（push-files，只支持 UTF-8 文本、无删除），同步记录文件在包外：~/workspace/kuriyama-mirai.muse-github-snapshot-sync.json（该文件按流程不进仓库，换环境时按当前远程 head 重新对齐）。
- 滴答清单：connectors/custom.dida365/ 里有连接器文档、connector.yaml 和 MCP 客户端 bin/client.py，整体拷回 custom-connectors 即可；但 API 口令必须由 乌萨奇 在滴答网页版「头像→设置→账户与安全→API 口令」重新创建，并通过安全保管库录入，旧口令不在包里。
- Gmail、Google Calendar 等其他连接：原环境未确认接通过，按需重新连接。

## 第四步：定时任务（crons/ 里是定义全文，照着重建）
- nightly-review-sync：每天 00:00 自审当天、整理记忆与 skills、同步本仓库；静默执行。定义见 crons/nightly-review-sync.md，它归属目标 goals/nightly-review-and-github-sync/GOAL.md。
- morning-briefing：每天约 07:45–07:46 发晨间简报（研究有料才报＋点子栏）；定义见 crons/morning-briefing.md。
- daily-log-delivery：每天下午 14:00 发昨天的每日日志卡；定义见 crons/daily-log-delivery.md。
- 备选头像（backup-avatar-generate-2026-11-04）：2026-11-05 乌萨奇定：备选头像任务已删除，无需重建。

## 第五步：目标、Feed 与其他
- 长期目标「持续想和乌萨奇有关的点子」：见 goals/jacob/GOAL.md，在新环境重建为同名目标。
- Feed 提示词：全文在 feed-prompt.md，新环境把 Feed 提示词替换为它。
- 音乐馆：歌单与卡片模板在 music/；歌曲音视频、头像图与视频都是二进制，进不了本仓库（快照推送限制），原文件在原环境 ~/workspace/音乐馆/ 与资料库里，需 乌萨奇 另行拷贝。音乐馆播放页是原环境的资料库 artifact（slug：yin-le-guan-bo-fang-ye），新环境可按 music/ 里的歌单重建。
- 头像：清单与复原方法见 avatar.md。

## 注意
- 本包只增改、不删文件；发现包内与 乌萨奇 最新说法冲突时，以他最新说法为准，并回头修正包内文件。
