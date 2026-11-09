// StackBlitz can't install packages after the main install, so the wasm
// binding rolldown needs there is a devDependency. rolldown loads it without
// checking its version: fail the install here when they drift apart.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const rolldown = require('rolldown/package.json').version;
const binding = require('@rolldown/binding-wasm32-wasi/package.json').version;

if (binding !== rolldown) {
    console.error(
        `@rolldown/binding-wasm32-wasi is ${binding} but rolldown is ${rolldown}, so vite won't start on StackBlitz.\n` +
            `Run: npm i -D -E @rolldown/binding-wasm32-wasi@${rolldown}`
    );
    process.exit(1);
}
