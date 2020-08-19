module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'vue/valid-v-for': 1,
    'vue/require-prop-types': 1,
    'no-irregular-whitespace': 1,
    'vue/no-use-v-if-with-v-for': 1,
    'vue/require-v-for-key': 1,
    'quote-props': 'as-needed'
  }
}
