import React from 'react';
import { Box, Text } from 'ink';
import { Badge } from './badge.js';
import type { Color } from '~/types';

export function Alert({ children, color, label }: Readonly<{
    children: React.ReactNode,
    color: Color,
    label: string
}>) {
    return (
        <Box gap={1}>
            <Box>
                <Badge color={color}>{label}</Badge>
            </Box>
            <Box>
                <Text color={color}>{children}</Text>
            </Box>
        </Box>
    );
}