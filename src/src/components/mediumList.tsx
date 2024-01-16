import { mdiBook } from "@mdi/js";
import Icon from "@mdi/react";
import kebabCase from "lodash/kebabCase";

export const MediumList = ({ mediumFeed }: { mediumFeed: any }) => {
  return (
    <div className="w-full">
      <div className="block w-full mb-4">
        <h2 className="text-3xl font-bold mb-2 block w-full">
          <Icon
            path={mdiBook}
            size={1.25}
            className="inline-block mt-[-0.5rem] mr-2"
          />
          Medium Posts
        </h2>
        <p>
          I write about my experiences with software development, user
          experience, and entrepreneurship.
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
              className="col-span-1 bg-neutral-100 hover:bg-neutral-200 row-span-2 md:row-span-1"
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

                <div className="prose prose-slate col-span-2 py-4 pr-4 pl-4 md:pl-0">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="">{subTitle}</p>
                  {/* <aside>{pubDate.toLocaleDateString()}</aside> */}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
