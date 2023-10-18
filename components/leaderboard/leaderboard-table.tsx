import { getUserData } from "@/services";
import { leaderboardType } from "@/types/leaderboard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import UserRow from "./user-row";
import LoadingTable from "./loading-table";
import { trimLeadingZero } from "@/utils/address-utils";

interface UserDataType {
  rank: number | string;
  user: string;
  volume: number | string;
  n_trades: number | string;
  points: number | string;
  is_eligible?: boolean;
}

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;

const LeaderboardTable = ({
  fetching,
  tableData,
  loggedInUser,
  leaderboardHeight,
}: {
  fetching: boolean;
  tableData: leaderboardType[];
  loggedInUser: leaderboardType | undefined;
  leaderboardHeight: number;
}) => {
  const { account } = useWallet();

  const defaultUserData: UserDataType = {
    rank: "-",
    user: trimLeadingZero(account?.address) || "YOU",
    volume: "-",
    n_trades: "-",
    points: "-",
    is_eligible: true,
  };

  const [userData, setUserData] = useState<UserDataType>(defaultUserData);

  useEffect(() => {
    if (loggedInUser) {
      setUserData(loggedInUser);
    } else if (!loggedInUser && account?.address) {
      const fetchUserData = async () => {
        const { data: userData } = await getUserData(account.address);
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
    rank: loggedInUserRank,
    user: userAddress,
    volume,
    n_trades: numberOfTrades,
    points,
    is_eligible,
  } = userData;

  const loggedInUserInTop5 = Number(loggedInUserRank) <= 5;

  return (
    <div
      className={`w-317 sm:w-437 md:w-605 lg:w-757 no-scrollbar max-h-[${leaderboardHeight}px]`}
    >
      <table className="w-full table-auto sm:table-fixed">
        <thead className="bg-800 bg-noise sticky top-0 z-[2]">
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
            {!loggedInUserInTop5 && (
              <UserRow
                trClassName="bg-blue bg-opacity-30 text-center font-normal"
                rank={is_eligible === false ? 0 : loggedInUserRank}
                userAddress={userAddress}
                numberOfTrades={is_eligible === false ? 0 : numberOfTrades}
                volume={is_eligible === false ? 0 : volume}
                points={is_eligible === false ? 0 : points}
              />
            )}
            {tableData.map((user: leaderboardType, index) => {
              const {
                rank,
                user: userAddress,
                volume,
                points,
                n_trades: numberOfTrades,
              } = user;
              const highlightRow = userAddress === trimLeadingZero(account?.address);
              return (
                <UserRow
                  key={index}
                  trClassName={`text-center font-normal even:bg-600 even:bg-opacity-20 ${
                    highlightRow && "bg-blue bg-opacity-30"
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
