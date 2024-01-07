import { GetStaticPaths, GetStaticProps } from "next";
import { MDLoadDir } from "@/Content/loader";
import { FeatureProjectData } from "@/types";

export const getStaticPaths = (async () => {
  const projectSources = await MDLoadDir<FeatureProjectData>("../content/projects");
  const paths = projectSources.map((project) => ({
    params: {
      slug: project.data.slug,
    },
  }));

  return {
    paths,
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = async (context) => {
  const projectSources = await MDLoadDir<FeatureProjectData>("../content/projects");
  const slug = context?.params?.slug ?? "";
  const project = projectSources.find((project) => project.data.slug === slug);

  console.log("*** projectSources", projectSources);

  return {
    props: {
      project: project,
    },
  };
};

export default function Home({ project = {} }) {
  return <>{JSON.stringify(project)}</>;
}
