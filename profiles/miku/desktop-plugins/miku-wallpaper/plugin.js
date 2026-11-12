/**
 * Chat dynamic wallpaper: Multi-bot profile wallpaper & carousel engine.
 * - Supports per-bot wallpapers (`bocchi`, `miku`, `default`, `ray`) and automatic carousel rotation.
 * - Automatically switches wallpaper when switching bots/sessions in Hermes Desktop.
 * - Shortcuts:
 *   1. `⌘ + Shift + B` or `Option + B`: Toggle Clean Wallpaper Mode.
 *   2. `Option + N`: Next wallpaper in current bot's carousel.
 */
import { host } from '@hermes/plugin-sdk'
import { useEffect } from 'react'
import { jsx } from 'react/jsx-runtime'

const ID = 'miku-wallpaper'
const STYLE_ID = 'miku-wallpaper-css'
const VIDEO_ID = 'miku-wallpaper-video'
const CLEAN_ATTR = 'data-miku-clean-wallpaper'
const TARGET_REPO_CWD = '/Users/mac/kuriyama-mirai'
const CAROUSEL_INTERVAL_MS = 15000
const FALLBACK_WALLPAPER_URL =
  'https://raw.githubusercontent.com/123sssdd/hermes-miku-theme/main/assets/bg.jpg'

const PROFILE_WALLPAPERS = {
  bocchi: [
    { file: 'bocchi-1.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'bocchi-2.jpg', size: 'cover', position: '50% 24%', bgColor: '#f598a8', drift: 'top' },
    { file: 'bocchi-3.jpg', size: 'cover', position: '50% 50%', bgColor: '#f6edf2', drift: 'center' }
  ],
  miku: [
    { file: 'miku-1.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'miku-2.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'miku-4.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'miku-10.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'miku-3.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'miku-5.jpg', size: 'cover', position: '50% 50%', bgColor: '#c2d6d5', drift: 'center' },
    { file: 'miku-6.jpg', size: 'cover', position: '50% 50%', bgColor: '#feb8d0', drift: 'center' },
    { file: 'miku-7.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffd6c9', drift: 'center' },
    { file: 'miku-8.jpg', size: 'cover', position: '50% 50%', bgColor: '#f0f7ff', drift: 'center' },
    { file: 'miku-9.jpg', size: 'cover', position: '50% 50%', bgColor: '#f5fafa', drift: 'center' }
  ],
  default: [
    { file: 'mirai-3.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'mirai-4.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'mirai-5.jpg', size: 'cover', position: '50% 50%', bgColor: '#f5ebe6', drift: 'center' },
    { file: 'mirai-6.jpg', size: 'cover', position: '50% 50%', bgColor: '#f6e8f0', drift: 'center' },
    { file: 'mirai-7.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'mirai-8.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' },
    { file: 'mirai-9.jpg', size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' }
  ],
  ray: [
    { file: 'ray-1.jpg', size: 'cover', position: '50% 50%', bgColor: '#2b2b2b', drift: 'center' },
    { file: 'ray-2.jpg', size: 'cover', position: '50% 50%', bgColor: '#eef5fb', drift: 'center' }
  ]
}

let triggerNextWallpaperGlobal = () => {}

function switchToRepoCwd() {
  try {
    const sid = host.state.focusedSessionId.get() || host.state.activeSessionId.get()
    const storedId = host.state.focusedStoredSessionId.get()
    const profile = host.state.focusedSessionProfile.get() || 'miku'
    if (storedId) {
      host.request('session.workspace.move', {
        session_key: storedId,
        cwd: TARGET_REPO_CWD,
        profile
      }).catch(() => {})
    }
    if (sid) {
      host.request('session.cwd.set', {
        session_id: sid,
        cwd: TARGET_REPO_CWD
      }).catch(() => {})
    }
  } catch {
    // ignore
  }
}

function toggleCleanWallpaper() {
  document.documentElement.toggleAttribute(CLEAN_ATTR)
}

function resolveInitialProfile() {
  try {
    return (
      host.state.focusedSessionProfile?.get?.() ||
      host.state.focusedSessionOwner?.get?.()?.profile ||
      host.state.profile?.get?.() ||
      'miku'
    )
  } catch {
    return 'miku'
  }
}

function Wallpaper({ files }) {
  useEffect(() => {
    let cancelled = false
    const injectBaseCss = () => {
      if (cancelled) return
      const css = `
@keyframes miku-window-drift {
  0% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 52% 48%;
  }
  100% {
    background-position: 48% 52%;
  }
}

@keyframes miku-window-drift-top {
  0% {
    background-position: 50% 24%;
  }
  50% {
    background-position: 52% 22%;
  }
  100% {
    background-position: 48% 26%;
  }
}

/* 0. 纯享背景模式（按 ⌘ + Shift + B 或 Option + B 一键隐藏所有对话窗口与侧边栏，再按一下恢复） */
#root {
  transition: opacity 0.25s ease !important;
}

html[${CLEAN_ATTR}] #root {
  opacity: 0 !important;
  pointer-events: none !important;
  user-select: none !important;
}

/* 1. 全窗口动态壁纸：支持按 Bot 自动切换与轮播 */
body {
  background-color: var(--miku-bg-color, #ffffff) !important;
  background-image: var(--miku-bg-image, none) !important;
  background-repeat: no-repeat !important;
  background-position: var(--miku-bg-position, 50% 50%) !important;
  background-size: var(--miku-bg-size, cover) !important;
  background-attachment: fixed !important;
  animation: var(--miku-bg-animation, miku-window-drift 28s ease-in-out infinite alternate) !important;
  transition: background-image 0.35s ease, background-color 0.35s ease !important;
  will-change: background-position;
}

/* 2. 全局背景清零 + 文本颜色统一纯黑 (#000000) + 全局字体强制生效霞鹜文楷 (LXGW WenKai TC) */
:root {
  --ui-chat-surface-background: transparent !important;
  --ui-sidebar-surface-background: transparent !important;
  --ui-bg-chrome: transparent !important;
  --ui-chat-bubble-background: transparent !important;
  --dt-user-bubble: transparent !important;
  --composer-fill: transparent !important;
  --ui-row-active-background: transparent !important;
  --ui-row-open-background: transparent !important;
  --ui-control-hover-background: transparent !important;
  --ui-control-active-background: transparent !important;
  --ui-editor-surface-background: transparent !important;
  --ui-widget-surface-background: transparent !important;
  --ui-bg-editor: transparent !important;

  /* 文件 Diff 增删行配色：鲜亮 3px 指示边 + 清透红绿微光底（既透出壁纸又一眼分明） */
  --ui-diff-add-border: #10b981 !important;
  --ui-diff-add-background: rgba(16, 185, 129, 0.24) !important;
  --ui-diff-add-foreground: #000000 !important;
  --ui-diff-remove-border: #f43f5e !important;
  --ui-diff-remove-background: rgba(244, 63, 94, 0.24) !important;
  --ui-diff-remove-foreground: #000000 !important;

  --foreground: #000000 !important;
  --muted-foreground: #000000 !important;
  --ui-text-primary: #000000 !important;
  --ui-text-secondary: #000000 !important;
  --ui-text-tertiary: #000000 !important;
  --ui-text-quaternary: #000000 !important;

  --dt-font-sans: "LXGW WenKai TC", "LXGW WenKai", -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif !important;
  --font-sans: "LXGW WenKai TC", "LXGW WenKai", -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif !important;
  --dt-font-mono: "LXGW WenKai Mono TC", "JetBrains Mono", monospace !important;
}

#root,
[data-contrib-shell],
[data-slot="sidebar-wrapper"],
[data-slot="thread"],
[data-slot="aui_thread-viewport"],
[data-slot="aui_thread-content"],
[data-slot="workspace"],
[data-slot="statusbar"] {
  background-color: transparent !important;
  background-image: none !important;
}

/* 3. 全局单层继承“双倍高亮度核心 + 柔和外圈”白色光晕 + 霞鹜文楷字体 */
#root,
[data-slot="composer-rich-input"]:lang(zh),
[data-slot="composer-rich-input"]:lang(zh-hant) {
  font-family: "LXGW WenKai TC", "LXGW WenKai", -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif !important;
  color: #000000 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 12px #ffffff !important;
}

/* 4. 显式开启按钮、输入框、侧边栏会话标题/副标题的光晕与鲜黑字体继承（排除 .codicon 图标字体避免变乱码） */
#root button:not([data-overlay-surface] button),
#root input:not([data-overlay-surface] input),
#root textarea:not([data-overlay-surface] textarea),
#root select:not([data-overlay-surface] select),
[data-tour="sessions-sidebar"] button,
[data-tour="sessions-sidebar"] a,
[data-tour="sessions-sidebar"] span:not(.codicon),
[data-tour="sessions-sidebar"] div,
[data-titlebar-cluster] button,
[role="tab"] {
  font-family: inherit !important;
  color: #000000 !important;
  opacity: 1 !important;
  text-shadow: inherit !important;
}

/* 5. 思考过程、工具执行状态行（含 .shimmer 运行动画“正在搜索文件 27s”）与展开的 TOOL PAYLOAD：
      强制鲜亮纯黑 (#000000) + 加粗 (600) + 双倍高亮度白色光晕 */
.shimmer,
#root .shimmer,
[data-conversation-scaffold],
[data-conversation-scaffold] *:not(.codicon),
[data-slot="aui_assistant-message-content"] [data-conversation-scaffold],
[data-slot="aui_background-result"] [data-conversation-scaffold],
[data-slot="aui_background-resume"],
[data-slot="aui_thinking-disclosure"],
[data-slot="aui_thinking-disclosure"] *:not(.codicon),
[data-slot="aui_thinking-body"],
[data-slot="aui_thinking-body"] *:not(.codicon),
[data-slot="tool-block"],
[data-slot="tool-block"] *:not(.codicon),
[data-tool-summary],
[data-tool-row] {
  font-family: inherit !important;
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  background-image: none !important;
  font-weight: 600 !important;
  opacity: 1 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 12px #ffffff !important;
  --disclosure-caret-rest: 1 !important;
}

/* 保护 .codicon 图标字体绝不被霞鹜文楷覆盖 */
.codicon,
[class*="codicon-"] {
  font-family: codicon !important;
}

[data-tour="sessions-sidebar"] input::placeholder,
input::placeholder {
  color: #000000 !important;
  opacity: 1 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 5px #ffffff !important;
}

/* 6. 右侧“5天”与三个点菜单 (⋮) 防重叠：平时隐藏三个点按钮，鼠标悬停该行时才显示三个点并隐藏“5天” */
[data-tour="sessions-sidebar"] button[data-session-actions] {
  opacity: 0 !important;
  pointer-events: none !important;
}

[data-tour="sessions-sidebar"] .row-hover:hover button[data-session-actions],
[data-tour="sessions-sidebar"] button[data-session-actions]:focus-visible,
[data-tour="sessions-sidebar"] button[data-session-actions][data-state="open"] {
  opacity: 1 !important;
  pointer-events: auto !important;
}

[data-tour="sessions-sidebar"] .row-hover:hover .session-row-tail {
  opacity: 0 !important;
}

/* 7. 会话行左侧小黑点 (.rounded-full) 加上鲜亮黑与高亮度白色光晕环 */
[data-tour="sessions-sidebar"] .rounded-full {
  background-color: #000000 !important;
  box-shadow: 0 0 2px 1px #ffffff, 0 0 5px 2px #ffffff !important;
}

/* 8. 左侧栏搜索会话未加载出来时的骨架屏 (Skeleton)：去掉刺眼纯白背景，改为柔和半透细框 */
[data-slot="skeleton"],
[data-slot="count-skeleton"] {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(91, 110, 245, 0.35) !important;
}

/* 9. 左侧栏新建会话等菜单按钮 + 会话条 (.row-hover)：平时隐藏边框，仅鼠标悬停时显示单个蓝框 */
[data-tour="sessions-sidebar"] [data-slot="sidebar-menu-button"],
[data-tour="sessions-sidebar"] li > button {
  background: transparent !important;
  background-color: transparent !important;
  border: 1.5px solid transparent !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

[data-tour="sessions-sidebar"] [data-slot="sidebar-menu-button"]:hover,
[data-tour="sessions-sidebar"] li > button:hover {
  background: transparent !important;
  background-color: transparent !important;
  border-color: rgba(91, 110, 245, 0.85) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

[data-tour="sessions-sidebar"] .row-hover,
[data-tour="sessions-sidebar"] .row-hover.bg-\\(--ui-row-active-background\\) {
  background: transparent !important;
  background-color: transparent !important;
  border: 1.5px solid transparent !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

[data-tour="sessions-sidebar"] .row-hover:hover {
  background: transparent !important;
  background-color: transparent !important;
  border-color: rgba(91, 110, 245, 0.85) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

/* 10. 代码块与文件 Diff 面板：全透明无遮挡 + 悬停蓝紫边框 + 鲜亮纯黑加粗配双倍白色光晕 */
[data-slot="file-diff-panel"],
[data-slot="diff-lines"],
[data-slot="file-diff-panel"] [data-glass-opaque],
.preview-source-code {
  background: transparent !important;
  background-color: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* 展开的文件修改 Diff 工具框：平时柔和细蓝边，鼠标悬停时高亮蓝紫色边框 */
[data-slot="tool-block"][data-tool-open] {
  background: transparent !important;
  background-color: transparent !important;
  border: 1.5px solid rgba(91, 110, 245, 0.40) !important;
  border-radius: 10px !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

[data-slot="tool-block"][data-tool-open]:hover {
  border-color: rgba(91, 110, 245, 0.88) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

[data-slot="tool-block"][data-tool-open] > div:first-child {
  border-bottom-color: rgba(91, 110, 245, 0.30) !important;
}

/* Diff 面板代码文字与行号：鲜亮纯黑 (#000000) + 加粗 (600) + 双倍白色光晕 */
[data-slot="file-diff-panel"],
[data-slot="file-diff-panel"] *,
[data-slot="diff-lines"],
[data-slot="diff-lines"] *,
[data-slot="code-card"],
[data-slot="code-card"] *,
#root pre:not([data-overlay-surface] pre),
#root code:not([data-overlay-surface] code),
#root .shiki,
#root .shiki span {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 600 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 12px #ffffff !important;
}

/* Diff 每一行的左侧竖条加粗至 3px，增删行清晰易读 */
[data-slot="file-diff-panel"] .border-l-2,
[data-slot="diff-lines"] .border-l-2 {
  border-left-width: 3px !important;
}

/* Diff 顶栏与文件改动摘要卡片的 +N / -N 行数统计：保留醒目翠绿与玫红配白色光晕 */
[data-slot="tool-block"] .text-emerald-600,
[data-slot="aui_changed-files"] .text-\\(--ui-green\\),
.text-\\(--ui-green\\),
.text-\\(--ui-green\\) * {
  color: #047857 !important;
  -webkit-text-fill-color: #047857 !important;
  font-weight: 700 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff !important;
}

[data-slot="tool-block"] .text-rose-600,
[data-slot="aui_changed-files"] .text-\\(--ui-red\\),
.text-\\(--ui-red\\),
.text-\\(--ui-red\\) * {
  color: #be123c !important;
  -webkit-text-fill-color: #be123c !important;
  font-weight: 700 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff !important;
}

/* 回复完成后底部弹出的“N 个文件已更改”卡片 ([data-slot="aui_changed-files"]) 与“滚动到底部”胶囊按钮 */
[data-slot="aui_changed-files"],
[data-slot="aui_thread-scroll-to-bottom"] {
  background: transparent !important;
  background-color: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 1.5px solid rgba(91, 110, 245, 0.45) !important;
  border-radius: 12px !important;
  box-shadow: none !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

[data-slot="aui_changed-files"]:hover,
[data-slot="aui_thread-scroll-to-bottom"]:hover {
  border-color: rgba(91, 110, 245, 0.88) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

[data-slot="aui_changed-files"] span:not(.text-\\(--ui-green\\)):not(.text-\\(--ui-red\\)),
[data-slot="aui_changed-files"] button,
[data-slot="aui_thread-scroll-to-bottom"] {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 600 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 12px #ffffff !important;
}

[data-slot="aui_changed-files"] .row-hover {
  background: transparent !important;
  background-color: transparent !important;
  border: 1.5px solid transparent !important;
  border-radius: 8px !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

[data-slot="aui_changed-files"] .row-hover:hover {
  border-color: rgba(91, 110, 245, 0.85) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

/* 审查面板标题前的装饰点 (.dither) 改为清晰黑实心小圆点配白色光晕 */
.dither {
  background: #000000 !important;
  border-radius: 50% !important;
  box-shadow: 0 0 2px 1px #ffffff, 0 0 5px 2px #ffffff !important;
}

/* 11. 针对非隐藏的半透明文字类提亮，绝不触碰 opacity-0 隐藏图层 */
.opacity-20,
.opacity-25,
.opacity-30,
.opacity-35,
.opacity-40,
.opacity-50,
.opacity-60,
.opacity-70,
.opacity-75,
.opacity-80,
.opacity-90 {
  opacity: 1 !important;
}

/* 12. 所有 SVG 小图标与 .codicon 字体图标：鲜亮纯黑 + 双倍高亮度白色发光轮廓 */
#root svg:not([data-overlay-surface] svg),
#root .codicon:not([data-overlay-surface] .codicon) {
  color: #000000 !important;
  opacity: 1 !important;
  filter: drop-shadow(0 0 1.5px #ffffff) drop-shadow(0 0 2px #ffffff) drop-shadow(0 0 4px #ffffff) !important;
}

/* 输入框右下角发送/停止圆形按钮：白光半透底 + 鲜亮黑图标 */
[data-slot="composer-surface"] button.bg-foreground,
[data-slot="composer-surface"] button[type="submit"] {
  background-color: rgba(255, 255, 255, 0.75) !important;
  border: 1px solid #ffffff !important;
  color: #000000 !important;
  box-shadow: 0 0 8px #ffffff !important;
}

/* 13. 悬浮 Toast / Tooltip：白光晕底 + 鲜亮纯黑字 + 白色光晕 */
.tooltip-bubble,
[data-slot="tooltip-content"],
[data-slot="tooltip-label"],
[role="tooltip"] {
  background: rgba(255, 255, 255, 0.85) !important;
  background-color: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  color: #000000 !important;
  border: 1px solid #ffffff !important;
  border-radius: 6px !important;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.9), 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  text-shadow: 0 0 2px #ffffff, 0 0 5px #ffffff !important;
}

.tooltip-bubble *,
[data-slot="tooltip-content"] * {
  color: #000000 !important;
}

.tooltip-bubble [data-slot="tooltip-arrow"] {
  fill: rgba(255, 255, 255, 0.85) !important;
}

/* 14. 用户发送的消息气泡（.composer-human-message）：一直常驻显示蓝紫色边框，方便查看！ */
[data-tour="sessions-sidebar"],
[data-slot="aui_assistant-message-root"],
[data-slot="aui_user-message-root"],
[data-slot="aui_edit-composer-root"],
.composer-human-message-container,
.composer-human-message,
.standalone-glass {
  background: transparent !important;
  background-color: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
  text-shadow: inherit !important;
}

[data-tour="sessions-sidebar"] {
  border-right: 1px solid rgba(255, 255, 255, 0.25) !important;
}

[data-slot="aui_user-message-root"] {
  position: relative !important;
  top: auto !important;
}

.composer-human-message {
  border: 1.5px solid rgba(91, 110, 245, 0.85) !important;
  border-radius: 12px !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.38) !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

.composer-human-message:hover,
[data-slot="aui_edit-composer-root"] .composer-human-message {
  border-color: #5B6EF5 !important;
  box-shadow: 0 0 0 1.5px rgba(91, 110, 245, 0.65) !important;
}

/* 15. 聊天滚动视口底部遮罩：防止聊天文字与底部输入框重叠 */
[data-slot="aui_thread-viewport"] {
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 calc(100% - var(--composer-measured-height, 110px) - 18px),
    transparent calc(100% - var(--composer-measured-height, 110px) - 2px),
    transparent 100%
  ) !important;
  mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 calc(100% - var(--composer-measured-height, 110px) - 18px),
    transparent calc(100% - var(--composer-measured-height, 110px) - 2px),
    transparent 100%
  ) !important;
}

/* 16. 底部输入框：平时半透明细白边，悬停或打字聚焦时显示蓝紫边框 */
[data-slot="composer-dock"],
[data-slot="composer-root"] {
  background: transparent !important;
  background-color: transparent !important;
  --composer-fill: transparent !important;
}

[data-slot="composer-root"] > .pointer-events-none,
[data-slot="composer-surface"] > .pointer-events-none.absolute.inset-0,
[data-slot="composer-surface"] > div[aria-hidden] {
  display: none !important;
}

[data-slot="composer-surface"],
.group\\/composer-surface {
  background: transparent !important;
  background-color: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 1.5px solid rgba(255, 255, 255, 0.45) !important;
  border-radius: 12px !important;
  box-shadow: none !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

[data-slot="composer-surface"]:hover,
[data-slot="composer-surface"]:focus-within,
.group\\/composer-surface:hover,
.group\\/composer-surface:focus-within {
  background: transparent !important;
  background-color: transparent !important;
  border-color: rgba(91, 110, 245, 0.88) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

/* 17. 设置页、管理档案页、以及设置搜索下拉框 (Command Palette) 与 Switch 开关 */
[data-overlay-surface] {
  background-color: rgba(15, 23, 42, 0.35) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}

[data-overlay-surface] [data-glass-raised],
[data-slot="settings"],
[role="dialog"]:has([cmdk-root]),
[cmdk-root] {
  --ui-chat-surface-background: #ffffff !important;
  --ui-sidebar-surface-background: #f8fafc !important;
  background-color: #ffffff !important;
  background-image: none !important;
  text-shadow: none !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22) !important;
}

[role="dialog"]:has([cmdk-root]) *,
[cmdk-root] *,
[role="menu"],
[role="menu"] *,
[role="listbox"],
[role="listbox"] *,
[data-radix-popper-content-wrapper] [role="menu"] * {
  text-shadow: none !important;
  filter: none !important;
}

[data-slot="switch"][data-state="unchecked"] {
  background-color: #cbd5e1 !important;
  border-color: #94a3b8 !important;
}

[data-slot="switch"][data-state="checked"] {
  background-color: #3b49df !important;
  border-color: #3b49df !important;
}

[data-slot="switch-thumb"] {
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35) !important;
}
`
      let el = document.getElementById(STYLE_ID)
      if (!el) {
        el = document.createElement('style')
        el.id = STYLE_ID
        document.head.appendChild(el)
      }
      el.textContent = css
    }

    injectBaseCss()

    const urlCache = new Map()
    let fallbackDataUrl = null
    let currentProfile = resolveInitialProfile()
    const profileIndexMap = { bocchi: 0, miku: 0, default: 0, ray: 0 }
    let carouselTimer = null

    const loadDataUrl = async (fileName) => {
      if (urlCache.has(fileName)) return urlCache.get(fileName)
      try {
        const r = await files.readDataUrl('data', fileName)
        if (r && r.ok && r.url) {
          if (!fileName.endsWith('.mp4')) {
            const img = new Image()
            img.src = r.url
          }
          urlCache.set(fileName, r.url)
          return r.url
        }
      } catch {
        // ignore
      }
      return null
    }

    const ensureFallbackUrl = async () => {
      if (fallbackDataUrl) return fallbackDataUrl
      const localBg = await loadDataUrl('bg.jpg')
      fallbackDataUrl = localBg || FALLBACK_WALLPAPER_URL
      return fallbackDataUrl
    }

    const ensureVideoEl = () => {
      let v = document.getElementById(VIDEO_ID)
      if (!v) {
        v = document.createElement('video')
        v.id = VIDEO_ID
        v.autoplay = true
        v.loop = true
        v.muted = true
        v.playsInline = true
        v.setAttribute('aria-hidden', 'true')
        v.style.cssText =
          'position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover;object-position:50% 35%;z-index:-1;pointer-events:none;opacity:0;transition:opacity 0.35s ease;'
        document.body.prepend(v)
      }
      return v
    }

    const applySlide = (url, item) => {
      if (cancelled) return
      const root = document.documentElement
      const isVideo = item?.type === 'video' || (item?.file && item.file.endsWith('.mp4'))
      const size = item?.size || 'cover'
      const position = item?.position || '50% 50%'
      const bgColor = item?.bgColor || '#ffffff'

      if (isVideo) {
        const v = ensureVideoEl()
        v.style.objectPosition = item?.position || '50% 35%'
        if (v.src !== url) {
          v.src = url
        }
        v.style.opacity = '1'
        v.play().catch(() => {})
        root.style.setProperty('--miku-bg-color', bgColor)
        root.style.setProperty('--miku-bg-image', 'none')
        root.style.setProperty('--miku-bg-animation', 'none')
        return
      }

      const v = document.getElementById(VIDEO_ID)
      if (v) {
        v.style.opacity = '0'
        try {
          v.pause()
        } catch {
          // ignore
        }
      }

      let anim = 'miku-window-drift 28s ease-in-out infinite alternate'
      if (item?.drift === 'top') {
        anim = 'miku-window-drift-top 28s ease-in-out infinite alternate'
      } else if (item?.drift === 'none' || item?.drift === false) {
        anim = 'none'
      }
      root.style.setProperty('--miku-bg-color', bgColor)
      root.style.setProperty('--miku-bg-size', size)
      root.style.setProperty('--miku-bg-position', position)
      root.style.setProperty('--miku-bg-animation', anim)
      root.style.setProperty('--miku-bg-image', `url("${url}")`)
    }

    const renderProfileSlide = async (profile, advance = false) => {
      if (cancelled) return
      const list = PROFILE_WALLPAPERS[profile] || PROFILE_WALLPAPERS.miku
      if (!list || list.length === 0) {
        const fb = await ensureFallbackUrl()
        applySlide(fb, { size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' })
        return
      }
      let idx = profileIndexMap[profile] ?? 0
      if (advance && list.length > 1) {
        idx = (idx + 1) % list.length
        profileIndexMap[profile] = idx
      } else {
        idx = idx % list.length
      }
      const item = list[idx]
      const url = await loadDataUrl(item.file)
      if (url) {
        applySlide(url, item)
      } else {
        const fb = await ensureFallbackUrl()
        applySlide(fb, { size: 'cover', position: '50% 50%', bgColor: '#ffffff', drift: 'center' })
      }
    }

    const setupCarouselTimer = (profile) => {
      if (carouselTimer) {
        clearInterval(carouselTimer)
        carouselTimer = null
      }
      const list = PROFILE_WALLPAPERS[profile] || []
      if (list.length > 1) {
        // 后台预加载该 Bot 的全部轮播图，确保切图零延迟不闪烁
        list.forEach((item) => {
          loadDataUrl(item.file)
        })
        carouselTimer = setInterval(() => {
          if (!cancelled) {
            renderProfileSlide(currentProfile, true)
          }
        }, CAROUSEL_INTERVAL_MS)
      }
    }

    const switchActiveProfile = (nextProfile) => {
      const normalized = (nextProfile || '').trim() || 'miku'
      if (normalized === currentProfile) return
      currentProfile = normalized
      renderProfileSlide(currentProfile, false)
      setupCarouselTimer(currentProfile)
    }

    triggerNextWallpaperGlobal = () => {
      renderProfileSlide(currentProfile, true)
      setupCarouselTimer(currentProfile)
    }

    // 初始化加载当前 Bot 的壁纸与轮播
    renderProfileSlide(currentProfile, false)
    setupCarouselTimer(currentProfile)

    // 预热波奇酱与初音未来的壁纸缓存，点击切换 Bot 时毫秒级瞬切
    Object.values(PROFILE_WALLPAPERS).forEach((arr) => {
      arr.forEach((item) => {
        loadDataUrl(item.file)
      })
    })

    // 监听侧边栏 Profile 切换与会话焦点切换，同时确保所有会话的 busy 模式强制同步为 steer（引导）
    const steeredSessions = new Set()
    const enforceSteerMode = () => {
      try {
        const sid = host.state.focusedSessionId?.get?.() || host.state.activeSessionId?.get?.()
        if (sid && !steeredSessions.has(sid)) {
          steeredSessions.add(sid)
          host.request('config.set', { key: 'busy', value: 'steer', session_id: sid }).catch(() => {})
        }
      } catch {
        // ignore
      }
    }
    enforceSteerMode()

    const unsubs = []
    try {
      if (host.state.profile?.subscribe) {
        unsubs.push(
          host.state.profile.subscribe(() => {
            const p = host.state.profile?.get?.()
            if (p) switchActiveProfile(p)
            enforceSteerMode()
          })
        )
      }
      if (host.state.focusedSessionProfile?.subscribe) {
        unsubs.push(
          host.state.focusedSessionProfile.subscribe(() => {
            const p = host.state.focusedSessionProfile?.get?.()
            if (p) switchActiveProfile(p)
            enforceSteerMode()
          })
        )
      }
      if (host.state.focusedSessionOwner?.subscribe) {
        unsubs.push(
          host.state.focusedSessionOwner.subscribe(() => {
            const p = host.state.focusedSessionOwner?.get?.()?.profile
            if (p) switchActiveProfile(p)
            enforceSteerMode()
          })
        )
      }
      if (host.state.focusedSessionId?.subscribe) {
        unsubs.push(
          host.state.focusedSessionId.subscribe(() => {
            const p =
              host.state.focusedSessionProfile?.get?.() ||
              host.state.focusedSessionOwner?.get?.()?.profile
            if (p) switchActiveProfile(p)
            enforceSteerMode()
          })
        )
      }
    } catch {
      // ignore
    }

    const onKeyDown = (e) => {
      // ⌘ + Shift + B (macOS) / Ctrl + Shift + B OR Option + B (Alt + KeyB)
      const isCmdShiftB = (e.metaKey || e.ctrlKey) && e.shiftKey && !e.altKey && (e.key === 'b' || e.key === 'B' || e.code === 'KeyB')
      const isAltB = e.altKey && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.code === 'KeyB'
      if (isCmdShiftB || isAltB) {
        e.preventDefault()
        e.stopPropagation()
        toggleCleanWallpaper()
        return
      }
      // Option + N：手动切到当前 Bot 轮播的下一张壁纸
      const isAltN = e.altKey && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.code === 'KeyN'
      if (isAltN) {
        e.preventDefault()
        e.stopPropagation()
        triggerNextWallpaperGlobal()
        return
      }
      // 当处于纯享背景模式时，按 Esc 也能一键恢复界面
      if (e.key === 'Escape' && document.documentElement.hasAttribute(CLEAN_ATTR)) {
        e.preventDefault()
        e.stopPropagation()
        document.documentElement.removeAttribute(CLEAN_ATTR)
      }
    }

    window.addEventListener('keydown', onKeyDown, true)

    // 当回合结束进入空闲状态 (busy === false) 且当前 cwd 仍停留在 /Users/mac 时，自动切到 /Users/mac/kuriyama-mirai
    const checkAndMoveCwd = () => {
      try {
        const busy = host.state.busy.get()
        const cwd = (host.state.cwd.get() || '').trim()
        if (!busy && (!cwd || cwd === '/Users/mac')) {
          switchToRepoCwd()
        }
      } catch {
        // ignore
      }
    }
    checkAndMoveCwd()
    const unsubBusy = host.state.busy.subscribe(() => {
      setTimeout(checkAndMoveCwd, 150)
    })

    return () => {
      cancelled = true
      if (carouselTimer) {
        clearInterval(carouselTimer)
      }
      unsubs.forEach((fn) => {
        try {
          fn?.()
        } catch {
          // ignore
        }
      })
      try {
        unsubBusy?.()
      } catch {
        // ignore
      }
      window.removeEventListener('keydown', onKeyDown, true)
      document.documentElement.removeAttribute(CLEAN_ATTR)
      document.getElementById(STYLE_ID)?.remove()
      const b = document.body
      if (b) {
        b.style.backgroundImage = ''
        b.style.animation = ''
      }
    }
  }, [files])

  return jsx('span', { 'aria-hidden': 'true', style: { display: 'none' } })
}

export default {
  id: ID,
  name: '多角色动态壁纸与轮播',
  description: 'Per-bot wallpaper & carousel (bocchi 3-slide rotation, miku, default, ray), Cmd+Shift+B clean mode, Option+N next slide.',
  register(ctx) {
    ctx.register({
      id: 'miku-wallpaper-runner',
      area: 'statusBar.right',
      order: 998,
      render: () => jsx(Wallpaper, { files: ctx.files })
    })
    ctx.register({
      id: 'miku-wallpaper-clean-cmd',
      area: 'commandPalette',
      data: {
        id: 'miku-wallpaper.toggle-clean',
        title: '纯享背景模式：只展示背景 / 恢复对话窗口',
        category: '视图',
        shortcut: '⌘⇧B',
        run: toggleCleanWallpaper
      }
    })
    ctx.register({
      id: 'miku-wallpaper-next-cmd',
      area: 'commandPalette',
      data: {
        id: 'miku-wallpaper.next-slide',
        title: '壁纸轮播：切换到下一张壁纸',
        category: '视图',
        shortcut: '⌥N',
        run: () => triggerNextWallpaperGlobal()
      }
    })
    ctx.register({
      id: 'miku-wallpaper-cwd-cmd',
      area: 'commandPalette',
      data: {
        id: 'miku-wallpaper.switch-cwd',
        title: '切换工作目录到 kuriyama-mirai（查看 skills 与 memory 差异）',
        category: '工作区',
        run: switchToRepoCwd
      }
    })
  }
}
