import React from "react";

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
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
}: {
  totalVolume: number;
  traders: number;
  prize: number | undefined;
}) => {
  const stats = [
    {
      title: "TOTAL VOLUME",
      value: `$${totalVolume.toLocaleString()}`,
    },
    {
      title: "TRADERS",
      value: traders.toLocaleString(),
    },
    {
      title: "TOTAL PRIZES",
      value: `$${prize.toLocaleString()}`,
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
