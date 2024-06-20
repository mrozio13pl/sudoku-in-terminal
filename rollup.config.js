import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import esbuild from 'rollup-plugin-esbuild';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import replace from '@rollup/plugin-replace';
import size from 'rollup-plugin-size';
import rimraf from '@zkochan/rimraf';
import { isDevelopment } from 'std-env';

await rimraf('dist/*');

/** @type {import('rollup').Plugin[]} */
const plugins = [
    json(),
    typescript(),
    typescriptPaths(),
    esbuild({
        target: 'node20',
        jsx: 'transform',
        minifySyntax: !isDevelopment,
        minifyIdentifiers: !isDevelopment,
        loaders: {
            '.js': 'jsx',
            '.ts': 'tsx',
        }
    }),
    size()
];

if (isDevelopment) {
    plugins.push(
        replace({
            'process.env.NODE_ENV': '\'development\'',
            preventAssignment: true
        })
    );
}

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