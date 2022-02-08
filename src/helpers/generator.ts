import { Cell, Color } from "./interface";

// https://stackoverflow.com/questions/34570344/check-if-15-puzzle-is-solvable
const isValid = (state: Cell[], size: number) => {
    let parity = 0;
    let row = 0;
    let emptyRow = -1;

    for (let i = 0; i < state.length; i++) {
        if (i % size === 0) row++;
        if (state[i].index === -1) {
            emptyRow = row;
            continue;
        }
        for (let j = i + 1; j < state.length; j++) {
            if (state[i].index > state[j].index && state[j].index !== -1)
                parity++;
        }
    }

    if (size % 2 !== 0) return parity % 2 === 0;
    if (emptyRow % 2 === 0) return parity % 2 === 0;
    else return parity % 2 !== 0;
};

export const generator = (
    size: number,
    start: Color,
    end: Color
): Cell[] => {
    let result = [];
    const current = start;
    const delta = {
        r: (end.r - start.r) / (size - 1),
        g: (end.g - start.g) / (size - 1),
        b: (end.b - start.b) / (size - 1)
    };
    let index = 0;
    let y = 0;
    for (let i = 0; i < size; i++) {
        let x = 0;
        for (let j = 0; j < size; j++) {
            index++;
            result.push({
                ...current,
                index,
                x: -1,
                y: -1,
                expectedX: x,
                expectedY: y
            });
            current.r += delta.r;
            current.g += delta.g;
            x++;
        }
        current.r -= delta.r * size;
        current.g -= delta.g * size;
        current.b += delta.b;
        y++;
    }
    result[result.length - 1].index = -1;
    do {
        result = result.sort(() => Math.random() - 0.5);
    } while (!isValid(result, size));
    index = 0;
    for(let y = 0; y < size; y++) {
        for(let x = 0; x < size; x++) {
            result[index].x = x;
            result[index].y = y;
            index++;
        }
    }
    return result.filter((cell: any) => cell.index !== -1);
};
