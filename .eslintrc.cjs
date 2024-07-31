/* eslint-env node */
module.exports = {
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
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
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: true,
            },
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
        'react/react-in-jsx-scope': 'off',
        quotes: [
            2,
            "single"
        ],
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
