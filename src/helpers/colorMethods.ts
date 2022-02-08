import { Color } from "./interface";

const gererateNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRGB = (): Color => ({
    r: gererateNumber(0, 255),
    g: gererateNumber(0, 255),
    b: gererateNumber(0, 255)
});
