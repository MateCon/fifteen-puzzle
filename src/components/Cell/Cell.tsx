import { FC } from 'react';
import { animated, useSpring } from 'react-spring';
import './Cell.scss';

interface Props {
    index: number;
    x: number;
    y: number;
    gap: number;
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

    return <animated.div
        className='cell'
        style={{
            left: spring.x.to((x: number) => `calc(${x}px + (100vw - ${totalSize}px) / 2)`),
            top: spring.y.to((y: number) => `calc(${y}px + (100vh - ${totalSize}px) / 2)`),
            backgroundColor,
            width: cellSize,
            height: cellSize,
            fontSize: cellSize / 2.5
        }}
        onClick={handleClick}
    >{index}</animated.div>
};

export default Cell;