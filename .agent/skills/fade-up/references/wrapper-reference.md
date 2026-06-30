# Fade-Up Wrapper Reference

Use this reference when the target project does not already have an equivalent fade-up wrapper.

## Canonical Wrapper

```tsx
"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/components/ui/utils"

type FadeUpProps = React.ComponentProps<typeof motion.div> & {
  delay?: number
  offset?: number
  amount?: number
}

export function FadeUp({
  children,
  className,
  delay = 0,
  offset = 28,
  amount = 0.22,
  transition,
  viewport,
  ...props
}: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: offset }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount, ...viewport }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

## Required Behavior

- Initial state: `opacity: 0`.
- Initial Y position: `y: offset`.
- For this skill, pass `offset={-24}` so the component starts above its natural position.
- Visible state: `opacity: 1`, `y: 0`.
- Viewport trigger: `whileInView`.
- One-time animation: `viewport={{ once: true }}`.
- Sequential appearance: `transition.delay`.
- Accessibility: `useReducedMotion` disables motion transforms.

## Usage Examples

### Header And Filters

```tsx
<FadeUp offset={-24} delay={0.04} className="flex min-w-0 flex-col gap-3">
  <PageHeader />
</FadeUp>

<FadeUp offset={-24} delay={0.12}>
  <FilterBar />
</FadeUp>
```

### Cards In Visual Order

```tsx
{metrics.map((metric, index) => (
  <FadeUp
    key={metric.id}
    offset={-24}
    delay={0.2 + index * 0.08}
    className="h-full"
  >
    <MetricCard className="h-full" metric={metric} />
  </FadeUp>
))}
```

### Large Section Below The Fold

```tsx
<FadeUp offset={-24} delay={0.44} amount={0.12}>
  <MainTable />
</FadeUp>
```

## Adaptation Notes

- If the project does not have `cn`, use the local class-name utility or pass `className` directly.
- If the project imports Motion from `motion/react` instead of `framer-motion`, adapt imports to the installed library.
- If the wrapper is used inside a grid or flex parent, put item-level layout classes on `FadeUp`.
- Do not wrap table rows directly unless the table library supports motion elements inside table semantics. Prefer wrapping the containing card or table section.
