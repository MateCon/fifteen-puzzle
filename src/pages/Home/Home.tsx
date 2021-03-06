import { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import GamemodeButton from '../../components/GamemodeButton';
import './Home.scss';

const options = [
    { value: 'Daily', label: 'Daily' },
    { value: 4, label: '4x4' },
    { value: 5, label: '5x5' },
    { value: 6, label: '6x6' },
    { value: 7, label: '7x7' },
    { value: 8, label: '8x8' },
    { value: 9, label: '9x9' }
];

const Home: FC = () => {
    const props = useSpring({
        left: 50,
        opacity: 1,
        from: { left: 0, opacity: 0 },
        config: { mass: 2, tension: 400, friction: 40 },
    });

    return (
        <>
            <animated.p style={{
                position: 'absolute',
                transform: 'translate(-50%, 0)',
                fontSize: '1.3rem',
                marginTop: 25,
                left: props.left.to(x => x + '%'),
                opacity: props.opacity
            }}>Pick a game mode</animated.p>
            <div className='home'>
                {options.map(({ value, label }, index) =>
                    <GamemodeButton
                        key={index}
                        to={`/game/${value}`}
                        {...{ value, index }}
                    >
                        {label}
                    </GamemodeButton>)}
            </div>
        </>
    )
}

export default Home;
