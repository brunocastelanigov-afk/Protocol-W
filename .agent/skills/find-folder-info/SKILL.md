---

name: find-folder-info

description: Locate a specific piece of information, credential, instruction, document, file path, or source reference inside a user-provided folder. Use when the user gives a folder path plus something to find and wants only the exact requested value or the exact document/path where that information is located. Designed for read-only lookup tasks across local notes, vaults, docs, project folders, markdown, text, JSON, config, and other readable files.

---

  

# Find Folder Info

  

## Overview

  

Find exactly what the user asked for inside exactly the folder they provided. Return only the requested information or only the path to the document that contains it.

  

## Hard Limits

  

- Use only read-only file access.

- If a tool named `read` is available, use only `read`.

- Do not use shell commands, write/edit tools, web tools, database tools, network tools, subagents, or generated mock data.

- Do not modify, create, move, rename, or delete files.

- Do not answer from memory when the requested folder can be inspected.

  

## Input Contract

  

The user must provide:

  

- A folder path.

- The specific information, document, credential, instruction, fact, or source location to find.

  

If either part is missing, ask one concise clarification question. Otherwise proceed.

  

## Search Workflow

  

1. Identify the folder path and the exact target information.

2. Read the folder contents using only read-only access.

3. Prioritize likely text-bearing files first: `.md`, `.txt`, `.json`, `.yaml`, `.yml`, `.env`, `.csv`, `.html`, `.ts`, `.tsx`, `.js`, `.jsx`, `.sql`, and readable config files.

4. Use filenames, folder names, headings, and nearby terms from the user's request to choose which files to read first.

5. Read candidate files directly. Follow internal references only when they stay inside the provided folder.

6. Validate the result against the user's wording before answering. A weak keyword match is not enough.

7. If multiple files contain the requested information, return the most specific match. Prefer the file that directly defines, documents, or stores the information over a file that merely mentions it.

  

## Output Rules

  

- Return only the requested information.

- If the user asked for a value, return only the value.

- If the user asked where something is documented, return only the path to the document.

- If the user asked for both a value and where it came from, return only those two items in the compact format requested by the user.

- Do not include explanations, summaries, greetings, caveats, Markdown fences, or extra labels.

- If the information cannot be found after reading reasonable candidates, return exactly: `Not found`

  

## Examples

  

User: `I want to find the password of the email "brunocastelanigov", inside the folder /Users/brunogovas/Projects/Vault.`

  

Answer: `Senhadeexemplo`

  

User: `The document that explains how to make a button appear only after X time has passed at a vturb video. /Users/brunogovas/Projects/Silver Bullet`

  

Answer: `/Users/brunogovas/Projects/Silver Bullet/path/document-about-vturb.md`