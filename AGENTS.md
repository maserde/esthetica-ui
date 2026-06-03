# AGENTS.md

Shared project instructions for AI coding agents (Antigravity, Cursor, Gemini CLI, GitHub Copilot, Windsurf, etc.).


## Important Jokes
When answering user request or after you working with things, you should respond user with Jokowidodo or Prabowo meme line, such as "Dipecut-pecut saya diam. dicela direndah-rendahkan saya diam. Dihina-hina saya juga diam. Tapi hari ini saya nyatakan saya akan lawan!"

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
- Use `@apply` for **structural / layout utilities** (`flex`, `inline-flex`, `items-center`, `justify-between`, `gap-2`, `overflow-hidden`, `relative`, `cursor-pointer`, `select-none`, etc.) and for **typography utilities** (`text-{size}`, `font-{weight}`, `leading-*`, `tracking-*`). Typography utilities are safe because `uno.config.ts` maps them through `extendTheme` to `--est-font-*` CSS custom properties — `@apply text-sm font-semibold` compiles to `font-size: var(--est-font-size-sm); font-weight: var(--est-font-weight-semibold);`, which consumers can override via tokens. Colours must **always** use CSS custom properties directly (`var(--est-color-*)`); never use colour utility classes with `@apply`.
- **presetMini utility reference** — verified against `@unocss/preset-mini@66.7.0` source. When in doubt, grep the package before assuming a utility works.

  **Available via `@apply`** (confirmed in source):
  - Display: `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `inline-grid`, `hidden`, `contents`, `flow-root`
  - Position: `relative`, `absolute`, `fixed`, `sticky`, `static`, `inset-*`, `top-*`, `left-*`, `right-*`, `bottom-*`, `z-*`
  - Flex: `flex-row`, `flex-col`, `flex-wrap`, `flex-nowrap`, `flex-1`, `flex-auto`, `flex-none`, `shrink-*`, `grow-*`, `basis-*`
  - Grid: `grid-cols-*`, `grid-rows-*`, `col-span-*`, `row-span-*`, `col-start/end-*`, `row-start/end-*`, `auto-cols-*`, `auto-rows-*`
  - Alignment: `items-*`, `self-*`, `justify-*`, `justify-items-*`, `justify-self-*`, `content-*`, `place-*`
  - Spacing: `p-*`, `m-*`, `gap-*` — all read from `theme.spacing`; `extendTheme` maps these to `--est-spacing-*` CSS vars
  - Sizing: `w-*`, `h-*`, `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*`, `size-*`
  - Border: `border`, `border-t`, `border-b`, `border-l`, `border-r`, `border-x`, `border-y`, `border-{n}`, `border-solid`, `border-dashed`, `border-dotted`, `border-none`, `border-0`, `rounded-*` (reads `theme.borderRadius`)
  - Background: `bg-*`, `bg-gradient-*`
  - Typography: `text-{size}`, `font-{weight}`, `font-{family}`, `leading-*`, `tracking-*`, `text-left/center/right/justify`, `italic`, `not-italic`, `underline`, `no-underline`, `truncate`, `whitespace-*`, `text-wrap`, `text-nowrap`, `text-ellipsis`
  - Overflow: `overflow-*`, `overflow-x-*`, `overflow-y-*`
  - Transitions: `transition`, `transition-colors`, `transition-opacity`, `transition-shadow`, `transition-transform`, `transition-all`, `transition-none`, `duration-*`, `ease-*`, `delay-*`
  - Transforms: `translate-*`, `rotate-*`, `scale-*`, `skew-*`, `origin-*`
  - Shadow: `shadow` (DEFAULT), `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none` — reads `theme.boxShadow`
  - Ring: `ring`, `ring-{n}`, `ring-{color}`, `ring-offset-{n}`, `ring-inset` — reads `theme.ringWidth`
  - Outline: `outline`, `outline-none`, `outline-{color}`, `outline-{width}`, `outline-offset-*`, `outline-solid/dashed/dotted/double/hidden`
  - Opacity: `opacity-*`, `op-*`
  - Cursor: `cursor-pointer`, `cursor-not-allowed`, `cursor-default`, `cursor-*`
  - User select: `select-none`, `select-auto`, `select-all`, `select-text`
  - Pointer events: `pointer-events-none`, `pointer-events-auto`
  - Box sizing: `box-border`, `box-content`
  - Aspect ratio: `aspect-*`
  - Float: `float-*`, `clear-*`
  - Resize: `resize`, `resize-x`, `resize-y`, `resize-none`
  - Appearance: `appearance-none`, `appearance-auto`
  - Vertical align: `align-*`, `vertical-*`
  - Visibility: `visible`, `invisible`
  - Text transform: `case-upper`, `case-lower`, `case-capital`, `case-normal`
  - Will change: `will-change-*`
  - SVG: `fill-*`, `stroke-*`

  **NOT available in presetMini** — use explicit CSS instead (verified absent from source):
  - `animate-*` (`animate-pulse`, `animate-spin`, `animate-bounce`, `animate-ping`) → define a scoped `@keyframes est-*` and set `animation:` directly
  - `table-auto` / `table-fixed` → `table-layout: auto` / `table-layout: fixed`
  - `border-collapse` / `border-separate` → `border-collapse: collapse` / `border-collapse: separate`
  - `shadow-xs` → `box-shadow: var(--est-shadow-xs)` (not in `theme.boxShadow`; only sm/md/lg/xl/2xl/inner/none exist)
  - `list-disc` / `list-decimal` / `list-none` → `list-style-type: disc` etc.
  - `sr-only` / `not-sr-only` → explicit CSS

  **Critical presetMini behaviour — `border` without `border-solid` is invisible.** presetMini ships no preflight/base reset. `border-style` defaults to `none` in CSS, so `@apply border` / `@apply border-t` / `@apply border-b` only set `border-width` — the border is invisible without a style. Always pair: `@apply border border-solid`, `@apply border-t border-solid`, `@apply border-b border-solid`.

  **Design choices that look like missing utilities but are not:**
  - Focus rings use `outline` (explicit CSS) instead of `@apply ring-2 ring-offset-1` — ring-* works in presetMini, but `outline` is more explicit and avoids the box-shadow composition chain.
  - `shadow-sm` on the toggle thumb uses `box-shadow: var(--est-shadow-sm)` instead of `@apply shadow-sm` — shadow-sm works in presetMini, but the token approach lets consumers override it.
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

Named slots follow a consistent convention: `leading` for icons/content before the label, `trailing` for icons/content after the label, and the default slot for the primary label text.

Class bindings use object syntax with one explicit BEM modifier class per condition. Do not use string concatenation, array syntax, or computed class strings.

For any prop whose value maps directly and 1-to-1 to a BEM modifier name, use `buildVariant` from `useVariantClasses` and spread the result into `:class`. Pass `declareBase: false` (third argument) when the base class is already declared by another `buildVariant` spread on the same element. Keep explicit key/value pairs only for modifiers that do **not** have a direct 1-to-1 name match (`disabled`, `loading`, structural modifiers like `with-title`):

```html
<!-- variant owns the scope and declares the base class -->
<!-- size is a direct 1-to-1 match, base already declared → declareBase: false -->
<!-- disabled/loading are NOT direct name matches → explicit key/value -->
:class="{
  ...buildVariant('est-foo', variant ?? 'default'),
  ...buildVariant('est-foo', size ?? 'md', false),
  'est-foo--disabled': disabled,
  'est-foo--loading': loading,
}"

<!-- if there is only one dynamic modifier and it must also declare the base class -->
:class="{ ...buildVariant('est-foo', rounded ?? 'md') }"
```

Never write a per-variant object block like `'est-foo--primary': variant === 'primary', 'est-foo--success': variant === 'success', ...`. That is the pattern this codebase is eliminating. Replace it with `buildVariant`, or — if the element is a sub-element inside a component that already owns the variant scope — remove the class entirely and let the CSS cascade carry the color (see **Composable and variant class decisions** below).

## Composable and variant class decisions

### When to extract logic into a composable

| Question | Answer → action |
|---|---|
| Is the same logic already used in another component? | Yes → extract to `src/composables/` |
| Is it a Vue-specific idiom (class binding helpers, slot inspection, focus trapping) that will recur? | Yes → extract to `src/composables/` |
| Is it a pure function with no Vue dependency? | Yes → put in `src/utils/` instead |
| Is it a CSS/styling decision? | Yes → solve in the token/CSS layer, not JS |
| Is it a one-liner used in exactly one place? | Yes → keep inline |

When in doubt, keep it inline. Extract only when the pattern genuinely repeats.

### Variant class binding — decision tree

Work top-to-bottom and stop at the first match:

**1. Can the element inherit the variant color from a parent's CSS cascade?**
Check whether an ancestor already sets `--est-{component}-color` (or equivalent) via its variant modifier class. Children inherit CSS custom properties — so if the ancestor's modifier already resolved the right color value onto `--est-card-color`, the child reads it automatically with no class needed.
→ Remove all per-variant modifier classes from the sub-element and its token group.

**2. Does the element own the variant scope (it is the component root or the element that must set the CSS custom property scope)?**
→ Use `buildVariant` from `useVariantClasses` (this also declares the base class):
```ts
import { useVariantClasses } from '@/composables/useVariantClasses'
const { buildVariant } = useVariantClasses()
```
```html
:class="{ ...buildVariant('est-foo', variant ?? 'default'), 'est-foo--other': condition }"
```

**3. Is the modifier a direct 1-to-1 name match to a prop value (e.g. `size`, `rounded`, `type`), and the base class is already declared by step 2?**
→ Use `buildVariant` with `declareBase: false`:
```html
:class="{ ...buildVariant('est-foo', variant ?? 'default'), ...buildVariant('est-foo', size ?? 'md', false) }"
```
Adding a new member to the `Size` type and a CSS modifier is all that is required — the template never needs touching.

**4. Is the modifier not a direct 1-to-1 name match to the prop value (e.g. `disabled`, `loading`, `with-title`)?**
→ Explicit key/value pair:
```html
:class="{ 'est-foo': true, 'est-foo--disabled': disabled }"
```

### Token cascade — sub-element color rules

When a component wraps another that already manages variant tokens (e.g. `EstAlert` wrapping `EstCard`):

- Internal sub-elements do **not** need per-variant modifier classes for color. They inherit `--est-card-color` and `--est-card-color-hover` from the wrapping card's CSS scope automatically.
- Per-variant color groups (`--est-alert-primary-icon-color`, etc.) and corresponding CSS modifier blocks (`est-alert__icon--primary`, etc.) are then unnecessary — do not add them.
- If you need a "hover" shade, use `--est-card-color-hover` (which resolves to the `{variant}-900` palette step) rather than hardcoding a specific palette value.

**Critical — never reference another component's variant token from `:root`.**

Token files use `@layer esthetica-ui-tokens` at `:root`. A `var()` reference inside a `:root` token is resolved at `:root`'s scope. Card variant modifier classes (`.est-card--success { --est-card-color: ... }`) live on the card element, not `:root`, so they are invisible from `:root`. Writing `--est-alert-icon-color: var(--est-card-color)` in the token file at `:root` will always resolve to the default card color (neutral-800, near-black) regardless of which variant is active.

**The correct pattern:** define those token assignments in the **component CSS file** on a descendant element that lives below the parent's variant scope in the DOM — not in the token file:

```css
/* ✅ EstAlert.css — .est-alert__inner is a DOM child of .est-card--{variant} */
/* var(--est-card-color) resolves correctly because the card ancestor is in scope */
.est-alert__inner {
  --est-alert-icon-color: var(--est-card-color);
  --est-alert-close-hover-color: var(--est-card-color-hover);
}

/* ❌ alert.css (token file at :root) — var(--est-card-color) resolves to the default */
/* color here because :root cannot see the card's variant modifier classes           */
:root {
  --est-alert-icon-color: var(--est-card-color); /* broken — always neutral-800 */
}
```

The token file (`alert.css`) should only define non-color structural tokens at `:root` (sizes, font weights, radii, etc.). Color tokens that depend on an ancestor's variant scope belong in the component CSS on the correct descendant element.

### Expanding `buildVariant` vs adding a new composable

`buildVariant(base, value, declareBase?)` handles any prop whose value maps 1-to-1 to a BEM modifier name:
- `declareBase: true` (default) — use for the primary scope-owning modifier (typically `variant`); adds both the base class and the modifier class.
- `declareBase: false` — use for secondary orthogonal dimensions (`size`, `rounded`, `type`, etc.) when the base class is already declared by another spread on the same element.

Do not add new parameters to `buildVariant`. If a genuinely different BEM pattern is needed (e.g. compound modifiers that combine two props), add a separate function inside `useVariantClasses`.

Add a new composable file only when the logic is conceptually distinct from everything in `src/composables/` today.

Do **not** export composables from `src/index.ts` — they are internal utilities, not public API.

**Adding a new component — required steps (in order):**
1. `src/components/EstFoo.vue` — component logic and template
2. `src/components/EstFoo.css` — scoped styles
3. `src/components/EstFoo.stories.ts` — Storybook stories
4. `src/tokens/components/foo.css` — component design tokens using `--est-foo-*` naming, wrapped in `@layer esthetica-ui-tokens`
5. Add `@import './tokens/components/foo.css';` to `src/style.css`
6. Add `export { default as EstFoo } from './components/EstFoo.vue'` to `src/index.ts`

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

- **UnoCSS** with `presetMini`, `presetWebFonts` (Inter/Roboto Slab/Fira Code via Google), `presetIcons` (Remix Icon set via `@iconify-json/ri`), and `transformerDirectives` (enables `@apply` in plain CSS files). Icons are used as utility classes directly on elements: `i-ri-loader-4-line`, `i-ri-arrow-right-line`, etc. Do not import icon components or add other icon libraries.
- **`extendTheme` in `uno.config.ts`** maps typography and spacing utility keys to CSS custom properties so that `@apply text-sm` compiles to `font-size: var(--est-font-size-sm)` and `@apply gap-8` compiles to `gap: var(--est-spacing-8)`. Only keys present in `extendTheme` are tokenized. Spacing keys are pixel values (key `8` = `--est-spacing-8` = 8 px), so utility names match pixel sizes directly — `gap-8` = 8 px, `w-32` = 32 px. If a spacing key is not in `extendTheme` (e.g. `gap-3`, `gap-5`), the utility still generates CSS but resolves to presetMini's default rem-based value rather than a token.
- **Lint**: oxlint first, then eslint (both with `--fix`). Husky + lint-staged enforce this on every commit for staged files under `src/`
- **Format**: oxfmt (not Prettier)
- **Type-checking**: `vue-tsc --build` against `tsconfig.app.json`
