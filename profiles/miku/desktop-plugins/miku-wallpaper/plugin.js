/**
 * Chat dynamic wallpaper: Hatsune Miku 3 (Bedroom).
 * Complete White Halo + LXGW WenKai TC Font + Hover-Only Indigo Borders:
 * 1. Lifts `[data-conversation-scaffold]` (`opacity: 0.67` in styles.css) to `opacity: 1 !important`
 *    so reasoning/tool summary rows ("Analyzed 3 images...", "已分析图片 41s") render in vivid black + white halo.
 * 2. Sidebar menu buttons & session rows (`.row-hover`) hide their border at rest (`border-color: transparent`)
 *    and ONLY show the `#5B6EF5` blue-purple border on `:hover` for the single hovered item.
 */
import { useEffect } from 'react'
import { jsx } from 'react/jsx-runtime'

const ID = 'miku-wallpaper'
const STYLE_ID = 'miku-wallpaper-css'

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

/* 3. 全局单层继承“内紧外柔”高浓度白色光晕 + 霞鹜文楷字体 */
#root,
[data-slot="composer-rich-input"]:lang(zh),
[data-slot="composer-rich-input"]:lang(zh-hant) {
  font-family: "LXGW WenKai TC", "LXGW WenKai", -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif !important;
  color: #000000 !important;
  text-shadow: 0 0 1.5px #ffffff, 0 0 3px #ffffff, 0 0 6px #ffffff, 0 0 12px rgba(255, 255, 255, 0.95) !important;
}

/* 4. 显式开启按钮、输入框以及图 1 分析推理/工具折叠过程（data-conversation-scaffold）的鲜黑字与光晕继承 */
#root button:not([data-overlay-surface] button),
#root input:not([data-overlay-surface] input),
#root textarea:not([data-overlay-surface] textarea),
#root select:not([data-overlay-surface] select),
[data-tour="sessions-sidebar"] button,
[data-tour="sessions-sidebar"] a,
[data-tour="sessions-sidebar"] span,
[data-titlebar-cluster] button,
[role="tab"],
[data-conversation-scaffold],
[data-conversation-scaffold] *,
[data-slot="aui_assistant-message-content"] [data-conversation-scaffold],
[data-slot="aui_background-result"] [data-conversation-scaffold],
[data-slot="aui_background-resume"],
[data-tool-summary],
[data-tool-row],
[data-slot="tool-block"],
[data-slot="aui_thinking-disclosure"] {
  font-family: inherit !important;
  color: #000000 !important;
  opacity: 1 !important;
  text-shadow: inherit !important;
  --disclosure-caret-rest: 1 !important;
}

[data-tour="sessions-sidebar"] input::placeholder,
input::placeholder {
  color: #000000 !important;
  opacity: 1 !important;
  text-shadow: 0 0 1.5px #ffffff, 0 0 3px #ffffff, 0 0 6px #ffffff !important;
}

/* 5. 图 2 左侧栏新建会话等菜单按钮 + 会话条 (.row-hover)：
      平时正常状态不显示蓝色边框（透明），只有鼠标经过 (:hover) 对应区域时才显示那一个蓝框 */
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

/* 6. 代码块与 Diff 面板：统一鲜亮纯黑 + 白色光晕 */
[data-slot="file-diff-panel"],
[data-slot="file-diff-panel"] *,
[data-slot="code-card"],
[data-slot="code-card"] *,
#root pre:not([data-overlay-surface] pre),
#root code:not([data-overlay-surface] code),
#root .shiki,
#root .shiki span {
  color: #000000 !important;
  text-shadow: inherit !important;
}

/* 7. 针对非隐藏的半透明文字类（含搜索框的 .opacity-30）提亮，绝不触碰 opacity-0 隐藏图层 */
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

/* 8. 所有 SVG 小图标与 .codicon 字体图标：鲜亮纯黑 + 紧实高浓度白色发光轮廓 */
#root svg:not([data-overlay-surface] svg),
#root .codicon:not([data-overlay-surface] .codicon) {
  color: #000000 !important;
  opacity: 1 !important;
  filter: drop-shadow(0 0 1px #ffffff) drop-shadow(0 0 2px #ffffff) drop-shadow(0 0 4px #ffffff) !important;
}

/* 输入框右下角发送/停止圆形按钮：白光半透底 + 鲜亮黑图标 */
[data-slot="composer-surface"] button.bg-foreground,
[data-slot="composer-surface"] button[type="submit"] {
  background-color: rgba(255, 255, 255, 0.75) !important;
  border: 1px solid #ffffff !important;
  color: #000000 !important;
  box-shadow: 0 0 8px #ffffff !important;
}

/* 9. 悬浮 Toast / Tooltip：白光晕底 + 鲜亮纯黑字 + 白色光晕 */
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

/* 10. 用户输入条（未选中与点击选中编辑状态）：平时隐藏蓝框，悬停或选中时显示蓝框 */
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
  border: 1.5px solid transparent !important;
  border-radius: 12px !important;
  transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
}

.composer-human-message:hover,
[data-slot="aui_edit-composer-root"] .composer-human-message {
  border-color: rgba(91, 110, 245, 0.85) !important;
  box-shadow: 0 0 0 1px rgba(91, 110, 245, 0.45) !important;
}

/* 11. 聊天滚动视口底部遮罩：防止聊天文字与底部输入框重叠 */
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

/* 12. 底部输入框：平时半透明细白边，悬停或打字聚焦时显示蓝紫边框 */
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

/* 13. 设置页与管理档案页：严格限定在 [data-overlay-surface] 下才用纯白底 */
[data-overlay-surface] {
  background-color: rgba(15, 23, 42, 0.35) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}

[data-overlay-surface] [data-glass-raised],
[data-slot="settings"] {
  --ui-chat-surface-background: #ffffff !important;
  --ui-sidebar-surface-background: #f8fafc !important;
  background-color: #ffffff !important;
  background-image: none !important;
  text-shadow: none !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22) !important;
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

    files.readDataUrl('data', 'bg.jpg').then((r) => {
      if (r && r.ok && r.url) apply(r.url)
    })

    return () => {
      cancelled = true
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
  description: 'LXGW WenKai TC font, tight white halo on all reasoning/tool rows, and hover-only indigo borders.',
  register(ctx) {
    ctx.register({
      id: 'miku-wallpaper-runner',
      area: 'statusBar.right',
      order: 998,
      render: () => jsx(Wallpaper, { files: ctx.files })
    })
  }
}
