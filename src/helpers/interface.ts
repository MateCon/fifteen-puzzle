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
