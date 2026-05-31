import { defineConfig, presetWind4, presetWebFonts, presetIcons,  transformerDirectives } from 'unocss'
import riIcons from '@iconify-json/ri/icons.json'


export default defineConfig({
  safelist: Object.keys(riIcons.icons).map(name => `i-ri-${name}`),
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
