import { mediumPath } from "@/const/const";
import { mdiBook } from "@mdi/js";
import Icon from "@mdi/react";
import kebabCase from "lodash/kebabCase";

export const MediumList = ({
  mediumFeed,
  hideTitle,
}: {
  mediumFeed: any;
  hideTitle?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className="block w-full mb-4 text-black dark:text-white">
        {!hideTitle && (
          <h2 className="text-3xl font-bold mb-2 block w-full">
            <Icon
              path={mediumPath}
              size={1.25}
              className="inline-block mt-[-0.5rem] mr-2"
            />
            Medium Posts
          </h2>
        )}
        <p>
          I share insights from my journey in software development, user
          experience, and entrepreneurship, with a focus on building scalable
          systems, tackling complex challenges, and driving innovation.
        </p>
        <p className="pt-4">
          <a
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-300 dark:hover:bg-blue-900/50 self-end p-4 ml-[-1rem]"
            role="button"
            href="https://frankflitton.medium.com/"
            target="_blank"
          >
            Follow me on Medium
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 auto-rows-[175px] md:auto-rows-[200px] gap-4">
        {mediumFeed.items.map((item: any) => {
          // const pubDate = new Date(item.isoDate);
          const subTitle = item["content:encodedSnippet"].split("\n")[0];
          const featureImage = item["content:encoded"]
            .match(/src="(.*?)"/g)[0]
            .replace(/(src=)?"/g, "");

          return (
            <a
              key={item.title}
              className="col-span-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 row-span-2 md:row-span-1"
              href={`/blog/${kebabCase(item.title)}`}
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
