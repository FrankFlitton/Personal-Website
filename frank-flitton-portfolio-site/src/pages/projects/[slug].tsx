import { GetStaticPaths, GetStaticProps } from "next";
import { MDLoadDir } from "@/Content/loader";
import { FeatureProjectData, MDXDocument } from "@/types";
import { MDRenderer } from "@/Content/renderer";

export const getStaticPaths = (async () => {
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );
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
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );
  const slug = context?.params?.slug ?? "";
  const project = projectSources.find((project) => project.data.slug === slug);

  console.log("*** projectSources", projectSources);

  return {
    props: {
      project: project,
    },
  };
};

export default function Home({
  project,
}: {
  project: MDXDocument<FeatureProjectData>;
}) {
  console.log(project);

  return (
    <div className="w-full">
      <h1>{project.data.title}</h1>
      <p>{project.data.description}</p>

      <article className="w-full">
        <MDRenderer className="m-auto" source={project.content} />
      </article>
    </div>
  );
}
