import type { AppProps } from "next/app";
import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Footer } from "ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <SessionProvider session={pageProps.session}>
          <Component
            className="h-full relative min-h-screen lg:min-w-full"
            {...pageProps}
          />
          <Footer />
        </SessionProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
