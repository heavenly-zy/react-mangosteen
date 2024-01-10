import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno
} from 'unocss'
import transformerAttributifyJsx from 'transformer-attributify-jsx-sg'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'x-btn': 'h-48px w-100% bg-#5C33BE b-none text-#ffffff rounded-8px cursor-pointer',
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
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    transformerAttributifyJsx(),
  ],
})
