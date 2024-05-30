import { create } from 'zustand';
import type { Update } from 'tiny-update-notifier';

interface UpdateState {
    isUpdateCheckingEnabled: boolean;
    setIsUpdateCheckingEnabled(isUpdateCheckingEnabled: boolean): void;
    update?: Update | false;
    setUpdate(newVersion: this['update']): void;
    error?: string;
    setError(error: string): void;
}

export const useUpdate = create<UpdateState>(set => ({
    isUpdateCheckingEnabled: true,
    setIsUpdateCheckingEnabled(isUpdateCheckingEnabled) {
        set(({ isUpdateCheckingEnabled }));
    },
    setUpdate(update) {
        set({ update });
    },
    setError(error) {
        set({ error });
    },
}));