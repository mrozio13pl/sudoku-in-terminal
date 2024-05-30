import { useReplays } from '~/hooks/use-replays';
import { useSudoku } from '~/hooks/use-sudoku';
import type { Board } from '~/types';

export function saveGame() {
    const { actions, board, difficulty, solution, finalTime, startTime } = useSudoku.getState();
    const { replays, setReplays } = useReplays.getState();

    if (!board) return;

    const initialBoard: Board = board!.map(row => row.map(col => col.permanent ? col : { ...col, value: false }));

    setReplays([
        {
            actions,
            board: initialBoard,
            solution: solution!,
            difficulty,
            finalTime: finalTime || Date.now(),
            startTime
        },
        ...replays
    ]);
}