import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingTable = () => {
  const rows = Array.from(Array(20).keys());
  return (
    <tbody className="font-light">
      {rows.map((_, index) => {
        return (
          <tr key={index}>
            <td className="pb-2 text-center">
              <Skeleton width={"75%"} height={20} />
            </td>
            <td className="pb-2 text-center">
              <Skeleton width={"75%"} height={20} />
            </td>
            <td className="pb-2 text-center">
              <Skeleton width={"75%"} height={20} />
            </td>
            <td className="hidden lg:table-cell pb-2 text-center">
              <Skeleton width={"75%"} height={20} />
            </td>
            <td className="hidden md:table-cell pb-2 text-center">
              <Skeleton width={"75%"} height={20} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default LoadingTable;
