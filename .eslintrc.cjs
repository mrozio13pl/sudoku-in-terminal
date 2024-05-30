/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['@mrozio/eslint-config', 'plugin:react-hooks/recommended'],
    overrides: [
        {
            files: ['*.js', '*.mjs', '*.cjs'],
            parser: '@babel/eslint-parser'
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: ['@mrozio/eslint-config/typescript'],
            rules: {
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/no-this-alias': ['warn', { allowedNames: ['self'] }]
            },
            parserOptions: {
                project: ['./tsconfig.eslint.json'],
                tsconfigRootDir: __dirname
            },
        }
    ],
    ignorePatterns: ['dist', '**/*.md']
};