import React from "react";
import dayjs from "dayjs";
import Countdown from "react-countdown";

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  return (
    <div className="flex flex-col justify-around items-center w-149 h-67">
      <div className="text-14 text-500 leading-20">REMAINING TIME</div>
      <div className="w-full grid grid-flow-row grid-cols-4 leading-20">
        <div className="grid place-items-center">
          <div className="text-24">{days}</div>
          <div className="text-10 font-light">DAYS</div>
        </div>
        <div className="grid place-items-center">
          <div className="text-24">{hours}</div>
          <div className="text-10 font-light">HRS</div>
        </div>
        <div className="grid place-items-center">
          <div className="text-24">{minutes}</div>
          <div className="text-10 font-light">MINS</div>
        </div>
        <div className="grid place-items-center">
          <div className="text-24">{seconds}</div>
          <div className="text-10 font-light">SECS</div>
        </div>
      </div>
    </div>
  );
};

const CountDown = ({ endTime }: { endTime: string | undefined }) => {
  const timestamp = dayjs(endTime).valueOf(); // converted to user's timezone

  return <Countdown date={timestamp} renderer={renderer} />;
};

export default CountDown;
