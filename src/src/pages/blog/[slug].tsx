import { GetStaticPaths, GetStaticProps } from "next";
import { Blog } from "@/types";
import Link from "next/link";
import { Page } from "@/components/page";
import { mediumRSSFeed } from "@/Content/medium";
import parse from "html-react-parser";
import { useEffect, useMemo } from "react";
import kebabCase from "lodash/kebabCase";
import { MediumList } from "@/components/mediumList";
import { PageMeta } from "@/components/pageMeta";
import { fixMediumGistIframes } from "@/util/fixMediumGistIframes";

export const getStaticPaths = (async () => {
  const mediumFeed = await mediumRSSFeed;

  const paths = mediumFeed.items.map((item) => ({
    params: {
      slug: kebabCase(item.title),
    },
  }));

  return {
    paths,
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
  const mediumFeed = await mediumRSSFeed;
  const slug = `${context?.params?.slug ?? ""}`;
  const blog = mediumFeed.items.find((item) => kebabCase(item.title) === slug);

  if (blog) {
    const html = blog ? blog["content:encoded"] : "";
    const fixedIframes = await fixMediumGistIframes(html);
    blog["content:encoded"] = fixedIframes;
  }

  return {
    props: {
      blog: blog ?? null,
      mediumFeed: mediumFeed ?? null,
    },
  };
};

export default function Home({
  blog,
  mediumFeed,
}: {
  blog: Blog | null;
  mediumFeed: any | null;
}) {
  const html = blog ? blog["content:encoded"] : "";

  const Content = useMemo(() => {
    return () => parse(html);
  }, [html]);

  const pubDate = new Date(blog?.isoDate ?? "").toDateString();

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

  if (!blog) return "not found";

  const title = blog?.title;
  const description = blog?.["content:encodedSnippet"]?.split("\n")[0];
  const featureImage = blog?.["content:encoded"]
    ?.match(/src="(.*?)"/g)
    ?.at(0)
    ?.replace(/(src=)?"/g, "");

  return (
    <Page>
      <PageMeta
        title={title}
        description={description}
        image={featureImage}
        color="#000000"
      />
      <div className="w-full max-w-screen-lg m-auto">
        <div className="text-center pt-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black">{title}</h2>
        </div>
        <div className="py-16 grid grid-cols-2 prose prose-slate m-auto">
          <div>
            <h3 className="text-md font-bold my-0">Published On</h3>
            <p className="text-gray-500 mb-2">{pubDate}</p>
          </div>
          <div>
            <h3 className="text-md font-bold my-0">Original Post</h3>
            <p className="mb-2">
              <Link
                target="_blank"
                href={blog.link}
                className="text-gray-500 hover:underline-offset-4 no-underline hover:underline"
              >
                Medium Link
              </Link>
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-md font-bold my-0">Topics</h3>
            <ul className="mb-2 mt-2 w-full list-none p-0">
              {blog.categories &&
                blog.categories.map((item) => (
                  <li
                    key={item}
                    className="text-gray-500 my-0 w-auto inline-block rounded-full bg-neutral-100 hover:bg-neutral-200 px-2 mr-1 mb-1 capitalize"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <article className="prose prose-slate m-auto mb-16">
          <div className="h-1 w-[45%] mb-16 bg-black"></div>
          <Content />
        </article>
      </div>
      {mediumFeed && (
        <div className="w-full mb-16 max-w-screen-lg m-auto">
          <MediumList mediumFeed={mediumFeed} />
        </div>
      )}
    </Page>
  );
}
