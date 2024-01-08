import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
  },
  rules: [
    ['c-h-screen', { height: '100vh' }, { layer: 'components' }],
    [/^c-w-(.+)$/, ([, d]) => ({ width: d }), { layer: 'components' }],
    [/^c-h-(.+)$/, ([, d]) => ({ height: d }), { layer: 'components' }],
  ],
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})
