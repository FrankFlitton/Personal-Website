import { GetStaticProps } from "next";
import { Page } from "@/components/page";
import { useEffect } from "react";
import { BlogList } from "@/components/blogList";
import { PageMeta } from "@/components/pageMeta";
import { MDLoadDir } from "@/Content/loader";
import { Blog } from "@/types";
import { sortBlogs } from "@/util/sortBlogs";
import CircleFlourish from "@/components/HomePage/CircleFlourish";
import useTheme from "@/hooks/useTheme";

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
  const { isDark } = useTheme();
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
      <div className="max-w-2xl mx-auto px-6 py-16 prose dark:prose-invert">
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-3">
          Writing
        </p>
        <h1 className="text-3xl font-medium leading-snug mb-6">
          Notes on engineering, design, and building products.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10">
          I write about the things I run into while building, patterns that work,
          tradeoffs worth making explicit, and the occasional deep-dive into a
          specific tool or problem space.
        </p>
        {blogs && <BlogList blogs={blogs} />}
        <div className="flex justify-center mt-20">
          <CircleFlourish isDark={isDark} />
        </div>
      </div>
    </Page>
  );
}
