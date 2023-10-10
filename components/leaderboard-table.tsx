import { leaderboardType } from "@/types/leaderboard";

const LeaderboardTable = ({
  tableData,
  loggedInUser,
}: {
  tableData: leaderboardType[];
  loggedInUser: leaderboardType | undefined;
}) => {
  const {
    user: userAddress,
    rank,
    volume,
    n_trades: numberOfTrades,
    points,
  } = loggedInUser || {
    user: "YOU",
    rank: "-",
    volume: "-",
    n_trades: "-",
    points: "-",
  };

  return (
    <div className="flex items-center justify-center overflow-hidden w-317 sm:w-437 md:w-605 lg:w-757">
      <table className="w-full table-auto sm:table-fixed">
        <thead>
          <tr className="uppercase h-52">
            <th className="text-12 text-500 uppercase text-center font-normal">
              Rank
            </th>
            <th className="text-12 text-500 uppercase text-center font-normal">
              Trader
            </th>
            <th className="text-12 text-500 uppercase text-center font-normal hidden lg:table-cell">
              Trades
            </th>
            <th className="text-12 text-500 uppercase text-center font-normal hidden md:table-cell">
              Volume
            </th>
            <th className="text-12 text-500 uppercase text-center font-normal">
              Points
            </th>
          </tr>
        </thead>
        <tbody className="font-light">
          <tr className="bg-blue bg-opacity-30 py-5.64 text-center font-normal">
            <td className="py-5.64">{rank}</td>
            <td className="uppercase">{userAddress}</td>
            <td>{numberOfTrades}</td>
            <td className="hidden lg:table-cell">{volume}</td>
            <td className="hidden md:table-cell">{points}</td>
          </tr>
          {tableData.map((user: leaderboardType, index) => {
            return (
              <tr
                key={index}
                className={`text-center font-normal ${
                  index % 2 === 0 ? "bg-600 bg-opacity-20" : ""
                }`}
              >
                <td className={`py-5.64 ${index < 3 ? "text-blue" : ""}`}>
                  {index + 1}
                </td>
                <td className="uppercase">{user.user}</td>
                <td>{user.n_trades}</td>
                <td className="hidden lg:table-cell">{user.volume}</td>
                <td className="hidden md:table-cell">{user.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
