import useTheme from "@/hooks/useTheme";
import { FeatureProjectData, MDXDocument } from "@/types";

export const ProjectList = ({
  projects,
}: {
  projects: MDXDocument<FeatureProjectData>[];
}) => {
  const { isDark } = useTheme();
  return (
    <div className="w-full">
      <div className="block w-full mb-4 text-black dark:text-white">
        <h2 className="text-3xl font-bold mb-2 block w-full">UI/UX Projects</h2>
        <p>A selection of UI/UX design projects.</p>
      </div>

      <div className="grid grid-cols-1 auto-rows-[175px] md:auto-rows-[200px] gap-4">
        {projects &&
          projects.map((project) => {
            const item = project.data;
            // const pubDate = new Date(item.isoDate);
            const subTitle = item.description;
            const featureImage = item.featuredImage;

            return (
              <a
                key={item.title}
                className="col-span-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 row-span-2 md:row-span-1"
                href={`/projects/${item.slug}`}
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

                  <div className="prose prose-lg prose-slate dark:prose-invert col-span-2 py-4 pr-4 pl-4 md:pl-0">
                    <h3 className="text-xl font-bold">{item.title}</h3>
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
