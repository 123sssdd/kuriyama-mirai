---
name: sticker-reply
description: "Use when saving or replying with chat stickers/memes."
version: 1.0.0
author: Usagi (123sssdd), Miku
license: MIT
metadata:
  hermes:
    tags: [stickers, meme, persona, chat, media]
---

# 全员表情包收图与斗图规范 (Hermes & Muse 通用)

让所有 Bot（栗山未来/Muse、初音未来、波奇酱、Ray）在收到乌萨奇投喂的表情包时自动识图入库，并在日常对话中适时回复贴切甚至有点癫的表情包。

## When to Use

- 乌萨奇发来图片或本地目录并说「存起来」「做成表情包」时
- 日常对话中出现闲聊接梗、圆满交差、报错滑跪或乌萨奇主动发表情包斗图时

## 核心架构（Git 同步规范 + 各端本地存图）

1. **仓库图库根目录**：`<repo_root>/stickers/`（Hermes 本机为 `/Users/mac/kuriyama-mirai/stickers`）。
2. **图片与本机索引不上传 GitHub**：
   - `.gitignore` 已忽略 `stickers/**/*.{png,jpg,jpeg,gif,webp}` 与 `stickers/index.json`。
   - **Hermes 与 Muse 各自维护本机的 `stickers/index.json`**：防止一端同步了索引但另一端本地没有对应图片导致发裂图。
3. **分类子目录**：
   - `common/`：全员通用池（吉伊卡哇、曼波、通用发癫、猫猫等）
   - `mirai/`：栗山未来 / Muse 专属
   - `miku/`：初音未来专属
   - `bocchi/`：波奇酱专属
   - `ray/`：Ray 专属

## 工作流一：收到表情包并入库（Save & Index）

当乌萨奇在聊天中发来图片/动图并说「存起来」「加进表情包」，或给出本地表情包文件夹路径时：

1. **视觉识图**：调用视觉分析工具（如 `vision_analyze`）查看每张图片的画面角色、配字、情绪和发癫程度。
2. **归类与命名**：
   - 按角色或通用属性放入 `stickers/<category>/`。
   - 用简短语义拼音或英文重命名（如 `chiikawa-pass-out.jpg`、`bocchi-glitch.gif`），保留原扩展名。
3. **更新本机 `stickers/index.json`**：
   - 若本机 `stickers/index.json` 不存在，先初始化 `{"version": 1, "stickers": []}`。
   - 追加或更新条目，字段遵循 `stickers/index.example.json`：
     - `id`：唯一标识（如 `common-chiikawa-cry`）
     - `file`：相对 `stickers/` 的路径（如 `common/chiikawa-cry.jpg`）
     - `category`：`common` / `mirai` / `miku` / `bocchi` / `ray`
     - `text`：图上的配字（无字填 `无配字`）
     - `vibe`：画面动作与情绪描述（如 `两眼放空、精神状态美丽`）
     - `craziness`：1~5 整数（1=日常可爱，3=搞笑吐槽，5=彻底发癫）
     - `triggers`：适用场景数组（如 `["写代码翻车", "被夸奖", "跟着一起发癫"]`）

## 工作流二：在回复中发送表情包（Reply with Sticker）

### 1. 触发时机与频率（硬指标）
- **控制频率**：每 **3 到 5 轮** 对话最多发 1 张；乌萨奇主动发表情包斗图或明确要求时可每轮接招。
- **适合触发的瞬间**：
  - 闲聊吐槽、接梗、气氛欢脱或乌萨奇在发癫时
  - 干完一件大活、圆满交差得瑟时
  - 搞错事情、命令报错、当场认错滑跪时
- **严禁发图的场景**：
  - 正在严肃排查复杂故障、输出大段长文提纲时（避免打断千问朗读节奏）
  - 本地 `stickers/index.json` 为空或对应图片文件在本地磁盘不存在时

### 2. 选图优先级
1. 先读取本机 `stickers/index.json`。
2. 优先挑当前 Bot 专属目录（如波奇酱优先挑 `bocchi/`，社会性死亡或融化发癫优先）和 `common/` 通用池中匹配当前情绪的图。
3. 发送前必须确认该图片文件在本机磁盘真实存在。

### 3. 跨端发送语法
- **Hermes 桌面端 / 移动端**：
  在文字回复的末尾空一行，单独占一行写 `MEDIA:/绝对路径`（不要用 Markdown `![](path)`，本地图片只能用 `MEDIA:`）：
  ```text
  MEDIA:/Users/mac/kuriyama-mirai/stickers/common/xxx.gif
  ```
- **Muse 端**：
  使用 Muse 当前宿主环境支持的本地图片发送方式或对应内联指令引用本机 `stickers/` 下的真实路径。
- **配合千问朗读**：
  先用一两句顺口的话把正事或吐槽说完，表情包放在最后一行收尾，不要因为发了表情包就把正文写成干巴巴的半句话。
