import { useSudoku } from '~/hooks/use-sudoku';
import { isSolved } from '~/core/sudoku';
import { Cache } from '~/core/cache';
import onExit from 'signal-exit';

export async function exit(code = 0) {
    const { actions, board, solution, startTime } = useSudoku.getState();

    if (board && !isSolved(board)) {
        await Cache.save({ actions, board, solution, startTime });
    }

    process.nextTick(() => {
        process.exit(code);
    });
}

onExit(code => exit(code ?? 0));