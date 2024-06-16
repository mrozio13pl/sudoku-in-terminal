import React from 'react';
import { Box, Text } from 'ink';
import { useMenu } from '~/hooks/use-menu';
import { useTheme } from '~/hooks/use-theme';
import { unicodeFallback } from '~/helpers/unicode-fallback';

export function Menu() {
    const { currentOptionIndex, options } = useMenu();
    const { theme } = useTheme();

    return (
        <Box flexDirection='column'>
            {options.map((option, optionIndex) => {
                const isSelected = optionIndex === currentOptionIndex;

                return (
                    <Box key={optionIndex}>
                        <Text color={isSelected ? theme.secondary : theme.primary}>
                            {isSelected ? unicodeFallback('❯', '>') : ' '} {option.name}
                        </Text>
                    </Box>
                );
            })}
        </Box>
    );
}