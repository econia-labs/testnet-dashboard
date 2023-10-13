import Link from "next/link";
import React from "react";

interface UserRowProps {
  trClassName: string;
  rank: number | string;
  userAddress: string;
  numberOfTrades: number | string;
  volume: number | string;
  points: number | string;
}

const UserRow = ({
  trClassName,
  rank,
  userAddress,
  numberOfTrades,
  volume,
  points,
}: UserRowProps) => {
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
    <tr className={trClassName}>
      <td className={`py-5.64`}>{rankRenderer()}</td>
      <td className="uppercase">
        {userAddress.length > 3 ? (
          <Link
            className="hover:text-blue"
            href={`https://explorer.aptoslabs.com/account/${userAddress}?network=testnet`}
            target="_blank"
          >
            {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
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
