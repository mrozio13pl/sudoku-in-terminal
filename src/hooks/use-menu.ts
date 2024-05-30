import { create } from 'zustand';
import type { Option } from '~/types';

interface MenuState {
    options: Option[];
    setOptions(options: this['options']): void;
    currentOptionIndex: number;
    setCurrentOptionIndex(currentOptionIndex: number): void;
    onSubmit: (value: string) => void;
    setOnSubmit(onSubmit: this['onSubmit']): void;
}

export const useMenu = create<MenuState>(set => ({
    options: [],
    setOptions(options) {
        set({ options });
    },
    currentOptionIndex: 0,
    setCurrentOptionIndex(currentOptionIndex) {
        set({ currentOptionIndex });
    },
    onSubmit() {},
    setOnSubmit(onSubmit) {
        set({ onSubmit });
    },
}));