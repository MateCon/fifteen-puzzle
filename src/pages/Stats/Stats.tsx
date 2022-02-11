import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../helpers/interface';
import Error from "../Error";

const options = ['4', '5', '6', '7', '8', '9', "Total", "Daily"];

const Stats: FC = () => {
    const params = useParams();
    const stats = useSelector((store: Store) => store.stats);

    console.log(stats[params.mode!]);
    if (options.every(option => option !== params.mode)) return <Error>404 - page not found</Error>;
    return <div>Stats for {params.mode}</div>;
}

export default Stats;
