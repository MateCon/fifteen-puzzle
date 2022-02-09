import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '../../components/Grid';

const Game: FC = () => {
    const params = useParams();

    const getSize = () => {
        try {
            let str = params.size;
            if (!str) return 4;
            return parseInt(str);
        } catch (e) {
            return 4;
        }
    };

    return (
        <Grid size={getSize()} />
    )
}

export default Game;