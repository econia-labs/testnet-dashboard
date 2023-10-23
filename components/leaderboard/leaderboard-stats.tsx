import React, { ReactElement } from "react";
import Skeleton from "react-loading-skeleton";

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number | ReactElement;
}) => {
  return (
    <div className="border-1 border-600 flex flex-col justify-center items-center gap-6 w-224 h-81 leading-18">
      <div className="text-14 text-500">{title}</div>
      <div className="text-20">{value}</div>
    </div>
  );
};

const LeaderboardStats = ({
  totalVolume,
  traders,
  prize = 0,
  fetching,
}: {
  totalVolume: number;
  traders: number;
  prize: number | undefined;
  fetching: boolean;
}) => {
  const stats = [
    {
      title: "TOTAL VOLUME",
      value: fetching ? (
        <Skeleton width={100} />
      ) : (
        `$${totalVolume.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      ),
    },
    {
      title: "TRADERS",
      value: fetching ? <Skeleton width={100} /> : traders.toLocaleString(),
    },
    {
      title: "TOTAL PRIZES",
      value: fetching ? <Skeleton width={100} /> : `$${prize.toLocaleString()}`,
    },
  ];

  return (
    <div className="flex gap-42 w-605 lg:w-757">
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default LeaderboardStats;
