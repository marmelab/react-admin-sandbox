// On StackBlitz, rolldown can't load its native binding and its own fallback
// (installing the wasm binding with pnpm) fails. Install it with npm where
// that fallback looks for it, at rolldown's exact version.
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

if (process.versions.webcontainer) {
    const { version } = createRequire(import.meta.url)('rolldown/package.json');
    execSync(
        `npm install --prefix /tmp/rolldown-${version} @rolldown/binding-wasm32-wasi@${version}`,
        { stdio: 'inherit' }
    );
}
