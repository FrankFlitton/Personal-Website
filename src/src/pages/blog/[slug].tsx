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
import BlogHeroSection from "@/components/blogHeroSection";

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
      <BlogHeroSection blog={blog.data} />
      <div className="w-full max-w-screen-lg m-auto">
        <article className="prose prose-lg prose-slate dark:prose-invert m-auto mb-16">
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
