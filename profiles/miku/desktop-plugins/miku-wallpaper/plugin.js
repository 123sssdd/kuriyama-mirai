/**
 * Chat dynamic wallpaper: Hatsune Miku 3 (Bedroom).
 * Complete Polish Architecture:
 * 1. Settings Command Palette (`[role="dialog"]:has([cmdk-root])`) gets solid opaque white background
 *    so it never overlaps underlying settings text (Fig.1 left).
 * 2. Switch (`[data-slot="switch"]`) gets crisp track colors and a pure white thumb (`#ffffff`)
 *    so the thumb never disappears when checked (Fig.1 right).
 * 3. Sidebar loading skeletons (`[data-slot="skeleton"]`) are translucent instead of solid white blocks (Fig.2).
 * 4. Preserves `font-family: codicon !important` on `.codicon` so icons never garble, adds white halo
 *    to status dots (`.rounded-full`), boosts white halo intensity (double 2px core), and hides
 *    `button[data-session-actions]` at rest so "5天" and the `⋮` menu never overlap (Fig.3).
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

/* 3. 全局单层继承“双倍高亮度核心 + 柔和外圈”白色光晕 + 霞鹜文楷字体 */
#root,
[data-slot="composer-rich-input"]:lang(zh),
[data-slot="composer-rich-input"]:lang(zh-hant) {
  font-family: "LXGW WenKai TC", "LXGW WenKai", -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif !important;
  color: #000000 !important;
  text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 12px #ffffff !important;
}

/* 4. 显式开启按钮、输入框、侧边栏会话标题/副标题以及分析推理过程的光晕与鲜黑字体继承（排除 .codicon 图标字体避免变乱码） */
#root button:not([data-overlay-surface] button),
#root input:not([data-overlay-surface] input),
#root textarea:not([data-overlay-surface] textarea),
#root select:not([data-overlay-surface] select),
[data-tour="sessions-sidebar"] button,
[data-tour="sessions-sidebar"] a,
[data-tour="sessions-sidebar"] span:not(.codicon),
[data-tour="sessions-sidebar"] div,
[data-titlebar-cluster] button,
[role="tab"],
[data-conversation-scaffold],
[data-conversation-scaffold] *:not(.codicon),
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

/* 保护 .codicon 图标字体绝不被霞鹜文楷覆盖（解决图 3 红框 2 “结果”左侧图标变乱码的问题） */
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

/* 5. 修复图 3 红框 6：右侧“5天”与三个点菜单 (⋮) 重叠问题
      平时隐藏三个点按钮，只有鼠标移到该行 (.row-hover:hover) 时才显示三个点并隐藏“5天” */
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

/* 6. 修复图 3 红框 3：会话行左侧小黑点 (.rounded-full) 加上鲜亮黑与高亮度白色光晕环 */
[data-tour="sessions-sidebar"] .rounded-full {
  background-color: #000000 !important;
  box-shadow: 0 0 2px 1px #ffffff, 0 0 5px 2px #ffffff !important;
}

/* 7. 修复图 2：左侧栏搜索会话未加载出来时的骨架屏 (Skeleton)，去掉刺眼纯白背景，改为柔和半透框 */
[data-slot="skeleton"],
[data-slot="count-skeleton"] {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(91, 110, 245, 0.35) !important;
}

/* 8. 左侧栏新建会话等菜单按钮 + 会话条 (.row-hover)：平时隐藏边框，仅鼠标悬停时显示单个蓝框 */
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

/* 9. 代码块与 Diff 面板：统一鲜亮纯黑 + 白色光晕 */
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

/* 10. 针对非隐藏的半透明文字类提亮，绝不触碰 opacity-0 隐藏图层 */
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

/* 11. 所有 SVG 小图标与 .codicon 字体图标（含图 3 搜索框放大镜、清除 X、结果左侧图标、折叠箭头）：
       鲜亮纯黑 + 双倍高亮度白色发光轮廓 */
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

/* 12. 悬浮 Toast / Tooltip：白光晕底 + 鲜亮纯黑字 + 白色光晕 */
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

/* 13. 用户输入条（未选中与点击选中编辑状态）：平时隐藏蓝框，悬停或选中时显示蓝框 */
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

/* 14. 聊天滚动视口底部遮罩：防止聊天文字与底部输入框重叠 */
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

/* 15. 底部输入框：平时半透明细白边，悬停或打字聚焦时显示蓝紫边框 */
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

/* 16. 修复图 1：设置页、管理档案页、以及设置搜索下拉框 (Command Palette) 与 Switch 开关 */
[data-overlay-surface] {
  background-color: rgba(15, 23, 42, 0.35) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}

/* 设置面板与 Command Palette 搜索下拉弹窗（[role="dialog"]:has([cmdk-root])）：100% 不透明纯白实体底板，绝不穿透重叠 */
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

/* 修复图 1 右侧 Switch 开关：关闭时浅灰轨道、开启时亮蓝轨道，内部圆滑块永远保持立体纯白 (#ffffff) */
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
  description: 'Complete polish: opaque command palette, crisp switch thumb, translucent skeletons, codicon fix, and double white halo.',
  register(ctx) {
    ctx.register({
      id: 'miku-wallpaper-runner',
      area: 'statusBar.right',
      order: 998,
      render: () => jsx(Wallpaper, { files: ctx.files })
    })
  }
}
