import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/bot.ts'],
    format: ['esm'],
    target: 'node20',
    clean: true,
    dts: false,
    sourcemap: true,
    noExternal: ['chainsig.js', 'cosmjs-types', 'near-api-js'], // Bundle these to fix ESM/CJS issues
    splitting: false,
});
