module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': 'error',
    'eslint-disable no-console': 'off',
    'eslint-disable no-unused-vars': 'off',
    'eslint-disable-next-line react': 'no-unescaped-entities'
  }
};
