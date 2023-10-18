import { useEffect, useState } from "react";
import Image from "next/image";
import logo1 from "../public/logo1.svg";
import { mono } from "@/fonts/fonts";

const Loader = ({ animationFinished }: { animationFinished: boolean }) => {
  const [imageOpacity, setImageOpacity] = useState(0);

  useEffect(() => {
    setImageOpacity(100);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-800 bg-noise grid place-items-center z-[3] transition-opacity duration-2000 ${
        animationFinished ? "opacity-0" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-30">
        <Image
          className={`w-[150px] h-auto transition-opacity duration-1000 ease-in-out opacity-${imageOpacity}`}
          src={logo1}
          alt="logo"
        />
        <div
          className={`${mono.variable} font-mono text-white uppercase text-24 leading-20 font-light typewriter whitespace-nowrap`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
