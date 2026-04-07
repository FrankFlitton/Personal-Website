import { FeatureProjectData, MDXDocument } from "@/types";
import Link from "next/link";

export const ProjectList = ({
  projects,
}: {
  projects: MDXDocument<FeatureProjectData>[];
}) => {
  if (!projects?.length) return null;

  const [featured, ...rest] = projects;
  const featuredItem = featured.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Featured project — full width on sm+, horizontal split */}
      <Link
        href={`/projects/${featuredItem.slug}`}
        className="col-span-1 sm:col-span-2 group grid grid-cols-1 sm:grid-cols-5 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
      >
        {featuredItem.featuredImage && (
          <div className="col-span-1 sm:col-span-3 h-48 sm:h-auto overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredItem.featuredImage}
              alt=""
              className="w-full m-0 h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
            />
          </div>
        )}
        <div
          className={`${featuredItem.featuredImage ? "col-span-1 sm:col-span-2" : "col-span-1 sm:col-span-5"} p-5 flex flex-col justify-between`}
        >
          <div>
            {featuredItem.client && (
              <p className="text-xs text-neutral-400 mb-2">
                {featuredItem.client}
              </p>
            )}
            <h3 className="text-base font-medium mb-2 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
              {featuredItem.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {featuredItem.description}
            </p>
          </div>
          {featuredItem.category && (
            <p className="text-xs text-neutral-400 mt-4">
              {featuredItem.category}
            </p>
          )}
        </div>
      </Link>

      {/* Remaining projects — stack on mobile, side-by-side on sm+ */}
      {rest.map((project) => {
        const item = project.data;
        return (
          <Link
            key={item.slug}
            href={`/projects/${item.slug}`}
            className="col-span-1 group flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
          >
            {item.featuredImage && (
              <div className="w-full h-36 overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.featuredImage}
                  alt=""
                  className="w-full m-0 h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                {item.client && (
                  <p className="text-xs text-neutral-400 mb-1">{item.client}</p>
                )}
                <h3 className="text-sm font-medium mb-1 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              {item.category && (
                <p className="text-xs text-neutral-400 mt-3">{item.category}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
