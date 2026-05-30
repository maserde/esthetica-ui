import { defineConfig, presetUno, presetWebFonts, presetIcons,  transformerDirectives } from 'unocss'


export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
    provider: 'google',
    fonts: {
      sans: 'Inter',
      serif: 'Roboto Slab',
      mono: 'Fira Code',
    },
  }),
  presetIcons({
    scale: 1
  })],
  transformers: [transformerDirectives()],
})
