import { FeatureProjectData, MDXDocument } from "@/types";
import Link from "next/link";

export const ProjectMeta = ({
  project,
  row = false,
}: {
  project: MDXDocument<FeatureProjectData>;
  row?: boolean;
}) => {
  const metaSection = [
    { title: "Client", value: project.data.client },
    { title: "Category", value: project.data.category },
    { title: "Contributions", value: project.data.contributions },
  ];
  return (
    <div className="prose prose-lg prose-slate dark:prose-invert grid grid-cols-3 w-full">
      {metaSection.map((meta) => (
        <div
          className={`mb-2 ${row ? "col-span-1" : "col-span-3"} w-full`}
          key={meta.title}
        >
          <h3 className="text-md font-bold my-0">{meta.title}</h3>
          {Array.isArray(meta.value) ? (
            <ul className="mb-2 w-full list-outside">
              {meta.value &&
                meta.value.map((item) => (
                  <li key={item} className="text-gray-500 dark:text-gray-300 my-0 w-full">
                    {item}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-300 mb-2">{meta.value}</p>
          )}
        </div>
      ))}
      <div
        className={`mb-2 prose prose-lg dark:prose-invert col-span-1 ${row ? "col-span-1" : "col-span-3"}`}
      >
        <h3 className="text-md font-bold my-0">Project Link</h3>
        <p className="mb-2">
          <Link
            href={project.data.projectUrl}
            className="text-gray-500 dark:text-gray-300 hover:underline-offset-4 no-underline hover:underline"
          >
            See More
          </Link>
        </p>
      </div>
    </div>
  );
};
