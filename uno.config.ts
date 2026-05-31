import { defineConfig, presetWind4, presetWebFonts, presetIcons, transformerDirectives } from 'unocss'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function* walkSrc(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkSrc(full)
    else if (/\.(vue|ts)$/.test(entry.name)) yield full
  }
}

const riIconPattern = /\bi-ri-[\w-]+\b/g
const usedIcons = new Set<string>()
for (const file of walkSrc(new URL('./src', import.meta.url).pathname)) {
  for (const match of readFileSync(file, 'utf-8').matchAll(riIconPattern)) {
    usedIcons.add(match[0])
  }
}

export default defineConfig({
  safelist: [...usedIcons],
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
