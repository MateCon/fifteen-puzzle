import { Color } from "../helpers/interface";

const gererateNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRGB = (): Color => ({
    r: gererateNumber(20, 220),
    g: gererateNumber(20, 220),
    b: gererateNumber(20, 220)
});
