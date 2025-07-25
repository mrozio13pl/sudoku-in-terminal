import path from 'node:path';
import fs from 'node:fs';
import { Writer } from 'steno';
import { isDevelopment } from '~/helpers/env';
import { cachePath } from '~/helpers/cache-path';
import { getMajorVersion } from '~/utils';
import { version } from '~/package.json' with { type: 'json' };
import type { Action, Board, Game, Pos } from '~/types';

/**
 * Stuff saved in cache.
 */
interface CacheSchema {
    settings?: Record<string, any>;
    replays?: Game[];
    actions?: Action[];
    board?: Board;
    solution?: Board;
    pos?: Pos;
    startTime?: number;
}

export class Cache {
    private static readonly path = cachePath('sudoku');

    static {
        if (!fs.existsSync(Cache.path)) {
            fs.mkdirSync(Cache.path, { recursive: true });
        }
    }

    private static readonly file = path.join(this.path, `sudoku-v${getMajorVersion(version)}.json`);
    private static readonly writer = new Writer(this.file);
    public static enabled = true;

    public static cache() {
        if (this._cache) return this._cache;

        try {
            return JSON.parse(
                fs.readFileSync(this.file, 'utf8')
            ) as CacheSchema;
        } catch {
            this.writer.write('{}');
            return {};
        }
    }

    private static _cache: CacheSchema = this.cache();

    public static async save(cache: CacheSchema = {}) {
        if (!this.enabled) return {};

        this._cache = { ...this._cache, ...cache };

        if (!fs.existsSync(this.path)) fs.mkdirSync(this.path, { recursive: true });

        try {
            await this.writer.write(JSON.stringify(this._cache, undefined, isDevelopment ? 4 : 0));
        } catch {
            return;
        }
    }
}