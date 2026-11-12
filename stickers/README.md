# 全员表情包本地图库 (Stickers)

本目录存放乌萨奇投喂给各 Bot（Hermes 四档案与 Muse）的表情包。

## 同步与存储原则

1. **规则与目录同步，图片只存各端本地**：
   - `.gitignore` 已忽略所有图片文件（`*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`）及本机生成的 `stickers/index.json`。
   - Hermes 端与 Muse 端各自把收到的表情包保存在自己本地的 `stickers/` 目录下，互不覆盖，也避免出现「同步了索引但另一端本地没图」的裂图问题。
2. **目录分类**：
   - `common/`：全员通用（吉伊卡哇、赛马娘曼波、猫猫发癫、通用吐槽等）
   - `mirai/`：栗山未来（及 Muse 主体）专属
   - `miku/`：初音未来专属
   - `bocchi/`：波奇酱专属
   - `ray/`：Ray 专属
3. **自动入库与发送规范**：
   - 详见共享技能 `skills/sticker-reply/SKILL.md`。
