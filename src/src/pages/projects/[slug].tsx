import { GetStaticPaths, GetStaticProps } from "next";
import { MDLoadDir } from "@/Content/loader";
import { FeatureProjectData, MDXDocument } from "@/types";
import { MDRenderer } from "@/Content/renderer";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ProjectMeta } from "@/components/projectMeta";
import { Page } from "@/components/page";
import { PageMeta } from "@/components/pageMeta";

export const getStaticPaths = (async () => {
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );
  const paths = projectSources.map((project) => ({
    params: {
      slug: project?.data?.slug,
    },
  }));

  return {
    paths,
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );
  const slug = context?.params?.slug ?? "";
  const project = projectSources.find(
    (project) => project?.data?.slug === slug
  );

  let longDescription = null;
  if (project) {
    longDescription = await serialize(project?.data?.longDescription);
  }

  return {
    props: {
      project: project,
      longDescription: longDescription,
    },
  };
};

export default function Home({
  project,
  longDescription,
}: {
  project: MDXDocument<FeatureProjectData>;
  longDescription: any;
}) {
  const title = project?.data?.title;
  const description = project?.data?.description;
  const featureImage = project?.data?.featuredImage;
  const color = project?.data?.color;

  return (
    <Page>
      <PageMeta
        title={title}
        description={description}
        image={featureImage}
        color={color}
      />
      <div className="w-full">
        <div className="text-center py-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black">{title}</h2>
          <Link
            href={project?.data?.projectUrl}
            className="text-xl md:text-2xl hover:bg-black/10 text-black p-4 inline-block"
          >
            Buy
          </Link>
        </div>

        <div className="w-full max-w-screen-xl m-auto">
          <article className="pb-16 relative grid grid-cols-3">
            <div className="col-span-3 md:col-span-2">
              <MDRenderer
                className="prose-xl max-w-full pb-16"
                source={longDescription}
              />
              <div className="flex md:hidden pb-16">
                {project.data && <ProjectMeta project={project} row />}
              </div>
              <div
                className="h-1 w-[45%] mb-16"
                style={{ backgroundColor: color ?? "black" }}
              ></div>
              <MDRenderer
                className="md:ml-auto col-span-8"
                source={project.content}
              />
            </div>
            <div className="col-span-1 pl-8 hidden md:flex relative">
              <div className="sticky top-[80px] flex h-[fit-content]">
                {project.data && <ProjectMeta project={project} />}
              </div>
            </div>
          </article>
        </div>
      </div>
    </Page>
  );
}
