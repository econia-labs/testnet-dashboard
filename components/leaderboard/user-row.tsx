import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserRowProps {
  trClassName: string;
  rank: number | string;
  userAddress: string;
  numberOfTrades: number | string;
  volume: number | string;
  points: number | string;
}

const POLL_INTERVAL = process.env.NEXT_PUBLIC_POLL_INTERVAL;

const UserRow = ({
  trClassName,
  rank,
  userAddress,
  numberOfTrades,
  volume,
  points,
}: UserRowProps) => {
  // const [preUserAddress, setPreUserAddress] = useState(userAddress);
  const { account } = useWallet();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPreUserAddress(userAddress);
  //   }, Number(POLL_INTERVAL) / 2); // make sure that update before next userAddress update
  // }, [userAddress]);

  const rankRenderer = () => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  return (
    <tr className={`${trClassName}`}>
      <td className="py-5.64">{rankRenderer()}</td>
      <td className="uppercase">
        {userAddress.length > 3 ? (
          <Link
            className="hover:text-blue"
            href={`https://explorer.aptoslabs.com/account/${userAddress}?network=testnet`}
            target="_blank"
          >
            {account?.address &&
              account.address.toLowerCase() === userAddress.toLowerCase() ? (
              <span>YOU</span>
            ) : (
              <>
                <span className="hidden xsm:block">
                  {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                </span>
                <span className="block xsm:hidden">
                  {userAddress.slice(0, 3)}..
                </span>
              </>
            )}
          </Link>
        ) : (
          userAddress
        )}
      </td>
      <td className="hidden lg:table-cell">
        {numberOfTrades.toLocaleString()}
      </td>
      <td className="hidden md:table-cell">
        {typeof volume === "string" ? volume : (volume / 10 ** 6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td>{points.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
    </tr>
  );
};

export default UserRow;
