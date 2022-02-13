import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '../../components/Grid';
import DailyGrid from '../../components/DailyGrid';

const getSize = (mode: string) => {
    let size = parseInt(mode) || 4;
    return size > 20 ? 20 : size
};

const Game: FC = () => {
    const params = useParams();
    if (params.mode === 'Daily')
        return <DailyGrid />;
    return <Grid mode={getSize(params.mode!)} />;
}

export default Game;