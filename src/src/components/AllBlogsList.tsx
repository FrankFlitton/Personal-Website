import CircleFlourish from "./HomePage/CircleFlourish";
import { Blog } from "@/types";

export const AllBlogsList = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="w-full relative">
      <div className="absolute flex top-0 left-0 w-full bg-red">
        <div className="mx-auto">
          <CircleFlourish isDark={false} />
        </div>
      </div>
      <div className="relative block w-full py-5 mb-10 text-black dark:text-white">
        <h2 className="text-4xl md:text-5xl font-bold block w-full text-center">
          All Blog Posts
        </h2>
      </div>
      <div className="flex w-3/4 mx-auto mb-12 text-center prose prose-lg dark:prose-invert">
        <p>
          I share insights from my journey in software development, user
          experience, and entrepreneurship, with a focus on building scalable
          systems, tackling complex challenges, and driving innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogs &&
          blogs.map((blog) => {
            const subTitle = blog.description || "";
            const featureImage = blog.featuredImage || "";

            return (
              <a
                key={blog.title}
                className="col-span-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden group transition-colors duration-200"
                href={`/blog/${blog.slug}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 h-full">
                  <div className="w-full h-64 md:h-full col-span-1 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featureImage}
                      alt={blog.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200 ease"
                    />
                  </div>

                  <div className="col-span-2 p-6 md:py-8 md:pr-8 md:pl-0 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {blog.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base line-clamp-3">
                      {subTitle}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};
