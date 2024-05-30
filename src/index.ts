import hasFlag from 'has-flag';
import { render } from 'ink';
import { App } from '~/app';
import { isDevelopment } from '~/helpers/env';
import { version } from '~/package.json' with { type: 'json' };

if (hasFlag('--version') || hasFlag('-v')) {
    process.stdout.write(`v${version}`);
    process.exit(1);
}

// TODO: add help message
if (hasFlag('--help') || hasFlag('-h')) {
    process.stdout.write('Check out: https://github.com/mrozio13pl/sudoku-in-terminal');
    process.exit(1);
}

const InkInstance = render(
    App(),
    { exitOnCtrlC: isDevelopment }
);

export default InkInstance;