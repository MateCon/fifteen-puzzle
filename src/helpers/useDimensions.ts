import { useEffect, useState } from "react";

const useDimensions = () => {
    const [window_width, setWidth] = useState<number>(0);
    const [window_height, setHeight] = useState<number>(0);

    useEffect(() => {
        const updateDimensions = () => {
            setWidth(document.getElementById('root')!.clientWidth);
            setHeight(document.getElementById('root')!.clientHeight);
        }

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [setWidth, setHeight]);

    return { window_width, window_height };
};

export default useDimensions;
