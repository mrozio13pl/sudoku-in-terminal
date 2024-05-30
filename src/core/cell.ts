import type { Coord } from '~/types';

interface CellOptions {
    value: Coord | false;
    permanent?: boolean;
    marked?: boolean;
}

export class Cell implements CellOptions {
    value: Coord | false;
    permanent: boolean;
    marked: boolean;

    constructor({ value, permanent }: CellOptions) {
        this.value = value;
        this.permanent = permanent ?? false;
        this.marked = false;
    }
}