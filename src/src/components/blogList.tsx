import CircleFlourish from "./HomePage/CircleFlourish";
import { FeaturedBlogPost } from "./FeaturedBlogPost";
import { Blog } from "@/types";

export const BlogList = ({ blogs }: { blogs: Blog[]; hideTitle?: boolean }) => {
  const featuredBlog = blogs[0];
  const recentBlogs = blogs.slice(1, 4);

  return (
    <div className="w-full relative">
      <div className="absolute flex top-0 left-0 w-full bg-red">
        <div className="mx-auto">
          <CircleFlourish isDark={false} />
        </div>
      </div>
      <div className="relative block w-full py-5 mb-10 text-black dark:text-white">
        <h2 className="text-4xl font-bold block w-full text-center">
          Latest from the Blog
        </h2>
      </div>
      <div className="flex w-3/4 mx-auto mb-12 text-center prose prose-lg dark:prose-invert">
        <p>
          I share insights from my journey in software development, user
          experience, and entrepreneurship, with a focus on building scalable
          systems, tackling complex challenges, and driving innovation.
        </p>
      </div>

      {/* Featured Blog Post */}
      {featuredBlog && <FeaturedBlogPost blog={featuredBlog} />}

      {/* Recent Blog Posts */}
      {recentBlogs.length > 0 && (
        <>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Recent Posts
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {recentBlogs.map((blog) => {
              const subTitle = blog.description || "";
              const featureImage = blog.featuredImage || "";

              return (
                <a
                  key={blog.title}
                  className="col-span-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg overflow-hidden group"
                  href={`/blog/${blog.slug}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-full h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featureImage}
                        alt={blog.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200 ease"
                      />
                    </div>

                    <div className="p-6 flex-1">
                      <h4 className="text-lg font-bold text-black dark:text-white mb-3 line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3">
                        {subTitle}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </>
      )}

      <div className="flex text-center w-full">
        <a
          className="text-amber-600 dark:text-blue-400 hover:text-amber-700 hover:bg-amber-100 dark:hover:text-blue-300 dark:hover:bg-blue-900/50 mx-auto px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          role="button"
          href="/blog"
        >
          View All Posts
        </a>
      </div>
    </div>
  );
};
