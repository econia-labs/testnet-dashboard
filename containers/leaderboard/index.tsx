import { useEffect, useMemo, useRef, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  FETCH_STATUS,
  getEligibleUsers,
  getLeaderboard,
  getMetaData,
} from "@/services";
import { leaderboardType, metadataType } from "@/types/leaderboard";
import LeaderboardTable from "@/components/leaderboard/leaderboard-table";
import LeaderboardStats from "@/components/leaderboard/leaderboard-stats";
import CountDown from "@/components/leaderboard/count-down";
import { trimLeadingZero } from "@/utils/address-utils";
import Maintenance from "@/components/maintenance";

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;
// const MOCK_DATA = [
//   {
//     data: [
//       {
//         "user": "0x1abfa4c5bb5f381b00719fc19e8e655cb2531904bf8f59309efd18eb081373b4",
//         "volume": 59652460,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 11,
//         "points": 59652460,
//         "competition_id": 1,
//         "rank": 1
//       },
//       {
//         "user": "0xd3e6ff5417771753fe758d8f533c330eba6a15cb480b1ede3a1d7eeaeec367d4",
//         "volume": 25045000,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 1,
//         "points": 25045000,
//         "competition_id": 1,
//         "rank": 2
//       },
//       {
//         "user": "0x7ed40fbce9c6a57c9acff481464f13cc25b0a57301e3f6bc8c4ad797a6728849",
//         "volume": 10018000,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 2,
//         "points": 10018000,
//         "competition_id": 1,
//         "rank": 3
//       },
//       {
//         "user": "0xa240dc22838c848642e615f356642975996afb4fa6fa79baa8a04641cdcf63a7",
//         "volume": 7005776,
//         "integrators_used": [
//           "0x69f76d32b0e6b08af826f5f75a7c58e6581d1c6c4ed1a935b121970f65d7436e"
//         ],
//         "n_trades": 2,
//         "points": 7005776,
//         "competition_id": 1,
//         "rank": 4
//       },
//       {
//         "user": "0x85c23841c7db89db0a1260596ddff64000c40fcd78d1d8dd1823637b218ccb44",
//         "volume": 0,
//         "integrators_used": [
//           "0xd718181a753f5b759518d9b896018dd7eb3d77d80bf90ba77fffaf678f781929"
//         ],
//         "n_trades": 0,
//         "points": 0,
//         "competition_id": 1,
//         "rank": 5
//       },
//       {
//         "user": "0x47c765c9126fc9d467c22e4be25c000701f71094d594edea0a40282a7d246fab",
//         "volume": 0,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 0,
//         "points": 0,
//         "competition_id": 1,
//         "rank": 6
//       },
//       {
//         "user": "0x5a297ca96e01bb49fb9cf49413ce8f14285837623f5881051ea2a881b209e7b8",
//         "volume": 0,
//         "integrators_used": [],
//         "n_trades": 0,
//         "points": 0,
//         "competition_id": 1,
//         "rank": 7
//       }
//     ]
//   },
//   {
//     data: [
//       {
//         "user": "0x7ed40fbce9c6a57c9acff481464f13cc25b0a57301e3f6bc8c4ad797a6728849",
//         "volume": 10018000,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 2,
//         "points": 10018000,
//         "competition_id": 1,
//         "rank": 3
//       },

//       {
//         "user": "0xd3e6ff5417771753fe758d8f533c330eba6a15cb480b1ede3a1d7eeaeec367d4",
//         "volume": 25045000,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 1,
//         "points": 25045000,
//         "competition_id": 1,
//         "rank": 2
//       },
//       {
//         "user": "0x1abfa4c5bb5f381b00719fc19e8e655cb2531904bf8f59309efd18eb081373b4",
//         "volume": 59652460,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 11,
//         "points": 59652460,
//         "competition_id": 1,
//         "rank": 1
//       },
//       {
//         "user": "0xa240dc22838c848642e615f356642975996afb4fa6fa79baa8a04641cdcf63a7",
//         "volume": 7005776,
//         "integrators_used": [
//           "0x69f76d32b0e6b08af826f5f75a7c58e6581d1c6c4ed1a935b121970f65d7436e"
//         ],
//         "n_trades": 2,
//         "points": 7005776,
//         "competition_id": 1,
//         "rank": 4
//       },
//       {
//         "user": "0x85c23841c7db89db0a1260596ddff64000c40fcd78d1d8dd1823637b218ccb44",
//         "volume": 0,
//         "integrators_used": [
//           "0xd718181a753f5b759518d9b896018dd7eb3d77d80bf90ba77fffaf678f781929"
//         ],
//         "n_trades": 0,
//         "points": 0,
//         "competition_id": 1,
//         "rank": 5
//       },
//       {
//         "user": "0x47c765c9126fc9d467c22e4be25c000701f71094d594edea0a40282a7d246fab",
//         "volume": 0,
//         "integrators_used": [
//           "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//         ],
//         "n_trades": 0,
//         "points": 0,
//         "competition_id": 1,
//         "rank": 6
//       },
//       {
//         "user": "0x5a297ca96e01bb49fb9cf49413ce8f14285837623f5881051ea2a881b209e7b8",
//         "volume": 0,
//         "integrators_used": [],
//         "n_trades": 0,
//         "points": 0,
//         "competition_id": 1,
//         "rank": 7
//       }
//     ]
//   },
//   // {
//   //   data: [
//   //     {
//   //       "user": "0xd3e6ff5417771753fe758d8f533c330eba6a15cb480b1ede3a1d7eeaeec367d4",
//   //       "volume": 25045000,
//   //       "integrators_used": [
//   //         "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//   //       ],
//   //       "n_trades": 1,
//   //       "points": 25045000,
//   //       "competition_id": 1,
//   //       "rank": 1
//   //     },
//   //     {
//   //       "user": "0xa240dc22838c848642e615f356642975996afb4fa6fa79baa8a04641cdcf63a7",
//   //       "volume": 7005776,
//   //       "integrators_used": [
//   //         "0x69f76d32b0e6b08af826f5f75a7c58e6581d1c6c4ed1a935b121970f65d7436e"
//   //       ],
//   //       "n_trades": 2,
//   //       "points": 7005776,
//   //       "competition_id": 1,
//   //       "rank": 2
//   //     },
//   //     {
//   //       "user": "0x1abfa4c5bb5f381b00719fc19e8e655cb2531904bf8f59309efd18eb081373b4",
//   //       "volume": 59652460,
//   //       "integrators_used": [
//   //         "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//   //       ],
//   //       "n_trades": 11,
//   //       "points": 59652460,
//   //       "competition_id": 1,
//   //       "rank": 3
//   //     },

//   //     {
//   //       "user": "0x7ed40fbce9c6a57c9acff481464f13cc25b0a57301e3f6bc8c4ad797a6728849",
//   //       "volume": 10018000,
//   //       "integrators_used": [
//   //         "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//   //       ],
//   //       "n_trades": 2,
//   //       "points": 10018000,
//   //       "competition_id": 1,
//   //       "rank": 4
//   //     },
//   //     {
//   //       "user": "0x85c23841c7db89db0a1260596ddff64000c40fcd78d1d8dd1823637b218ccb44",
//   //       "volume": 0,
//   //       "integrators_used": [
//   //         "0xd718181a753f5b759518d9b896018dd7eb3d77d80bf90ba77fffaf678f781929"
//   //       ],
//   //       "n_trades": 0,
//   //       "points": 0,
//   //       "competition_id": 1,
//   //       "rank": 5
//   //     },
//   //     {
//   //       "user": "0x5a297ca96e01bb49fb9cf49413ce8f14285837623f5881051ea2a881b209e7b8",
//   //       "volume": 0,
//   //       "integrators_used": [],
//   //       "n_trades": 0,
//   //       "points": 0,
//   //       "competition_id": 1,
//   //       "rank": 6
//   //     },
//   //     {
//   //       "user": "0x47c765c9126fc9d467c22e4be25c000701f71094d594edea0a40282a7d246fab",
//   //       "volume": 0,
//   //       "integrators_used": [
//   //         "0x2e51979739db25dc987bd24e1a968e45cca0e0daea7cae9121f68af93e8884c9"
//   //       ],
//   //       "n_trades": 0,
//   //       "points": 0,
//   //       "competition_id": 1,
//   //       "rank": 7
//   //     },

//   //   ]
//   // }
// ]
// let turn = 0
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
    const fetchData = async () => {

      try {
        const [
          { data: metadataResponse },
          { data: leaderboardResponse },
          { headers: eligibleUsersHeaders },
        ] = await Promise.all([
          getMetaData(),
          getLeaderboard(),
          // MOCK_DATA[turn % MOCK_DATA.length],
          getEligibleUsers(),
        ]);
        // turn = turn + 1
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
      } catch (error) {
        setFetchStatus(FETCH_STATUS.ERROR);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, Number(POLL_INTERVAL));

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const leaderboardHeight = leaderboardRef.current?.clientHeight;
    setLeaderboardHeight(leaderboardHeight || 0);
  }, []);

  if (fetchStatus === FETCH_STATUS.ERROR) {
    return (
      <div className="h-[calc(100vh-86.65px)] h-[calc(100vh-107.89px)]">
        <Maintenance />
      </div>
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
