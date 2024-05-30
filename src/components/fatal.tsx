import React from 'react';
import { Text } from 'ink';
import { exit } from '~/helpers/exit';

// eslint-disable-next-line jsdoc/require-param
/**
 * Display an error message and exit the program.
 */
export function Fatal({ message }: {
    readonly message: string
}) {
    process.nextTick(exit);

    return <Text color='red'>{message}</Text>;
}