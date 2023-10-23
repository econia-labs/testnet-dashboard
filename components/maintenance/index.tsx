import { MAINTENANCE_ERROR } from "@/constants/error-messages";
import React from "react";

const Maintenance = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-[512px] max-w-full text-center">
        <div className="heart mb-[60px]"></div>
        <h1 className="font-jost font-bold text-32 leading-52 mb-[11.1px]">
          {MAINTENANCE_ERROR.title}
        </h1>
        <p className="text-14 font-mono font-light leading-30">
          {MAINTENANCE_ERROR.message}
        </p>
      </div>
    </div>
  );
};

export default Maintenance;