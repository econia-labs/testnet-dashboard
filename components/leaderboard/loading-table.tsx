import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingTable = () => {
  const rows = Array.from(Array(20).keys());
  return (
    <tbody className="font-light">
      {rows.map((_, index) => {
        return (
          <tr key={index}>
            <td>
              <Skeleton height={35.25} />
            </td>
            <td>
              <Skeleton height={35.25} />
            </td>
            <td>
              <Skeleton height={35.25} />
            </td>
            <td className="hidden lg:table-cell">
              <Skeleton height={35.25} />
            </td>
            <td className="hidden md:table-cell">
              <Skeleton height={35.25} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default LoadingTable;
