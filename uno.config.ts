import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss'


export default defineConfig({
  presets: [presetUno(), presetWebFonts({
    provider: 'google',
    fonts: {
      sans: 'Inter',
      serif: 'Roboto Slab',
      mono: 'Fira Code',
    },
  })],
  transformers: [transformerDirectives()],
})
