import React from 'react';
import { Box, Text } from 'ink';
import terminalSize from 'terminal-size';
import { useSettings } from '~/hooks/use-settings';
import { Setting } from './setting';

export function Settings() {
    const { currentSettingIndex, settings } = useSettings();

    return (
        <Box flexDirection='column'>
            {settings.map((setting, settingIndex) => {
                const isSelected = settingIndex === currentSettingIndex;

                return <Setting
                    setting={setting}
                    isSelected={isSelected}
                    key={settingIndex}
                />;
            })}

            <Box paddingLeft={2} position='absolute' marginY={terminalSize().rows - 2}>
                <Text>Press <Text color='whiteBright'>ESCAPE</Text> to close...</Text>
            </Box>
        </Box>
    );
}