import React from 'react'
import Countdown from 'react-countdown';

// Complete component
const Completion = () => <span>You are good to go!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }: { days: number, hours: number, minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
        // Render a completed state
        return <Completion />;
    } else {
        // Render a countdown
        return (
            <div className='flex flex-col justify-around items-center w-149 h-67'>
                <div className='text-14 text-500 leading-20'>REMAINING TIME</div>
                <div className='w-full grid grid-flow-row grid-cols-4 leading-20'>
                    <div className='grid place-items-center'>
                        <div className='text-24'>
                            {days}
                        </div>
                        <div className='text-10 font-light'>
                            DAYS
                        </div>
                    </div>
                    <div className='grid place-items-center'>
                        <div className='text-24'>
                            {hours}
                        </div>
                        <div className='text-10 font-light'>
                            HRS
                        </div>
                    </div>
                    <div className='grid place-items-center'>
                        <div className='text-24'>
                            {minutes}
                        </div>
                        <div className='text-10 font-light'>
                            MINS
                        </div>
                    </div>
                    <div className='grid place-items-center'>
                        <div className='text-24'>
                            {seconds}
                        </div>
                        <div className='text-10 font-light'>
                            SECS
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const CountDown = () => {
    return (
        <Countdown
            date={Date.now() + 499982000}
            renderer={renderer}
        />
    )
}

export default CountDown