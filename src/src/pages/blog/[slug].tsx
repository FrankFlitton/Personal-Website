import { GetStaticPaths, GetStaticProps } from "next";
import { Blog, MDXDocument } from "@/types";
import Link from "next/link";
import { Page } from "@/components/page";
import { useEffect } from "react";
import { BlogList } from "@/components/blogList";
import { PageMeta } from "@/components/pageMeta";
import LargeDotLine from "@/components/HomePage/LargeDotline";
import { MDLoadDir } from "@/Content/loader";
import { MDRenderer } from "@/Content/renderer";
import Image from "next/image";
import { sortBlogs } from "@/util/sortBlogs";

export const getStaticPaths = (async () => {
  const blogs = await MDLoadDir<Blog>("../content/blog");
  const paths = blogs.map((blog) => ({
    params: {
      slug: blog?.data?.slug,
    },
  }));

  return {
    paths,
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
  const blogs = await MDLoadDir<Blog>("../content/blog");
  const slug = context?.params?.slug ?? "";
  const currentBlog = blogs.find((blog) => blog?.data?.slug === slug);

  const simpleBlogs = blogs.map((b) => b.data).sort(sortBlogs);

  return {
    props: {
      blog: currentBlog,
      blogs: simpleBlogs,
    },
  };
};

export default function Home({
  blog,
  blogs,
}: {
  blog: MDXDocument<Blog>;
  blogs: Blog[];
}) {
  const pubDate = blog.data.date ? new Date(blog.data.date).toDateString() : "";

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

  const title = blog.data.title || "";
  const description = blog.data.description || "";
  const featureImage = blog.data.featuredImage || "";

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
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white pb-16">
            {title}
          </h2>
          <p>
            <Image
              src={blog.data.featuredImage}
              width={1920}
              height={1080}
              alt="Featured image for the article"
            />
          </p>
        </div>
        <div className="py-16 grid grid-cols-2 prose prose-slate dark:prose-invert m-auto">
          <div>
            <h3 className="text-md font-bold my-0">Published On</h3>
            <p className="text-gray-500 dark:text-gray-200 mb-2">{pubDate}</p>
          </div>
          {blog.data.link && (
            <div>
              <h3 className="text-md font-bold my-0">Original Post</h3>
              <p className="mb-2">
                <Link
                  target="_blank"
                  href={blog.data.link}
                  className="text-gray-500 dark:text-gray-200 hover:underline-offset-4 no-underline hover:underline"
                >
                  Medium Link
                </Link>
              </p>
            </div>
          )}
          <div className="col-span-2">
            <h3 className="text-md font-bold my-0">Topics</h3>
            <ul className="mb-2 mt-2 w-full list-none p-0">
              {blog.data.categories &&
                blog.data.categories.map((item) => (
                  <li
                    key={item}
                    className="text-gray-500 dark:text-gray-200 my-0 w-auto inline-block rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 px-2 mr-1 mb-1 capitalize"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <article className="prose prose-slate dark:prose-invert m-auto mb-16">
          <LargeDotLine
            className="relative h-4 w-[45%] mb-16 mx-auto"
            color="black"
            colorDark="white"
          />
          <MDRenderer source={blog.content} />
          <LargeDotLine
            className="relative h-4 w-[45%] my-16 mx-auto"
            color="black"
            colorDark="white"
          />
        </article>
      </div>
      {blogs && (
        <div className="w-full mb-16 max-w-screen-lg m-auto">
          <BlogList blogs={blogs} />
        </div>
      )}
    </Page>
  );
}
