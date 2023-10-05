import React from "react";
import { jost } from "@/fonts/fonts";

interface ConnectionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  responsive?: boolean;
}

const ConnectionButton = ({
  children,
  onClick,
  responsive,
}: ConnectionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        responsive ? "hidden lg:block" : ""
      } bg-white hover:bg-300 text-700 hover:text-800 pt-[10px] px-4 pb-2 w-fit whitespace-nowrap leading-18 font-bold uppercase ${
        jost.variable
      } font-jost transform transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:translate-z-[0.01px]`}
    >
      {children}
    </button>
  );
};

export default ConnectionButton;
