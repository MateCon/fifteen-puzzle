import { FC } from 'react';
import { Game } from '../../helpers/interface';

interface Props {
    game: Game | undefined;
    getTimeFormatted: (precision: number) => string;
}

const Stats: FC<Props> = ({
    game,
    getTimeFormatted
}) => {
    return (
        <div className='stats'>
            <p>{getTimeFormatted(0)}</p>
            <p>{game?.clickCount} clicks</p>
        </div>
    )
}

export default Stats;