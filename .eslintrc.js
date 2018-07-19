/**

Eslint quickstart config
------------------------

yarn add --dev eslint eslint-config-airbnb eslint-plugin-import

[react]
yarn add --dev eslint-plugin-jsx-a11y eslint-plugin-react

[vue]
yarn add --dev eslint-plugin-vue

[prettier]
yarn add --dev eslint-plugin-prettier

Rules details:
- https://github.com/benmosher/eslint-plugin-import
- https://github.com/evcohen/eslint-plugin-jsx-a11y
- https://github.com/yannickcr/eslint-plugin-react

**/

module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'airbnb',

    // [a11y]
    // 'plugin:jsx-a11y/recommended',

    // [vue]
    // 'plugin:vue/recommended',

    // [prettier]
    // 'prettier',
    // 'prettier/standard',
  ],

  plugins: [
    'import',
    // 'jsx-a11y',
    // 'react',
    // 'vue',
    // 'prettier',
  ],

  rules: {
    // [js]
    'semi': [0, 'never'],
    'object-curly-spacing': [0, 'never'],
    'lines-between-class-members': 0,
    'arrow-parens': [0, 'as-needed'],
    'arrow-body-style': 0,
    'comma-dangle': [0, {
      functions: 'never',
      objects: 'always-multiline',
      arrays: 'always-multiline',
      imports: 'always-multiline',
    }],

    // [react]
    // 'react/jsx-one-expression-per-line': 0,
    // 'react/destructuring-assignment': 0,
    // 'react/jsx-closing-bracket-location': [0, 'props-aligned'],
    // 'react/jsx-wrap-multilines': 0,
    // 'react/forbid-prop-types': 1,
    // 'react/prop-types': 1,

    // [import]
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,

    // [a11y]
    // 'jsx-a11y/label-has-for': 0, /* that one was deprecated */

    // [vue]
    // 'vue/attributes-order': [1],
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     singleline: 4,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false,
    //     },
    //   },
    // ],
    // 'vue/html-indent': [
    //   1,
    //   2,
    //   {
    //     closeBracket: 1,
    //   },
    // ],
  },
}
