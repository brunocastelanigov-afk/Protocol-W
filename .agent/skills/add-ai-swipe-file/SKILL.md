---
name: add-ai-swipe-file
description: Save AI prompts, reusable AI instructions, implementation notes, and image-generation prompts into the user's Vault AI Swipe File. Use when the user asks to add, archive, store, save, catalog, or document a prompt or AI-related reference in `/Users/brunogovas/Projects/Vault/Vault/Tools/AI/AI Swipe File`, including development prompts, implementation documentation, and image-generation prompts.
---

# Add AI Swipe File

## Overview

Add the user's AI prompt or documentation to the correct Vault swipe-file destination with a short context description. Preserve all existing content; only append new material or create a new implementation document when needed.

Vault root:

`/Users/brunogovas/Projects/Vault/Vault/Tools/AI/AI Swipe File`

## Destination Routing

Route the content by intent:

- Development prompt: append to `Dev-Focused Prompts.md`
- Image-generation prompt: append to `Img Generation Prompts.md`
- Implementation documentation, technical write-up, architecture note, integration guide, or post-build explanation: create or update a Markdown file inside `documents/`

When content could fit more than one destination, ask a concise clarification before writing. If the user gives an explicit destination, use it.

## Workflow

1. Identify the material to save, its source/context, and the likely destination.
2. Inspect the target file or `documents/` folder before editing so the new entry follows the existing format where practical.
3. If saving multiple items, process one item first, re-read the result, verify the formatting and destination, then continue with the remaining items.
4. Append to existing prompt files. Do not replace, delete, reorder, or rewrite existing entries unless the user explicitly asks.
5. For implementation documents, prefer a new file in `documents/` unless the user names an existing document to update.
6. After writing, re-read the changed file and report the exact destination.

## Entry Format

Use the existing local format if the destination already has a clear pattern. Otherwise use:

```markdown
## <short descriptive title>

Context: <1-3 sentences explaining what this prompt/document is for, when to use it, and any relevant source/project>

<prompt or documentation content>
```

For implementation documents created in `documents/`, use:

```markdown
# <short descriptive title>

Context: <1-3 sentences explaining the implementation, project, use case, and why this document exists>

<documentation content>
```

## Safety Rules

- Never delete or truncate existing Vault content.
- Never overwrite a file in `documents/` without explicit approval.
- Never delete anything created in the last 7 days without explicit approval.
- Do not invent missing prompt content. If the user has not supplied the prompt/documentation and it cannot be inferred from the active task, ask for it.
- Do not use mock database values when real project data exists and the saved content depends on that data.
- If filesystem permissions block writing to the Vault, request the required approval rather than using a workaround.

## Naming Implementation Documents

When creating a new implementation document and the user does not provide a filename, create a concise slug:

`YYYY-MM-DD-topic.md`

Use the current local date. Keep the filename lowercase, hyphenated, and specific enough to scan later.
