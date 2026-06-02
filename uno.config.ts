import { defineConfig, presetWind4, presetWebFonts, presetIcons, transformerDirectives } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.ts',
      ],
    },
  },

  extendTheme: (theme) => ({
    ...theme,
    spacing: {
      1: 'var(--est-spacing-1)',
      4: 'var(--est-spacing-4)',
      8: 'var(--est-spacing-8)',
      12: 'var(--est-spacing-12)',
      16: 'var(--est-spacing-16)',
      20: 'var(--est-spacing-20)',
      24: 'var(--est-spacing-24)',
      28: 'var(--est-spacing-28)',
      32: 'var(--est-spacing-32)',
      36: 'var(--est-spacing-36)',
      40: 'var(--est-spacing-40)',
      44: 'var(--est-spacing-44)',
      48: 'var(--est-spacing-48)',
      52: 'var(--est-spacing-52)',
      56: 'var(--est-spacing-56)',
      60: 'var(--est-spacing-60)',
      64: 'var(--est-spacing-64)',
      68: 'var(--est-spacing-68)',
      72: 'var(--est-spacing-72)',
      76: 'var(--est-spacing-76)',
      80: 'var(--est-spacing-80)',
      84: 'var(--est-spacing-84)',
      88: 'var(--est-spacing-88)',
      92: 'var(--est-spacing-92)',
      96: 'var(--est-spacing-96)',
      100: 'var(--est-spacing-100)',
    },
    fontSize: {
      xs: ['var(--est-font-size-xs)', { lineHeight: 'var(--est-font-line-height-xs)' }],
      sm: ['var(--est-font-size-sm)', { lineHeight: 'var(--est-font-line-height-sm)' }],
      base: ['var(--est-font-size-base)', { lineHeight: 'var(--est-font-line-height-base)' }],
      lg: ['var(--est-font-size-lg)', { lineHeight: 'var(--est-font-line-height-lg)' }],
      xl: ['var(--est-font-size-xl)', { lineHeight: 'var(--est-font-line-height-xl)' }],
      '2xl': ['var(--est-font-size-2xl)', { lineHeight: 'var(--est-font-line-height-2xl)' }],
      '3xl': ['var(--est-font-size-3xl)', { lineHeight: 'var(--est-font-line-height-3xl)' }],
      '4xl': ['var(--est-font-size-4xl)', { lineHeight: 'var(--est-font-line-height-4xl)' }],
    },
    fontWeight: {
      light: 'var(--est-font-weight-light)',
      normal: 'var(--est-font-weight-normal)',
      medium: 'var(--est-font-weight-medium)',
      semibold: 'var(--est-font-weight-semibold)',
      bold: 'var(--est-font-weight-bold)',
      extrabold: 'var(--est-font-weight-extrabold)',
      black: 'var(--est-font-weight-black)',
    },
  }),
  presets: [
    presetWind4(),
    presetWebFonts({
    provider: 'google',
    fonts: {
      sans: [{ name: 'Inter', weights: ['400', '500', '600', '700'] }],
      serif: 'Roboto Slab',
      mono: 'Fira Code',
    },
  }),
  presetIcons({
    scale: 1
  })],
  transformers: [transformerDirectives()],
})
