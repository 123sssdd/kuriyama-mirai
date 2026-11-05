---
name: todo-management
description: Use this when the user asks to add, list, edit, move, complete, or remove todo items in the local SQLite todo list (quick capture or offline backup of Notion todos).
---

> Box note: sqlite3 is at /home/box/.local/bin/sqlite3; run scripts with PATH=/home/box/.local/bin:$PATH and TODO_DB=/workspace/todos/todo.db.

> **Grok Bot note:** Script: `/home/box/agent-data/workflows/todo-management/scripts/todo.sh`. Requires the `sqlite3` CLI (installed at /home/box/.local/bin). Set `TODO_DB` to a fixed absolute path (suggested: `/workspace/todos/todo.db`) on every call, e.g. `TODO_DB=/workspace/todos/todo.db bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry list`; otherwise it writes ./todo.db in whatever the cwd is. This is a local backup/quick list; the Notion task database is the primary store.


# Todo Management

## What this skill controls
A per-workspace SQLite database:
- Default: `./todo.db`
- Override: `TODO_DB=/path/to/todo.db`

All changes MUST happen through the CLI:
`bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh ...`

## Statuses
`pending` (default), `in_progress`, `done`, `skipped`

Default list hides `done` and `skipped` unless `--all` or `--status=...`.

---

# Non-negotiable rules

## 1) No file writing (ever)
- Do NOT create or edit any files (e.g., `todos.md`, notes, markdown, exports).
- Do NOT output “filename blocks” like `todos.md (...)`.
- The only persistent state is in `todo.db`, mutated by `todo.sh`.

## 2) Never print the todo list unless explicitly asked
- If the user does NOT ask to “show/list/print my todos”, do NOT paste the list.
- Default behavior after mutations: one short confirmation line only.

## 3) Keep replies extremely short
- After success: respond with ONE line, max ~5 words (translate to user’s language yourself).
- Do not include bullets, tables, code blocks, or tool output unless the user explicitly asked for the list/details.

Allowed confirmations (English examples; translate as needed):
- “Done.”
- “Added.”
- “Updated.”
- “Removed.”
- “Moved.”
- “Renamed.”
- “Cleared.”
- “Added to the list.”

## 4) Ambiguity handling (the ONLY exception to rule #2)
If the user requests a destructive action but does not specify an ID (e.g., “remove the milk task”):
1) run `entry list` (optionally with `--group=...`)  
2) show the results (minimal table)  
3) ask which ID to act on

This is the only case where you may show the list without the user explicitly requesting it.

## 5) Group deletion safety
- `group remove "X"` moves entries to Inbox (default).
- Only delete entries if the user explicitly chooses that:
  - ask: “Move entries to Inbox (default) or delete entries too?”
  - only then use `--delete-entries`.

---

# Commands (use exactly these)

### Entries
- Add:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry create "Buy milk"`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry create "Ship feature X" --group="Work" --status=in_progress`
- List (ONLY when user asks, or for ambiguity resolution):
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry list`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry list --group="Work"`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry list --all`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry list --status=done`
- Show one entry:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry show 12`
- Edit text:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry edit 12 "Buy oat milk instead"`
- Move:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry move 12 --group="Inbox"`
- Change status:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry status 12 --status=done`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry status 12 --status=skipped`
- Remove:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh entry remove 12`

### Groups
- Create / list:
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh group create "Work"`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh group list`
- Rename (alias: edit):
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh group rename "Work" "Work (Project A)"`
  - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh group edit "Work" "Work (Project A)"`
- Remove:
  - Default (move entries to Inbox):
    - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh group remove "Work"`
  - Delete entries too (ONLY if user explicitly wants it):
    - `bash /home/box/agent-data/workflows/todo-management/scripts/todo.sh group remove "Work" --delete-entries`

---

# “Clear the list” behavior (no list printing)
To clear the todo list:
1) run `entry list --all` to get IDs (do NOT paste the results)
2) remove each ID with `entry remove ID`
3) reply with ONE line: “Cleared.”

If the user then asks to see the list, run `entry list` and show it.

---

# Dialogue example (expected behavior)

User: "I need to buy milk, add it to my todo list"
Agent: "Done."

User: "Oh, and I also need to clean the room"
Agent: "Added to the list."

User: "Show my todos"
Agent: (prints the list)

User: "Remove the milk one"
Agent: (lists matching tasks + asks for ID, then removes when ID is provided)
