import { FC } from 'react';
import { animated, useSpring } from 'react-spring';
import './Cell.scss';

interface Props {
    index: number;
    x: number;
    y: number;
    gap: number;
    size: number;
    cellSize: number;
    totalSize: number;
    backgroundColor: string;
    handleClick: () => void;
}

const Cell: FC<Props> = ({
    index,
    x,
    y,
    gap,
    size,
    cellSize,
    totalSize,
    backgroundColor,
    handleClick
}) => {
    const spring = useSpring({
        x: x * (cellSize + gap),
        y: y * (cellSize + gap),
        config: { mass: 0.75, tension: 500, friction: 20 },
    });

    const enterSpring = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: index * 1000 / (size * size),
    });

    return <animated.div
        className='cell'
        style={{
            left: spring.x.to((x: number) => `calc(${x}px + (100vw - ${totalSize}px) / 2)`),
            top: spring.y.to((y: number) => `calc(${y}px + (100vh - ${totalSize}px) / 2)`),
            opacity: enterSpring.opacity,
            backgroundColor,
            width: cellSize,
            height: cellSize,
            fontSize: cellSize / 2.5
        }}
        onClick={handleClick}
    >{index}</animated.div>
};

export default Cell;