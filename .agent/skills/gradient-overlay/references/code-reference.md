# Gradient Overlay — Code Reference

This file contains the canonical implementation patterns for the `GradientOverlay` skill. Use these examples as the ground truth when auditing or building gradient effects.

---

## Reusable Component (Recommended)

The preferred approach is a composable React component. It centralizes all gradient logic, supports dark mode variants, and is easy to reuse across sections.

```tsx
// components/ui/gradient-overlay.tsx
import { cn } from "@/lib/utils"

type GradientOverlayProps = {
  variant?: "dark" | "background"
  direction?: "t" | "b" | "l" | "r"
  layout?: "full" | "top"
}

const directionMap = {
  t: "bg-gradient-to-t",
  b: "bg-gradient-to-b",
  l: "bg-gradient-to-l",
  r: "bg-gradient-to-r",
}

const variantMap = {
  dark: "from-black/60 via-black/20",
  background: "from-[var(--background)] via-[var(--background)]/40",
}

const layoutMap = {
  full: "absolute inset-0",
  top: "absolute top-0 left-0 right-0 h-80",
}

export function GradientOverlay({
  variant = "dark",
  direction = "t",
  layout = "full",
}: GradientOverlayProps) {
  return (
    <div
      className={cn(
        "pointer-events-none to-transparent",
        layoutMap[layout],
        directionMap[direction],
        variantMap[variant]
      )}
    />
  )
}
```

### Usage examples

```tsx
// Image section fading into the page background (bottom-to-top)
<div className="relative">
  <img src="..." alt="..." className="w-full object-cover" />
  <GradientOverlay variant="background" direction="t" layout="full" />
</div>

// Hero section with dark scrim (top-to-bottom, partial height)
<div className="relative">
  <img src="..." alt="..." className="w-full object-cover" />
  <GradientOverlay variant="dark" direction="b" layout="top" />
</div>

// Section transition (left-to-right)
<div className="relative">
  <GradientOverlay variant="background" direction="r" layout="full" />
</div>
```

---

## Inline HTML Pattern (No Component Available)

When a component cannot be created (e.g., raw HTML, CMS output, legacy code), apply the gradient as a sibling `<div>` inside the same `relative` container as the image.

```html
<!-- Container must be position: relative -->
<div style="position: relative;">

  <!-- The image (light mode) -->
  <img
    alt="Footer background"
    class="object-cover object-bottom dark:hidden"
    style="position:absolute; height:100%; width:100%; left:0; top:0; right:0; bottom:0; color:transparent;"
    src="/images/footer-image.jpg"
  />

  <!-- The image (dark mode variant) -->
  <img
    alt="Footer background"
    class="object-cover object-bottom hidden dark:block"
    style="position:absolute; height:100%; width:100%; left:0; top:0; right:0; bottom:0; color:transparent;"
    src="/images/footer-image-dark.jpg"
  />

  <!-- Gradient overlay: bottom-to-top, fades to transparent -->
  <!-- variant="background": uses CSS var --background as the opaque color -->
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent"
  ></div>

  <!-- Optional: dark scrim for the dark-mode image (darkens the image itself) -->
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent hidden dark:block"
  ></div>

</div>
```

---

## Decision Map

|Situation|Approach|
|---|---|
|React / Next.js project with `components/ui/`|Create `GradientOverlay` component|
|Component already exists in codebase|Import and reuse — do NOT duplicate|
|Raw HTML / CMS / no component system|Use inline `<div>` pattern|
|Needs dark mode variant|Separate overlay with `hidden dark:block`|
|Transition between two sections (no image)|Wrap both sections in `relative`, add `GradientOverlay` at the border|

---

## Tailwind Class Reference

|Token|Class|Effect|
|---|---|---|
|Direction `t`|`bg-gradient-to-t`|Bottom → Top|
|Direction `b`|`bg-gradient-to-b`|Top → Bottom|
|Direction `l`|`bg-gradient-to-l`|Right → Left|
|Direction `r`|`bg-gradient-to-r`|Left → Right|
|Variant `background`|`from-[var(--background)] via-[var(--background)]/40`|Matches page bg|
|Variant `dark`|`from-black/60 via-black/20`|Dark scrim|
|End color|`to-transparent`|Always transparent — required|
|Layout `full`|`absolute inset-0`|Covers entire container|
|Layout `top`|`absolute top-0 left-0 right-0 h-80`|Top portion only|
|No interaction|`pointer-events-none`|Always — prevents click blocking|

---

## Critical Rules

1. **IF parent container has no `position` defined, it should gain `position: relative`** — without this, the absolute overlay escapes to the nearest positioned ancestor.
2. **Always end with `to-transparent`** — the gradient must dissolve, never cut.
3. **Always add `pointer-events-none`** — the overlay must never intercept user interactions.
4. **Check for existing gradient components before creating a new one** — search for `GradientOverlay`, `gradient-overlay`, or `bg-gradient` in the codebase first.
5. **Respect dark mode** — if the asset or section has a dark variant, the gradient color must also adapt (use `var(--background)` or separate dark-mode overlays).
