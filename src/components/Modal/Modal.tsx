import { FC } from 'react';
import { useTransition, animated } from 'react-spring';
import './Modal.css';

interface Props {
    show: boolean;
    hide: () => void;
};

const Modal: FC<Props> = ({ show, hide, children }) => {
    const transition = useTransition(show, {
        from: { opacity: 0, top: 0 },
        enter: { opacity: 1, top: 50 },
        leave: { opacity: 0, top: 100 },
        config: { stiffness: 200, mass: 1, damping: 20 }
    });

    return (
        <>
            {transition((styles, item) => item && <>
                <animated.div
                    onClick={hide}
                    className='click-catcher'
                    style={{
                        opacity: styles.opacity,
                        display: styles.opacity.to(o => o > 0 ? 'block' : 'none'),
                    }}
                />
                <animated.div
                    className='modal'
                    style={{
                        opacity: styles.opacity,
                        top: styles.top.to((top: number) => `${top}%`)
                    }}
                >{children}</animated.div>
            </>)}
        </>
    )
}

export default Modal;