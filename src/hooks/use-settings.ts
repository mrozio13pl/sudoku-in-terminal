import { create } from 'zustand';
import { Cache } from '~/core/cache';
import { mergeArrayToObject } from '~/utils';
import type { Setting } from '~/types';

interface SettingsState {
    settings: Setting[];
    setSettings(settings: this['settings']): void;
    currentSettingIndex: number;
    setCurrentSettingIndex(currentSettingIndex: number): void;
}

export const useSettings = create<SettingsState>(set => ({
    settings: [],
    setSettings(settings) {
        Cache.save({
            settings: mergeArrayToObject(settings.map(setting => ({
                [setting.name]: setting.value
            })))
        });
        set({ settings });
        settings.forEach(setting => {
            setting.onChange?.(setting.type === 'list' ? setting.list![setting.value] : setting.value);
        });
    },
    currentSettingIndex: 0,
    setCurrentSettingIndex(currentSettingIndex) {
        set({ currentSettingIndex });
    },
}));