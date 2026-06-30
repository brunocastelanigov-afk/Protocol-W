---
name: punctual-dev-adjustment
description: Interactive workflow for punctual dev adjustments using high-precision audit and @dev orchestration.
---

# 🛠️ Punctual Dev Adjustment (AIOS Skill)

This skill automates the process of auditing specific files and orchestrating the `@dev` from AIOS agent for quick, reliable adjustments.

## ⚙️ WORKFLOW PIPELINE

### 🔍 PHASE 1: DISCOVERY & AUDIT
- **Instruction:** Elicit the list of affected pages or files from the user.
- **Action:** Perform a **Level 1 Audit** using `view_file` or `grep_search` on each path to understand the current implementation context.
- **Audit Criteria:**
  - Presence of tracking hooks (`funnelTracker`).
  - SCSS Module integration.
  - State management patterns (`useState`, `useEffect`).

### 📝 PHASE 2: REQUIREMENT ELICITATION
- **Instruction:** Ask the user to list the specific adjustments or issues to be resolved.
- **Rule:** Do not guess requirements; ensure all "Points of Adjustment" are captured.

### 🔎 PHASE 3: RESEARCH & VALIDATION
- **Instruction:** You MUST perform a mandatory search using the `context7` MCP to find up-to-date documentation and best practices.
- **Action:** Also search within the local repository to see if there is already validated code or existing patterns that solve the problem.
- **Constraint:** You must complete this research and contextual validation BEFORE proceeding directly to technical mapping.

### 🧠 PHASE 4: TECHNICAL MAPPING (ENGLISH)
- **Instruction:** Transform the user requirements and research outcomes into a high-precision technical specification using the following template for each point:
  - **Issue:** [General DEV description of the problem]
  - **Suspected Root Cause:** [Hypothesis regarding Logic, DOM, or State]
  - **Target Outcome:** [Expected behavior after adjustment]
  - **Risks & Mitigation:** [Identify potential risks introduced by this change and propose mitigation strategies]
- **Audit Points added automatically:**
  - **Logic & State:** Hooks dependencies and race conditions.
  - **Component Structure:** SCSS isolation and accessibility.
  - **React DOM:** Scroll management and lifecycle side-effects.

### 🚀 PHASE 5: @DEV ORCHESTRATION — PLANNING OUTPUT

- **Instruction:** Activate the `@dev` agent.
- **Command:** Run `*develop-preflight` passing the technical specification from Phase 4.
- **Constraint:** Do not implement changes; ONLY present the pre-flight plan for stakeholder approval. You MUST wait for explicit approval from the stakeholder before proceeding.

> ⚠️ **MANDATORY:** The planning output document MUST follow the template at:
> [`templates/planning-output.md`](file:///Users/brunogovas/Projects/Silver%20Bullet/Projetos/Funil_Quiz_2.0/.agent/skills/dev-acjustment/templates/planning-output.md)
>
> Read the template with `view_file` BEFORE writing the planning document. The template was extracted from a validated exemplar and defines the required structure, sections, and formatting.

#### 5.0 Planning Output Requirements (MANDATORY)

The pre-flight plan is the **primary deliverable** of Phase 5. It is NOT optional. The plan MUST contain the following three mandatory sections — **failure to include any of them is a BLOCKING issue**:

##### 5.0.1 Referência de Código Mapeada (MANDATORY)

Every piece of existing code that will be used as reference, extended, or serve as a base for the implementation MUST be mapped in the plan with:

- **Link to file + exact line range** (e.g., `[Fim.jsx L147](file:///path#L147)`)
- **The actual reference code transcribed** (real snippet from the repo, NOT pseudo-code)
- **Annotation** explaining what from this reference will be reused or adapted

```
Example format:
### Reference: Wait Modal Overlay Pattern
[Fim.module.scss L1940-L2000](file:///absolute/path#L1940-L2000)

```scss
.waitModalOverlay {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100vh;
  background: rgba(8, 14, 28, 0.90);
  backdrop-filter: blur(10px);
  z-index: 9999;
}
```
↑ This pattern will be reused for the new modal overlay.
```

##### 5.0.2 Lógica de Implementação (MANDATORY)

The implementation logic MUST be written and coded in the plan document BEFORE any execution. This applies to ALL logic — whether created from scratch, found via `context7`, or found in the current repository. Each logic block MUST:

- **Include working, implementable code** (NOT pseudo-code, NOT vague descriptions)
- **Tag its origin** with one of: `[CRIADO]`, `[CONTEXT7]`, `[REPO EXISTENTE]`
- **Explain the logic flow** in a brief annotation

```
Example format:
### Logic: Video Time Trigger
**Origin:** `[REPO EXISTENTE]` + `[CRIADO]`

```js
// EXISTING: smartplayer.timeupdate handler (Fim.jsx L147)
if (payload?.type === 'smartplayer.timeupdate') {
  debugRef.current = { currentTime: payload.currentTime }
  setVideoCurrentTime(payload.currentTime || 0) // ← NEW
}

// NEW: Trigger condition
useEffect(() => {
  if (videoCurrentTime >= 1030 && !hasOpenedCheckout && !showSurpriseModal) {
    setShowSurpriseModal(true)
  }
}, [videoCurrentTime])
```
```

##### 5.0.3 Structured Template (MANDATORY)

The planning output MUST follow the structure defined in the template file. The template includes mandatory sections for:

1. **Contexto** — Problem context and motivation
2. **Referência de Código Mapeada** — All reference code with real snippets
3. **Lógica de Implementação** — All logic with origin tags and real code
4. **Arquitetura de Componentes** — Mermaid diagram of data flow
5. **CSS/SCSS Reference** — Existing styles with adaptation tables
6. **Novos Componentes** — Props, behavior, and core logic code
7. **Componentes Modificados** — Exact changes with code
8. **i18n Keys** — New keys with anti-reversion plan (if applicable)
9. **Files Summary** — Table with action, file path, and risk level
10. **Implementation Order** — Phased execution plan
11. **Rollback Plan** — Git-based revert strategy
12. **Verification Plan** — Test cases table with routes and expected results
13. **Handoff** — External integration documentation (if applicable)

> **Reference exemplar:** The template was derived from [`retention-modals.md`](file:///Users/brunogovas/Projects/Silver%20Bullet/Projetos/Funil_Quiz_2.0/SILVER-BULLET-AQUISICAO-FREQUENCIA/docs/sessions/2026-04/retention-modals.md) — consult it for a real-world example of a complete, validated planning output.

---

#### 5.1 Risk Assessment (Per Adjustment)

For **each** adjustment point from Phase 4, classify the risk level:

| Risk Level | Criteria | Example |
|------------|----------|---------|
| 🟢 **LOW** | Cosmetic, copy, or styling-only changes. No logic or state affected. | Fix padding, update label text |
| 🟡 **MEDIUM** | Logic changes scoped to a single component. No shared state or side-effects. | Fix conditional render, adjust local useState |
| 🔴 **HIGH** | Changes to shared state, hooks with dependencies, cross-component data flow, or routing. | Refactor context provider, modify useEffect with deps array, alter tracker payloads |

**Risk Classification Template (per point):**

```
Point #N: [Issue Title]
├── Risk Level: 🟢 LOW | 🟡 MEDIUM | 🔴 HIGH
├── Blast Radius: [Which components/pages are affected]
├── Regression Surface: [What existing behavior could break]
└── Confidence: HIGH | MEDIUM | LOW (based on audit completeness)
```

#### 5.2 Quality Gates (Scaled by Risk)

Apply quality gates proportional to the risk classification:

| Gate | 🟢 LOW | 🟡 MEDIUM | 🔴 HIGH |
|------|--------|-----------|---------|
| **Visual Verification** | ✅ Required | ✅ Required | ✅ Required |
| **Console Error Check** | — | ✅ Required | ✅ Required |
| **Cross-Page Regression** | — | — | ✅ Required |
| **State Integrity Audit** | — | ✅ Required | ✅ Required |
| **Build Validation** | — | — | ✅ Required |
| **Stakeholder Sign-off** | Batch OK | Per-Point | Per-Point + Demo |

**Gate Execution Rules:**
- Gates are validated **after** each adjustment is implemented, not at the end.
- A failed gate **blocks** the next adjustment. Fix before proceeding.
- For 🔴 HIGH risk: the DEV must present a before/after comparison to the stakeholder.

#### 5.3 Rollback Plan

**For 🟡 MEDIUM and 🔴 HIGH risk adjustments:**

- **Pre-Implementation:** Record the current git state (`git stash` or commit hash).
- **Rollback Strategy:** Document how to revert each adjustment independently.
- **Template:**

```
Point #N Rollback:
├── Git Reference: [commit hash or stash ref]
├── Files to Revert: [list of files]
├── Revert Command: git checkout <ref> -- <file1> <file2>
└── Post-Revert Validation: [what to check after reverting]
```

- **Constraint:** For 🔴 HIGH risk, the rollback plan MUST be presented in the pre-flight plan and approved by the stakeholder before implementation begins.

#### 5.4 Compatibility Check

Before marking any adjustment as complete, verify:

- [ ] Existing tracking events (`funnelTracker`) still fire correctly
- [ ] No new console errors or warnings introduced
- [ ] Responsive behavior unchanged on affected breakpoints
- [ ] Navigation flow between pages unaffected
- [ ] No visual regression on adjacent components
- [ ] State management patterns remain consistent (no orphaned state)

#### 5.5 Definition of Done (Per Adjustment)

Each adjustment is considered **DONE** only when ALL of the following are met:

- [ ] Technical specification from Phase 4 is fully addressed
- [ ] Planning output follows template (§5.0) with all 3 mandatory sections
- [ ] All applicable Quality Gates (§5.2) for its risk level pass
- [ ] Rollback plan documented (if MEDIUM/HIGH risk)
- [ ] Compatibility Check (§5.4) passes
- [ ] File paths of all modified files logged with absolute paths
- [ ] Stakeholder has given explicit approval (verbal or written)

**Batch Completion Criteria:**
- ALL individual adjustments meet their Definition of Done
- A final summary is presented listing: points completed, risk levels, gates passed
- Session handoff document is created in `docs/sessions/YYYY-MM/`

---
**MANDATORY RULES:**
1. Follow **AIOS Standards** from `.agent/rules/aios.md`.
2. Always list files with absolute paths.
3. Keep the technical specification in **English** as per the system's focus.
4. If AIOS is not present in the repository, NOTIFY USER and present options to continue before starting the workflow.
5. If the `context7` MCP is not accessible or available, NOTIFY USER and HALT execution of the skill immediately.
6. **Phase 5 Planning Output is MANDATORY.** The pre-flight plan MUST include: (a) referência de código mapeada with actual code snippets, (b) lógica de implementação with origin tags and real code, (c) full adherence to the `templates/planning-output.md` structure.
7. **Read the planning template** (`templates/planning-output.md`) with `view_file` BEFORE writing any planning output.
