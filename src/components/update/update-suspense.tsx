import React from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import isUnicodeSupported from 'is-unicode-supported';
import { useTheme } from '~/hooks/use-theme';
import { randomArrEl } from '~/utils';
import type { SpinnerName } from 'cli-spinners';

/** Some of the more good-looking spinners. */
const spinners: SpinnerName[] = [
    'balloon',
    'bouncingBar',
    'bouncingBall'
];

// spinners that require unicode support
if (isUnicodeSupported()) {
    spinners.push(
        'arc',
        'dots10',
        'squareCorners',
        'toggle'
    );
}

export function UpdateSuspense() {
    const { theme, animationsEnabled } = useTheme();

    const randomSpinner = randomArrEl(spinners);
    const Loader = () => animationsEnabled ? (
        <Text color={theme.updater.secondary}>
            <Spinner type={randomSpinner} />
        </Text>
    ) : <Text>~</Text>;

    return (
        <Text color={theme.updater.primary}>
            <Loader /> Checking for updates <Loader />
        </Text>
    );
}