import { useEffect, useMemo, useRef, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FETCH_STATUS, getLeaderboard, getMetaData } from "@/services";
import { leaderboardType, metadataType } from "@/types/leaderboard";
import LeaderboardTable from "@/components/leaderboard/leaderboard-table";
import LeaderboardStats from "@/components/leaderboard/leaderboard-stats";
import CountDown from "@/components/leaderboard/count-down";
import { trimLeadingZero } from "@/utils/address-utils";
import { ERROR_LIST } from "@/constants/error-messages";
import ErrorScreen from "@/components/error-screen";

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;
const MAX_RETRY = 1;

const LeaderBoardContainer = () => {
  const { account } = useWallet();
  const [tableData, setTableData] = useState<leaderboardType[]>([]);
  const [totalTraders, setTotalTraders] = useState(0);
  const [metadata, setMetadata] = useState<metadataType>();
  const [totalTradingVolume, setTotalTradingVolume] = useState(0);
  const [leaderboardHeight, setLeaderboardHeight] = useState(0);
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.LOADING);
  const { prize } = metadata || {};
  const endTime = metadata?.end;

  const leaderboardRef = useRef<HTMLDivElement>(null);

  const loggedInUserData: leaderboardType | undefined = useMemo(() => {
    if (account?.address) {
      let loggedInUser;
      if (tableData.length > 0) {
        loggedInUser = tableData.find(
          (user) =>
            user.user.toLowerCase() ===
            trimLeadingZero(account?.address)?.toLowerCase()
        );
      }
      return loggedInUser;
    }
  }, [tableData, account]);

  useEffect(() => {
    const fetchData = async (retry: number) => {
      if (process.env.NEXT_PUBLIC_BACKEND_EXPECTED_ONLINE === "false") {
        setFetchStatus(FETCH_STATUS.ERROR);
        return;
      }

      try {
        const [
          { data: metadataResponse },
          { data: leaderboardResponse, headers: eligibleUsersHeaders },
        ] = await Promise.all([getMetaData(), getLeaderboard()]);
        setFetchStatus(FETCH_STATUS.SUCCESS);

        if (metadataResponse.length > 0) {
          const metadata = metadataResponse[0];
          setMetadata(metadata);
          const totalVolume = metadata.volume / 10 ** 6;
          setTotalTradingVolume(totalVolume);
        }

        setTableData(leaderboardResponse);
        const eligibleUsers =
          eligibleUsersHeaders["content-range"].split("/")[1];
        setTotalTraders(eligibleUsers);
      } catch (error: any) {
        console.log("Error: ", error);
        if (error.code === "ERR_NETWORK") {
          setFetchStatus(FETCH_STATUS.RATE_LIMIT);
        } else if (retry >= MAX_RETRY) {
          setFetchStatus(FETCH_STATUS.ERROR);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          fetchData(retry + 1);
        }
      }
    };

    const pollData = () => {
      fetchData(0);
    };

    fetchData(0); // Initial fetch

    const intervalId = setInterval(pollData, Number(POLL_INTERVAL));

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const leaderboardHeight = leaderboardRef.current?.clientHeight;
    setLeaderboardHeight(leaderboardHeight || 0);
  }, []);

  const isError = fetchStatus === FETCH_STATUS.ERROR || fetchStatus === FETCH_STATUS.RATE_LIMIT;

  if (isError) {
    const errorType = fetchStatus === FETCH_STATUS.ERROR ? 'MAINTENANCE_ERROR' : 'RATE_LIMITED_ERROR';

    return (
      <ErrorScreen errorTitle={ERROR_LIST[errorType].title} errorMessage={ERROR_LIST[errorType].message} />
    );
  }

  return (
    <div className="leaderboard-page-container flex flex-col items-center w-317 sm:w-437 md:w-605 lg:w-757 m-auto max-h-[calc(100vh-86.65px)] lg:max-h-[calc(100vh-107.89px)] ">
      <div className="mt-58">
        <CountDown endTime={endTime} />
      </div>
      <div className="mt-44 hidden md:flex">
        <LeaderboardStats
          fetching={fetchStatus === FETCH_STATUS.LOADING}
          totalVolume={totalTradingVolume}
          traders={totalTraders}
          prize={prize}
        />
      </div>
      <div
        ref={leaderboardRef}
        className="mt-42 md:mt-52 lg:mt-36 grow overflow-y-scroll no-scrollbar"
      >
        <LeaderboardTable
          fetching={fetchStatus === FETCH_STATUS.LOADING}
          tableData={tableData}
          loggedInUser={loggedInUserData}
          leaderboardHeight={leaderboardHeight}
        />
      </div>
      <div className="fixed bottom-0 w-full h-290 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
    </div>
  );
};

export default LeaderBoardContainer;
