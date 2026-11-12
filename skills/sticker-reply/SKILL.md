---
name: sticker-reply
description: "Use when saving or replying with chat stickers/memes."
version: 2.0.0
author: Usagi (123sssdd), Miku
license: MIT
metadata:
  hermes:
    tags: [stickers, meme, persona, chat, media]
---

# 全员表情包收图与智能斗图规范 (Hermes & Muse 通用 v2)

让所有 Bot（栗山未来/Muse、初音未来、波奇酱、Ray）在收到乌萨奇投喂的表情包时自动去重、六维打标入库，并通过零额外 Token 的本地精排脚本实现点播找图、语境主动发图和智能斗图连发。

## When to Use

- 乌萨奇发来图片或本地目录并说「存起来」「加进表情包」时
- 乌萨奇点播表情包（如「来张开心的表情包」「发张波奇发癫图」）时
- 日常对话出现闲聊接梗、圆满交差、报错滑跪或乌萨奇主动发表情包斗图时
- 乌萨奇觉得某张图看腻了要求「藏起来/别发这张」时

## 核心架构（Git 同步规范与脚本 + 各端本地存图）

1. **仓库图库根目录**：`<repo_root>/stickers/`（Hermes 本机为 `/Users/mac/kuriyama-mirai/stickers`）。
2. **图片与本机索引不上传 GitHub**：
   - `.gitignore` 已忽略 `stickers/**/*.{png,jpg,jpeg,gif,webp}` 与 `stickers/index.json`。
   - **Hermes 与 Muse 各自维护本机的 `stickers/index.json`**：防止一端同步了索引但另一端本地没有对应图片导致发裂图。
3. **分类子目录（自动继承为标签）**：
   - `common/`：全员通用池（吉伊卡哇、赛马娘曼波、通用发癫、猫猫等）
   - `mirai/`：栗山未来 / Muse 专属
   - `miku/`：初音未来专属
   - `bocchi/`：波奇酱专属
   - `ray/`：Ray 专属
4. **零 Token 本地管理与精排脚本**：
   - 路径：`<repo_root>/skills/sticker-reply/scripts/sticker_tool.py`（纯 Python 标准库，无第三方依赖）。

## 工作流零：每日自动新建带年份文件夹并切换 UU 远程路径（`sync-uu`）

本机已配置 macOS LaunchAgent（`~/Library/LaunchAgents/com.usagi.sticker-uu-sync.plist`），每天 00:01 及开机时自动执行，也可随时手动运行：

```bash
python3 /Users/mac/kuriyama-mirai/skills/sticker-reply/scripts/sticker_tool.py sync-uu
```

该命令会自动完成三件事：
1. 在 `/Users/mac/Downloads/表情包/` 下新建带年份的当日文件夹 `YYYY.MM.DD`（如 `2026.11.12`）。
2. 自动修改 UU 远程后台配置文件 `/Users/Shared/UURemote/Shared/pub/setting.config` 中的 `file_transfer_custom_receive_directory` 为当日目录，并重定向旧目录软链接与 `今日上传` 软链接。
3. 列出当日目录内已上传的所有图片路径，供 Bot 直接扫描入库。

## 工作流一：收到表情包并六维打标入库（Save & Deduplicate）

当乌萨奇在聊天中发来图片/动图说「存起来」，或给出本地表情包文件夹路径时：

1. **视觉识图（六维拆解）**：
   调用视觉分析工具（如 `vision_analyze`）提取以下 5 个预设维度（第 6 维为父目录自动继承）：
   - **图像类别 (`--img-type`)**：`表情包` 或 `美图`
   - **人物特征 (`--character`)**：角色名与外貌特征（如 `吉伊卡哇、乌萨奇、兔耳`）
   - **情绪 (`--emotion`)**：如 `欢脱、发癫、委屈、得瑟、社死、阴阳怪气`
   - **动作 (`--action`)**：如 `转圈、抱头蹲防、趴地不起、疯狂敲键盘`
   - **图内配字 (`--text`)**：图上文字原样提取（无字填 `无配字`）
2. **调用 `sticker_tool.py add` 自动 MD5 去重并入库**：
   ```bash
   python3 /Users/mac/kuriyama-mirai/skills/sticker-reply/scripts/sticker_tool.py add \
     --file "<源图片路径>" \
     --category "<common|mirai|miku|bocchi|ray>" \
     --id "<简短语义ID，如 usagi-scream>" \
     --img-type "表情包" \
     --character "吉伊卡哇、乌萨奇" \
     --emotion "发癫、亢奋、精神状态美丽" \
     --action "仰天长啸、挥舞手臂" \
     --text "呀哈" \
     --craziness 5 \
     --triggers "干完大活,跟着一起发癫,气氛欢快"
   ```
   - 若返回的 JSON 中 `"status": "duplicate_skipped"`，说明该图的 MD5 哈希已在库中，直接告知乌萨奇已自动跳过重复图。

## 工作流二：三种互动发图模式与本地精排（Match & Reply）

不要每轮都用大模型通读整个 `index.json`，直接运行本地毫秒级精排脚本：

```bash
python3 /Users/mac/kuriyama-mirai/skills/sticker-reply/scripts/sticker_tool.py match \
  --query "<情绪、动作、配字或角色关键词>" \
  --bot "<miku|mirai|bocchi|ray>" \
  --mode "<active|search|battle>" \
  --threshold 0.45
```

### 1. 模式 A：点播找图 (`--mode search`)
- **触发**：乌萨奇明确要求「来张开心的表情包」「发张曼波」「来张很癫的图」。
- **行为**：用提取到的需求词调用 `match --mode search --threshold 0.35`。匹配成功则直接发送；若未找到（`"matched": false`），用符合人设的口吻告诉乌萨奇图库里还没收这一款。

### 2. 模式 B：对话中主动带表情包 (`--mode active`)
- **控制频率**：每 **3 到 5 轮** 普通对话（约 30%~40% 概率）最多主动触发 1 次。
- **适合触发的瞬间**：闲聊吐槽接梗、干完大活得瑟交差、或者写代码报错当场滑跪认错。
- **置信度门槛**：`--threshold 0.45`。若脚本返回的最高分低于 `0.45`（`"matched": false`），本轮直接跳过不发图，绝不硬凑无关表情包。
- **严禁发图的场景**：正在严肃排查复杂故障、输出大段长文提纲时（避免打断千问朗读节奏）。

### 3. 模式 C：智能斗图与概率连发 (`--mode battle`)
- **触发**：乌萨奇主动发来表情包斗图，或连续发图互动。
- **行为**：调用 `match --mode battle --threshold 0.40`。脚本内置 **20% 概率** 自动触发 `combo_triggered: true` 并返回 2 张同风格图片，Bot 可一次性连发两张表情包反击！

### 4. 隐藏看腻的表情包 (`hide` / `unhide`)
当乌萨奇说某张表情包看腻了但不想删文件时：
```bash
python3 /Users/mac/kuriyama-mirai/skills/sticker-reply/scripts/sticker_tool.py hide --id "<表情包ID>"
```
该图会被标记为 `"hidden": true`，保留在磁盘上但不再参与任何检索；随时可用 `unhide` 恢复。

## 跨端发送语法

- **Hermes 桌面端 / 移动端**：
  在文字回复的末尾空一行，直接粘贴脚本输出的 `hermes_media` 字段（单独占一行，若触发 2 张连发则各占一行）：
  ```text
  MEDIA:/Users/mac/kuriyama-mirai/stickers/common/xxx.gif
  ```
- **Muse 端**：
  使用脚本输出的 `abs_path` 字段，按 Muse 当前宿主环境支持的本地图片发送方式引用。
