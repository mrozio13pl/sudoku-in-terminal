import React from 'react';
import { Box } from 'ink';
import terminalSize from 'terminal-size';
import { Board } from './board.js';
import { Errors } from './errors.js';
import { Info } from './info.js';
import { useSudoku } from '~/hooks/use-sudoku';
import { State } from '~/constants';
import { Home } from '~/components/home/home';
import { Settings } from '~/components/settings/settings';
import { Messages } from './messages.js';
import { Replays } from '../replays/replays.js';

export function Game() {
    const gap = Math.max(terminalSize().columns / 10, 2);
    const { showHints, state } = useSudoku();

    if (state === State.HOME) return <Home />;
    if (state === State.SETTINGS) return <Settings />;
    if (state === State.REPLAYS) return <Replays />;

    return (
        <Box padding={1} flexDirection='column'>
            <Box gap={gap}>
                <Board />
                <Info />
            </Box>
            <Box flexDirection='column'>
                {showHints && <Box>
                    <Errors />
                </Box>}
                <Messages />
            </Box>
        </Box>
    );
}