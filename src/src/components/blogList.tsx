import CircleFlourish from "./HomePage/CircleFlourish";
import { Blog } from "@/types";

export const BlogList = ({ blogs }: { blogs: Blog[]; hideTitle?: boolean }) => {
  return (
    <div className="w-full relative">
      <div className="absolute flex top-0 left-0 w-full bg-red">
        <div className="mx-auto">
          <CircleFlourish isDark={false} />
        </div>
      </div>
      <div className="relative block w-full py-5 mb-10 text-black dark:text-white">
        <h2 className="text-4xl font-bold block w-full text-center">
          Blog Posts
        </h2>
      </div>
      <div className="flex w-3/4 mx-auto mb-10 text-center prose dark:prose-invert">
        <p>
          I share insights from my journey in software development, user
          experience, and entrepreneurship, with a focus on building scalable
          systems, tackling complex challenges, and driving innovation.
        </p>
      </div>
      <div className="flex text-center w-full mb-10">
        <a
          className="text-blue-500 hover:text-blue-700 hover:bg-blue-300 dark:hover:bg-blue-900/50 mx-auto"
          role="button"
          href="https://frankflitton.medium.com/"
          target="_blank"
        >
          Follow me on Medium
        </a>
      </div>

      <div className="grid grid-cols-1 auto-rows-[175px] md:auto-rows-[200px] gap-4">
        {blogs &&
          blogs.map((blog) => {
            // const pubDate = new Date(item.isoDate);
            const subTitle = blog.description || "";
            const featureImage = blog.featuredImage || "";

            return (
              <a
                key={blog.title}
                className="col-span-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 row-span-2 md:row-span-1"
                href={`/blog/${blog.slug}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 h-full">
                  <div className="w-full h-full col-span-1 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featureImage}
                      width={300}
                      height={300}
                      alt=""
                      className="object-cover w-full h-full min-h-[175px] hover:scale-105 transition-all duration-200 ease"
                    />
                  </div>

                  <div className="prose prose-slate dark:prose-invert col-span-2 py-4 pr-4 pl-4 md:pl-0">
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="">{subTitle}</p>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};
