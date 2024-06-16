import type { TerminalSize } from 'terminal-size';

export const INACTIVITY_TIMEOUT = 90_000;

/** Minimum size of the terminal window required to play the game. */
export const MINIMUM_TERMINAL_SIZE: TerminalSize = {
    columns: 71,
    rows: 16
} as const;

/** Game state. Used to e.g. change to what's should be displayed on the screen. */
export enum State {
    HOME = 'home',
    SETTINGS = 'settings',
    REPLAYS = 'replays',
    PLAYING = 'playing',
    SOLVED = 'solved',
    BOT_SOLVED = 'bot_solved'
}