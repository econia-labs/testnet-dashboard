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
  const [preUserAddress, setPreUserAddress] = useState(userAddress)

  useEffect(() => {
    setTimeout(() => {
      setPreUserAddress(userAddress)
    }, Number(POLL_INTERVAL) / 2) // make sure that update before next userAddress update 
  }, [userAddress])

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
    <tr className={`${trClassName} ${preUserAddress !== userAddress && 'animate-flash'}`}>
      <td className="py-5.64">{rankRenderer()}</td>
      <td className="uppercase">
        {userAddress.length > 3 ? (
          <Link
            className="hover:text-blue"
            href={`https://explorer.aptoslabs.com/account/${userAddress}?network=testnet`}
            target="_blank"
          >
            <span className="hidden xsm:block">
              {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
            </span>
            <span className="block xsm:hidden">
              {userAddress.slice(0, 3)}..
            </span>
          </Link>
        ) : (
          userAddress
        )}
      </td>
      <td>{numberOfTrades.toLocaleString()}</td>
      <td className="hidden lg:table-cell">
        {typeof volume === "string"
          ? volume
          : (volume / 10 ** 6).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
      </td>
      <td className="hidden md:table-cell">{points.toLocaleString()}</td>
    </tr>
  );
};

export default UserRow;
