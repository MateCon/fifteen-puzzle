import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Store } from '../../helpers/interface';
import { animated, useSpring } from 'react-spring';
import Error from "../Error";
import './Stats.scss';

const options = ['4', '5', '6', '7', '8', '9', "Total", "Daily"];

const getAvarage = (count: number, sum: number): number => {
    if (count === 0) return 0;
    return Math.floor(sum / count);
};

const secondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - (hours * 3600)) / 60);
    const secondsLeft = seconds - (hours * 3600) - (minutes * 60);
    let result = `${secondsLeft}s`;
    if (minutes > 0)
        result = `${minutes}m ${result}`;
    if (hours > 0)
        result = `${hours}h ${result}`;
    return result;
};

const Stat = ({ children, index }: any) => {
    const { yoffset, opacity } = useSpring({
        from: { opacity: 0, yoffset: -500 },
        opacity: 1,
        yoffset: 0,
        delay: index * 150,
        config: { mass: 1, tension: 500, friction: 80 },
    });

    return (
        <animated.div style={{
            transform: yoffset.to(y => `translateY(${y}%)`),
            opacity
        }}>{children}</animated.div>
    )
};

const Stats: FC = () => {
    const params = useParams();
    const stats = useSelector((store: Store) => store.stats[params.mode!]);

    if (options.every(option => option !== params.mode)) return <Error>404 - page not found</Error>;

    const {
        completedGames,
        totalTime,
        totalClicks,
        bestTime,
        leastClicks
    } = stats || {
        completedGames: 0,
        totalTime: 0,
        totalClicks: 0,
        bestTime: 0,
        leastClicks: 0
    };

    return <div className="stats-container">
        <Stat index="0"><p>games played</p><p>{completedGames}</p></Stat>
        <Stat index="1"><p>playtime</p><p>{secondsToTime(totalTime)}</p></Stat>
        <Stat index="2"><p>click count</p><p>{totalClicks}</p></Stat>
        <Stat index="3"><p>avarage time</p><p>{secondsToTime(getAvarage(completedGames, totalTime))}</p></Stat>
        <Stat index="4"><p>avarage clicks</p><p>{getAvarage(completedGames, totalClicks)}</p></Stat>
        <Stat index="5"><p>best Time</p><p>{bestTime}</p></Stat>
        <Stat index="6"><p>least clicks</p><p>{leastClicks}</p></Stat>
    </div>;
}

export default Stats;
