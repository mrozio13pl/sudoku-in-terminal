import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import esbuild from 'rollup-plugin-esbuild';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import size from 'rollup-plugin-size';
import rimraf from '@zkochan/rimraf';

await rimraf('dist/*');

/** @type {import('rollup').Plugin[]} */
const plugins = [
    json(),
    typescript(),
    typescriptPaths(),
    esbuild({
        target: 'node20',
        jsx: 'transform',
        minifySyntax: true,
        minifyIdentifiers: true,
        minifyWhitespace: false,
        loaders: {
            '.js': 'jsx',
            '.ts': 'tsx',
        }
    }),
    size()
];

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'es'
        },
        plugins
    }
]);