#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
手绘纸面卡构建脚本（2026-11-08 按 preferences.md 第三节规格重写；
原环境的 build_card.py 未进 GitHub 仓库丢失，本文件为新环境重建版）。

规格要点：
- 米白纸面、深蓝线条、粉彩分区，封面图白框加胶带，眼镜贴纸，签名
- 正文：霞鹜文楷 TC v1.530（wenkai-tc.ttf），单一字重
- 标题：Kalam Bold（kalam-bold.ttf），居中、单行
- 条目 ①②③④ 编号，每点以「·」开头
- 染色：重点蓝 #5b9fe9、风险红 #d42a1e，每点最多 3 处，不整句染
用法：python3 build_card.py 输出一张写死内容的样卡到 sample-card.png；
后续正式卡片复用这里的绘制函数。
"""
import random
from PIL import Image, ImageDraw, ImageFont, ImageOps

# 字体目录：默认取脚本同目录下的 fonts/（把 wenkai-tc.ttf、kalam-bold.ttf 放进去）；
# 也可用环境变量 CARD_FONTS_DIR 指到别处。字体是二进制、不进仓库，获取办法见上级 SKILL.md。
import os
FONT_DIR = os.environ.get("CARD_FONTS_DIR", os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts"))
WENKAI = f"{FONT_DIR}/wenkai-tc.ttf"
KALAM = f"{FONT_DIR}/kalam-bold.ttf"

PAPER = (247, 241, 227)
INK = (51, 58, 69)
LINE = (43, 74, 122)
BLUE = (91, 159, 233)
RED = (212, 42, 30)
SUB = (110, 118, 128)

random.seed(20261108)


def font(path, size):
    return ImageFont.truetype(path, size)


def jitter_line(draw, p0, p1, fill=LINE, width=3, step=22, amp=1.7):
    """手绘感折线：分段加微小随机偏移。"""
    x0, y0 = p0
    x1, y1 = p1
    dist = max(abs(x1 - x0), abs(y1 - y0))
    n = max(2, int(dist / step))
    pts = []
    for i in range(n + 1):
        t = i / n
        x = x0 + (x1 - x0) * t
        y = y0 + (y1 - y0) * t
        if 0 < i < n:
            x += random.uniform(-amp, amp)
            y += random.uniform(-amp, amp)
        pts.append((x, y))
    draw.line(pts, fill=fill, width=width, joint="curve")


def jitter_rect(draw, box, fill=LINE, width=3):
    x0, y0, x1, y1 = box
    jitter_line(draw, (x0, y0), (x1, y0), fill, width)
    jitter_line(draw, (x1, y0), (x1, y1), fill, width)
    jitter_line(draw, (x1, y1), (x0, y1), fill, width)
    jitter_line(draw, (x0, y1), (x0, y0), fill, width)


def _word_units(text, color):
    """把一段文字切成换行单位：连续的拉丁字母/数字串（含内部连字符、小数点）
    视为一个词，换行时整个词移走，不在词中间断开；其余字符逐字成单位。"""
    units, i, n = [], 0, len(text)
    while i < n:
        ch = text[i]
        if ch.isascii() and ch.isalnum():
            j = i + 1
            while j < n:
                c = text[j]
                if c.isascii() and c.isalnum():
                    j += 1
                elif c in "-." and j + 1 < n and text[j + 1].isascii() and text[j + 1].isalnum():
                    j += 1
                else:
                    break
            units.append((text[i:j], color))
            i = j
        else:
            units.append((ch, color))
            i += 1
    return units


def wrap_segments(draw, segments, fnt, max_w):
    """segments: [(text, color)]，按字宽折行，返回 [[(text,color),...], ...]。
    拉丁词不断词：一个词放不下就整词移到下一行；超长词才逐字断开。"""
    units = []
    for text, color in segments:
        units.extend(_word_units(text, color))
    lines, cur, cur_w = [], [], 0.0
    for text, color in units:
        w = draw.textlength(text, font=fnt)
        if w > max_w:
            # 超长词：逐字断开
            for ch in text:
                cw = draw.textlength(ch, font=fnt)
                if cur_w + cw > max_w and cur:
                    lines.append(cur)
                    cur, cur_w = [], 0.0
                cur.append((ch, color))
                cur_w += cw
            continue
        if cur_w + w > max_w and cur:
            lines.append(cur)
            cur, cur_w = [], 0.0
        cur.append((text, color))
        cur_w += w
    if cur:
        lines.append(cur)
    # 合并同色相邻字
    merged_lines = []
    for line in lines:
        merged = []
        for text, color in line:
            if merged and merged[-1][1] == color:
                merged[-1] = (merged[-1][0] + text, color)
            else:
                merged.append((text, color))
        merged_lines.append(merged)
    return merged_lines


def draw_segments(draw, x, y, line, fnt):
    for text, color in line:
        draw.text((x, y), text, font=fnt, fill=color)
        x += draw.textlength(text, font=fnt)
    return x


def glasses_sticker(base, cx, cy, scale=1.0, angle=-8):
    """眼镜贴纸：透明层画好再旋转贴上。两圈加鼻梁加镜腿，画法从简。"""
    w, h = int(190 * scale), int(110 * scale)
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    r = int(30 * scale)
    cy0 = h // 2
    lw = max(3, int(5 * scale))
    lx = int(18 * scale)
    rx = w - int(18 * scale) - 2 * r
    for x0 in (lx, rx):
        d.ellipse([x0, cy0 - r, x0 + 2 * r, cy0 + r], outline=LINE + (255,), width=lw)
    d.line([(lx + 2 * r, cy0 - 6), (rx, cy0 - 6)], fill=LINE + (255,), width=lw)
    d.line([(lx, cy0 - 10), (4, cy0 - 22)], fill=LINE + (255,), width=lw)
    d.line([(rx + 2 * r, cy0 - 10), (w - 4, cy0 - 22)], fill=LINE + (255,), width=lw)
    layer = layer.rotate(angle, resample=Image.BICUBIC, expand=True)
    base.alpha_composite(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)))


def draw_title(draw, cx, y, text, kalam_f, wenkai_f, fill=LINE):
    """标题逐字画：拉丁字符用 Kalam，中文用文楷（浏览器自动回退的等价做法）。"""
    widths = []
    for ch in text:
        f = kalam_f if ord(ch) < 0x2E80 else wenkai_f
        widths.append((ch, f, draw.textlength(ch, font=f)))
    total = sum(w for _, _, w in widths)
    x = cx - total / 2
    for ch, f, w in widths:
        draw.text((x, y), ch, font=f, fill=fill)
        x += w
    return total


def build_sample(out_path):
    W = 920
    margin = 46
    body_f = font(WENKAI, 30)
    head_f = font(WENKAI, 34)
    title_f = font(KALAM, 54)
    sub_f = font(WENKAI, 24)
    concl_f = font(WENKAI, 33)
    line_h = 47

    # 先量高度：封面 + 结论 + 三个分区
    sections = [
        ("① 字体", (234, 242, 251), [
            [("· 正文本体是", INK), ("霞鹜文楷 TC v1.530", BLUE), ("，官方仓库刚下载补回", INK)],
            [("· 标题用 ", INK), ("Kalam Bold", BLUE), ("，居中单行，两侧留白", INK)],
        ]),
        ("② 染色规矩", (253, 238, 243), [
            [("· 重点词染蓝，每点最多 ", INK), ("3 处", BLUE)],
            [("· ", INK), ("风险词", RED), ("染红，不整句染、不用背景色", INK)],
        ]),
        ("③ 说明", (236, 246, 236), [
            [("· 原构建脚本没进仓库，这张是按", INK), ("规格", BLUE), ("重写的", INK)],
            [("· 你点头，我就把它定为", INK), ("正式构建脚本", BLUE)],
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
    H = 150 + cover_h + 96 + sum(sec_heights) + 26 * len(sections) + 92
    img = Image.new("RGBA", (W, H), PAPER + (255,))
    d = ImageDraw.Draw(img, "RGBA")
    # 纸面噪点
    for _ in range(2600):
        x, y = random.uniform(0, W), random.uniform(0, H)
        d.point((x, y), fill=(232, 222, 196, 120))
    # 外框双线
    jitter_rect(d, (18, 18, W - 18, H - 18), LINE, 4)
    jitter_rect(d, (30, 30, W - 30, H - 30), LINE, 2)

    # 标题（居中，左右各留 40+；Kalam 无中文字形，逐字回退文楷）
    draw_title(d, W / 2, 48, "点子清单", title_f, font(WENKAI, 54))
    sub = "样卡 · By 栗山未来 · 2026-11-08"
    sw = d.textlength(sub, font=sub_f)
    d.text(((W - sw) / 2, 122), sub, font=sub_f, fill=SUB)
    glasses_sticker(img, W - 108, 82, scale=0.62, angle=-8)
    d = ImageDraw.Draw(img, "RGBA")

    # 封面：白框 + 胶带
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

    # 结论句
    y = cy1 + 44
    concl = "样卡做好了，先看字体和版式对不对味。"
    cw = d.textlength(concl, font=concl_f)
    d.text(((W - cw) / 2, y), concl, font=concl_f, fill=INK)
    y += 74

    # 分区
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

    # 签名
    sig = "— 栗山未来"
    gw = d.textlength(sig, font=sub_f)
    d.text((W - margin - 16 - gw, H - 72), sig, font=sub_f, fill=LINE)

    img.convert("RGB").save(out_path, quality=95)
    print("saved", out_path, img.size)


if __name__ == "__main__":
    build_sample("/home/hatch/workspace/fonts/sample-card.png")
