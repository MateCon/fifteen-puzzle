import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, useTrail, animated } from 'react-spring';
import './Home.scss';

const Home: FC = () => {
    const props = useSpring({
        left: 50,
        opacity: 1,
        from: { left: 0, opacity: 0 },
        config: { mass: 2, tension: 400, friction: 40 },
    });

    const trail = useTrail(6, {
        from: { opacity: 0, xoffset: 500 },
        opacity: 1,
        xoffset: 0,
        config: { mass: 1, tension: 500, friction: 80 },
    });

    return (
        <>
            <animated.p style={{
                position: 'absolute',
                left: props.left.to(x => x + '%'),
                opacity: props.opacity,
                transform: 'translate(-50%, 0)',
                marginTop: 25,
                fontSize: '1.3rem'
            }}>Pick a game mode</animated.p>
            <div className='home'>
                {trail.map(({ xoffset, opacity }, index) => {
                    const size = 4 + index;
                    return <Link to={`/game/${size}`
                    } key={size} >
                        <animated.button style={{
                            position: 'relative',
                            left: xoffset.to(x => `${x}%`),
                            opacity: opacity
                        }}>{size}x{size}</animated.button>
                    </Link>
                })}
            </div>
        </>
    )
}

export default Home;
