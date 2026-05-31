import { defineConfig, presetWind4, presetWebFonts, presetIcons, transformerDirectives } from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{vue,ts}'],
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
