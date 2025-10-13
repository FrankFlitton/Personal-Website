import { Blog } from "@/types";

export const FeaturedBlogPost = ({ blog }: { blog: Blog }) => {
  const featureImage = blog.featuredImage || "";

  return (
    <a
      href={`/blog/${blog.slug}`}
      className="block w-full mb-16 group"
    >
      <div className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-center">
          {/* Featured Image */}
          <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featureImage}
              alt={blog.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 md:pr-16">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-amber-500 dark:bg-blue-600 rounded">
                Featured Post
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6 group-hover:text-amber-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {blog.title}
            </h2>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 line-clamp-4">
              {blog.description}
            </p>

            <div className="flex items-center text-amber-600 dark:text-blue-400 font-semibold group-hover:underline">
              <span>Read More</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
