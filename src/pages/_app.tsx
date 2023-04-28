import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Nav } from "src/components/Nav/Nav";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Utils</title>
        <meta name="description" content="Concept" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
