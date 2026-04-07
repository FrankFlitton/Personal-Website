import { GetStaticPaths, GetStaticProps } from "next";
import { MDLoadDir } from "@/Content/loader";
import { FeatureProjectData, MDXDocument } from "@/types";
import { MDRenderer } from "@/Content/renderer";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ProjectMeta } from "@/components/projectMeta";
import { Page } from "@/components/page";
import { PageMeta } from "@/components/pageMeta";
import { ProjectList } from "@/components/projectList";
import LargeDotLine from "@/components/HomePage/LargeDotline";
import CircleFlourish from "@/components/HomePage/CircleFlourish";
import useTheme from "@/hooks/useTheme";

export const getStaticPaths = (async () => {
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects",
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
    "../content/projects",
  );
  const slug = context?.params?.slug ?? "";
  const project = projectSources.find(
    (project) => project?.data?.slug === slug,
  );

  let longDescription = null;
  if (project) {
    longDescription = await serialize(project?.data?.longDescription);
  }

  return {
    props: {
      projects: projectSources,
      project: project,
      longDescription: longDescription,
    },
  };
};

export default function Home({
  projects,
  project,
  longDescription,
}: {
  projects: MDXDocument<FeatureProjectData>[];
  project: MDXDocument<FeatureProjectData>;
  longDescription: any;
}) {
  const { isDark } = useTheme();
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
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white">
            {title}
          </h2>
          {project?.data?.projectUrl && (
            <Link
              href={project?.data?.projectUrl}
              className="text-xl md:text-2xl hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white p-4 inline-block min-w-40"
            >
              Buy
            </Link>
          )}
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
          <LargeDotLine
            className="relative h-4 w-[45%] my-8 mx-auto"
            color="black"
            colorDark="white"
          />
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-16 prose dark:prose-invert">
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-3">
          More work
        </p>
        <h2 className="text-3xl font-medium leading-snug mb-6">
          Selected projects.
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10">
          A selection of product and engineering work spanning design systems,
          AI/ML tooling, fintech, and creative software.
        </p>
        {!!projects?.length && <ProjectList projects={projects} />}
        <Link
          href="/projects"
          className="inline-block mt-8 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          All projects →
        </Link>
        <div className="flex justify-center mt-20">
          <CircleFlourish isDark={isDark} />
        </div>
      </div>
    </Page>
  );
}
