import React from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import isUnicodeSupported from 'is-unicode-supported';
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