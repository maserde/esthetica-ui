# AGENTS.md

Shared project instructions for AI coding agents (Antigravity, Cursor, Gemini CLI, GitHub Copilot, Windsurf, etc.).

## Library purpose

This is a **component library consumed by external projects**. Every decision must account for:

- **No bundled peer dependencies.** Consumer-likely libs must be `peerDependency`, never `dependency`. Vue is already external.
- **No global style side-effects.** No CSS resets, base element overrides, or unscoped utilities — they bleed into the consumer. All tokens in `@layer esthetica-ui-tokens`. Styles always scoped.
- **Namespace everything.** Classes use `.est-` BEM prefix; custom properties use `--est-`.
- **Keep exports tree-shakeable.** Each component exported individually from `src/index.ts`. No module-level side effects.
- **Scrutinise third-party libraries.** Prefer native browser APIs and Vue built-ins. Any added lib must be externalised or verified conflict-free at the consumer.
- **Externalise every peer dependency in `vite.config.ts`.** Every `peerDependency` must also appear in `rolldownOptions.external` — otherwise it gets bundled.
- **Exported types and prop defaults are public API.** Never remove a union member, rename an exported type, or change a `withDefaults` default without a semver major. Adding new optional members/props is safe.

## Commands

```bash
pnpm dev              # Playground app at http://localhost:5173
pnpm storybook        # Storybook at http://localhost:6006 (primary dev environment)
pnpm test:unit        # Run all tests (jsdom + Storybook/Playwright)
pnpm lint             # oxlint --fix, then eslint --fix (runs both in sequence)
pnpm format           # oxfmt src/
pnpm build            # type-check + vite build → dist/
pnpm build-storybook  # Static Storybook build
```

Single test: `pnpm vitest run src/__tests__/App.spec.ts`

## Workflow

Before starting any task:
- **Verify file/path existence.** Never assume a file or path exists — Read or `ls` the target first.

After changes:
- **Run `pnpm lint`** after editing any `src/` file.
- **Run `pnpm build`** after touching `src/index.ts` exports, `src/style.css` imports, or `vite.config.ts`.
- **Run the relevant test** after changing component logic: `pnpm vitest run src/__tests__/App.spec.ts`.

## Architecture

**Vue 3 component library** published as `esthetica-ui`. Output: ES module, UMD bundle, compiled CSS. Vue is an external peer dependency.

- `src/index.ts` — library entry; all component exports + `virtual:uno.css` + `src/style.css`
- `virtual:uno.css` — virtual UnoCSS module injected at build time. Never create or delete manually.
- `src/App.vue` / `src/main.ts` — playground entry for `pnpm dev`; excluded from library build.
- `@` alias resolves to `src/`

### Token system

Tokens are CSS custom properties in `src/tokens/`:
- `src/tokens/global.css` — `--est-radius`, `--est-font-sans`, etc.
- `src/tokens/colors.css` — semantic color state tokens per variant (see below)
- `src/tokens/components/foo.css` — component-level `--est-foo-*` tokens

`src/style.css` imports all token files under `@layer esthetica-ui-tokens`. Component tokens must reference globals/colors via `var()` — never hardcode raw values and never reference raw palette shades directly (e.g. `--est-color-primary-500`) when a semantic state token exists.

#### Color token state system

Each color variant (`default`, `primary`, `info`, `warning`, `success`, `danger`) exposes **11 semantic state tokens** in `colors.css`:

| Suffix | Palette shade | Purpose |
|---|---|---|
| `-background-color` | 500 | Solid fill background |
| `-foreground-color` | white (warning: 900) | Text/icon on solid background |
| `-hovered-color` | 400 | Solid background on hover |
| `-pressed-color` | 700 | Solid background on press |
| `-border-color` | 600 | Border for solid variant |
| `-focus-ring-color` | 300 | Focus ring / outline |
| `-muted-background-color` | 50 | Tinted/light background |
| `-muted-foreground-color` | 700 | Text on muted background |
| `-muted-hovered-color` | 100 | Muted background on hover |
| `-muted-pressed-color` | 200 | Muted background on press |
| `-muted-border-color` | 200 | Border in muted context |

`default` uses the **neutral** palette (`--est-color-neutral-*`). `secondary` does not use this system (no numbered palette scale) — reference its tokens directly: `--est-color-secondary`, `--est-color-secondary-hover`, `--est-color-secondary-pressed`, `--est-color-secondary-foreground`.

**Always use these semantic tokens** — never reference raw palette shades (e.g. `--est-color-primary-300`) when a semantic slot covers the same value.

```css
/* ✅ correct */
--est-foo-default-bg-color: var(--est-color-primary-background-color);
--est-foo-default-focus-ring-color: var(--est-color-primary-focus-ring-color);

/* ❌ wrong — raw palette shades */
--est-foo-default-bg-color: var(--est-color-primary-500);
--est-foo-default-focus-ring-color: var(--est-color-primary-300);
```

#### Token naming convention

All component tokens **must** strictly follow this pattern:
`--est-[componentName]-[componentVariant]-[state]-[element]-[modifier]`

- `[componentName]`: e.g. `card`, `button`, `foo`.
- `[componentVariant]`: e.g. `default`, `primary`, `success`. **Always include a `default` variant slot** even if the component does not accept a variant prop.
- `[state]`: e.g. `hover`, `active`, `checked`, `disabled`. Use state-first order. Omit if default state.
- `[element]`: e.g. `btn`, `track`, `icon`, `label`. Omit if targeting the component root.
- `[modifier]`: e.g. `bg-color`, `border-color`, `color`, `padding`. Always use standard CSS property names (e.g. `bg-color` instead of `bg`, `border-color` instead of `border` for colors).

**Examples:**
- `--est-card-default-bg-color: var(--est-color-white);`
- `--est-button-primary-hover-bg-color: var(--est-color-primary-border-color);`
- `--est-pagination-default-hover-btn-bg-color: var(--est-color-neutral-100);`
- `--est-toggle-success-checked-track-bg-color: var(--est-color-success-background-color);`

**Naming conflict — `default` color variant:** The `[componentVariant]` segment uses `default` for the base/fallback token slot (e.g. `--est-btn-default-bg-color`). This collides with the `color="default"` prop value. To avoid ambiguity, use `neutral` as the internal component preset token prefix for "default" color variant presets, while keeping the CSS modifier class named `--default` (matching the prop value):

```css
/* ✅ Component token file — use "neutral" prefix for the default color presets */
--est-btn-neutral-bg-color: var(--est-color-default-background-color);
--est-btn-neutral-focus-ring-color: var(--est-color-default-focus-ring-color);

/* ✅ Component CSS — modifier class still named --default, references neutral presets */
.est-button--default {
  --est-btn-default-bg-color: var(--est-btn-neutral-bg-color);
  --est-btn-default-focus-ring-color: var(--est-btn-neutral-focus-ring-color);
}
```

#### Component token file structure

```css
@layer esthetica-ui-tokens {
  :root {
    /* ── Size variant presets ────────────────────────────────────── */
    --est-foo-sm-padding: ...;
    --est-foo-sm-min-height: ...;
    --est-foo-sm-font-size: ...;

    --est-foo-md-padding: ...;
    --est-foo-md-min-height: ...;
    --est-foo-md-font-size: ...;

    --est-foo-lg-padding: ...;
    --est-foo-lg-min-height: ...;
    --est-foo-lg-font-size: ...;

    /* ── Base/Default tokens ─────────────────────────────────────── */
    /* Always include a 'default' variant */
    --est-foo-default-padding: var(--est-foo-md-padding);
    --est-foo-default-min-height: var(--est-foo-md-min-height);
    --est-foo-default-font-size: var(--est-foo-md-font-size);
    --est-foo-default-bg-color: var(--est-color-primary-background-color);
    --est-foo-default-color: var(--est-color-primary-foreground-color);
    --est-foo-default-hover-bg-color: var(--est-color-primary-hovered-color);
    --est-foo-default-pressed-bg-color: var(--est-color-primary-pressed-color);
    --est-foo-default-focus-ring-color: var(--est-color-primary-focus-ring-color);

    /* ── Color/style variant presets ─────────────────────────────── */
    --est-foo-secondary-bg-color: var(--est-color-secondary);
    --est-foo-secondary-color: var(--est-color-secondary-foreground);
    --est-foo-secondary-hover-bg-color: var(--est-color-secondary-hover);
    /* ... one group per named variant */
  }
}
```

#### Component CSS structure

Modifier classes re-point base/default tokens; base class reads only base/default tokens — single rendering path.

```css
/* 1. Modifier classes FIRST */
.est-foo--sm {
  --est-foo-default-padding: var(--est-foo-sm-padding);
  --est-foo-default-min-height: var(--est-foo-sm-min-height);
  --est-foo-default-font-size: var(--est-foo-sm-font-size);
}
.est-foo--secondary {
  --est-foo-default-bg-color: var(--est-foo-secondary-bg-color);
  --est-foo-default-color: var(--est-foo-secondary-color);
  --est-foo-default-hover-bg-color: var(--est-foo-secondary-hover-bg-color);
}

/* 2. Base class LAST — only reads default tokens, never variant tokens directly */
.est-foo {
  padding: var(--est-foo-default-padding);
  min-height: var(--est-foo-default-min-height);
  font-size: var(--est-foo-default-font-size);
  background-color: var(--est-foo-default-bg-color);
  color: var(--est-foo-default-color);
}
.est-foo:hover { background-color: var(--est-foo-default-hover-bg-color); }
```

Rules:
- Modifier classes always before base class.
- Base class never references `--est-foo-{variant|size}-*` directly — only base `--est-foo-default-*`.
- `@apply` for layout/structural and typography utilities. Never `@apply` colour — always `var(--est-color-*)` directly. (`@apply text-sm` compiles to `font-size: var(--est-font-size-sm)` — consumer-overridable.)
- For shadows consumers should override, use `box-shadow: var(--est-shadow-*)` directly — `@apply shadow-*` bakes in the value and can't be overridden via token.
- `:deep()` only for structural properties not exposed as a token (`width`, `height`, `text-align`). Prefer CSS custom property overrides first.

### Component conventions

Three sibling files in `src/components/`:

| File | Purpose |
|---|---|
| `EstFoo.vue` | Logic and template |
| `EstFoo.css` | Scoped styles — `<style scoped src="./EstFoo.css" />` |
| `EstFoo.stories.ts` | Storybook stories |

- BEM: `.est-foo`, `.est-foo--modifier`, `.est-foo__element`. No inline `<style>` in `.vue`.
- **Props**: `defineProps<Interface>()` + `withDefaults`. Every prop must have an explicit `withDefaults` entry. Only `const props = withDefaults(...)` when script code accesses props — omit when template-only to avoid lint errors.
- **Prop Naming (`color` vs `variant`)**: When a prop controls the color palette (e.g., `primary`, `success`, `danger`), its name must be `color`. When a prop controls the structural visual style (e.g., `solid`, `outlined`, `ghost`, `muted`), its name must be `variant`. Do not use `variant` for palette colors.
- **Emits**: `defineEmits<{ event: [args] }>()`. Export `Color`, `Variant`, `Size`, etc. from `<script setup>`.
- **Slots**: `leading` (before label), `trailing` (after label), default for primary label. Icons: `<span class="i-ri-add-line w-[1em] h-[1em]" aria-hidden="true" />` — never inline SVGs.
- **Class bindings**: object syntax only — no string concatenation, array syntax, or computed strings. Use `buildVariant` for prop-to-modifier mappings (see [Variant class binding](#variant-class-binding--decision-tree) for the decision tree).

```html
:class="{
  ...buildVariant('est-foo', color ?? 'default'),          // color declares base class
  ...buildVariant('est-foo', variant ?? 'solid', false),   // variant: 1-to-1, base already set
  ...buildVariant('est-foo', size ?? 'md', false),         // size: 1-to-1, base already set
  'est-foo--disabled': disabled,                           // not 1-to-1: explicit
}"
```

**New component checklist (in order):**
1. `src/components/EstFoo.vue`
2. `src/components/EstFoo.css`
3. `src/components/EstFoo.stories.ts`
4. `src/tokens/components/foo.css` — `--est-foo-*` in `@layer esthetica-ui-tokens`
5. Add `@import './tokens/components/foo.css';` to `src/style.css`
6. Add component and type exports to `src/index.ts`:

```ts
export { default as EstFoo } from './components/EstFoo.vue'
export type { FooColor, Props as FooProps } from './components/EstFoo.vue'
```

7. Add to the `GlobalComponents` augmentation in `src/index.ts`:

```ts
EstFoo: (typeof import('./components/EstFoo.vue'))['default']
```

### Composite components

Use the composite pattern when the consumer chooses **which structural parts to include** (icon, title, description) rather than toggling props. If the internal layout is fixed and only text/slot content changes, use named slots on a single component instead.

| Condition | Choose |
|---|---|
| Consumer may omit or reorder structural parts | Composite |
| Content is slot-swapping only, layout is fixed | Single component with named slots |
| A wrapper component uses another component family internally (e.g. Toast wrapping Alert) | Composite — the wrapper uses sub-components internally |

**File structure** — group the family in a named subfolder:

```
src/components/EstFoo/
  EstFoo.vue            ← root; owns layout shell, provides context
  EstFooIcon.vue        ← sub-component
  EstFooTitle.vue       ← sub-component
  EstFooDescription.vue ← sub-component
  EstFoo.css            ← single CSS file for the whole family
  EstFoo.stories.ts     ← all stories use composite API
```

**Sharing color context via `provide`/`inject`:**

The root provides its `color` prop as a reactive ref. Sub-components inject it to adapt automatically (e.g. icon selection).

```ts
// EstFoo.vue — root
const props = withDefaults(defineProps<Props>(), { color: 'default' })
provide('est-foo-color', toRef(props, 'color'))
```

```ts
// EstFooIcon.vue — sub-component
const color = inject<Ref<FooColor>>('est-foo-color')
```

Use a plain namespaced string key (`'est-foo-color'`), not a Symbol. The `est-` prefix is unique enough; a Symbol requires a shared module with no real benefit since sub-components only ever live inside the root.

**Color-to-value maps — `Record`, never if/else chains:**

```ts
const COLOR_ICON: Record<FooColor, string> = {
  default: 'i-ri-checkbox-circle-fill',
  primary: 'i-ri-checkbox-circle-fill',
  success: 'i-ri-checkbox-circle-fill',
  info:    'i-ri-information-fill',
  warning: 'i-ri-error-warning-fill',
  danger:  'i-ri-error-warning-fill',
}
const iconClass = computed(() => COLOR_ICON[color?.value ?? 'default'])
```

TypeScript errors immediately when a new variant is added to the union but not to the record. An if/else chain silently falls through to a default.

**CSS — one file for the whole family:**

Sub-components are rendered by the **consumer** inside `<slot />`, so they compile in the consumer's scope — not EstFoo's. Vue's scoped `data-v-*` attribute is **not** stamped on slot content, so plain scoped selectors like `.est-foo__icon` won't match. Use `:deep()` for all sub-component element rules. CSS custom properties still cascade naturally through the DOM without `:deep()`, so token inheritance works regardless.

Sub-components do not need their own CSS files.

Use CSS grid for the layout shell so icon, content, and close button occupy named columns without a JS-managed wrapper:

```css
.est-foo__inner {
  display: grid;
  grid-template-columns: auto 1fr auto; /* icon | content | close */
  column-gap: 12px;
  row-gap: 2px;
  align-items: start;
}

/* Collapse empty columns when parts are absent */
.est-foo__inner:not(:has(.est-foo__icon))  { grid-template-columns: 1fr auto; }
.est-foo__inner:not(:has(.est-foo__close)) { grid-template-columns: auto 1fr; }
.est-foo__inner:not(:has(.est-foo__icon)):not(:has(.est-foo__close)) { grid-template-columns: 1fr; }

.est-foo__icon  { grid-column: 1; grid-row: 1 / span 2; align-self: center; }
.est-foo__title { grid-column: 2; }
.est-foo__body  { grid-column: 2; }
.est-foo__close { grid-column: 3; grid-row: 1 / span 2; align-self: center; }
```

**New composite component checklist (in order):**
1. `src/components/EstFoo/EstFoo.vue` — `provide` context, layout shell with `<slot />`
2. `src/components/EstFoo/EstFooIcon.vue` — `inject` color, `Record<Color, string>` icon map
3. `src/components/EstFoo/EstFooTitle.vue` — thin wrapper (`div.est-foo__title` + `<slot />`)
4. `src/components/EstFoo/EstFooDescription.vue` — thin wrapper (`div.est-foo__body` + `<slot />`)
5. `src/components/EstFoo/EstFoo.css` — grid layout + all sub-component element styles
6. `src/components/EstFoo/EstFoo.stories.ts` — all stories use composite API
7. `src/tokens/components/foo.css` — structural tokens at `:root`; variant colors on `.est-foo__inner` descendants (never `:root`)
8. Add `@import './tokens/components/foo.css';` to `src/style.css`
9. Export all from `src/index.ts`:

```ts
export { default as EstFoo } from './components/EstFoo/EstFoo.vue'
export { default as EstFooIcon } from './components/EstFoo/EstFooIcon.vue'
export { default as EstFooTitle } from './components/EstFoo/EstFooTitle.vue'
export { default as EstFooDescription } from './components/EstFoo/EstFooDescription.vue'
export type { FooVariant, Props as FooProps } from './components/EstFoo/EstFoo.vue'
```

10. Add the root and all sub-components to the `GlobalComponents` augmentation in `src/index.ts`:

```ts
EstFoo: (typeof import('./components/EstFoo/EstFoo.vue'))['default']
EstFooIcon: (typeof import('./components/EstFoo/EstFooIcon.vue'))['default']
EstFooTitle: (typeof import('./components/EstFoo/EstFooTitle.vue'))['default']
EstFooDescription: (typeof import('./components/EstFoo/EstFooDescription.vue'))['default']
```

**Consumer usage:**

```html
<EstFoo color="default">
  <EstFooIcon />
  <EstFooTitle>Title text</EstFooTitle>
  <EstFooDescription>Body text goes here.</EstFooDescription>
</EstFoo>
```

### Composables

Shared Vue logic in `src/composables/`. Each file exports a single `use*` function. Composables must be pure — no module-level side effects, no DOM access outside `onMounted`/`onUnmounted`. Don't export composables from `src/index.ts`.

#### When to extract a composable

| Condition | Action |
|---|---|
| Same logic in 2+ components | Extract to `src/composables/` |
| Vue-specific idiom that will recur (class helpers, slot inspection, focus trapping) | Extract to `src/composables/` |
| Pure function, no Vue dependency | Put in `src/utils/` instead |
| CSS/styling decision | Solve in token/CSS layer, not JS |
| One-liner used in exactly one place | Keep inline |

#### Variant class binding — decision tree

Stop at first match:

**1. Can the element inherit the variant color from a CSS ancestor?**
If an ancestor's modifier class already sets `--est-{component}-color`, children inherit it via cascade.
→ Remove all per-variant modifier classes from the sub-element.

**2. Does the element own the variant scope (component root)?**
→ `buildVariant` (also declares base class):

```ts
import { useVariantClasses } from '@/composables/useVariantClasses'
const { buildVariant } = useVariantClasses()
```

```html
:class="{ ...buildVariant('est-foo', variant ?? 'default'), 'est-foo--other': condition }"
```

**3. Direct 1-to-1 prop-to-modifier match, base class already declared?**
→ `buildVariant` with `declareBase: false`:

```html
:class="{ ...buildVariant('est-foo', variant ?? 'default'), ...buildVariant('est-foo', size ?? 'md', false) }"
```

**4. Not a 1-to-1 match (`disabled`, `loading`, `with-title`)?**
→ Explicit: `'est-foo--disabled': disabled`

#### `buildVariant` rules

`buildVariant(base, value, declareBase?)`:
- `true` (default) — adds base + modifier class. For primary scope-owning modifier (`variant`).
- `false` — modifier class only. For secondary dimensions (`size`, `rounded`, `type`) when base is declared.

Don't add parameters to `buildVariant`. For compound modifiers combining two props, add a separate function inside `useVariantClasses`.

#### Token cascade — sub-element colors

Components wrapping a variant-owning component (e.g. `EstAlert` wrapping `EstCard`) — sub-elements inherit `--est-card-color` from the card's CSS scope automatically. No per-variant classes or separate color token groups needed. Use `--est-card-color-hover` for hover shades rather than hardcoding palette values.

**Never reference another component's variant token from `:root`.** `var(--est-card-color)` at `:root` always resolves to the default — card variant modifier classes are invisible from `:root`.

Correct: assign in the component CSS file on a descendant that lives below the parent's variant scope in the DOM:

```css
/* ✅ EstAlert.css — .est-alert__inner is a DOM child of .est-card--{variant} */
.est-alert__inner {
  --est-alert-icon-color: var(--est-card-color);
  --est-alert-close-hover-color: var(--est-card-color-hover);
}

/* ❌ alert.css at :root — always resolves to default color */
:root { --est-alert-icon-color: var(--est-card-color); }
```

Token files keep only non-color structural tokens at `:root`.

### Accessibility

- `disabled` prop → `aria-disabled="true"` on root + native `disabled`
- `loading` prop → `aria-busy="true"` on root
- Decorative icons/spinners → `aria-hidden="true"`
- Interactive elements → visible label or `aria-label`/`aria-labelledby`
- Native semantics first — `<button>`, `<a>`, `<input>` before `role`
- Keyboard navigation — Tab-reachable, Enter/Space-operable
- Focus ring — never suppress; use `focus-visible`; never `outline: none` without replacement. Use `outline` (not `ring-*` — ring utilities apply `box-shadow` and conflict with other shadows).

### Storybook integration

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EstFoo from './EstFoo.vue'

const meta = {
  title: 'Components/EstFoo',          // always 'Components/EstFoo' format
  component: EstFoo,
  tags: ['autodocs'],
  argTypes: {
    color:   { control: 'select', options: ['default', 'primary', 'success', 'warning', 'danger'] },
    variant: { control: 'select', options: ['solid', 'outlined', 'ghost'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    onClick:  { action: 'click' },     // wire every emit as an action
  },
  render: (args) => ({
    components: { EstFoo },
    setup() {
      // For interactive components (v-model), use a local ref
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<EstFoo v-bind="args" v-model="value">{{ args.default ?? 'Label' }}</EstFoo>`,
  }),
} satisfies Meta<typeof EstFoo>        // use satisfies, not a type annotation

export default meta
type Story = StoryObj<typeof meta>
```

Story order: color → variant → size → state (loading, disabled) → icon slot stories. Each group ends with an `All X` overview using an inline `render` template.

## Toolchain

- **UnoCSS** — `presetMini`, `presetWebFonts` (Inter/Roboto Slab/Fira Code), `presetIcons` (`@iconify-json/ri`), `transformerDirectives`. Icons via class: `i-ri-loader-4-line`. No icon imports or other icon libraries.
- **`extendTheme`** — maps typography/spacing utilities to CSS custom properties: `@apply text-sm` → `font-size: var(--est-font-size-sm)`. Spacing keys are pixel values (`gap-8` = 8 px). Unmapped keys resolve to presetMini rem defaults.
- **Lint** — oxlint then eslint (both `--fix`). Husky + lint-staged on every commit for staged `src/` files.
- **Format** — oxfmt (not Prettier).
- **Type-checking** — `vue-tsc --build` against `tsconfig.app.json`.

**UnoCSS `@apply` gotchas (presetMini@66.7.0):**
- **`border` without `border-solid` is invisible.** No preflight — `border-style` defaults to `none`. Always pair: `@apply border border-solid`.
- Not available — use explicit CSS instead: `animate-*` (define scoped `@keyframes est-*`), `table-auto/fixed` (`table-layout:`), `border-collapse/separate`, `shadow-xs` (`box-shadow: var(--est-shadow-xs)`), `list-disc/decimal/none` (`list-style-type:`), `sr-only/not-sr-only`.
