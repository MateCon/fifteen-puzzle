import { FC } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

interface Props {
    value: number | string,
    index: number,
    to: string
};

const GamemodeButton: FC<Props> = ({ children, to, value, index }) => {
    const { xoffset, opacity } = useSpring({
        from: { opacity: 0, xoffset: 500 },
        opacity: 1,
        xoffset: 0,
        delay: index * 150,
        config: { mass: 1, tension: 500, friction: 80 },
    });

    return (
        <Link to={to} key={index}>
            <animated.button style={{
                position: 'relative',
                left: xoffset.to(x => `${x}%`),
                opacity
            }}>{children}</animated.button>
        </Link>
    )
};

export default GamemodeButton;
