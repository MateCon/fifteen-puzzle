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

export interface DailyGame extends Game {
    day: number;
}

export interface Result {
    position: number;
    total: number;
};

/* Redux */

export interface Action {
    type: string;
    payload: any;
};

export interface Stats {
    completedGames: number;
    totalClicks: number;
    totalTime: number;
    bestTime: number;
    leastClicks: number;
}

export interface Settings {
    audio: {
        volume: number;
    }
}

export interface Store {
    games: {
        Daily: DailyGame | undefined;
        [key: number|string]: Game | undefined;
    },
    stats: {
        [key: number|string]: Stats | undefined;
    },
    settings: Settings;
};
