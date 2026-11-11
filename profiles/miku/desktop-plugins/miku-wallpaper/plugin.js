/**
 * Chat dynamic wallpaper: Hatsune Miku 3 (Bedroom).
 * Complete Polish Architecture:
 * 1. Clean Wallpaper Mode shortcut (`⌘ + Shift + B` or `Option + B`, plus Command Palette):
 *    toggles `html[data-miku-clean-wallpaper]` to fade out all UI (`#root`) and show 100% pure wallpaper;
 *    press again (or `Esc`) to restore immediately.
 * 2. User message bubbles (`.composer-human-message`) always keep a crisp blue-purple border (`#5B6EF5`).
 *    Sidebar buttons and session rows only show their blue border on `:hover`.
 * 3. Thinking process (`[data-slot="aui_thinking-disclosure"]`), running tool status (`.shimmer`),
 *    and `TOOL PAYLOAD` JSON dumps are rendered in vivid pure black (`#000000`) + bold (`600`) + white halo.
 * 4. Settings Command Palette (`[role="dialog"]:has([cmdk-root])`) has an opaque white background,
 *    and Switch thumbs (`[data-slot="switch-thumb"]`) stay pure white.
 */
import { useEffect } from 'react'
import { jsx } from 'react/jsx-runtime'

const ID = 'miku-wallpaper'
const STYLE_ID = 'miku-wallpaper-css'
const CLEAN_ATTR = 'data-miku-clean-wallpaper'
const FALLBACK_WALLPAPER_URL =
  'https://raw.githubusercontent.com/123sssdd/hermes-miku-theme/main/assets/bg.jpg'

function toggleCleanWallpaper() {
  document.documentElement.toggleAttribute(CLEAN_ATTR)
}

function Wallpaper({ files }) {
  useEffect(() => {
    let cancelled = false
    const apply = (url) => {
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

/* 0. 纯享背景模式（按 ⌘ + Shift + B 或 Option + B 一键隐藏所有对话窗口与侧边栏，再按一下恢复） */
#root {
  transition: opacity 0.25s ease !important;
}

html[${CLEAN_ATTR}] #root {
  opacity: 0 !important;
  pointer-events: none !important;
  user-select: none !important;
}

/* 1. 全窗口动态壁纸：100% 原图画质直出 */
body {
  background-image: url("${url}") !important;
  background-repeat: no-repeat !important;
  background-position: 50% 50% !important;
  background-size: cover !important;
  background-attachment: fixed !important;
  animation: miku-window-drift 28s ease-in-out infinite alternate !important;
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

/* 10. 代码块与 Diff 面板：统一鲜亮纯黑 + 加粗 + 白色光晕 */
[data-slot="file-diff-panel"],
[data-slot="file-diff-panel"] *,
[data-slot="code-card"],
[data-slot="code-card"] *,
#root pre:not([data-overlay-surface] pre),
#root code:not([data-overlay-surface] code),
#root .shiki,
#root .shiki span {
  color: #000000 !important;
  -webkit-text-fill-color: #000000 !important;
  font-weight: 600 !important;
  text-shadow: inherit !important;
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
[cmdk-root] * {
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
      // 当处于纯享背景模式时，按 Esc 也能一键恢复界面
      if (e.key === 'Escape' && document.documentElement.hasAttribute(CLEAN_ATTR)) {
        e.preventDefault()
        e.stopPropagation()
        document.documentElement.removeAttribute(CLEAN_ATTR)
      }
    }

    window.addEventListener('keydown', onKeyDown, true)

    files
      .readDataUrl('data', 'bg.jpg')
      .then((r) => {
        if (r && r.ok && r.url) {
          apply(r.url)
        } else {
          apply(FALLBACK_WALLPAPER_URL)
        }
      })
      .catch(() => {
        apply(FALLBACK_WALLPAPER_URL)
      })

    return () => {
      cancelled = true
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
  name: '初音未来动态背景',
  description: 'Clean wallpaper shortcut (Cmd+Shift+B), always-on user bubble border, bold black thinking/tool rows.',
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
  }
}
