import React from 'react';
import { Box } from 'ink';
import { UpdateNotifier } from './update-notifier.js';

export function UpdateContainer() {
    return (
        <Box marginTop={2}>
            <UpdateNotifier />
        </Box>
    );
}