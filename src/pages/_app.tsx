import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";

import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

import axios from "axios";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  )
}