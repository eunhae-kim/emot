const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      /**
       * 파일로드시 확장자를 입력하지 않을경우 자동으로 확장자를 찾아 탐색
       * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
       */
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      /**
       * Webpack `alias` 설정에 대한 규칙을 반영
       * @see https://webpack.js.org/configuration/resolve/
       */
      alias: {
        map: [['src', path.resolve(__dirname, 'src')]],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  extends: [
    // 'next/core-web-vitals',
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // 'prettier',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
        peerDependencies: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        /**
         * Typescript Interface Import시 발생하는 eslint `no-unused-vars` 에러 예외처리
         * @see https://github.com/typescript-eslint/typescript-eslint/issues/46
         */
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        /**
         * 확장자를 강제하는 속성 사용안함
         * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
         */
        'import/extensions': 'off',
        /**
         * 컴포넌트 `props`에 대한 정보는 Typescript 문법 검사를 이용하여 처리(`children`, `className`등 일부 속성에 대해 직접 적용해야함)
         * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
         */
        'react/prop-types': 'off',

        // 'react/function-component-definition': 'off',
      },
    },
    {
      files: ['*.stories.tsx'],
      rules: {
        'global-require': 'off',
        'no-alert': 'off',
      },
    },
  ],
};
