import React from 'react';
import { Box, Text } from 'ink';
import { useTheme } from '~/hooks/use-theme';
import terminalSize from 'terminal-size';
import type { Setting as SettingType } from '~/types';

export function Setting({ setting, isSelected }: {
    readonly setting: SettingType,
    readonly isSelected: boolean;
}) {
    const minWidth = Math.max(15, setting.name.length, terminalSize().columns / 4);
    const { theme } = useTheme();

    return (
        <Box paddingTop={1} paddingLeft={2} gap={4}>
            <Box flexDirection='column' width={minWidth}>
                <Text
                    underline={isSelected}
                    color={isSelected ? 'black' : theme.settings.primary}
                    backgroundColor={isSelected ? 'whiteBright' : ''}
                >{setting.name}</Text>
                <Text color={theme.settings.secondary}>{setting.description}</Text>
            </Box>
            <Box>
                {setting.type === 'boolean'
                && (
                    setting.value === true
                        ? <>
                            <Text color={theme.settings.toggleOn}>■</Text>
                            <Text color={theme.settings.toggleEmpty}>■</Text>
                        </>
                        : <>
                            <Text color={theme.settings.toggleEmpty}>■</Text>
                            <Text color={theme.settings.toggleOff}>■</Text>
                        </>
                )}

                {setting.type === 'list'
                && <Text color={setting.valueColors?.[setting.value] || 'white'}>
                    {setting.value > 0 && '≤ '}
                    {setting.list![setting.value]}
                    {setting.value < setting.list!.length - 1 ? ' ≥' : '  '}
                </Text>}
            </Box>
        </Box>
    );
}