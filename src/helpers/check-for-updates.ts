import updateNotifier from 'tiny-update-notifier';
import { isDevelopment } from '~/helpers/env';
import { useUpdate } from '~/hooks/use-update';
import { name, version } from '~/package.json' assert { type: 'json '};
import { setTimeout as sleep } from 'node:timers/promises';

export async function checkForUpdates() {
    const { isUpdateCheckingEnabled, setUpdate, setError } = useUpdate.getState();

    // for development purposes
    if (isDevelopment) await sleep(3000);

    if (!isUpdateCheckingEnabled) {
        setUpdate(false);
        return;
    }

    try {
        const update = await updateNotifier({
            pkg: { name, version },
            checkInterval: isDevelopment ? 10_000 : undefined
        });
        setUpdate(update);
    } catch {
        setUpdate(false);
        setError('Couldn\'t get the latest version.');
    }
}