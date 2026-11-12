#!/usr/bin/env python3
"""
跨端表情包管理与毫秒级本地检索工具 (Hermes & Muse 通用，纯标准库零依赖)
功能：
1. sync-uu: 自动创建带年份的今日表情包目录 (/Users/mac/Downloads/表情包/YYYY.MM.DD) 并自动修改 UU 远程文件传输存储路径
2. add: 计算 MD5 自动去重、归档图片、生成六维标签 + 目录继承标签写入 stickers/index.json
3. match: 本地零 Token 精排检索（支持 0.45 置信度阈值、点播找图、主动表情、20% 概率斗图连发）
4. hide / unhide / list: 隐藏看腻的表情包（保留文件但暂停检索）及查看本机图库统计
"""
import argparse
import datetime
import hashlib
import json
import os
import random
import re
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
STICKERS_DIR = REPO_ROOT / "stickers"
INDEX_PATH = STICKERS_DIR / "index.json"

DOWNLOAD_STICKERS_ROOT = Path("/Users/mac/Downloads/表情包")
UU_SETTING_CONFIG = Path("/Users/Shared/UURemote/Shared/pub/setting.config")


def load_index() -> dict:
    if not INDEX_PATH.exists():
        return {"version": 2, "stickers": []}
    try:
        data = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
        if "stickers" not in data:
            data["stickers"] = []
        data["version"] = 2
        return data
    except Exception:
        return {"version": 2, "stickers": []}


def save_index(data: dict) -> None:
    STICKERS_DIR.mkdir(parents=True, exist_ok=True)
    INDEX_PATH.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def compute_md5(file_path: Path) -> str:
    h = hashlib.md5()
    with file_path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def split_tokens(text: str) -> list[str]:
    if not text:
        return []
    parts = re.split(r"[\s,，、/|+；;]+", text.strip().lower())
    return [p for p in parts if p]


def cmd_sync_uu(args: argparse.Namespace) -> int:
    now = datetime.datetime.now()
    date_str = args.date.strip() if args.date else now.strftime("%Y.%m.%d")
    today_dir = DOWNLOAD_STICKERS_ROOT / date_str
    today_dir.mkdir(parents=True, exist_ok=True)

    # 维护一个固定软链接「今日上传」指向当天目录，并兼容无年份旧目录软链接
    latest_link = DOWNLOAD_STICKERS_ROOT / "今日上传"
    if latest_link.is_symlink() or latest_link.exists():
        if latest_link.is_symlink():
            latest_link.unlink()
    try:
        latest_link.symlink_to(today_dir)
    except Exception:
        pass

    # 如果 UU 远程的 setting.config 存在，直接更新 file_transfer_custom_receive_directory
    uu_updated = False
    old_uu_path = None
    if UU_SETTING_CONFIG.exists():
        try:
            cfg = json.loads(UU_SETTING_CONFIG.read_text(encoding="utf-8"))
            old_uu_path = cfg.get("file_transfer_custom_receive_directory")
            cfg["file_transfer_custom_receive_directory"] = str(today_dir)
            UU_SETTING_CONFIG.write_text(
                json.dumps(cfg, ensure_ascii=False, separators=(",", ":")),
                encoding="utf-8",
            )
            uu_updated = True
        except Exception as e:
            print(f"WARNING: 更新 UU 远程配置失败: {e}", file=sys.stderr)

    # 如果之前 UU 远程指向的旧目录是软链接（例如 ' 11.12'），也把它重定向到今日目录以防内存缓存未刷新
    if old_uu_path:
        old_p = Path(old_uu_path)
        if old_p.is_symlink() and old_p.resolve() != today_dir.resolve():
            try:
                old_p.unlink()
                old_p.symlink_to(today_dir)
            except Exception:
                pass

    files = sorted(
        [
            str(p)
            for p in today_dir.iterdir()
            if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"}
        ]
    )
    print(
        json.dumps(
            {
                "status": "ok",
                "today_dir": str(today_dir),
                "uu_config_updated": uu_updated,
                "previous_uu_dir": old_uu_path,
                "new_uu_dir": str(today_dir),
                "image_count_in_today_dir": len(files),
                "images": files,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


def cmd_add(args: argparse.Namespace) -> int:
    src = Path(args.file).expanduser().resolve()
    if not src.exists():
        print(f"ERROR: 源图片不存在: {src}", file=sys.stderr)
        return 1

    md5_val = compute_md5(src)
    data = load_index()

    for item in data["stickers"]:
        if item.get("md5") == md5_val and not args.force:
            print(
                json.dumps(
                    {
                        "status": "duplicate_skipped",
                        "reason": "MD5 哈希已存在，自动跳过重复图片",
                        "existing_id": item.get("id"),
                        "existing_file": item.get("file"),
                        "md5": md5_val,
                    },
                    ensure_ascii=False,
                )
            )
            return 0

    cat = args.category.strip().lower()
    cat_dir = STICKERS_DIR / cat
    cat_dir.mkdir(parents=True, exist_ok=True)

    ext = src.suffix.lower() or ".jpg"
    clean_id = re.sub(r"[^a-zA-Z0-9_-]+", "-", args.id.strip()).strip("-").lower()
    if not clean_id.startswith(cat + "-"):
        clean_id = f"{cat}-{clean_id}"

    rel_file = f"{cat}/{clean_id}{ext}"
    dst = STICKERS_DIR / rel_file
    if src != dst.resolve():
        shutil.copy2(src, dst)

    triggers = split_tokens(args.triggers)
    entry = {
        "id": clean_id,
        "file": rel_file,
        "md5": md5_val,
        "category": cat,
        "inherited_tag": cat,
        "img_type": args.img_type.strip(),
        "character": args.character.strip(),
        "emotion": args.emotion.strip(),
        "action": args.action.strip(),
        "text": args.text.strip(),
        "craziness": max(1, min(5, int(args.craziness))),
        "triggers": triggers,
        "hidden": False,
    }

    replaced = False
    for i, item in enumerate(data["stickers"]):
        if item.get("id") == clean_id:
            data["stickers"][i] = entry
            replaced = True
            break
    if not replaced:
        data["stickers"].append(entry)

    save_index(data)
    print(
        json.dumps(
            {
                "status": "updated" if replaced else "added",
                "entry": entry,
                "abs_path": str(dst.resolve()),
            },
            ensure_ascii=False,
        )
    )
    return 0


def score_sticker(item: dict, query_tokens: list[str], raw_query: str, bot: str, min_craziness: int) -> float:
    if item.get("hidden", False):
        return 0.0
    abs_f = STICKERS_DIR / item.get("file", "")
    if not abs_f.exists():
        return 0.0
    if int(item.get("craziness", 3)) < min_craziness:
        return 0.0

    cat = item.get("category", "common")
    bot_bonus = 0.0
    if bot:
        if cat == bot:
            bot_bonus = 0.18
        elif cat == "common":
            bot_bonus = 0.08
        else:
            bot_bonus = -0.25

    fields = {
        "text": (item.get("text", ""), 0.45),
        "emotion": (item.get("emotion", ""), 0.40),
        "action": (item.get("action", ""), 0.35),
        "character": (item.get("character", ""), 0.40),
        "triggers": (" ".join(item.get("triggers", [])), 0.38),
        "inherited": (item.get("inherited_tag", ""), 0.30),
        "img_type": (item.get("img_type", ""), 0.15),
    }

    if not query_tokens:
        return max(0.0, 0.5 + bot_bonus)

    matched_score = 0.0
    for q in query_tokens:
        best_q = 0.0
        for _, (val, weight) in fields.items():
            val_lower = val.lower()
            if not val_lower:
                continue
            if q in val_lower or val_lower in raw_query:
                best_q = max(best_q, weight)
        matched_score += best_q

    norm = matched_score / max(1.0, len(query_tokens) * 0.42)
    jitter = random.uniform(0.0, 0.06)
    return round(min(1.0, max(0.0, norm + bot_bonus + jitter)), 3)


def cmd_match(args: argparse.Namespace) -> int:
    data = load_index()
    stickers = data.get("stickers", [])
    q_tokens = split_tokens(args.query)
    raw_q = (args.query or "").strip().lower()
    bot = (args.bot or "").strip().lower()

    scored = []
    for item in stickers:
        if args.only_meme and item.get("img_type") and "表情包" not in item.get("img_type", ""):
            continue
        s = score_sticker(item, q_tokens, raw_q, bot, args.min_craziness)
        if s >= args.threshold:
            abs_p = str((STICKERS_DIR / item["file"]).resolve())
            scored.append(
                {
                    "confidence": s,
                    "id": item.get("id"),
                    "category": item.get("category"),
                    "text": item.get("text"),
                    "emotion": item.get("emotion"),
                    "action": item.get("action"),
                    "craziness": item.get("craziness"),
                    "abs_path": abs_p,
                    "hermes_media": f"MEDIA:{abs_p}",
                }
            )

    scored.sort(key=lambda x: x["confidence"], reverse=True)

    pick_count = 1
    combo_triggered = False
    if args.mode == "battle" and len(scored) >= 2:
        if args.combo or random.random() < 0.20:
            pick_count = 2
            combo_triggered = True

    selected = scored[:pick_count]
    print(
        json.dumps(
            {
                "matched": len(selected) > 0,
                "mode": args.mode,
                "combo_triggered": combo_triggered,
                "threshold": args.threshold,
                "total_candidates": len(scored),
                "selected": selected,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


def cmd_toggle_hide(args: argparse.Namespace, hide_val: bool) -> int:
    data = load_index()
    target = args.id.strip().lower()
    for item in data.get("stickers", []):
        if item.get("id") == target or item.get("file") == target:
            item["hidden"] = hide_val
            save_index(data)
            print(json.dumps({"status": "ok", "id": item.get("id"), "hidden": hide_val}, ensure_ascii=False))
            return 0
    print(json.dumps({"status": "not_found", "id": target}, ensure_ascii=False))
    return 1


def cmd_list(_: argparse.Namespace) -> int:
    data = load_index()
    stickers = data.get("stickers", [])
    summary = {}
    valid_items = []
    for item in stickers:
        cat = item.get("category", "common")
        exists = (STICKERS_DIR / item.get("file", "")).exists()
        summary[cat] = summary.get(cat, 0) + (1 if exists else 0)
        valid_items.append(
            {
                "id": item.get("id"),
                "category": cat,
                "text": item.get("text"),
                "emotion": item.get("emotion"),
                "craziness": item.get("craziness"),
                "hidden": item.get("hidden", False),
                "exists_on_disk": exists,
            }
        )
    print(
        json.dumps(
            {
                "total": len(stickers),
                "by_category_on_disk": summary,
                "stickers": valid_items,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Sticker Reply Tool for Hermes & Muse")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_sync = sub.add_parser("sync-uu", help="创建今日带年份的表情包文件夹并自动切换 UU 远程传输路径")
    p_sync.add_argument("--date", default="", help="指定日期目录名（默认当天 YYYY.MM.DD）")

    p_add = sub.add_parser("add", help="入库新表情包（带 MD5 去重与六维标签）")
    p_add.add_argument("--file", required=True, help="源图片路径")
    p_add.add_argument("--category", default="common", choices=["common", "mirai", "miku", "bocchi", "ray"])
    p_add.add_argument("--id", required=True, help="简短语义标识，如 chiikawa-cry")
    p_add.add_argument("--img-type", default="表情包", help="维度1：图像类别（表情包 / 美图）")
    p_add.add_argument("--character", required=True, help="维度2：人物特征（如 吉伊卡哇、乌萨奇、波奇酱）")
    p_add.add_argument("--emotion", required=True, help="维度3：情绪（如 发癫、委屈、得瑟、社死）")
    p_add.add_argument("--action", required=True, help="维度4：动作（如 转圈、趴地、大哭、比赞）")
    p_add.add_argument("--text", default="无配字", help="维度5：图内配字")
    p_add.add_argument("--craziness", type=int, default=3, help="发癫指数 1~5")
    p_add.add_argument("--triggers", default="", help="适用触发场景（逗号分隔）")
    p_add.add_argument("--force", action="store_true", help="忽略 MD5 去重强制覆盖")

    p_match = sub.add_parser("match", help="本地毫秒级精排匹配表情包")
    p_match.add_argument("--query", default="", help="搜索关键词（空格或逗号分隔：情绪、动作、配字、角色）")
    p_match.add_argument("--bot", default="", help="当前 Bot 档案名：miku / mirai / bocchi / ray")
    p_match.add_argument("--mode", default="active", choices=["active", "search", "battle"], help="互动模式")
    p_match.add_argument("--threshold", type=float, default=0.45, help="最低匹配置信度阈值（默认 0.45）")
    p_match.add_argument("--min-craziness", type=int, default=1, help="最低发癫星级过滤")
    p_match.add_argument("--only-meme", action="store_true", help="仅筛选带‘表情包’类别的图")
    p_match.add_argument("--combo", action="store_true", help="斗图模式下强制触发 2 张连发")

    p_hide = sub.add_parser("hide", help="隐藏看腻的表情包（保留原图但暂停检索）")
    p_hide.add_argument("--id", required=True, help="表情包 ID")

    p_unhide = sub.add_parser("unhide", help="恢复被隐藏的表情包")
    p_unhide.add_argument("--id", required=True, help="表情包 ID")

    sub.add_parser("list", help="列出本机图库统计与清单")

    args = parser.parse_args()
    if args.cmd == "sync-uu":
        return cmd_sync_uu(args)
    if args.cmd == "add":
        return cmd_add(args)
    if args.cmd == "match":
        return cmd_match(args)
    if args.cmd == "hide":
        return cmd_toggle_hide(args, True)
    if args.cmd == "unhide":
        return cmd_toggle_hide(args, False)
    if args.cmd == "list":
        return cmd_list(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
