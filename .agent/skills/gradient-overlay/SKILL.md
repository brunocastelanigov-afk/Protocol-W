---
name: gradient-overlay 
description: Apply a linear gradient effect to create smooth visual transitions between images, sections, containers, or components and their surrounding context. Use this skill whenever the user wants to: fade an image into a page background, soften the edge between two sections, add a dark scrim over a hero image, or create any CSS linear-gradient overlay. Trigger on keywords like "gradient", "fade image", "smooth transition between sections", "overlay", "scrim", "image blending into background", or when the user shares code with an image/section and asks to improve the visual transition. Also trigger when the user shows a layout where an image or section looks visually "cut off" or "harsh" against the background.

---

# Gradient Overlay Skill

Apply a `linear-gradient` overlay to produce smooth visual transitions between images, sections, or components and their surrounding context.

**Reference file**: `references/code-reference.md` Read it when you need canonical component code, inline HTML patterns, the Tailwind class reference table, or the decision map for choosing approach.

## Pipeline

### Step 1 — Audit the context

Before writing any code:

- Identify the **target element**: is it an image, a section boundary, a card, a hero, a footer?
- Identify the **surrounding context**: what is the background color / CSS variable the gradient must match? (usually `--background`, `bg-background`, or a specific color)
- Locate the **right place in the code** to add the overlay (the parent container that wraps the asset or section)
- Search the codebase for an **existing gradient component** (`GradientOverlay`, `gradient-overlay`, `bg-gradient`) — reuse if found, do not duplicate.
- If no existing gradient were found, ask user, in step 2 for the correct folder to add the component.

---

### Step 2 — Collect parameters (if not provided at invocation)

If the user did not specify direction, color, or size when invoking the skill, ask via the quiz below. Keep it short — one message, three questions.

---

**Gradient Configuration Quiz**

**Q1 — Direction** _(pick one)_

1. `t` — bottom → top _(image fades upward into background)_
2. `b` — top → bottom _(image fades downward)_
3. `l` — right → left
4. `r` — left → right

> The transparent end is always opposite the chosen direction.

---

**Q2 — Color** _(pick one)_

1. Background color of the parent element (`var(--background)`)
2. Skill suggestion based on audited context
3. Other — type the color value

---

**Q3 — Size / Layout** _(pick one)_

1. Full container (`inset-0` — covers everything)
2. Skill recommendation based on context _(will specify `top`, `left`, `right`, `height`)_
3. Other — type the values

---

**Q4 — Component Folder** _(pick one)_
1. Skill suggestion.
2. component/ui
3. Other — type the values

---

### Step 3 — Choose implementation approach

Consult the **Decision Map** in `references/code-reference.md`.

|Situation|Action|
|---|---|
|React / Next.js project|Create or reuse `GradientOverlay` component|
|Existing gradient component found|Import and use — skip creation|
|Raw HTML / no component system|Use inline `<div>` overlay pattern|
|Dark mode support needed|Add separate dark-mode variant overlay|

---

### Step 4 — Implement

**If creating a new component:**

1. Create gradient-overlay.tsx` at the right folder ( specified by user in step 2 ) using the canonical code in `references/code-reference.md`
2. Add the component to the target location in the parent container
3. Pass the correct `variant`, `direction`, and `layout` props

**If using inline HTML:**

1. Ensure the parent has `position: relative`
2. Add the gradient `<div>` as a sibling to the image/content inside that container
3. Use the inline pattern from `references/code-reference.md`

**Non-negotiable rules (always enforce):**

- Parent container → `position: relative`
- Gradient always ends with `to-transparent`
- Overlay always has `pointer-events-none`
- Never block user interactions

---

### Step 5 — Visual review

After applying the gradient:

1. Use **Playwright** to take a screenshot of the affected area
2. Confirm the transition looks smooth — no hard edge, no abrupt color cut
3. If dark mode exists, check both light and dark variants
4. Report to the user: what was applied, where, and with which parameters

If Playwright is unavailable, report the change in code and ask the user to visually verify in the browser.

---

## Quick Reference

```tsx
// Minimal usage — image fading into page background (bottom-to-top)
<div className="relative">
  <img src="..." alt="..." />
  <GradientOverlay variant="background" direction="t" layout="full" />
</div>
```

Full component code, inline HTML pattern, and Tailwind class table → `references/code-reference.md`.
