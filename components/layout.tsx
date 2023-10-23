import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { mono, jost } from "@/fonts/fonts";
import Navbar from "./navbar";
import Loader from "./loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { account, isLoading } = useWallet();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [loaderShow, setLoaderShow] = useState(true);

  useEffect(() => {
      const animationTimer = setTimeout(() => {
        setAnimationFinished(true);
      }, 3000);
      const loaderTimer = setTimeout(() => {
        setLoaderShow(false);
      }, 5000);
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(loaderTimer);
      };
  }, []);

  return (
    <div>
      <style jsx global>{`
        :root {
          --font-jost: ${jost.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <div
        className={`${mono.variable} font-mono text-white pt-35 pl-46 pr-31.79 sm:pr-33.71 md:pr-42 lg:px-105 transition-opacity duration-1000 ${isLoading && "opacity-0"}`}
      >
        {!account && loaderShow && (<Loader animationFinished={animationFinished} />)}
        {
          <>
            <Navbar />
            {children}
          </>
        }
      </div>
    </div>
  );
};

export default Layout;
