import { FC, useEffect, useState } from 'react';
import { generateRGB } from '../../helpers/colorMethods';
import { generator } from '../../helpers/generator';
import { Cell as CellProps } from '../../helpers/interface';
import useDimensions from '../../helpers/useDimensions';
import useTimer from '../../helpers/useTimer';
import Cell from "../Cell";
import Modal from "../Modal";
import './Grid.scss';

const size = 4;
const gap = 2;
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const Grid: FC = () => {
    const { window_height } = useDimensions();
    const [cellSize, setCellSize] = useState((window_height - 300) / size);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [cells, setCells] = useState<CellProps[]>(() => generator(size, generateRGB(), generateRGB()));
    const [empty, setEmpty] = useState<[number, number]>([-1, -1]);
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { isRunning, resume, restart, stop, getTimeFormatted, minutes, seconds } = useTimer(100);
    const [clickCount, setClickCount] = useState<number>(0);

    const playAgain = () => {
        setHasEnded(false);
        setShowModal(false);
        setEmpty([-1, -1]);
        setCells(generator(size, generateRGB(), generateRGB()));
        restart();
    };

    const handleClick = (x: number, y: number) => {
        if (hasEnded) return;
        if (!isRunning) resume();
        for (let delta of directions) {
            let new_x = x, new_y = y;
            let found = false;
            let indexes: number[] = [];
            do {
                if (new_x < 0 || new_x >= size || new_y < 0 || new_y >= size) break;
                let a = new_x, b = new_y;
                let cell = cells.find(cell => cell.x === a && cell.y === b);
                if (cell) indexes.push(cell.index);
                if (new_x === empty[0] && new_y === empty[1]) found = true;
                new_x += delta[0];
                new_y += delta[1];
            } while (!found);
            if (!found) continue;
            let prev_x = empty[0], prev_y = empty[1];
            while (indexes.length > 0) {
                let index = indexes.pop();
                let cell = cells.find(cell => cell.index === index)!;
                let temp = [cell.x, cell.y];
                cell.x = prev_x;
                cell.y = prev_y;
                prev_x = temp[0];
                prev_y = temp[1];
            }
            setClickCount(clickCount + 1);
            setEmpty([x, y]);
        }
        const win = cells.every(cell => cell.x === cell.expectedX && cell.y === cell.expectedY);
        setHasEnded(win);
        setShowModal(win);
        if (win) stop();
    };

    useEffect(() => {
        setCellSize((window_height - 300) / size);
        setTotalSize(cellSize * size + gap * (size - 1));
    }, [window_height, setCellSize, setTotalSize, cellSize]);

    useEffect(() => {
        let x_coordinate_count = [];
        let y_coordinate_count = [];
        for (let i = 0; i < size; i++) {
            x_coordinate_count.push(0);
            y_coordinate_count.push(0);
        }
        for (let cell of cells) {
            x_coordinate_count[cell.x]++;
            y_coordinate_count[cell.y]++;
        }
        let x = -1, y = -1;
        for (let i = 0; i < size; i++) {
            if (x_coordinate_count[i] !== size) x = i;
            if (y_coordinate_count[i] !== size) y = i;
        }
        setEmpty([x, y]);
    }, [cells]);

    return <>
        <div className='grid-shadow' />
        <Modal show={showModal} hide={() => setShowModal(false)}>
            <h1>You Won!</h1>
            <hr></hr>
            <label>You won in {minutes > 0 && `${minutes} minute${minutes > 1 ? 's' : ''} and `}{seconds} second{seconds > 1 ? 's' : ''}</label>
            <div className="button-container">
                <button onClick={() => setShowModal(false)}>Close</button>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </Modal>
        <div className='stats'>
            <p>{getTimeFormatted(0)}</p>
            <h1>Fifteen Puzzle</h1>
            <p>{clickCount} clicks</p>
        </div>
        {
            cells.map(cell => <Cell
                key={cell.index}
                index={cell.index}
                x={cell.x}
                y={cell.y}
                gap={gap}
                cellSize={cellSize}
                totalSize={totalSize}
                backgroundColor={`rgb(${cell.r}, ${cell.g}, ${cell.b})`}
                handleClick={() => handleClick(cell.x, cell.y)}
            />)
        }
    </>
}

export default Grid;