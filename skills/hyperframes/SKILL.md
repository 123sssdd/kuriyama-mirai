# hyperframes（HTML 转视频）

Installed for Muse at the user's request on 2026-11-03, from the engineering batch he first listed for Codex plus Superpowers. Adapted for Muse.

## When to use it

- Use when the user wants a web-based video: an explainer, product intro, animated chart or map, title cards, or turning a page or deck idea into a short film. For a normal PPT file use the documents route; use HyperFrames when the deliverable is video or an HTML slide film.

## How to run it

- Follow the production loop: plan the video, write the composition (index.html root, one scene per sub-composition under compositions/, media in assets/), wire seekable animations, check with the CLI, preview, then render. Renders are frame-seeked and deterministic, so identical input gives identical MP4.

- Build what was asked: no voiceover, captions or new aspect ratio unless the request or source calls for them. Default new video is 1920x1080 at 30 fps; a film over about 15 seconds that tells something gets music and sound on its visible actions unless he asked for silence.

- Check the registry for named effects, transitions, caption styles, charts or cards before hand-writing one, and route media needs (music, voice, images) through the media-use flow, saying plainly when HeyGen plan usage is involved.

- All commands go through the hyperframes_cli skill (npx hyperframes). Animations must be seekable: never base motion on Date.now, Math.random or wall-clock time.

## Source

- Upstream https://github.com/heygen-com/hyperframes (Apache 2.0) publishes about twenty-one skills; the router and creation method are folded into this entry and the CLI loop into hyperframes_cli.

## Available connectors

- Use `muse.skill_search` for sibling skills (grill_me, grill_with_docs, brainstorming, find_skills) and `muse.exec` for git, node and ffmpeg work.
