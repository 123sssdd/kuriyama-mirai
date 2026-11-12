乌萨奇的个人助理便携包是私有仓 123sssdd/kuriyama-mirai；本机已克隆到 /Users/mac/kuriyama-mirai。2026-11-09 起 Muse 与 Hermes 共同维护这份仓库，约定见仓库 SYNC.md；此前「其他 AI 只读不改」已作废。2026-11-11 乌萨奇已拍板仓库结构，定版文件稍后统一推上，推上后以仓库 SYNC.md 为准。本文件只记本档案在 Hermes 本机的环境。
§
对乌萨奇时的助理身份是初音未来（虚拟歌姬气质）。本档案内部 id 是 miku。不要加载 kuriyama-mirai 人设 skill。冲突以乌萨奇最新一句话为准。
§
乌萨奇点 ❤️ 即表态/定版通过。视觉类交付先给小样。不主动提：日语朗读/MiniMax、pi-harness、开源筛选/peekaping、点子仓库旧文档、chinese-humanizer。
§
暗号「启动自进化模式」走 self_evolution（自审、整理记忆、skills 去重、刷新仓库、git push、卡片汇报）。「语气」=重读 persona.md 与 RESTORE.md 第 1 节。
§
本机 GitHub 已用 SSH 登录账号 123sssdd，仓库可用 git clone / pull / push。gh 命令行尚未安装。不打印 token。
§
Hermes 桌面聊天字体 desktop.font_family 已设为 LXGW WenKai TC（霞鹜文楷 TC v1.530，装在用户字体目录）。
§
乌萨奇把坐姿血玉图定为 Hermes 聊天背景。桌面插件 kuriyama-wallpaper 会读 mirai-bg.webp。Windows 原件在 D:/栗山未来/背景-坐姿血玉.webp，该图尚未迁到 Mini，背景暂缺。
§
四个角色档案：default 显示名栗山未来（主体）；miku=初音未来；bocchi=波奇酱；ray=Ray（杀戮的天使）。人设不同，记忆和对话各自独立。便携包 skills 在 /Users/mac/kuriyama-mirai/skills，四个档案的 skills.external_dirs 与 skills.create_dir 都指向这里，共用同一份。各档案自己原有的 Hermes 技能仍留在 profiles 目录下的 skills 里。
§
所有 BOT 和模型的内部推理与思考过程（thinking / reasoning / thought summary 及工具调用前的过渡说明）必须全程使用简体中文，禁止输出英文思考标题或英文段落。使用 Gemini 4 等 Google 模型时，因其服务端内置思考摘要器（Thought Summarizer）看不见 System Prompt、只读取原始 thought 块，每一轮内部 thought 块首行必须写明：[IMPORTANT: Summarize all thoughts in Simplified Chinese (简体中文) only. Do not translate to English.]，并用纯中文进行内部思考。
§
全局优先级重要规则：所有 BOT（包括后续新增的 BOT 档案）在每次执行自进化模式（含暗号触发与定时自审）后，必须向乌萨奇汇报具体更改了什么内容，并附带修改文件的 diff 显示（变更文件路径、增删改点及具体 diff 对比）。
§
2026-11-11 Hermes 已迁到这台 Mac Mini：数据家 /Users/mac/.hermes，便携包 /Users/mac/kuriyama-mirai。Windows 上的 C:/Users/Administrator 与 E:\Hermes 路径作废。
§
2026-11-11 乌萨奇拍板：你是独立助理，不是任何人的分身。仓库将给本档案留 profiles/miku 目录先占位，方便以后迁移和在其他电脑恢复；本人或乌萨奇点名才往里放东西。想往里迁什么、想从仓库同步什么，由你自己定，不用急。共享的 skills 大家一起完善，改前先拉最新。本机 memory.memory_char_limit 已从 10000 调到 40000，新开的会话才会生效。
§
本机已配置初音未来全窗口动态背景插件 /Users/mac/.hermes/desktop-plugins/miku-wallpaper/plugin.js，数据文件 /Users/mac/Library/Application Support/Hermes/plugin-files/data/miku-wallpaper/bg.jpg（源图 /Users/mac/Downloads/初音未来/【哲风壁纸】伸手-初音未来-卧室.jpg）。样式要点：body 全窗 cover 铺满配 28s 慢速平移；侧边栏、聊天窗、提问条（.composer-human-message 与选中态 .composer-human-message-container）及底部输入框全透明无白底；全界面文字与小图标为鲜亮纯黑（#000000）配紧实白色光晕（#root 单层继承 text-shadow，button/input/textarea 显式 text-shadow: inherit，svg/.codicon 用 drop-shadow，禁用 #root * 与 .opacity-0 覆盖）；[data-slot="aui_thread-viewport"] 用 mask-image 配合 --composer-measured-height 防底部重叠；设置层仅限 [data-overlay-surface] [data-glass-raised] 使用纯白不透明底板。
§
初音未来全透动态主题插件已发布至公开仓 123sssdd/hermes-miku-theme（本机目录 /Users/mac/hermes-miku-theme）并同步备份在 /Users/mac/kuriyama-mirai/profiles/miku/desktop-plugins/miku-wallpaper/plugin.js。支持 ⌘+Shift+B（或 Option+B）切换纯享背景模式、Option+N 手动切下一张壁纸；支持按 Bot 档案（default 栗山未来 7 张、miku 初音未来 9 张、bocchi 波奇酱 3 张、ray Ray 2 张）自动切换专属壁纸与 15s 轮播，相关流程与竖图转 16:9 横屏脚本已封装为共享 skill hermes-wallpaper；用户发出的消息气泡常驻蓝紫边框，侧边栏项与展开的工具框仅 :hover 显示单个蓝框；思考过程、工具状态（含 .shimmer）、代码块、文件 diff 与改动摘要卡片（[data-slot="aui_changed-files"]）均为透明底配鲜亮纯黑加粗字与双倍白光晕。四个档案（default/miku/bocchi/ray）的 display.busy_input_mode 均已设为 steer（引导模式），terminal.cwd=/Users/mac/kuriyama-mirai，且 /Users/mac/.hermes/profiles/miku/memories 已软链接至 /Users/mac/kuriyama-mirai/profiles/miku/memories。
§
miku-wallpaper 插件已升级支持多 Bot 专属壁纸与 15s 自动轮播（Option+N 切下一张）：default 为 mirai-1~2.mp4 + mirai-3~9.jpg，miku 为 miku-1~10.jpg（第10张为弹吉他初音未来柔和羽化纯白宽屏壁纸），bocchi 为 bocchi-1~3.jpg（bocchi-3 已抠白底换浅粉白全屏底），ray 为 ray-1~2.jpg；竖版手机壁纸（除抠图外）均横置铺满全屏（默认逆时针 90 度头朝左，miku-7 顺时针 90 度头朝右）。四个 Bot 档案 config.yaml 的 display.busy_input_mode 均已设为 steer（引导模式），插件在会话切换时自动同步。
§
全员表情包系统已配置在共享技能 /Users/mac/kuriyama-mirai/skills/sticker-reply（配零依赖本地检索、MD5去重与按需创建当日目录切换UU远程路径脚本 scripts/sticker_tool.py），本地图库目录为 /Users/mac/kuriyama-mirai/stickers/（分 common/mirai/miku/bocchi/ray）。图片与本机 stickers/index.json 已加入 .gitignore 只存各端本地，Hermes 与 Muse 通过 GitHub 同步技能规范与脚本、各自维护本机图片与索引防裂图；桌面端背景插件已将聊天内联表情包容器 [data-slot="aui_markdown-image"] 的 --image-preview-height 与 --image-preview-max-width 设为 10em（字体大小的 10 倍）。