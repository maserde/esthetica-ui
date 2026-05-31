![Esthetica UI Logo](esthetica-logo.svg)

A minimalist Vue 3 component library built with TypeScript and TailwindCSS.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Installation

```sh
npm install @ardiprasetiyo/esthetica-ui
```

Import the component styles in your entry file:

```ts
import '@ardiprasetiyo/esthetica-ui/style.css'
```

## Usage

```ts
import { EstButton } from '@ardiprasetiyo/esthetica-ui'
```

## Development

### Install dependencies

```sh
npm install
```

### Start the dev server

```sh
npm run dev
```

The playground app runs at `http://localhost:5173`.

### Start Storybook

```sh
npm run storybook
```

Storybook runs at `http://localhost:6006` and is the primary environment for developing and previewing components.

### Run unit tests

```sh
npm run test:unit
```

### Lint

```sh
npm run lint
```

Runs `oxlint` followed by `eslint`, both with `--fix` applied automatically.

### Format

```sh
npm run format
```

Formats all files under `src/` using `oxfmt`.

### Git hooks

This project uses [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/lint-staged/lint-staged) to enforce code quality on every commit. The pre-commit hook runs `lint-staged` automatically against **staged files only** under `src/`:

| Pattern | Tools |
|---|---|
| `*.{vue,ts,js,css}` | `oxfmt` (format) |
| `*.{vue,ts,js}` | `oxlint --fix`, `eslint --fix --cache` (lint) |

If the linter reports errors that cannot be auto-fixed, the commit is rejected. Stage any formatting changes produced by the hook and commit again.

Hooks are installed automatically when you run `npm install` via the `prepare` script.

## Build

### Build the library

```sh
npm run build
```

Outputs ES module and UMD bundles plus TypeScript declarations to `dist/`.

### Build Storybook

```sh
npm run build-storybook
```

### Preview the production build

```sh
npm run preview
```

## Project structure

```
src/
  components/       # Vue components and their Storybook stories
  index.ts          # Library entry point (exports all components)
  style.css         # Global styles
```

## License

ISC
