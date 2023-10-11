import { useEffect, useMemo, useState } from "react";
import CountDown from "@/components/count-down";
import LeaderboardStats from "@/components/leaderboard-stats";
import LeaderboardTable from "@/components/leaderboard-table";
import { getLeaderboard, getMetaData } from "@/services";
import { leaderboardType, metadataType } from "@/types/leaderboard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;

const LeaderBoardContainer = () => {
  const { account } = useWallet();
  const [tableData, setTableData] = useState<leaderboardType[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<leaderboardType>();
  const [metadata, setMetadata] = useState<metadataType>();
  const { prize } = metadata || {};
  const endTime = metadata?.end;

  const totalVolume = useMemo(() => {
    return tableData.reduce((acc, curr) => {
      return acc + curr.volume;
    }, 0);
  }, [tableData]);

  useEffect(() => {
    const fetchMetadata = async () => {
      const { data } = await getMetaData();
      if (data.length > 0) setMetadata(data[0]);
    };

    fetchMetadata();

    const intervalId = setInterval(fetchMetadata, Number(POLL_INTERVAL));

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data: leaderboardEntries } = await getLeaderboard();
      setTableData(leaderboardEntries);
      // If user is logged in, get user's data from the leaderboard and get the index of the user
      if (account?.address) {
        let loggedInUser = null;
        // Iterate through leaderboardEntries to find user and rank
        for (let i = 0; i < leaderboardEntries.length; i++) {
          if (leaderboardEntries[i].user === account.address) {
            loggedInUser = { ...leaderboardEntries[i], rank: i + 1 };
            break;
          }
        }

        if (loggedInUser) {
          setLoggedInUser(loggedInUser);
        }
      }
    };
    fetchLeaderboard();

    const intervalId = setInterval(fetchLeaderboard, Number(POLL_INTERVAL));

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center w-317 sm:w-437 md:w-605 lg:w-757 m-auto max-h-[calc(100vh-86.65px)] lg:max-h-[calc(100vh-107.89px)] ">
      <div className="mt-58">{endTime && <CountDown endTime={endTime} />}</div>
      <div className="mt-44 hidden md:flex">
        <LeaderboardStats
          totalVolume={totalVolume}
          traders={tableData.length}
          prize={prize}
        />
      </div>
      <div className="mt-42 md:mt-52 lg:mt-36 grow overflow-y-scroll no-scrollbar">
        <LeaderboardTable tableData={tableData} loggedInUser={loggedInUser} />
      </div>
      <div className="fixed bottom-0 w-full h-290 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
    </div>
  );
};

export default LeaderBoardContainer;
