#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""2026-11-13 Telegram 每日早报样刊卡：复用 build_card.py 绘制函数。
内容已核：Kitesurf（Cloudflare 官方更新日志 2026-11-12 + GitHub
cloudflare/kitesurf，Apache 2.0，43 星，368 提交）；Nod（n8n 官方博客
2026-11-10，研究预览，Apache 2.0，github.com/n8n-io/nod）。"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_card import (  # noqa: E402
    font, jitter_rect, wrap_segments, draw_segments,
    glasses_sticker, draw_title, FONT_DIR,
    PAPER, INK, LINE, BLUE, RED, SUB,
)
from PIL import Image, ImageDraw, ImageOps  # noqa: E402
import random  # noqa: E402

random.seed(20261113)

W = 920
margin = 46
body_f = font(f"{FONT_DIR}/wenkai-tc.ttf", 30)
head_f = font(f"{FONT_DIR}/wenkai-tc.ttf", 34)
title_f = font(f"{FONT_DIR}/kalam-bold.ttf", 54)
sub_f = font(f"{FONT_DIR}/wenkai-tc.ttf", 24)
concl_f = font(f"{FONT_DIR}/wenkai-tc.ttf", 30)
line_h = 47

sections = [
    ("① 开源新货", (234, 242, 251), [
        [("· ", INK), ("Cloudflare", BLUE), (" 昨天把 ", INK), ("Kitesurf", BLUE), (" 开源了（Apache 2.0）：给 AI agent 用的", INK), ("浏览器引擎", BLUE), ("。", INK)],
        [("· 它跑在 Workers 上，不用开浏览器容器，就能解析网页、跑 JS、出截图；它说 CDP 协议，Puppeteer 能直接连。", INK)],
        [("· 仓库刚开源，星还少，它官方在猛更新（368 次提交）；和你有关：你的 agent 要读网页、截图时，你多了一个轻量选项。", INK)],
        [("· 注意：它自带", INK), ("没有鉴权", RED), ("，你要部署就得先给它加一层 Access。出处：Cloudflare 官方更新日志、GitHub 仓库 cloudflare/kitesurf。", INK)],
    ]),
    ("② 业界动态", (253, 238, 243), [
        [("· ", INK), ("n8n", BLUE), (" 这周发了 ", INK), ("Nod", BLUE), ("：装在你自己电脑上的", INK), ("个人 agent", BLUE), ("，开源、能下 Mac 和 Windows 版。", INK)],
        [("· 它自带沙箱电脑和浏览器，能在应用和网站里替你把活干完，它动手前会先问你；它能在 Telegram 上聊天，活能并行跑、能定时。", INK)],
        [("· 有人把它常开在 Mac mini 上，和你摆 Hermes 的摆法一样。出处：n8n 官方博客、GitHub 仓库 n8n-io/nod。", INK)],
    ]),
    ("③ 点子", (236, 246, 236), [
        [("· ", INK), ("轻试 Nod 对照 Hermes", BLUE), ("：你拿一个不关键的小活，两边各跑一次，你比谁更省心，约 20 分钟。", INK)],
        [("· ", INK), ("Kitesurf 先收藏围观", BLUE), ("：你等它兼容性再好一点，你再上手试也不迟。", INK)],
    ]),
]

probe = ImageDraw.Draw(Image.new("RGB", (10, 10)))
inner_w = W - 2 * margin - 56
sec_heights = []
for _, _, pts in sections:
    h = 58
    for p in pts:
        h += len(wrap_segments(probe, p, body_f, inner_w)) * line_h + 8
    sec_heights.append(h + 14)

cover_h = 430
concl_segs = [
    [("今天两条都带开源：一个给 agent 造轻浏览器，", INK)],
    [("一个把个人 agent 装进你自己的电脑。", INK)],
]
concl_lines = []
for segs in concl_segs:
    concl_lines.extend(wrap_segments(probe, segs, concl_f, W - 2 * margin))
H = 150 + cover_h + 96 + 40 + sum(sec_heights) + 26 * len(sections) + 130
img = Image.new("RGBA", (W, H), PAPER + (255,))
d = ImageDraw.Draw(img, "RGBA")
for _ in range(2600):
    x, y = random.uniform(0, W), random.uniform(0, H)
    d.point((x, y), fill=(232, 222, 196, 120))
jitter_rect(d, (18, 18, W - 18, H - 18), LINE, 4)
jitter_rect(d, (30, 30, W - 30, H - 30), LINE, 2)

draw_title(d, W / 2, 48, "每日早报", title_f, font(f"{FONT_DIR}/wenkai-tc.ttf", 54))
sub = "2026-11-13 · Telegram 样刊 · By 栗山未来"
sw = d.textlength(sub, font=sub_f)
d.text(((W - sw) / 2, 122), sub, font=sub_f, fill=SUB)
glasses_sticker(img, W - 108, 82, scale=0.62, angle=-8)
d = ImageDraw.Draw(img, "RGBA")

cx0, cy0 = margin + 26, 168
cx1, cy1 = W - margin - 26, cy0 + cover_h
d.rectangle([cx0 - 14, cy0 - 14, cx1 + 14, cy1 + 14], fill=(255, 255, 255, 255))
jitter_rect(d, (cx0 - 14, cy0 - 14, cx1 + 14, cy1 + 14), LINE, 2)
cover_path = os.environ.get("CARD_COVER", "")
if cover_path and os.path.exists(cover_path):
    cover = Image.open(cover_path).convert("RGB")
else:
    cover = Image.new("RGB", (800, 800), (238, 230, 210))
cover = ImageOps.fit(cover, (cx1 - cx0, cy1 - cy0), Image.LANCZOS, centering=(0.5, 0.12))
img.paste(cover, (cx0, cy0))
d = ImageDraw.Draw(img, "RGBA")
tape = Image.new("RGBA", (190, 42), (233, 216, 160, 205))
tape = tape.rotate(-24, resample=Image.BICUBIC, expand=True)
img.alpha_composite(tape, (cx0 - 52, cy0 - 40))
d = ImageDraw.Draw(img, "RGBA")

y = cy1 + 44
for line in concl_lines:
    lw = sum(d.textlength(t, font=concl_f) for t, _ in line)
    draw_segments(d, (W - lw) / 2, y, line, concl_f)
    y += 46
y += 28

for (head, bg, pts), sh in zip(sections, sec_heights):
    d.rounded_rectangle([margin, y, W - margin, y + sh], radius=18, fill=bg + (255,))
    jitter_rect(d, (margin, y, W - margin, y + sh), LINE, 2)
    d.text((margin + 28, y + 14), head, font=head_f, fill=LINE)
    yy = y + 62
    for p in pts:
        for line in wrap_segments(d, p, body_f, inner_w):
            draw_segments(d, margin + 28, yy, line, body_f)
            yy += line_h
        yy += 8
    y += sh + 26

sig = "— 栗山未来"
gw = d.textlength(sig, font=sub_f)
d.text((W - margin - 16 - gw, y + 10), sig, font=sub_f, fill=LINE)

out = os.path.join(os.getcwd(), "telegram-briefing-example.png")
img.convert("RGB").save(out, quality=95)
print("saved", out, img.size)
