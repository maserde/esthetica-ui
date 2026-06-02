# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Library purpose

This is a **component library consumed by external projects**, not a standalone app. Every architecture decision, solution design, and code generation must account for this constraint:

- **No bundled peer dependencies.** Vue is already marked external. Any library a consumer app is also likely to use (state managers, utility libs, etc.) must be a `peerDependency`, never a direct `dependency`, to prevent version conflicts in the consumer's project.
- **No global style side-effects.** Do not add CSS resets, base element overrides, or unscoped utility classes — they will bleed into the consumer app. All design tokens live inside `@layer esthetica-ui-tokens` so consumers can override them. Component styles must always be scoped.
- **Namespace everything.** CSS classes use the `.est-` BEM prefix; CSS custom properties use `--est-`. Any new additions must follow the same discipline to avoid collisions with consumer stylesheets.
- **Keep exports tree-shakeable.** Each component is exported individually from `src/index.ts`. Avoid module-level side effects that would force consumers to load the entire library.
- **Scrutinise third-party libraries.** Every new dependency increases the consumer's bundle and risks version conflicts. Prefer native browser APIs and Vue built-ins. If a library is unavoidable, verify it can be externalised or that it will not conflict when the consumer has a different version installed.
- **Externalise every peer dependency in `vite.config.ts`.** When a new `peerDependency` is added to `package.json`, it must also be listed in `rolldownOptions.external` in `vite.config.ts`; otherwise it gets bundled into the library output and shipped to consumers.
- **Exported types and prop defaults are public API.** `Variant`, `Size`, `Props`, and every union member are consumed directly by downstream projects. Never remove a union member, rename an exported type, or change a `withDefaults` default without treating it as a breaking change (semver major). Adding new optional union members or new optional props is safe.

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

Run a single test file:

```bash
pnpm vitest run src/__tests__/App.spec.ts
```

## Architecture

This is a **Vue 3 component library** published to npm as `esthetica-ui`. The build output (`dist/`) ships an ES module, a UMD bundle, and a compiled CSS file. Vue is an external peer dependency — it is not bundled.

### Entry point

`src/index.ts` is the library entry. Every component exported here becomes part of the public API. It also imports `virtual:uno.css` and `src/style.css` so consumers get styles with a single `import 'esthetica-ui/style.css'`.

`virtual:uno.css` is a virtual module injected by the UnoCSS Vite plugin at build time — it does not exist as a real file and should never be created or deleted manually.

`src/App.vue` and `src/main.ts` are the playground app entry points used during `pnpm dev`. They are not part of the library output and are excluded from the build (`publicDir` is disabled in production mode).

The `@` alias resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`). Use it for all intra-library imports.

### Token system

Design tokens are plain CSS custom properties organised under `src/tokens/`:

- `global.css` — base tokens (`--est-radius`, `--est-font-sans`)
- `colors.css` — semantic color palette (`--est-color-primary`, `--est-color-danger`, etc.)
- `tokens/components/button.css` — component-level tokens (`--est-btn-*`)

`src/style.css` imports all token files in order. Token files use `@layer esthetica-ui-tokens` so they stay below any consumer overrides. Component tokens must always reference global or color tokens via `var()` — never hardcode raw values (hex colours, pixel sizes, etc.). Hardcoding bypasses the token system and silently breaks consumer theming.

#### Component token file structure

Every `src/tokens/components/foo.css` must follow this exact shape:

```css
@layer esthetica-ui-tokens {
    :root {
        /* ── Base tokens (what the component reads directly) ─────────── */
        --est-foo-padding: . . .;
        --est-foo-min-height: . . .;
        --est-foo-font-size: . . .;
        --est-foo-bg-color: var(--est-color-primary);
        --est-foo-color: var(--est-color-primary-foreground);
        /* ... all other "live" properties the component element consumes */

        /* ── Size variant presets ────────────────────────────────────── */
        --est-foo-sm-padding: . . .;
        --est-foo-sm-min-height: . . .;
        --est-foo-sm-font-size: . . .;

        --est-foo-md-padding: . . .;
        --est-foo-md-min-height: . . .;
        --est-foo-md-font-size: . . .;

        --est-foo-lg-padding: . . .;
        --est-foo-lg-min-height: . . .;
        --est-foo-lg-font-size: . . .;

        /* ── Color/style variant presets ─────────────────────────────── */
        --est-foo-secondary-bg-color: var(--est-color-secondary);
        --est-foo-secondary-color: var(--est-color-secondary-foreground);
        --est-foo-secondary-bg-hover: var(--est-color-secondary-hover);
        /* ... one group per named variant */
    }
}
```

Three ordered sections, separated by comments:
1. **Base tokens** — the "live" CSS variables the component element reads. These are what `var(--est-foo-*)` in `EstFoo.css` references.
2. **Size variant presets** — `--est-foo-{sm|md|lg}-{property}` — one group per size.
3. **Color/style variant presets** — `--est-foo-{variant}-{property}` — one group per named variant.

#### Component CSS structure (CSS variable indirection)

The `EstFoo.css` file uses a **CSS custom property indirection** pattern. Modifier classes re-point the base tokens; the base class reads only the base tokens. There is a **single rendering path**.

```css
/* 1. Modifier classes come FIRST and redirect base tokens to variant presets */
.est-foo--sm {
  --est-foo-padding: var(--est-foo-sm-padding);
  --est-foo-min-height: var(--est-foo-sm-min-height);
  --est-foo-font-size: var(--est-foo-sm-font-size);
}

.est-foo--secondary {
  --est-foo-bg-color: var(--est-foo-secondary-bg-color);
  --est-foo-color: var(--est-foo-secondary-color);
  --est-foo-bg-hover: var(--est-foo-secondary-bg-hover);
}

/* 2. Base class comes LAST and reads only the base tokens — never variant tokens directly */
.est-foo {
  padding: var(--est-foo-padding);
  min-height: var(--est-foo-min-height);
  font-size: var(--est-foo-font-size);
  background-color: var(--est-foo-bg-color);
  color: var(--est-foo-color);
}

.est-foo:hover {
  background-color: var(--est-foo-bg-hover);
}
```

Rules:
- Modifier classes always appear **before** the base class in the file.
- The base class **never** references `--est-foo-{variant}-*` or `--est-foo-{size}-*` tokens directly — only the base `--est-foo-*` tokens.
- If a modifier does not need to change a property, it simply omits that token override — the base token's default value applies.
- Use `@apply` for structural / layout utilities (e.g. `flex`, `items-center`, `w-full`) and for typography utilities (`text-{size}`, `font-{weight}`). Typography utilities are safe because `uno.config.ts` maps them to `--est-font-*` CSS custom properties — `@apply text-sm font-semibold` compiles to `font-size: var(--est-font-size-sm); line-height: var(--est-font-line-height-sm); font-weight: var(--est-font-weight-semibold);`, which consumers can override. Colours must always use CSS custom properties directly (`var(--est-color-*)`); never use colour utility classes with `@apply`.
- Use `:deep()` only when a CSS custom property override is not sufficient — i.e., for structural properties that the child component does not expose as a token (e.g. `width`, `height`, `text-align`). Prefer overriding `--est-foo-*` variables at a parent scope first; reach for `:deep()` only for what is left.

### Component conventions

Each component lives in `src/components/` as three sibling files:

| File | Purpose |
|---|---|
| `EstFoo.vue` | Component logic and template |
| `EstFoo.css` | Scoped styles (linked via `<style scoped src="./EstFoo.css" />`) |
| `EstFoo.stories.ts` | Storybook stories (co-located with the component) |

Components use the `Est` prefix. CSS classes follow BEM: `.est-foo`, `.est-foo--modifier`, `.est-foo__element`. Styles use UnoCSS `@apply` directives for utility classes and CSS custom properties from the token system for theme-able values.

Do not write inline `<style>` blocks in `.vue` files. All component styles live in the sibling `.css` file, linked with `<style scoped src="./EstFoo.css" />`.

Props are typed with `defineProps<Interface>()` + `withDefaults`. Every prop, including optional ones, must have an explicit entry in `withDefaults` — missing entries cause Vue runtime warnings and leave consumers without a guaranteed default. Only assign the result to `const props` when props need to be accessed in script code; omit the assignment when props are only used in the template, otherwise the linter will report an unused-variable error. Emits are typed with `defineEmits<{ event: [args] }>()`. Types (`Variant`, `Size`, etc.) are exported from the `<script setup>` block so consumers can import them.

Named slots follow a consistent convention: `leading` for content before the label, `trailing` for content after the label, and the default slot for the primary label text. When placing icons in these slots, use a `<span>` with a UnoCSS icon class (e.g. `<span class="i-ri-add-line w-[1em] h-[1em]" aria-hidden="true" />`). Never use inline SVGs for icons.

Class bindings use object syntax with one explicit BEM modifier class per condition. Do not use string concatenation, array syntax, or computed class strings.

For any prop whose value maps directly and 1-to-1 to a BEM modifier name, use `buildVariant` from `useVariantClasses` (see [Composables](#composables)) and spread the result into `:class`. This covers both colour/style variants (`variant`) and orthogonal dimensions (`size`, `rounded`, `type`, etc.). Pass `declareBase: false` (third argument) when the base class is already declared by another `buildVariant` spread on the same element. Only use explicit key/value pairs for modifiers that do **not** have a direct 1-to-1 name match (`disabled`, `loading`, structural modifiers like `with-title`):

```html
<!-- variant declares the base class; size is a 1-to-1 match, base already declared -->
:class="{
  ...buildVariant('est-foo', variant ?? 'default'),
  ...buildVariant('est-foo', size ?? 'md', false),
  'est-foo--disabled': disabled,
  'est-foo--loading': loading,
}"

<!-- single dynamic modifier that also declares the base class -->
:class="{ ...buildVariant('est-foo', rounded ?? 'md') }"
```

This means adding a new `size` or `variant` member requires only a CSS modifier and a token — the template never needs touching.

**Adding a new component — required steps (in order):**
1. `src/components/EstFoo.vue` — component logic and template
2. `src/components/EstFoo.css` — scoped styles
3. `src/components/EstFoo.stories.ts` — Storybook stories
4. `src/tokens/components/foo.css` — component design tokens using `--est-foo-*` naming, wrapped in `@layer esthetica-ui-tokens`
5. Add `@import './tokens/components/foo.css';` to `src/style.css`
6. Add `export { default as EstFoo } from './components/EstFoo.vue'` to `src/index.ts`

### Composables

Shared, reusable Vue logic lives in `src/composables/`. Each file exports a single `use*` function that returns a plain object of utilities. Composables must be pure — no module-level side effects, no direct DOM access outside of `onMounted`/`onUnmounted`.

#### When to extract logic into a composable

Extract to a composable when **at least one** of the following is true:

- The same logic is used in two or more components (DRY).
- The logic is non-trivial enough that inlining it obscures the template's intent.
- The pattern is a Vue-specific idiom (class binding helpers, slot inspection, focus management) that will recur across the library as it grows.

Do **not** extract to a composable for:

- Logic used in exactly one component — keep it local.
- Simple one-line computed values trivially derivable from props.
- CSS decisions — these belong in the token/CSS layer, not JavaScript.
- Pure utility functions with no Vue dependency — export those from `src/utils/` as plain TypeScript instead.

#### `useVariantClasses`

```ts
import { useVariantClasses } from '@/composables/useVariantClasses'

const { buildVariant } = useVariantClasses()
```

`buildVariant(base, value, declareBase?)` returns a class object for any prop that maps 1-to-1 to a BEM modifier name:
- `declareBase: true` (default) — returns `{ [base]: true, [base--value]: true }`. Use for the primary scope-owning modifier (`variant`); declares the base class.
- `declareBase: false` — returns `{ [base--value]: true }` only. Use for secondary orthogonal dimensions (`size`, `rounded`, `type`) when the base class is already declared.

**Token cascade first.** Before reaching for `buildVariant` on a sub-element, ask whether the sub-element can inherit the variant color from a parent's CSS custom property scope instead. If a parent component already sets `--est-foo-color` via its own variant modifier class (which children inherit through CSS cascade), the sub-element needs **no** variant modifier class — its base token resolves to the correct value automatically. Reserve `buildVariant` for the element that **owns** the variant scope in the BEM sense (typically the component root).

**Critical — never reference another component's variant token from `:root`.** Token files define values at `:root` inside `@layer esthetica-ui-tokens`. If a token there references a variant-scoped custom property from another component (e.g. `--est-alert-icon-color: var(--est-card-color)`), the `var()` is resolved at `:root`'s scope, where only the default card color exists — the card variant overrides (`.est-card--success { --est-card-color: ... }`) are invisible from `:root`. The result is that all variants render with the default (near-black) color.

The correct pattern when a component wraps another that owns the variant scope: define those token assignments inside the component CSS file on a descendant element that actually lives in the DOM tree below the parent's variant scope — **not** in the token file at `:root`:

```css
/* EstAlert.css — .est-alert__inner is a descendant of .est-card--{variant} */
/* var(--est-card-color) resolves correctly here because the card ancestor is in scope */
.est-alert__inner {
  --est-alert-icon-color: var(--est-card-color);
  --est-alert-close-hover-color: var(--est-card-color-hover);
}
```

The token file (`alert.css`) keeps only non-color structural tokens (sizes, font weights, etc.) at `:root`.

### Accessibility (mandatory)

Accessibility is not optional. Every component must ship with correct ARIA semantics. Do not consider a component complete without addressing all applicable points below:

- **`disabled` prop** → add `aria-disabled="true"` on the root element alongside the native `disabled` attribute.
- **`loading` prop** → add `aria-busy="true"` on the root element.
- **Decorative icons and spinners** → always add `aria-hidden="true"` so screen readers skip them.
- **Interactive elements** → must have a visible label or a screen-reader-only equivalent (`aria-label` / `aria-labelledby`).
- **Native semantics first** → use `<button>`, `<a>`, `<input>`, `<select>` etc. before reaching for `role` attributes.
- **Keyboard navigation** → every focusable element must be reachable by Tab and operable by Enter or Space.
- **Focus ring** → never suppress the focus ring. Use `focus-visible` to control styling; do not apply `outline: none` without a visible replacement.

### Storybook integration

Stories use `@storybook/vue3-vite`. Vitest is configured with two test projects: one for jsdom unit tests and one for Storybook/Playwright browser tests. Both run via `pnpm test:unit`. Storybook stories use `tags: ['autodocs']` for automatic docs generation.

Every story file must follow this structure:

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EstFoo from './EstFoo.vue'

const meta = {
  title: 'Components/EstFoo',          // always 'Components/EstFoo' format
  component: EstFoo,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', ...] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
    onClick:  { action: 'click' },     // wire every emit as an action
  },
  render: (args) => ({
    components: { EstFoo },
    setup() { return { args } },
    template: `<EstFoo v-bind="args">{{ args.default ?? 'Label' }}</EstFoo>`,
  }),
} satisfies Meta<typeof EstFoo>        // use satisfies, not a type annotation

export default meta
type Story = StoryObj<typeof meta>
```

Stories are organised in groups: individual variant stories first, then individual size stories, then individual state stories (loading, disabled), then icon slot stories. Each group ends with an `All X` overview story that uses an inline `render` template to show all options side by side.

### Toolchain

- **UnoCSS** with `presetWind4`, `presetWebFonts` (Inter/Roboto Slab/Fira Code via Google), `presetIcons` (Remix Icon set via `@iconify-json/ri`), and `transformerDirectives` (enables `@apply` in plain CSS files). Icons are used as utility classes directly on elements: `i-ri-loader-4-line`, `i-ri-arrow-right-line`, etc. Do not import icon components or add other icon libraries.
- **Lint**: oxlint first, then eslint (both with `--fix`). Husky + lint-staged enforce this on every commit for staged files under `src/`
- **Format**: oxfmt (not Prettier)
- **Type-checking**: `vue-tsc --build` against `tsconfig.app.json`
