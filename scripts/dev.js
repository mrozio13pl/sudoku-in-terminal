import which from 'which';
import treeKill from 'tree-kill';
import watcher from '@parcel/watcher';
import { onExit } from 'signal-exit-v4';
import { spawn } from 'cross-spawn';

let proc, isRunning = false;

const CROSS_ENV_BIN = await which('cross-env');
const TSX_BIN = await which('tsx');

async function run() {
    isRunning = true;
    if (proc?.pid) treeKill(proc.pid);
    console.log('Reloading...');
    proc = spawn('npx', [CROSS_ENV_BIN, 'NODE_ENV=development', 'npx', TSX_BIN, 'src/index.ts'], {
        stdio: 'inherit',
        cwd: process.cwd()
    });
    isRunning = false;
}

async function handleEvent(event) {
    if (event.type !== 'update') return;
    if (!isRunning) await run();
}

await watcher.subscribe('src', (err, events) => {
    if (err) {
        throw err;
    }

    events.forEach(event => { handleEvent(event) });
});

await run();

onExit(() => {
    if (proc.pid) treeKill(proc.pid);
    treeKill(process.pid);
});