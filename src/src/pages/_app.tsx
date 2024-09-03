import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { motion, AnimatePresence } from "framer-motion";

import "@/styles/globals.css";
import "@/styles/progressRing.css";
import "@/styles/preloader.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === "/gist") {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          className="h-full w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -20, transition: { delay: -0.25 } }}
          transition={{
            duration: 0.5,
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
