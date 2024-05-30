// From: https://github.com/mrozio13pl/tiny-update-notifier/blob/main/src/utils/cachePath.ts

import path from 'node:path';
import os from 'node:os';

const homedir = os.homedir();

function windows(name: string): string {
    const localAppData = process.env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');

    return path.join(localAppData, name, 'Cache');
}

function linux(name: string): string {
    return path.join(process.env.XDG_CACHE_HOME || path.join(homedir, '.cache'), name);
}

function macos(name: string): string {
    return path.join(homedir, 'Library', 'Caches', name);
}

/**
 * Path to cache directory.
 * @param {string} name Cache folder name.
 */
export function cachePath(name: string): string {
    switch (process.platform) {
        case 'win32': {
            return windows(name);
        }
        case 'darwin': {
            return macos(name);
        }
        default: {
            return linux(name);
        }
    }
}