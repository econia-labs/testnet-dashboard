import Link from "next/link";
import React from "react";

interface UserRowProps {
  trClassName: string;
  index?: number;
  rank: number | string;
  userAddress: string;
  numberOfTrades: number | string;
  volume: number | string;
  points: number | string;
}

const UserRow = ({
  trClassName,
  index,
  rank,
  userAddress,
  numberOfTrades,
  volume,
  points,
}: UserRowProps) => {
  return (
    <tr className={trClassName}>
      <td className={`py-5.64 ${index != null && index < 3 && "text-blue"}`}>
        {rank}
      </td>
      <td className="uppercase">
        {userAddress.length > 3 ? (
          <Link
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
      <td className="hidden lg:table-cell">{volume.toLocaleString()}</td>
      <td className="hidden md:table-cell">{points.toLocaleString()}</td>
    </tr>
  );
};

export default UserRow;