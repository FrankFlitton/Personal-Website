import { GetStaticProps } from "next";
import { Page } from "@/components/page";
import { useEffect } from "react";
import { BlogList } from "@/components/blogList";
import { PageMeta } from "@/components/pageMeta";
import { MDLoadDir } from "@/Content/loader";
import { Blog } from "@/types";
import { sortBlogs } from "@/util/sortBlogs";

export const getStaticProps: GetStaticProps = async (context) => {
  const blogs = await MDLoadDir<Blog>("../content/blog");

  const simpleBlogs = blogs
    .map((b) => b.data)
    .sort(sortBlogs);

  return {
    props: {
      blogs: simpleBlogs,
    },
  };
};

export default function Home({ blogs }: { blogs: Blog[] }) {
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
      {blogs && (
        <div className="w-full my-16 max-w-screen-lg m-auto">
          <BlogList blogs={blogs} />
        </div>
      )}
    </Page>
  );
}
