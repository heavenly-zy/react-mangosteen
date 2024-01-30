import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
} from 'unocss'
import transformerAttributifyJsx from 'transformer-attributify-jsx-sg'

export default defineConfig({
  theme: {
  },
  shortcuts: [
    {
      'x-btn': 'h-48px w-full bg-#5C33BE b-none text-#ffffff rounded-8px cursor-pointer',
      'x-form': 'flex flex-col gap-y-8px children-flex children-flex-col children-gap-y-8px',
      'x-form-input': 'h-48px px-16px leading-32px py-8px b-#5C33BE b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
    },
    [/^x-picker-button-(.*)$/, ([, c]) => `border-none bg-transparent select-none text-${c}`],
  ],
  rules: [
    ['c-h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }, { layer: 'components' }],
    [/^c-w-(.+)$/, ([, d]) => ({ width: d }), { layer: 'components' }],
    [/^c-h-(.+)$/, ([, d]) => ({ height: d }), { layer: 'components' }],
    ['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }],
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
