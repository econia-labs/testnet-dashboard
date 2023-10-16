import React from "react";
import dayjs from "dayjs";
import Countdown from "react-countdown";
import Skeleton from "react-loading-skeleton";

const CountDownComponent = ({
  days,
  hours,
  minutes,
  seconds,
  endTime,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  endTime?: string | undefined;
}) => {
  return (
    <div className="flex flex-col justify-around items-center w-149 h-67">
      <div className="text-14 text-500 leading-20">REMAINING TIME</div>
      {!endTime && <Skeleton width={149} height={20} />}
      <div className="w-full grid grid-flow-row grid-cols-4 leading-20">
        <div className="grid place-items-center">
          {endTime && <div className="text-24">{days}</div>}
          <div className="text-10 font-light">DAYS</div>
        </div>
        <div className="grid place-items-center">
          {endTime && <div className="text-24">{hours}</div>}
          <div className="text-10 font-light">HRS</div>
        </div>
        <div className="grid place-items-center">
          {endTime && <div className="text-24">{minutes}</div>}
          <div className="text-10 font-light">MINS</div>
        </div>
        <div className="grid place-items-center">
          {endTime && <div className="text-24">{seconds}</div>}
          <div className="text-10 font-light">SECS</div>
        </div>
      </div>
    </div>
  );
};

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
}) => {
  return (
    <CountDownComponent
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      endTime="countingDown"
    />
  );
};

const CountDown = ({ endTime }: { endTime: string | undefined }) => {
  if (!endTime)
    return (
      <CountDownComponent
        days={0}
        hours={0}
        minutes={0}
        seconds={0}
        endTime={endTime}
      />
    );
  const timestamp = dayjs(endTime).valueOf(); // converted to user's timezone

  return <Countdown date={timestamp} renderer={renderer} />;
};

export default CountDown;
