import { themes } from '~/themes';
import { hacker } from '~/themes/hacker';
import { create } from 'zustand';
import type { Theme } from '~/types';
import type { RequiredDeep } from 'type-fest';

interface ThemeState {
    theme: RequiredDeep<Theme>;
    setTheme(themeName: string): void;
    animationsEnabled: boolean;
    setAnimationsEnabled(animationsEnabled: boolean): void;
}

export const useTheme = create<ThemeState>(set => ({
    theme: hacker,
    setTheme(themeName) {
        const theme = themes.find(({ name }) => name === themeName) || hacker;
        set({ theme });
    },
    animationsEnabled: true,
    setAnimationsEnabled(animationsEnabled) {
        set({ animationsEnabled });
    }
}));