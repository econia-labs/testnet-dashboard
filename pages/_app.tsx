import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import '@/styles/loader.css'
import Layout from '@/components/layout'
import Web3Provider from '@/connect-wallet/provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  )
}