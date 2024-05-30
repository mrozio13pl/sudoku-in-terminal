import React from 'react';
import { Box, Text } from 'ink';
import terminalSize from 'terminal-size';
import { isDevelopment } from '~/helpers/env';
import { Logo } from '../logo.js';
import { Menu } from './menu.js';
import { UpdateContainer } from '../update/update-container.js';
import { Badge } from '../ui/badge.js';
import { version } from '~/package.json' with { type: 'json' };

export function Home() {
    return (
        <>
            <Box
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
                width='100%'
            >
                <Logo />
                <Menu />
                <UpdateContainer />
            </Box>
            <Box
                position='absolute'
                justifyContent='flex-end'
                minWidth={terminalSize().columns}
                marginY={terminalSize().rows - 2}
            >
                <Text color='gray'>
                    {isDevelopment && <><Badge color='#FFA500' children='DEVELOPMENT' /> </>}
                    v{version}
                </Text>
            </Box>
        </>
    );
}