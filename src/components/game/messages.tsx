import React, { useEffect, useState } from 'react';
import { Box } from 'ink';
import Spinner from 'ink-spinner';
import supportsColor from 'supports-color';
import isUnicodeSupported from 'is-unicode-supported';
import { Alert } from '../ui/alert.js';
import { useSudoku } from '~/hooks/use-sudoku';
import { unicodeFallback } from '~/helpers/unicode-fallback';
import { COLORS, INACTIVITY_TIMEOUT, State } from '~/constants';

export function Messages() {
    const { board, pos, state, isInactive, setIsInactive } = useSudoku();
    const [inactivityTimeout, setInactivityTimeout] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (inactivityTimeout) {
            setInactivityTimeout(void 0);
            clearTimeout(inactivityTimeout);
        }

        if (isInactive) return;

        setIsInactive(false);

        const timeout = setTimeout(() => {
            setIsInactive(true);
        }, INACTIVITY_TIMEOUT);
        setInactivityTimeout(timeout);

        return () => {
            clearTimeout(inactivityTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [board, pos, isInactive]);

    return (
        <Box flexDirection='column'>
            {
                state === State.SOLVED &&
                <Alert label='WIN' color='yellow'>
                    Congratulations! You won the game.
                    {unicodeFallback(' 🏆')}
                </Alert>
            }
            {
                // sort of an easter egg
                isInactive &&
                <Alert label='Hello...' color='magentaBright'>
                    Are you still here? <Spinner type={
                        isUnicodeSupported()
                            ? 'earth'
                            : 'betaWave'}
                    />
                </Alert>
            }
            {
                !supportsColor.stdout &&
                <Alert label='WARN' color={COLORS.warning} >
                    Colors are not supported in your terminal.
                </Alert>
            }
        </Box>
    );
}