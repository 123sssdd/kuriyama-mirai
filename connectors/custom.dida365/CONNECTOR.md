# Dida365

- `custom.dida365` connects Muse to the user's Dida365 (滴答清单) account through the official hosted MCP server at `https://mcp.dida365.com`. It authenticates with the registered `api_key` credential, placed as a bearer header, and calls only `mcp.dida365.com`.

- The helper is `~/workspace/custom-connectors/custom.dida365/bin/client.py`, an MCP Streamable HTTP client with `list-tools` and `call-tool` commands. It allows only the tool names listed in its `ALLOWED_TOOLS` set.

## Connect

- The connection was registered with `credentials.request_api_access` and these details. Reuse them to reconnect:

```json
{
"provider": "dida365",
"auth_scheme": "api_key",
"placement": "bearer_header",
"api_hosts": ["mcp.dida365.com"]
}
```

- The user creates the credential in the Dida365 web app under avatar, Settings, Account and Security, API Token (API 口令). Never ask the user to paste it in chat.

- Before the first change in a conversation, prove access with a harmless read:

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py list-tools
```

## Credentials

- The registered connection holds the credential. Helpers import `/opt/muse/skills/custom-connector-setup/bin/dynamic_credentials.py`, which returns an `hsurr:` surrogate and places it where the provider reads the key. Muse swaps in the real credential only on an approved request to a registered host.

- Never put a key, token, password or cookie in this doc, a helper, a command argument, an environment variable or a log. Never ask the user to paste one in chat.

- Keep redirects disabled on authenticated requests.

- On a 401 or 403, check the request first. Confirm that the helper attached the credential, that the host is registered and that the placement and scopes match.

- Only when a request that carried the credential is still rejected, call `credentials.request_api_access` with the details above and `"reconnect": true`.

## List tools

- List the tools the server offers. Verified on 2026-11-03 with 58 tools returned and no pagination cursor.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py list-tools
```

- Read the input schema of any new tool from this output before adding its exact name to `ALLOWED_TOOLS` and calling it.

## Search tasks

- Search tasks by keyword across the account. This reads data and changes nothing. Verified on 2026-11-03.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name search_task --arguments-file <path-to-json>
```

- Write the arguments as one JSON object in a file, for example `{"query": "Hermes"}`. The result lists matching tasks with `id`, `title` and `url`. Keep the `id` for follow-up reads.

## Get a task by ID

- Read one task in full, including its content body, status, priority, tags and project ID. This reads data and changes nothing. Verified on 2026-11-03.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name get_task_by_id --arguments-file <path-to-json>
```

- Write the arguments as one JSON object in a file, for example `{"task_id": "<id from search_task>"}`.

## List projects

- List the account's projects (清单) with their IDs and names. This reads data and changes nothing. Verified on 2026-11-03.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name list_projects --arguments-file <path-to-json>
```

- Pass an empty JSON object `{}` for all projects. Optional `offset` and `limit` fields paginate.

## Get a project with its undone tasks

- Read one project together with all its undone tasks, including each task's title, content, tags, priority and column. This reads data and changes nothing. Verified on 2026-11-03 for all five of the user's projects.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name get_project_with_undone_tasks --arguments-file <path-to-json>
```

- Write the arguments as one JSON object in a file, for example `{"project_id": "<id from list_projects>"}`.

## Get a task's comments

- Read all comments on one task. This reads data and changes nothing. Verified on 2026-11-03.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name get_comment --arguments-file <path-to-json>
```

- Write the arguments as one JSON object in a file with both `project_id` and `task_id`.

## Delete a task

- Delete one task by project and task ID. The server reports the deleted ID. Verified on 2026-11-03 when the user asked for three leftover test tasks to be removed, and a follow-up search confirmed none remained.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name delete_task --arguments-file <path-to-json>
```

- Write the arguments as one JSON object in a file with both `project_id` and `task_id`. Deleting needs the user's explicit authorization for those tasks.

## Create a task

- Create a task in a project with title, content, tags, priority, kind and an optional kanban `columnId`. Verified on 2026-11-03 when the user asked for two skill-install todos to be arranged for Codex and Hermes.

```text
python3 ~/workspace/custom-connectors/custom.dida365/bin/client.py call-tool --name create_task --arguments-file <path-to-json>
```

- Write the arguments as `{"task": {...TaskInput fields...}, "client_timezone": "Asia/Shanghai"}`. The result returns the created task with its new `id`.

## Write operations

- The server also offers writes such as `update_task`, `complete_task`, `add_comment` and project, tag and habit management. These are untested through this helper. Add a tool name to `ALLOWED_TOOLS` only after reading its schema, and get the user's authorization before any change.

- When writing a comment on the user's behalf in Dida365, use the plain-text style the user requires. Wrap labels in, start key points with 「关键：」 and warnings with 「注意：」, and include no HTML or color codes.

## Recover from errors

- An HTTP error or a JSON-RPC error exits with status 1 and the call is never replayed automatically. Read the error, fix the cause and run the command again yourself.

- After a failed or timed-out change, check the current state with a read before trying again, because the first request may have completed.

## Limits

- The official help page states the MCP mainly supports tasks, projects, habits, focus records and countdowns, and only over Streamable HTTP. Server-sent events are not supported.

- One call takes roughly 3 to 10 seconds in observed use. Batch independent reads into one shell command when possible.

## Related skills

- Use `muse.skill_search` to find other skills and `muse.connector_search` to find other connectors.
