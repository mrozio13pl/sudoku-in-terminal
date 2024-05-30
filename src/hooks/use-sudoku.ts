import { create } from 'zustand';
import { useSettings } from './use-settings';
import { State } from '~/constants';
import { generateSudoku } from '~/core/sudoku';
import { Cache } from '~/core/cache';
import { saveGame } from '~/helpers/save-game';
import { isInRange } from '~/utils';
import type { Action, Board, Difficulty, Pos } from '~/types';

interface SudokuState {
    state: State;
    setState(state: this['state']): void;
    prevState: State;
    setPrevState(prevState: this['prevState']): void;
    setSudoku(sudoku: { actions?: Action[], board: Board, solution: Board }): void;
    board?: Board;
    setBoard(board: this['board']): void;
    solution?: Board;
    setSolution(solution: this['solution']): void;
    actions: Action[];
    setActions(actions: this['actions']): void;
    withdrawnActions: Action[];
    setWithdrawnActions(withdrawnActions: this['withdrawnActions']): void;
    difficulty: Difficulty;
    setDifficulty(difficulty: this['difficulty']): void;
    pos: Pos;
    setPos(pos: this['pos']): void;
    showHints: boolean;
    setShowHints(showHints: this['showHints']): void;
    enableCache: boolean;
    setEnableCache(enableCache: this['enableCache']): void;
    errors: { messages: string[], positions: Pos[] };
    setErrors(errors: this['errors']): void;
    finalTime?: number;
    setFinalTime(finalTime: this['finalTime']): void;
    startTime: number;
    setStartTime(startTime: this['startTime']): void;
    isInactive: boolean;
    setIsInactive(isInactive: this['isInactive']): void;
    showHelp: boolean;
    setShowHelp(showHelp: boolean): void;
}

export const useSudoku = create<SudokuState>(set => ({
    state: State.HOME,
    setState(state) {
        set(({ board, difficulty, finalTime, startTime, setErrors, setStartTime, state: prevState, setBoard, setSudoku, setSolution, setPos, setShowHelp }) => {
            if (prevState === State.SETTINGS) useSettings.setState({ currentSettingIndex: 0 });

            // we should prevent state from changing from solved by bot
            // to solved by player, in order to not cause confusion
            if (prevState === State.BOT_SOLVED && state === State.SOLVED) return {};

            if (state === State.PLAYING && !board) {
                setStartTime(Date.now());
                setSudoku(generateSudoku(difficulty));
                finalTime = void 0;
            }

            if (state === State.SOLVED || state === State.BOT_SOLVED) {
                setErrors({ messages: [], positions: [] });
                finalTime = (Date.now() - startTime) / 1000;
            }

            // remove the board after exiting replays
            if (prevState === State.REPLAYS) {
                setBoard(void 0);
                setSolution(void 0);
                setPos([0, 0]);
            }

            setShowHelp(false);

            return { finalTime, state, prevState };
        });

        if (state === State.SOLVED || state === State.BOT_SOLVED) {
            saveGame();
        }
    },
    prevState: State.HOME,
    setPrevState(prevState) {
        set({ prevState });
    },
    setSudoku({ actions, board, solution }) {
        set({ actions: actions || [], board, solution });
    },
    setBoard(board) {
        set({ board, errors: { messages: [], positions: [] } });
    },
    setSolution(solution) {
        set({ solution });
    },
    actions: [],
    setActions(actions) {
        set({ actions, withdrawnActions: [] });
    },
    withdrawnActions: [],
    setWithdrawnActions(withdrawnActions) {
        set({ withdrawnActions });
    },
    difficulty: 'easy',
    setDifficulty(difficulty) {
        set({ difficulty });
    },
    pos: [0, 0],
    setPos(pos) {
        if (
            !isInRange(pos[0], 0, 8) ||
            !isInRange(pos[1], 0, 8)
        ) return;

        set({ pos });
    },
    showHints: true,
    setShowHints(showHints) {
        set({ showHints });
    },
    enableCache: true,
    setEnableCache(enableCache) {
        Cache.enabled = enableCache;
        set({ enableCache });
    },
    errors: { messages: [], positions: [] },
    setErrors(errors) {
        set({ errors });
    },
    startTime: Date.now(),
    setStartTime(startTime) {
        set({ startTime });
    },
    setFinalTime(finalTime) {
        set({ finalTime });
    },
    isInactive: false,
    setIsInactive(isInactive) {
        set({ isInactive });
    },
    showHelp: false,
    setShowHelp(showHelp) {
        set({ showHelp });
    },
}));