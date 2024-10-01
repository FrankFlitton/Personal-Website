import { GetStaticPaths, GetStaticProps } from "next";
import { MDLoadDir } from "@/Content/loader";
import { FeatureProjectData, MDXDocument } from "@/types";
import { MDRenderer } from "@/Content/renderer";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ProjectMeta } from "@/components/projectMeta";
import { Page } from "@/components/page";
import { PageMeta } from "@/components/pageMeta";
import { FeatureSlider } from "@/components/featureSlider";
import { ProjectList } from "@/components/projectList";

export const getStaticProps: GetStaticProps = async (context) => {
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );
  const projects = projectSources;

  return {
    props: {
      projects,
    },
  };
};

export default function Home({
  projects,
}: {
  projects: MDXDocument<FeatureProjectData>[];
}) {
  const featuredProjects = !!projects?.length
    ? projects
        .filter((p) => !!p?.data?.featured)
        .map((p) => ({ ...p.data, image: p.data.featuredImage }))
    : [];
  return (
    <Page>
      <PageMeta title={"Frank's Projects"} />
      <div className="rounded-lg overflow-hidden h-[calc(100dvh-80px-1rem)] min-h-[400px]">
        <FeatureSlider slides={featuredProjects} />
      </div>
      <div className="w-full my-20 max-w-screen-lg m-auto">
        <ProjectList projects={projects} />
      </div>
    </Page>
  );
}
