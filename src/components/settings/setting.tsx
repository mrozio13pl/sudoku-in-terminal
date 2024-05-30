import React from 'react';
import { Box, Text } from 'ink';
import { COLORS } from '~/constants';
import terminalSize from 'terminal-size';
import type { Setting as SettingType } from '~/types';

export function Setting({ setting, isSelected }: {
    readonly setting: SettingType,
    readonly isSelected: boolean;
}) {
    const minWidth = Math.max(15, setting.name.length, terminalSize().columns / 4);

    return (
        <Box paddingTop={1} paddingLeft={2} gap={4}>
            <Box flexDirection='column' width={minWidth}>
                <Text
                    underline={isSelected}
                    color={isSelected ? 'black' : 'white'}
                    backgroundColor={isSelected ? 'whiteBright' : ''}
                >{setting.name}</Text>
                <Text color='gray'>{setting.description}</Text>
            </Box>
            <Box>
                {setting.type === 'boolean'
                && (
                    setting.value === true
                        ? <>
                            <Text color={COLORS.primary}>■</Text>
                            <Text color='gray'>■</Text>
                        </>
                        : <>
                            <Text color='gray'>■</Text>
                            <Text color='red'>■</Text>
                        </>
                )}

                {setting.type === 'list'
                && <Text>
                    {setting.value > 0 && '≤ '}
                    {setting.list![setting.value]}
                    {setting.value < setting.list!.length - 1 ? ' ≥' : '  '}
                </Text>}
            </Box>
        </Box>
    );
}