import { GetStaticProps } from "next";
import { Page } from "@/components/page";
import { mediumRSSFeed } from "@/Content/medium";
import { useEffect, useMemo } from "react";
import { MediumList } from "@/components/mediumList";
import { PageMeta } from "@/components/pageMeta";

export const getStaticProps: GetStaticProps = async (context) => {
  const mediumFeed = await mediumRSSFeed;

  return {
    props: {
      mediumFeed: mediumFeed ?? null,
    },
  };
};

export default function Home({ mediumFeed }: { mediumFeed: any | null }) {
  const handleIframeResize = (e: MessageEvent<any>) => {
    if (globalThis.window) {
      if (e.data === "GIST_IFRAME_UPDATED") {
        const gistFrames =
          globalThis.window.document.getElementsByClassName("gist-iframe");
        for (let i = 0; i < gistFrames.length; i++) {
          const gistFrame = gistFrames[i] as HTMLIFrameElement;
          // @ts-ignore
          const gistWindow: Window = gistFrame.contentWindow;
          if (!gistWindow) continue;

          const height = gistWindow.document.documentElement.scrollHeight;
          gistFrame.style.height = `${height}px`;
        }
      }
    }
  };

  useEffect(() => {
    if (globalThis.window) {
      window.addEventListener("message", handleIframeResize);
      return () => {
        window.removeEventListener("message", handleIframeResize);
      };
    }
  }, []);

  return (
    <Page>
      <PageMeta title={"Frank's Blog"} color="#000000" />
      {mediumFeed && (
        <div className="w-full my-16 max-w-screen-lg m-auto">
          <MediumList mediumFeed={mediumFeed} />
        </div>
      )}
    </Page>
  );
}
