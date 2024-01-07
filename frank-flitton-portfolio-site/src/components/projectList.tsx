import { MDLoadDir } from "@/Content/loader";
import { ProjectMDXDocument } from "@/types";
import { GetStaticProps } from "next";

export const ProjectList = ({
  projects,
}: {
  projects: ProjectMDXDocument[];
}) => {
  return (
    <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
      {projects &&
        projects.map((projects, i) => (
          <div
            key={i}
            className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
              i === 3 || i === 6 ? "col-span-2" : ""
            }`}
          ></div>
        ))}
    </div>
  );
};
