import type { GetStaticProps, Metadata } from "next";
import { MDLoadDir, MDLoadFile } from "@/Content/loader";
import { MDRenderer } from "@/Content/renderer";
import { FeatureSlider } from "@/components/featureSlider";
import { ProjectList } from "@/components/projectList";
import { FeatureProjectData, MDXDocument, ProjectMDXDocument } from "@/types";
import { GithubList } from "@/components/githubList";
import { Page } from "@/components/page";
import { mediumRSSFeed } from "@/Content/medium";
import { MediumList } from "@/components/mediumList";
import Icon from "@mdi/react";
import { mdiGuitarAcoustic } from "@mdi/js";
import { PageMeta } from "@/components/pageMeta";
import { use } from "react";
import useIsDark from "@/hooks/useIsDark";

export const metadata: Metadata = {
  title: "Developing Great Products - Frank JE Flitton",
  description:
    "Frank is a Full Stack Software Engineer and Lead Designer specializing in software engineering, UX research, and product design.",
};

export const getStaticProps: GetStaticProps = async () => {
  const githubReq = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
    body: JSON.stringify({
      variables: {
        login: "FrankFlitton",
      },
      query: `
          query GetUser($login: String!) {
            user(login: $login) {
              avatarUrl
              pinnedItems(first: 10) {
                totalCount
                nodes {
                  ... on Repository {
                    id
                    name
                    homepageUrl
                    url
                    description
                    openGraphImageUrl
                    latestRelease {
                      name
                      tagName
                    }
                    languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                      nodes {
                        name
                        color
                      }
                      edges {
                        size
                      }
                    }
                    stargazerCount
                    usesCustomOpenGraphImage
                    repositoryTopics(first: 10) {
                      nodes {
                        topic {
                          name
                          id
                        }
                      }
                    }
                  }
                }
              }
              url
              twitterUsername
            }
          }
          `,
    }),
  });

  const githubRes = await githubReq.json();

  const homeSource = await MDLoadFile("../content/pages/home.md");
  const projectSources = await MDLoadDir<FeatureProjectData>(
    "../content/projects"
  );

  const mediumFeed = await mediumRSSFeed;

  return {
    props: {
      about: homeSource,
      projects: projectSources,
      githubRes,
      mediumFeed: mediumFeed,
    },
  };
};

export default function Home({
  about,
  projects,
  githubRes,
  mediumFeed,
}: {
  about: MDXDocument;
  projects: ProjectMDXDocument[];
  githubRes: any;
  mediumFeed: any;
}) {
  const slides = projects
    .filter((p) => !!p.data?.featured)
    .map((project) => ({
      slug: project.data.slug,
      title: project.data.title,
      description: project.data.description,
      image: project.data.featuredImage,
      color: project.data.color,
    }));

  const isDark = useIsDark();

  return (
    <Page>
      <PageMeta color="#000000" />
      <div className="w-full mb-16">
        <FeatureSlider slides={slides} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 h-full max-w-screen-lg m-auto">
        <p
          className={`m-0 max-w-[30ch] text-2xl opacity-50 text-black dark:text-white mb-16 col-span-1`}
        >
          Frank is a Full Stack Software Engineer and Lead Designer specializing
          in software engineering, UX research, and product design.
        </p>
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-bold mb-2 block w-full text-black dark:text-white">
            <Icon
              path={mdiGuitarAcoustic}
              className="inline mt-[-0.5rem]"
              size={1.5}
              color={isDark ? "white" : "black"}
            />
            About Me
          </h2>
          {about && (
            <MDRenderer className="w-full mb-16" source={about.content} />
          )}
        </div>
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        <GithubList githubRes={githubRes} />
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        <MediumList mediumFeed={mediumFeed} />
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        <ProjectList projects={projects} />
      </div>
    </Page>
  );
}
