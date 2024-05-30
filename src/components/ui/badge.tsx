import React from 'react';
import { Text } from 'ink';
import type { Color } from '~/types';

export function Badge({ children, color }: {
    readonly children: React.ReactNode,
    readonly color: Color
}) {
    return (
        <Text backgroundColor={color} color={'#111'}>
            {' '}
            {children}
            {' '}
        </Text>
    );
}