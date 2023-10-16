import { getExclusionList, getUserData } from "@/services";
import { leaderboardType } from "@/types/leaderboard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import UserRow from "./user-row";
import LoadingTable from "./loading-table";

interface UserDataType {
  rank: number | string;
  user: string;
  volume: number | string;
  n_trades: number | string;
  points: number | string;
}

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;

const LeaderboardTable = ({
  fetching,
  tableData,
  loggedInUser,
}: {
  fetching: boolean;
  tableData: leaderboardType[];
  loggedInUser: leaderboardType | undefined;
}) => {
  const { account } = useWallet();

  const defaultUserData: UserDataType = {
    rank: "-",
    user: account?.address || "YOU",
    volume: "-",
    n_trades: "-",
    points: "-",
  };

  const [userData, setUserData] = useState<UserDataType>(defaultUserData);

  useEffect(() => {
    if (loggedInUser) {
      setUserData(loggedInUser);
    } else if (!loggedInUser && account?.address) {
      const fetchUserData = async () => {
        const { data: userData } = await getUserData(account.address);
        // const { data: exclusionList } = await getExclusionList(account.address);
        if (userData.length > 0) {
          setUserData(userData[0]);
        } else {
          setUserData(defaultUserData);
        }
      };
      fetchUserData();

      const intervalId = setInterval(fetchUserData, Number(POLL_INTERVAL));

      return () => clearInterval(intervalId);
    } else {
      setUserData(defaultUserData);
    }
  }, [loggedInUser, account?.address]);

  const {
    rank,
    user: userAddress,
    volume,
    n_trades: numberOfTrades,
    points,
  } = userData;

  return (
    <div className="flex items-center justify-center overflow-hidden w-317 sm:w-437 md:w-605 lg:w-757">
      <table className="w-full table-auto sm:table-fixed">
        <thead>
          <tr className="uppercase h-52">
            <th className="text-12 text-500 uppercase text-center font-normal">
              Rank
            </th>
            <th className="text-12 text-500 uppercase text-center font-normal w-2 xsm:w-auto">
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
        {fetching ? (
          <LoadingTable />
        ) : (
          <tbody className="font-light">
            <UserRow
              trClassName="bg-blue bg-opacity-30 py-5.64 text-center font-normal"
              rank={rank}
              userAddress={userAddress}
              numberOfTrades={numberOfTrades}
              volume={volume}
              points={points}
            />
            {tableData.map((user: leaderboardType, index) => {
              const {
                rank,
                user: userAddress,
                volume,
                points,
                n_trades: numberOfTrades,
              } = user;
              return (
                <UserRow
                  key={index}
                  trClassName={`text-center font-normal ${
                    index % 2 === 0 && "bg-600 bg-opacity-20"
                  }`}
                  rank={rank}
                  userAddress={userAddress}
                  numberOfTrades={numberOfTrades}
                  volume={volume}
                  points={points}
                />
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default LeaderboardTable;
