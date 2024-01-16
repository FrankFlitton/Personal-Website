import { GetStaticPaths, GetStaticProps } from "next";
import { MDLoadDir } from "@/Content/loader";
import { Blog, FeatureProjectData, MDXDocument } from "@/types";
import { MDRenderer } from "@/Content/renderer";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ProjectMeta } from "@/components/projectMeta";
import { Page } from "@/components/page";
import { mediumRSSFeed } from "@/Content/medium";
import parse from "html-react-parser";
import { useMemo } from "react";
import kebabCase from "lodash/kebabCase";
import { MediumList } from "@/components/mediumList";

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

  if (!blog) return "not found";

  return (
    <Page>
      <div className="w-full max-w-screen-lg m-auto">
        <div className="text-center pt-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black">{blog?.title}</h2>
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
