import { create } from 'zustand';
import { Cache } from '~/core/cache';
import type { Game } from '~/types';

interface ReplaysState {
    replays: Game[];
    setReplays(replays: this['replays']): void;
    currentReplayIndex: number;
    setCurrentReplayIndex(currentReplayIndex: number): void;
    pages: number;
    setPages(pages: number): void;
    currentPage: number;
    setCurrentPage(currentPage: number): void;
    pageSize: number;
    setPageSize(pageSize: number): void;
}

export const useReplays = create<ReplaysState>(set => ({
    replays: [],
    setReplays(replays) {
        Cache.save({ replays });
        set({ replays });
    },
    currentReplayIndex: 0,
    setCurrentReplayIndex(currentReplayIndex) {
        set({ currentReplayIndex });
    },
    pages: 1,
    setPages(pages) {
        set({ pages });
    },
    currentPage: 1,
    setCurrentPage(currentPage) {
        set({ currentPage });
    },
    pageSize: 0,
    setPageSize(pageSize) {
        set({ pageSize });
    },
}));