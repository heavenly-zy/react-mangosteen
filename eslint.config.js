import antfu from '@antfu/eslint-config'

export default antfu({
  // Enable stylistic formatting rules
  stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: true,
  react: true,
  unocss: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    // ...globs
  ],
  rules: {
    "react/no-unknown-property": "off",
    "antfu/top-level-function": "off",
    "curly": "off",
    "no-console": "off",
    "react/prop-types": "off",
    "no-alert": "off"
  }
})
