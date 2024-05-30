import React from 'react';
import { Box, Text } from 'ink';
import { useMenu } from '~/hooks/use-menu';
import { COLORS } from '~/constants';
import { unicodeFallback } from '~/helpers/unicode-fallback';

export function Menu() {
    const { currentOptionIndex, options } = useMenu();

    return (
        <Box flexDirection='column'>
            {options.map((option, optionIndex) => {
                const isSelected = optionIndex === currentOptionIndex;

                return (
                    <Box key={optionIndex}>
                        <Text color={isSelected ? COLORS.secondary : COLORS.primary}>
                            {isSelected ? unicodeFallback('❯', '>') : ' '} {option.name}
                        </Text>
                    </Box>
                );
            })}
        </Box>
    );
}