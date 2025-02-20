import { CountdownCircleTimer } from 'react-countdown-circle-timer'

type CountDownProps = {
    duration: number;
    onComplete?: () => void;
}

const createChunks = (num: number, chunks: number = 4): number[] => {
    const step = Math.floor(num / (chunks - 1));
    return Array.from({ length: chunks }, (_, i) => num - i * step);
}

export const CountDown = ({ duration, onComplete}: CountDownProps) => {
    const chunks = createChunks(duration, 4);
    return <CountdownCircleTimer
        isPlaying
        duration={duration}
        size={80}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[chunks[0], chunks[1], chunks[2], chunks[3]]}//unfortunately, the type definition is wrong so I can't do {chunks}
        onComplete={onComplete}
    >
        {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>

}