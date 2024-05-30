import React from 'react';
import { Box, Newline, Text } from 'ink';
import { useUpdate } from '~/hooks/use-update';
import { UpdateSuspense } from './update-suspense';
import { Alert } from '../ui/alert';
import { unicodeFallback } from '~/helpers/unicode-fallback';
import { COLORS } from '~/constants';
import { capitalize } from '~/utils';

export function UpdateNotifier() {
    const { update, error, isUpdateCheckingEnabled } = useUpdate();

    if (!isUpdateCheckingEnabled || update === false) {
        if (error) {
            return (
                <Alert label='WARN' color={COLORS.warning}>
                    Couldn't fetch the latest version.
                </Alert>
            );
        }

        return (<></>);
    }

    return !update ? <UpdateSuspense /> : (
        <Box>
            <Text>
                {capitalize(update.type)} update available <Text color='gray'>
                    v{update.current}
                </Text> {unicodeFallback('→', '->')} <Text color='greenBright'>
                    v{update.latest}
                </Text>
                <Newline />
                <Text>Run <Text color='cyan'>
                    npm i -g {update.name}
                </Text> to update</Text>
            </Text>
        </Box>
    );
}