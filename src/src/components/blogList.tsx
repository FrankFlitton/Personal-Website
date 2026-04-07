import Link from "next/link";
import { Blog } from "@/types";

export const BlogList = ({ blogs }: { blogs: Blog[]; hideTitle?: boolean }) => {
  if (!blogs?.length) return null;

  const [featured, ...rest] = blogs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 prose dark:prose-invert">
      {/* Featured post — full width on sm+, horizontal split */}
      <Link
        href={`/blog/${featured.slug}`}
        className="col-span-1 sm:col-span-2 group grid grid-cols-1 sm:grid-cols-5 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
      >
        {featured.featuredImage && (
          <div className="col-span-1 sm:col-span-3 h-48 sm:h-auto overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.featuredImage}
              alt=""
              className="w-full m-0 h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
            />
          </div>
        )}
        <div className={`${featured.featuredImage ? "col-span-1 sm:col-span-2" : "col-span-1 sm:col-span-5"} p-5 flex flex-col justify-center`}>
          {featured.categories?.[0] && (
            <p className="text-xs text-neutral-400 mb-2">{featured.categories[0]}</p>
          )}
          <h3 className="text-base font-medium mb-2 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
            {featured.title}
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed">
            {featured.description}
          </p>
        </div>
      </Link>

      {/* Remaining posts — stack on mobile, side-by-side on sm+ */}
      {rest.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="col-span-1 group flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
        >
          {post.featuredImage && (
            <div className="w-full h-36 overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt=""
                className="w-full h-full m-0 object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
              />
            </div>
          )}
          <div className="p-4 flex flex-col flex-1">
            {post.categories?.[0] && (
              <p className="text-xs text-neutral-400 mb-1">{post.categories[0]}</p>
            )}
            <h3 className="text-sm font-medium mb-1 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {post.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
