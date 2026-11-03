# find-skills

Adapted from the find-skills skill in vercel-labs/skills (upstream at https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md), reworked for Muse. Jacob asked for it by name on 2026-11-03 so that new tasks start by looking for an existing skill instead of improvising one.

## When to use it

- Reach for this skill when Jacob wants something done and it is not obvious whether a skill already covers it.

- Reach for it when Jacob asks how to do something, whether a skill exists for something, or names a skill to install.

- Reach for it before building a custom skill or a custom connector from scratch.

## Search in order

- Search Muse's own catalog first with `muse.skill_search`, using a few different angles on the task rather than one guessed term.

- Read the `SKILL.md` of the best matches before deciding. A title match alone does not prove the skill fits.

- Check the skills.sh leaderboard and search next when the catalog has nothing, because popular and battle-tested skills surface there first.

- Search GitHub and the web after that, using specific keywords for the domain plus the task, and try alternative terms when the first search misses.

## Verify quality before recommending or installing

- Check the install count. Prefer skills with heavy use, and treat anything under a hundred installs with skepticism.

- Check the source. Official or well-known authors such as vercel-labs, anthropics, microsoft or mattpocock carry more weight than unknown accounts.

- Check the source repository's stars and recent activity. A skill from a tiny or abandoned repo needs a closer read before it earns trust.

- Read the candidate's actual `SKILL.md` before installing. Never install or recommend from a search snippet alone.

## Install into Muse

- Vendor the skill into `~/workspace/custom-skills/<skill_name>/` with a `SKILL.md` and a `skill.yaml`, following the template at `/opt/muse/skills/custom-connector-setup/templates/skill/`.

- Adapt instructions that assume another host instead of copying them blindly, the way the grill_me and grill_with_docs installs were adapted from their upstream text.

- Check for a near-duplicate before installing. When an existing custom skill already covers most of the task, improve or merge into that skill instead of adding another one, per Jacob's standing rule.

- Verify the install afterwards with `muse.skill_search` and tell Jacob the skill is ready only after it shows up.

## When nothing fits

- Say plainly that no existing skill fits, then do the task directly with general capabilities.

- Build a custom skill with the custom_connector_setup templates only when the workflow is reusable, and tell Jacob what was created.

## Available connectors

- Use `muse.connector_search` to find other connectors and `muse.skill_search` to find related skills.

- If nothing here fits, look on the web for a maintained API or MCP server and set it up with [Custom Connectors and MCPs](/opt/muse/skills/custom-connector-setup/SKILL.md), or build a custom connector.

## Websites

- [skills.sh](https://skills.sh/) for the open agent skills leaderboard and search. Install counts there are a quality signal to verify, not proof that a skill fits the task.
