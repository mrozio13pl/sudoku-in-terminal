import { findErrors, generateSudoku, isSolved } from '~/core/sudoku';
import { handleAction } from '~/handlers/action';
import { handleUndo } from '~/handlers/undo';
import { handleRedo } from '~/handlers/redo';
import { useSudoku } from '~/hooks/use-sudoku';
import { useMenu } from '~/hooks/use-menu';
import { useReplays } from '~/hooks/use-replays';
import { useSettings } from '~/hooks/use-settings';
import { usePrompt } from '~/hooks/use-prompt';
import { useUpdate } from '~/hooks/use-update';
import { State } from '~/constants';
import { prompt } from '~/components/prompt/prompt';
import { isInRange, isNumeric } from '~/utils';
import type { Key } from 'ink';
import type { Coord } from '~/types';

export async function handleInput(input: string, key: Key) {
    const { board, solution, pos, prevState, state, showHelp, setActions, setBoard, setErrors, setState, setFinalTime, setStartTime, setSudoku, setPos, setIsInactive, setShowHelp } = useSudoku.getState();
    const { callback, question } = usePrompt.getState();
    const DOWN = input.toUpperCase() === 'J' || key.downArrow;
    const UP = input.toUpperCase() === 'K' || key.upArrow;
    const LEFT = input.toUpperCase() === 'H' || key.leftArrow;
    const RIGHT = input.toUpperCase() === 'L' || key.rightArrow;

    setIsInactive(false);

    input = input.toLowerCase().trim();

    if (question) {
        if (input === 'y' || key.return) callback!(true);
        if (input === 'n' || key.escape) callback!(false);

        return;
    }

    if (key.escape && state !== State.HOME) {
        if (state === State.PLAYING || state === State.SOLVED || state === State.BOT_SOLVED) {
            setState(State.HOME);
            return;
        }

        setState(prevState);
    }

    switch (state) {
        case State.HOME: {
            const { currentOptionIndex, options, onSubmit, setCurrentOptionIndex } = useMenu.getState();
            const { setError } = useUpdate.getState();

            // get rid of that ugly update error after any key was pressed
            setError('');

            // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
            switch (true) {
                case UP: {
                    if (currentOptionIndex > 0) setCurrentOptionIndex(currentOptionIndex - 1);
                    break;
                }
                case DOWN: {
                    if (currentOptionIndex < options.length - 1) setCurrentOptionIndex(currentOptionIndex + 1);
                    break;
                }
                case key.return: {
                    onSubmit(options[currentOptionIndex].value);
                    break;
                }
            }
            break;
        }
        case State.REPLAYS: {
            const { currentReplayIndex, currentPage, replays, pages, setCurrentReplayIndex, pageSize, setCurrentPage, setReplays } = useReplays.getState();

            // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
            switch (true) {
                case UP: {
                    if (currentReplayIndex > 0) {
                        setCurrentReplayIndex(currentReplayIndex - 1);

                        if ((currentPage - 1) * pageSize > currentReplayIndex - 1) setCurrentPage(currentPage - 1);
                    }
                    break;
                }
                case DOWN: {
                    if (currentReplayIndex < replays.length - 1) {
                        setCurrentReplayIndex(currentReplayIndex + 1);

                        if (currentPage * pageSize <= currentReplayIndex + 1) setCurrentPage(currentPage + 1);
                    }
                    break;
                }
                case LEFT: {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        setCurrentReplayIndex(pageSize * (currentPage - 1) - 1);
                    }
                    break;
                }
                case RIGHT: {
                    if (currentPage < pages) {
                        setCurrentPage(currentPage + 1);
                        setCurrentReplayIndex(pageSize * currentPage);
                    }
                    break;
                }
                case key.delete: {
                    const shouldDelete = await prompt('Are you sure you want to delete this replay?');

                    if (shouldDelete) {
                        setReplays(replays.filter((_, index) => index !== currentReplayIndex));
                        setCurrentReplayIndex(Math.max(0, currentReplayIndex - 1));
                    }
                    break;
                }
            }
            break;
        }
        case State.PLAYING: {
            const currentCell = board![pos[0]][pos[1]];

            if (isNumeric(input)) {
                const value = +input as Coord;

                if (!isInRange(value, 1, 9)) return;

                if (currentCell.permanent) return;

                handleAction('value', value, currentCell.value);
            }

            if (key.backspace) {
                if (currentCell.permanent || !currentCell.value) return;

                handleAction('remove', void 0, currentCell.value);
            }

            switch (true) {
                case DOWN: {
                    handleAction('down');
                    break;
                }
                case UP: {
                    handleAction('up');
                    break;
                }
                case LEFT: {
                    handleAction('left');
                    break;
                }
                case RIGHT: {
                    handleAction('right');
                    break;
                }
                // Q
                // Toggle between showing/hiding help.
                case input === 'q': {
                    setShowHelp(!showHelp);
                    break;
                }
                // M
                // Mark/unmark selected cell.
                case input === 'm': {
                    handleAction('mark');
                    break;
                }
                // U / CTRL+Z
                // Undo an action.
                case input === 'u' || (key.ctrl && input === 'z'): {
                    handleUndo();
                    break;
                }
                // R / CTRL+Y
                // Redo an action.
                case (input === 'r' && !key.ctrl) || (key.ctrl && input === 'y'): {
                    handleRedo();
                    break;
                }
                // C
                // clear the board
                case input === 'c': {
                    const shouldReset = await prompt('Clear the board?');

                    if (shouldReset) {
                        setActions([]);
                        setBoard(board!.map(
                            row => row.map(
                                col => ({ ...(
                                    !col.permanent ? { ...col, value: false } : col
                                ), marked: false })
                            )
                        ));
                        setErrors({ messages: [], positions: [] });
                        setPos([0, 0]);
                        return;
                    }
                    break;
                }
                // N
                // Create a new puzzle.
                case input === 'n': {
                    const shouldAbort = await prompt('Abort this puzzle?');

                    if (shouldAbort) {
                        setSudoku(generateSudoku());
                        setStartTime(Date.now());
                        setFinalTime(void 0);
                        setPos([0, 0]);
                    }
                    break;
                }
                // S
                // Solve the current puzzle.
                case input === 's': {
                    const shouldSolve = await prompt('Solve this puzzle?');

                    if (shouldSolve) {
                        setBoard(solution!.map((row, rowIndex) => {
                            return row.map((col, colIndex) => {
                                if (!board![rowIndex][colIndex].permanent) col.permanent = false;
                                return col;
                            });
                        }));
                        setState(State.BOT_SOLVED);
                    }
                    break;
                }
                // E
                // Open settings.
                case input === 'e': {
                    setState(State.SETTINGS);
                    break;
                }
                default: {
                    // invalid input
                }
            }

            const errors = findErrors(board!);
            setErrors(errors);

            if (!errors.positions.length && isSolved(board!)) {
                setState(State.SOLVED);
            }
            break;
        }
        case State.SETTINGS: {
            const { currentSettingIndex, settings, setCurrentSettingIndex, setSettings } = useSettings.getState();
            const currentSetting = settings[currentSettingIndex];
            const setValue = (value: any) => {
                currentSetting.value = value;
                if (currentSetting.type === 'list') {
                    currentSetting.onChange?.(currentSetting.list![value]);
                } else {
                    currentSetting.onChange?.(value);
                }
            };

            // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
            switch (true) {
                case UP: {
                    if (currentSettingIndex > 0) setCurrentSettingIndex(currentSettingIndex - 1);
                    break;
                }
                case DOWN: {
                    if (currentSettingIndex < settings.length - 1) setCurrentSettingIndex(currentSettingIndex + 1);
                    break;
                }
                case LEFT: {
                    if (currentSetting.type === 'boolean') {
                        setValue(true);
                    }
                    if (currentSetting.type === 'list') {
                        setValue(Math.max(0, currentSetting.value - 1));
                    }
                    break;
                }
                case RIGHT: {
                    if (currentSetting.type === 'boolean') {
                        setValue(false);
                    }
                    if (currentSetting.type === 'list') {
                        setValue(Math.min(currentSetting.list!.length - 1, currentSetting.value + 1));
                    }
                    break;
                }
                case key.return: {
                    if (currentSetting.type === 'boolean') setValue(!currentSetting.value);
                }
            }

            setSettings(settings);
            break;
        }
        case State.SOLVED:
        case State.BOT_SOLVED: {
            if (key.return) {
                setSudoku(generateSudoku());
                setStartTime(Date.now());
                setState(State.PLAYING);
            }
            break;
        }
    }
}