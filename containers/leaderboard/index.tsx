import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getEligibleUsers, getLeaderboard, getMetaData } from "@/services";
import { leaderboardType, metadataType } from "@/types/leaderboard";
import LeaderboardTable from "@/components/leaderboard/leaderboard-table";
import LeaderboardStats from "@/components/leaderboard/leaderboard-stats";
import CountDown from "@/components/leaderboard/count-down";

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;

const LeaderBoardContainer = () => {
  const { account } = useWallet();
  const [tableData, setTableData] = useState<leaderboardType[]>([]);
  const [totalTraders, setTotalTraders] = useState(0);
  const [metadata, setMetadata] = useState<metadataType>();
  const { prize } = metadata || {};
  const endTime = metadata?.end;

  const totalVolume = useMemo(() => {
    return tableData.reduce((acc, curr) => {
      return acc + curr.volume;
    }, 0);
  }, [tableData]);

  const loggedInUserData: leaderboardType | undefined = useMemo(() => {
    if (account?.address) {
      let loggedInUser;
      // Iterate through tableData to find user and rank
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].user === account.address) {
          loggedInUser = { ...tableData[i], rank: i + 1 };
          break;
        }
      }
      return loggedInUser;
    }
  }, [tableData, account]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        { data: metadataResponse },
        { data: leaderboardResponse },
        { data: eligibleUsersResponse },
      ] = await Promise.all([
        getMetaData(),
        getLeaderboard(),
        getEligibleUsers(),
      ]);

      if (metadataResponse.length > 0) setMetadata(metadataResponse[0]);
      setTableData(leaderboardResponse);
      setTotalTraders(eligibleUsersResponse.length);
    };

    fetchData();

    const intervalId = setInterval(fetchData, Number(POLL_INTERVAL));

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center w-317 sm:w-437 md:w-605 lg:w-757 m-auto max-h-[calc(100vh-86.65px)] lg:max-h-[calc(100vh-107.89px)] ">
      <div className="mt-58">{endTime && <CountDown endTime={endTime} />}</div>
      <div className="mt-44 hidden md:flex">
        <LeaderboardStats
          totalVolume={totalVolume}
          traders={totalTraders}
          prize={prize}
        />
      </div>
      <div className="mt-42 md:mt-52 lg:mt-36 grow overflow-y-scroll no-scrollbar">
        <LeaderboardTable
          tableData={tableData}
          loggedInUser={loggedInUserData}
        />
      </div>
      <div className="fixed bottom-0 w-full h-290 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
    </div>
  );
};

export default LeaderBoardContainer;
