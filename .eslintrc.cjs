/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': 'off',
    'eslint/no-unused-vars': ['error'],
    'eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    'eslint/no-inferrable-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ["path.resolve(__dirname, '')"],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
      'eslint-import-resolver-custom-alias': {
        alias: {
          '~': 'src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
