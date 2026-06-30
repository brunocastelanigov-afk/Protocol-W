---
name: fade-up
description: Apply sequential fade-up animations to React/Next.js pages or components using Framer Motion. Use when the user asks to add fade-up, entrance, reveal-on-scroll, viewport animation, sequential component appearance, animation queue, or hierarchy-based page animations.
---

# Fade Up

## Overview

Apply a reusable fade-up wrapper to page components so they start hidden, enter from a negative Y position, become visible in the viewport, and animate only once. Components visible in the initial viewport must appear sequentially according to visual hierarchy.

## Pipeline

### 1. Verify Framer Motion

Confirm the target project can use Framer Motion and client-side wrappers.

- Check `package.json` for `framer-motion`.
- Check whether the framework supports client components or client-side animation wrappers.
- In Next.js App Router, wrapper files that use Motion hooks must include `"use client"`.
- If `framer-motion` is missing, stop and ask before installing or adding the dependency.

### 2. Reuse Or Create The Wrapper

Search the target design system and shared UI folders first.

Look for names and patterns like:

- `FadeUp`
- `fade-up`
- `Reveal`
- `AnimateIn`
- `whileInView`
- `viewport={{ once: true }}`
- `useReducedMotion`

If an existing wrapper exists, reuse it. If not, create one using `references/wrapper-reference.md` as the source pattern. Adapt import aliases and utility helpers to the target project. 

Do not create a new wrapper when an equivalent design-system wrapper already exists. When creating a new one, add it at the correct folder responsible for the components of the project.

### 3. Define Visual Hierarchy

Before editing, map the page into visual groups and assign queue order.

Use these hierarchy questions:

- What does the user need to understand first?
- What gives context to the rest of the page?
- What will the user consult next?
- What is the primary action?
- What is secondary or supporting content?
- Which components are visible in the first viewport?
- Which components only appear after scroll?

Common queue patterns:

- Landing page: eyebrow/badge, headline, subheadline, CTA, proof or visual.
- Dashboard: header, global filters/actions, metric cards, main chart/table, secondary cards.
- Table page: header, base filters, metric cards, conditional filters, table, pagination.
- Detail page: header/context, back or primary action, identity/details card, timeline or secondary data.
- Config page: header, save action, selector/context card, main editor, copy/list/help cards.

### 4. Apply To The First Page First

Apply the wrapper to one page before applying it broadly.

Use the existing wrapper props or this default behavior:

```tsx
<FadeUp offset={-24} delay={0.04}>
  {content}
</FadeUp>
```

Rules:

- Use negative Y for this skill: `offset={-24}` unless the user asks otherwise.
- Use `opacity: 0` as initial opacity.
- Animate to `opacity: 1` and `y: 0` when visible.
- Use `viewport={{ once: true }}` or the wrapper equivalent.
- Preserve layout classes by moving them to the wrapper when the wrapper becomes the grid/flex item.
- Do not alter business logic, data fetching, form handlers, routing, or copy unless requested.
- Do not process a batch before validating the first page.

Recommended delay queue:

```tsx
<FadeUp offset={-24} delay={0.04}>Header</FadeUp>
<FadeUp offset={-24} delay={0.12}>Filters or action</FadeUp>

{items.map((item, index) => (
  <FadeUp
    key={item.id}
    offset={-24}
    delay={0.2 + index * 0.08}
  >
    {item.content}
  </FadeUp>
))}
```

Use `amount={0.12}` for large blocks that should trigger earlier in the viewport.

### 5. Validate

Validate the first page before continuing.

Required checks:

- Run the project build command if available.
- Run typecheck if available.
- Compare the implemented wrapper behavior against `references/wrapper-reference.md`.
- Inspect desktop and mobile layouts.
- Confirm components in the first viewport appear in hierarchy order.
- Confirm scrolled components animate when entering the viewport.
- Confirm scrolling away and back does not replay the animation.
- Confirm reduced-motion behavior is preserved if the wrapper supports it.

If validation fails, fix the first page before applying the skill to additional pages or components.

## Notes

- Page reload resets the animation because components mount again. `viewport.once` only prevents repeat enter/leave animations during the current page lifecycle.
- If the user wants hero or above-the-fold components to animate only once per browser session, implement explicit persistence with `sessionStorage` or similar only after approval. 
- Prefer local design-system primitives over new abstractions.
