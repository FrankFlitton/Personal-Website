import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { MDLoadDir, MDLoadFile } from "@/Content/loader";

export const getStaticPaths = (async () => {
  const projectSources = await MDLoadDir("../content/projects");
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
  const projectSources = await MDLoadDir("../content/projects");
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
