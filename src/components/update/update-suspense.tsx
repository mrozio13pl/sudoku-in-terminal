import React from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { randomArrEl } from '~/utils';
import type { SpinnerName } from 'cli-spinners';

/** Some of the more good-looking spinners. */
const spinners = [
    'arc',
    'balloon',
    'bouncingBar',
    'dots10',
    'squareCorners',
    'toggle'
] satisfies SpinnerName[];

export function UpdateSuspense() {
    const randomSpinner = randomArrEl(spinners);
    const Loader = () => (
        <Text color='#1daeb3'>
            <Spinner type={randomSpinner} />
        </Text>
    );

    return (
        <Text color='#23d8de'>
            <Loader /> Checking for updates <Loader />
        </Text>
    );
}