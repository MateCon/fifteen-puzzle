import { useEffect, useState } from "react";

const useDimensions = () => {
    const [window_width, setWidth] = useState<number>(document.getElementById("root")!.clientWidth);
    const [window_height, setHeight] = useState<number>(document.getElementById("root")!.clientHeight);

    useEffect(() => {
        const updateDimensions = () => {
            setWidth(document.getElementById('root')!.clientWidth);
            setHeight(document.getElementById('root')!.clientHeight);
        }

        return window.addEventListener('resize', () => updateDimensions());
    }, [setWidth, setHeight]);

    return { window_width, window_height };
};

export default useDimensions;
