import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/loader.css";
import "@/styles/fetch-loader.css";
import "@/styles/heart.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import Layout from "@/components/layout";
import Web3Provider from "@/connect-wallet/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3Provider>
    </SkeletonTheme>
  );
}
