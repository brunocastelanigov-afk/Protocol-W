---
name: import-design-system
description: Detect, import, and document a project's design system and catalog page into the Design_Systems swipe-file. Use when the user asks to add, import, register, copy, or onboard a design system from any project into the personal Design_Systems folder. Trigger on mentions of 'add design system', 'import design system', 'catalog page', 'swipe-file', 'design-system folder', or any request to consolidate UI components/tokens from a project into Design_Systems.
---

# 📦 Import Design System (AIOS Skill)

This skill automates the detection, import, and documentation of a project's design system into the personal `Design_Systems` swipe-file repository. It copies components, tokens, catalog pages, and configuration files, then generates VitePress documentation and updates the portal's navigation.

## Target Repository

All output goes to `Design_Systems/` at:

```
/Users/brunogovas/Projects/Projetos Solo/Design_Systems/
```

## ⚙️ WORKFLOW PIPELINE

### 🔍 PHASE 1: DISCOVERY — Detect Design System Artifacts

**Goal:** Map every design-system-relevant artifact in the source project.

**Action:** Scan the project root provided by the user using `list_dir`, `grep_search`, and `view_file`.

**Detection Checklist:**

1. **Components directory** — Search for:
   - `components/ui/` (shadcn pattern)
   - `components/` at project root or `src/components/`
   - Files matching `button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`
   - Shared utility like `utils.ts` or `cn()` helper

2. **Global styles / Tokens** — Search for:
   - `globals.css`, `global.css`, or `index.css` containing CSS custom properties (`:root { --` )
   - `tailwind.config.js` or `tailwind.config.ts` with custom theme tokens
   - Token format: `hsl()`, `oklch()`, `rgb()`, hex values in `:root`
   - `@theme inline` blocks (Tailwind CSS 4)
   - Light/dark mode token sets (`.dark {}`, `@media (prefers-color-scheme: dark)`)

3. **Catalog / Showcase page** — Search for:
   - Route directories named `catalog/`, `design-system/`, `showcase/`, `styleguide/`
   - Files named `DesignSystemCatalog.tsx`, `CatalogPage.tsx`, or similar
   - React Router / Next.js routes containing `/catalog`, `/design-system`, `/internal/design-system`, `/showcase`
   - Pages that import multiple UI components for visual demonstration

4. **Configuration files** — Search for:
   - `components.json` (shadcn config)
   - `tailwind.config.*` (theme extensions)
   - `postcss.config.*`

5. **Typography & Fonts** — Search for:
   - `@font-face` declarations
   - Font imports in layout files or CSS
   - `--font-sans`, `--font-display`, `--font-mono` custom properties

6. **Motion / Animation patterns** — Search for:
   - `framer-motion` in `package.json`
   - Components using `useReducedMotion`, `whileInView`, `AnimatePresence`
   - Animation wrapper components (`FadeUp`, `Reveal`, `AnimateIn`)

**Output:** A structured inventory listing what was found and what was not.

---

### 📝 PHASE 2: AUDIT & CLASSIFY

**Goal:** Understand the token architecture and component composition strategy.

**Action:** Read the key files identified in Phase 1 using `view_file`:
- The global CSS file (to extract token names, color format, and theming strategy)
- The `package.json` (to identify the stack: Next.js, Vite, React Router, etc.)
- The catalog/showcase page (to understand scope and sections)
- 2-3 representative components (to understand the component API pattern: cva, Radix, etc.)

**Classify:**

| Property | Value |
|---|---|
| **Framework** | Next.js / Vite / CRA / etc. |
| **CSS Strategy** | Tailwind v3 (hsl) / Tailwind v4 (oklch + @theme) / Vanilla CSS / CSS Modules |
| **Component Base** | shadcn/ui / Radix / custom / MUI / etc. |
| **Motion Library** | Framer Motion / GSAP / CSS animations / none |
| **Token Format** | hsl / oklch / hex / rgb |
| **Dark Mode** | Yes (class-based) / Yes (media) / No |
| **Has Catalog Page** | Yes (path: X) / No |
| **Has components.json** | Yes / No |

**Present the inventory to the user** with the classification table and the list of files to be copied.

---

### 🌐 PHASE 3: PRODUCTION VISIBILITY CHECK

**Goal:** Determine if the catalog page is publicly accessible in production.

**Action:**

1. **Check routing configuration:**
   - Next.js: Check `middleware.ts` for auth guards, check if the catalog route is in `publicPaths` arrays
   - React Router: Check if the catalog route is inside `<AuthGuard>` or equivalent
   - Check for `NODE_ENV` guards inside the catalog page component itself

2. **Check for access restrictions:**
   - Search for `process.env.NODE_ENV`, `import.meta.env.DEV`, or conditional rendering based on environment
   - Search middleware or route guards for the catalog path

3. **Classify visibility:**
   - 🔴 **PUBLIC** — Catalog is accessible without authentication in production
   - 🟢 **PROTECTED** — Catalog requires auth or is environment-gated
   - ⚪ **UNKNOWN** — Could not determine from code analysis alone

4. **Ask the user for the production link:**

   > "O catálogo do projeto `{project-name}` está acessível publicamente em produção (status: {🔴/🟢/⚪}).
   > Por favor, forneça o link de produção do catálogo/design-system para incluir na documentação."

   Wait for the user to provide the production URL before proceeding.

---

### 📂 PHASE 4: COPY ARTIFACTS

**Goal:** Copy all design-system artifacts into `Design_Systems/{project-slug}/`.

**Naming convention:** Use a lowercase, hyphenated slug derived from the project name (e.g., `dashboard`, `saas-agent`, `elevate-app`).

**Target directory structure:**

```
Design_Systems/{project-slug}/
├── DESIGN.md           # Design system documentation (generated in Phase 5)
├── components/         # All UI component files (.tsx/.ts)
├── catalog/            # Catalog page file(s) (if found)
├── styles/             # Global CSS with tokens
├── components.json     # shadcn config (if exists)
└── tailwind.config.*   # Tailwind config (if exists)
```

**Copy rules:**

1. **Components:** Copy all `.tsx` and `.ts` files from the UI components directory into `{project-slug}/components/`
2. **Styles:** Copy the global CSS file into `{project-slug}/styles/globals.css`
3. **Catalog:** Copy the catalog page into `{project-slug}/catalog/page.tsx` (or equivalent filename)
4. **Config files:** Copy `components.json` and `tailwind.config.*` to `{project-slug}/` root
5. **DO NOT copy:** `node_modules/`, `.next/`, `dist/`, `build/`, or any build artifacts
6. **DO NOT copy:** Business logic pages, API routes, or server-side code unrelated to the design system

**Validation:** After copying, run `ls -R Design_Systems/{project-slug}/` to confirm all files are in place and count matches the inventory from Phase 2.

---

### 📖 PHASE 5: GENERATE DOCUMENTATION

**Goal:** Create the DESIGN.md and VitePress documentation pages.

#### 5.1 Create `DESIGN.md`

Create `Design_Systems/{project-slug}/DESIGN.md` following this structure:

```markdown
# Design System: {Project Display Name}
#
# {One-line description of what this design system covers}

## 🎨 Design Tokens
### 1. Color Palette ({format: hsl/oklch/hex})
- List each token with its value and usage description
- Include both light and dark mode values if applicable

### 2. Typography
- Font families with fallback stacks
- Type scale hierarchy with Tailwind classes

### 3. Shape & Depth
- Border radius system
- Shadow scale

### 4. Motion & Animation
- Animation library and version
- Entry animation pattern
- Easing curves and durations

## 🧩 Componentization Strategy
- Stack summary (framework, styling, primitives)
- Atomic components list with variant counts
- Molecular/composite components list

## 🖥️ Catalog Page
- Purpose description
- Sections inventory
```

All values MUST be extracted from the actual code, NOT invented.

#### 5.2 Create VitePress Documentation Pages

Create three markdown pages in `Design_Systems/docs/{project-slug}/`:

1. **`index.md`** — Introduction & Tokens
   - Design tokens table (name, value, description)
   - Typography scale
   - Shape & depth system
   - Motion presets
   - Tech stack table
   - Source directory tree

2. **`components.md`** — Components inventory
   - Grouped by layer: Atomic → Molecular → Composition
   - Each component with description, props summary, and origin (shadcn/custom)

3. **`catalog.md`** — Catalog Visual (only if a catalog page was found)
   - Purpose explanation
   - Section inventory table
   - Component mapping table
   - Reference to source file path

---

### ⚙️ PHASE 6: UPDATE PORTAL CONFIGURATION

**Goal:** Register the new design system in the VitePress portal.

#### 6.1 Update `config.mts`

File: `Design_Systems/docs/.vitepress/config.mts`

Add to `nav` array:
```ts
{ text: '{Display Name}', link: '/{project-slug}/' }
```

Add to `sidebar` object:
```ts
'/{project-slug}/': [
  {
    text: '{Display Name} DS',
    items: [
      { text: 'Introdução & Tokens', link: '/{project-slug}/' },
      { text: 'Componentes UI', link: '/{project-slug}/components' },
      // Only include if catalog exists:
      { text: 'Catálogo Visual', link: '/{project-slug}/catalog' }
    ]
  }
]
```

#### 6.2 Update `docs/index.md` (Homepage)

Add to `hero.actions`:
```yaml
- theme: alt
  text: Explorar {Display Name}
  link: /{project-slug}/
```

Add to `features`:
```yaml
- icon: {emoji}
  title: {Display Name}
  details: {One-line description of the design system}
```

Add to `Links de Produção (Deploys)` section:
```markdown
- **{Display Name}:** [{production-url}]({production-url})
```

Add to structure tree:
```
├── {project-slug}/        # {brief description}
│   ├── components/        # {count} componentes UI
│   ├── catalog/           # Página de catálogo (if applicable)
│   ├── styles/            # Tokens globais
│   └── {config files}
```

---

### ✅ PHASE 7: VERIFY & COMMIT

**Goal:** Validate the integration and commit.

**Verification steps:**

1. **Build VitePress:**
   ```bash
   cd Design_Systems && npx vitepress build docs
   ```
   The build MUST complete without errors.

2. **Structure validation:**
   ```bash
   find Design_Systems/{project-slug} -type f | sort
   find Design_Systems/docs/{project-slug} -type f | sort
   ```
   Confirm all expected files exist.

3. **Cross-reference:** Verify the component count in the documentation matches the actual files copied.

4. **Commit & Push:**
   ```bash
   cd Design_Systems
   git add {project-slug}/ docs/{project-slug}/ docs/.vitepress/config.mts docs/index.md
   git commit -m "feat: adicionar {Display Name} DS ao swipe-file"
   git push
   ```

---

## 📋 MANDATORY RULES

1. **Never invent token values.** All colors, fonts, and measurements must be extracted from the actual source files.
2. **Never copy business logic.** Only copy UI components, styles, tokens, configs, and catalog/showcase pages.
3. **Always ask for the production URL.** Do not guess or fabricate deployment links.
4. **Always verify with VitePress build** before committing. A broken build blocks the pipeline.
5. **Preserve existing entries.** When updating `config.mts` and `docs/index.md`, only append — never remove or reorder existing design system entries.
6. **Follow the slug convention.** Project slugs must be lowercase, hyphenated, and match the directory name exactly.
7. **One project per execution.** Process one design system at a time. If the user wants multiple, run the pipeline sequentially.
8. **Check for duplicates.** Before Phase 4, verify that `Design_Systems/{project-slug}/` does not already exist. If it does, ask the user whether to update/overwrite or abort.

---

## 🔄 UPDATE MODE

If the user wants to update an existing design system entry (e.g., new components were added to the source project):

1. Re-run Phase 1 and Phase 2 to detect new/changed artifacts.
2. Compare against the existing `Design_Systems/{project-slug}/` contents.
3. Present a diff summary showing what would be added, updated, or removed.
4. Only proceed after user approval.
5. Update documentation pages to reflect new components or token changes.
6. Re-run Phase 7 verification.
