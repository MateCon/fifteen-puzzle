/* Game */

export interface Color {
    r: number;
    g: number;
    b: number;
}

export interface Cell extends Color {
    x: number;
    y: number;
    expectedX: number;
    expectedY: number;
    index: number;
}

export interface Game {
    cells: Cell[];
    empty: [number, number];
    size: number;
    time: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    clickCount: number;
    isGameStarted: boolean;
    isGameOver: boolean;
}

/* Redux */

export interface Action {
    type: string;
    payload: any;
};

export interface Store {
    games: {
        [key: number|string]: Game | undefined;
    },
    stats: {
        [key: number|string]: {
            completedGames: number;
            totalClicks: number;
            totalTime: number;
            bestTime: number;
            leastClicks: number;
        }
    }
};
