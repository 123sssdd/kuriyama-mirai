#!/usr/bin/env bash
# ==============================================================================
# Hermes 初音未来多角色动态壁纸与轮播插件：一键安装与迁移恢复脚本
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HERMES_PLUGIN_DIR="$HOME/.hermes/desktop-plugins/miku-wallpaper"
DATA_TARGET_DIR="$HOME/Library/Application Support/Hermes/plugin-files/data/miku-wallpaper"

echo "🌸 正在安装/恢复初音未来动态壁纸与轮播..."

# 1. 确保数据家桌面插件目录存在并同步脚本
mkdir -p "$HERMES_PLUGIN_DIR"
if [ "$SCRIPT_DIR" != "$HERMES_PLUGIN_DIR" ]; then
  echo "📦 正在同步插件脚本到数据家 $HERMES_PLUGIN_DIR ..."
  cp "$SCRIPT_DIR/plugin.js" "$HERMES_PLUGIN_DIR/plugin.js"
  [ -f "$SCRIPT_DIR/plugin.yaml" ] && cp "$SCRIPT_DIR/plugin.yaml" "$HERMES_PLUGIN_DIR/plugin.yaml"
  [ -d "$SCRIPT_DIR/wallpapers" ] && cp -R "$SCRIPT_DIR/wallpapers" "$HERMES_PLUGIN_DIR/"
fi

# 2. 确保 Hermes 运行态数据目录存在并还原全套壁纸
mkdir -p "$DATA_TARGET_DIR"
WALLPAPERS_SOURCE="$HERMES_PLUGIN_DIR/wallpapers"
if [ ! -d "$WALLPAPERS_SOURCE" ] && [ -d "$SCRIPT_DIR/wallpapers" ]; then
  WALLPAPERS_SOURCE="$SCRIPT_DIR/wallpapers"
fi

if [ -d "$WALLPAPERS_SOURCE" ]; then
  echo "🖼️ 正在还原全套壁纸至应用数据目录 $DATA_TARGET_DIR ..."
  cp -R "$WALLPAPERS_SOURCE"/* "$DATA_TARGET_DIR/"
  COUNT=$(ls -1 "$DATA_TARGET_DIR"/*.jpg 2>/dev/null | wc -l | tr -d ' ')
  echo "✅ 成功还原 $COUNT 张专属轮播壁纸（miku / mirai / bocchi / ray）！"
else
  echo "⚠️ 未在 $WALLPAPERS_SOURCE 找到壁纸源文件，请确保 wallpapers 文件夹存在。"
fi

echo "✨ 全部完成！打开 Hermes 桌面端按 ⌘+R 刷新即可体验全套动态壁纸与轮播。"
