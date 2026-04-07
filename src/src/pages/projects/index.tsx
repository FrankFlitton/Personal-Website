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
import CircleFlourish from "@/components/HomePage/CircleFlourish";
import useTheme from "@/hooks/useTheme";

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
  const { isDark } = useTheme();
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
      <div className="max-w-2xl mx-auto px-6 py-16 prose dark:prose-invert">
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-3">
          Work
        </p>
        <h1 className="text-3xl font-medium leading-snug mb-6">
          Selected projects.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-10">
          A selection of product and engineering work spanning design systems,
          AI/ML tooling, fintech, and creative software. Most projects sit at
          the intersection of engineering rigour and user experience quality.
        </p>
        <ProjectList projects={projects} />
        <div className="flex justify-center mt-20">
          <CircleFlourish isDark={isDark} />
        </div>
      </div>
    </Page>
  );
}
