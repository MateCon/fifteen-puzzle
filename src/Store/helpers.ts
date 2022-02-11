import { Cell, Game, Stats } from "../helpers/interface";
import { generateRGB } from "./colorMethods";

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

export const createGame = (
    size: number
): Game => {
    let result: Cell[] = [];
    const start = generateRGB();
    const end = generateRGB();
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
    let empty: [number, number] = [-1, -1];
    for(let y = 0; y < size; y++) {
        for(let x = 0; x < size; x++) {
            result[index].x = x;
            result[index].y = y;
            index++;
            if(result[index - 1].index === -1) {
                empty = [x, y];
            }
        }
    }
    result = result.filter((cell: any) => cell.index !== -1);
    return {
        cells: result,
        empty,
        size,
        time: {
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        clickCount: 0,
        isGameStarted: false,
        isGameOver: false
    };
};

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const isInbounds = (
    x: number,
    y: number,
    size: number
) => x >= 0 && x < size && y >= 0 && y < size;

export const clickCell = (
    state: Game,
    x: number,
    y: number
): any => {
    if(state.isGameOver) return {};
    for (let delta of directions) {
        let new_x = x, new_y = y;
        let found = false;
        let indexes: number[] = [];
        do {
            if (!isInbounds(new_x, new_y, state.size)) break;
            let x_copy = new_x, y_copy = new_y;
            let cell = state.cells.find(cell => cell.x === x_copy && cell.y === y_copy);
            if (cell) indexes.push(cell.index);
            if (new_x === state.empty[0] && new_y === state.empty[1]) found = true;
            new_x += delta[0];
            new_y += delta[1];
        } while (!found);
        if (!found) continue;
        let prev_x = state.empty[0], prev_y = state.empty[1];
        while (indexes.length > 0) {
            let index = indexes.pop();
            let cell = state.cells.find(cell => cell.index === index)!;
            let temp = [cell.x, cell.y];
            cell.x = prev_x;
            cell.y = prev_y;
            prev_x = temp[0];
            prev_y = temp[1];
        }
        return { cells: state.cells, empty: [prev_x, prev_y], clickCount: state.clickCount + 1 };
    }
    return {};
};

export const addToStats = (
    state: Game,
    stats: Stats | undefined
): Stats => {
    console.log(state.time, state.time.hours * 3600 + state.time.minutes * 60 + state.time.seconds);
    if(!stats) stats = {
        completedGames: 0,
        totalTime: 0,
        totalClicks: 0,
        bestTime: 0,
        leastClicks: 0
    };
    console.log(stats.totalTime);
    let time = state.time.hours * 3600 + state.time.minutes * 60 + state.time.seconds;
    stats.completedGames++;
    stats.totalClicks += state.clickCount;
    stats.totalTime += time;
    if (stats.bestTime === 0) stats.bestTime = time;
    else stats.bestTime = Math.min(stats.bestTime, time);
    if (stats.leastClicks === 0) stats.leastClicks = state.clickCount;
    else stats.leastClicks = Math.min(stats.leastClicks, state.clickCount);
    console.log(stats.totalTime);
    return stats;
};
