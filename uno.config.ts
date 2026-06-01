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

  theme: {
    fontSize: {
      xs: ['var(--est-font-size-xs)', {
        lineHeight: 'var(--est-font-line-height-xs)'
      }],
      sm: ['var(--est-font-size-sm)', {
        lineHeight: 'var(--est-font-line-height-sm)'
      }],
      base: ['var(--est-font-size-base)', {
        lineHeight: 'var(--est-font-line-height-base)'
      }],
      lg: ['var(--est-font-size-lg)', {
        lineHeight: 'var(--est-font-line-height-lg)'
      }],
      xl: ['var(--est-font-size-xl)', {
        lineHeight: 'var(--est-font-line-height-xl)'
      }],
      '2xl': ['var(--est-font-size-2xl)', {
        lineHeight: 'var(--est-font-line-height-2xl)'
      }],
      '3xl': ['var(--est-font-size-3xl)', {
        lineHeight: 'var(--est-font-line-height-3xl)'
      }],
      '4xl': ['var(--est-font-size-4xl)', {
        lineHeight: 'var(--est-font-line-height-4xl)'
      }],
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
  },
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
