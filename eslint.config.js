import js from "@eslint/js"
import globals from "globals"
import pluginVue from "eslint-plugin-vue"

export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    ...js.configs.recommended,
    languageOptions: { globals: globals.browser }
  },
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-reserved-component-names": "off"
    }
  }
]
