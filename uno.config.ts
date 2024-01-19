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
    'x-form': 'px-16px flex flex-col gap-y-24px children-flex children-flex-col',
    'x-form-label': 'text-18px mb-8px',
    'x-form-input': 'h-48px px-16px leading-32px py-8px b-#5C33BE b-1 focus:shadow focus:shadow-inset rounded-8px text-18px'
  },
  rules: [
    ['c-h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }, { layer: 'components' }],
    [/^c-w-(.+)$/, ([, d]) => ({ width: d }), { layer: 'components' }],
    [/^c-h-(.+)$/, ([, d]) => ({ height: d }), { layer: 'components' }],
    ['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }]
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
