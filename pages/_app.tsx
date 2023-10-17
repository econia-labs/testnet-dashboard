import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/loader.css";
import "@/styles/fetch-loader.css";
import "@/styles/heart.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import Layout from "@/components/layout";
import Web3Provider from "@/connect-wallet/provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Web3Provider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Layout>
      </Web3Provider>
    </SkeletonTheme>
  );
}
