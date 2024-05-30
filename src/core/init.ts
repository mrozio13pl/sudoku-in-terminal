import { State } from '~/constants';
import { useMenu } from '~/hooks/use-menu';
import { useSettings } from '~/hooks/use-settings';
import { useSudoku } from '~/hooks/use-sudoku';
import { useReplays } from '~/hooks/use-replays';
import { useUpdate } from '~/hooks/use-update';
import { checkForUpdates } from '~/helpers/check-for-updates';
import { exit } from '~/helpers/exit';
import { Cache } from '~/core/cache';
import { findErrors } from '~/core/sudoku';
import { prompt } from '~/components/prompt/prompt';
import { cachePath } from '~/helpers/cache-path';
import { isDevelopment } from '~/helpers/env';
import type { Difficulty, Option, Setting } from '~/types';

const options: Option[] = [
    {
        name: 'Play',
        value: 'play'
    },
    {
        name: 'Settings',
        value: 'settings'
    },
    {
        name: 'Replays',
        value: 'replays'
    },
    {
        name: 'Quit',
        value: 'quit'
    }
];

export function init() {
    const { enableCache, setDifficulty, setEnableCache, setErrors, setShowHints, setState, setSudoku, setStartTime } = useSudoku.getState();
    const { setOnSubmit, setOptions } = useMenu.getState();
    const { setSettings } = useSettings.getState();
    const { setReplays } = useReplays.getState();
    const { setIsUpdateCheckingEnabled } = useUpdate.getState();

    setOptions(options);
    setOnSubmit(async value => {
        switch (value) {
            case 'play': {
                const { board, solution, startTime } = Cache.cache();
                const { prevState } = useSudoku.getState();

                if (enableCache) {
                    if (board?.length && solution?.length) {
                        const shouldUseCachedGame = await prompt('Do you want to play the previous game?');

                        if (shouldUseCachedGame) {
                            setSudoku({ board, solution });
                            setErrors(findErrors(board));
                            setStartTime(startTime || Date.now());
                        }
                    }

                    Cache.save({ board: [], solution: [] });
                }

                if (prevState === State.SOLVED) {
                    setState(State.SOLVED);
                    return;
                }
                if (prevState === State.BOT_SOLVED) {
                    setState(State.BOT_SOLVED);
                    return;
                }

                setState(State.PLAYING);
                break;
            }
            case 'settings': {
                setState(State.SETTINGS);
                break;
            }
            case 'replays': {
                const { board } = useSudoku.getState();
                let shouldOpenReplays = true;

                if (board) {
                    shouldOpenReplays = await prompt('You have an on-going game. By opening replays your progress will be lost. Are you sure you want to do that?');
                }

                if (shouldOpenReplays) setState(State.REPLAYS);
                break;
            }
            case 'quit': {
                exit(1);
            }
        }
    });

    const { settings: cachedSettings, replays } = Cache.cache();
    const defaultSettings: Setting[] = [
        {
            type: 'list',
            name: 'Difficulty',
            description: 'Choose game difficulty.',
            list: ['easy', 'medium', 'hard', 'expert'] satisfies Difficulty[],
            value: 1,
            onChange(value) {
                setDifficulty(value);
            },
        },
        {
            type: 'boolean',
            name: 'Show Hints',
            description: 'Display mistakes, suggestions, etc.',
            value: true,
            onChange(value) {
                setShowHints(value);
            },
        },
        {
            type: 'boolean',
            name: 'Enable Cache',
            description: `Store settings, stats, unfinished game locally. ${isDevelopment ? 'Path: ' + cachePath('sudoku') : ''}`,
            value: true,
            onChange(value) {
                setEnableCache(value);
            },
        },
        {
            type: 'boolean',
            name: 'Check for updates',
            description: 'Notify when new version is available.',
            value: true,
            onChange(value) {
                setIsUpdateCheckingEnabled(value);

                if (value) checkForUpdates();
            },
        }
    ];

    if (cachedSettings) {
        setSettings(defaultSettings.map(setting => {
            const cachedSetting = cachedSettings[setting.name];

            if (cachedSetting !== undefined) {
                setting.value = cachedSetting;
            }

            return setting;
        }));
    } else {
        setSettings(defaultSettings);
    }

    setReplays(replays || []);
}