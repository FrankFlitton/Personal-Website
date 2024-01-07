import type { GetStaticProps, Metadata } from "next";
import { MDLoadDir, MDLoadFile } from "@/Content/loader";
import { MDRenderer } from "@/Content/renderer";
import { FeatureSlider } from "@/components/featureSlider";
import { ProjectList } from "@/components/projectList";
import { FeatureProjectData, MDXDocument, ProjectMDXDocument } from "@/types";
import { GithubList } from "@/components/githubList";
import { Page } from "@/components/page";

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
  return {
    props: {
      about: homeSource,
      projects: projectSources,
      githubRes,
    },
  };
};

export default function Home({
  about,
  projects,
  githubRes,
}: {
  about: MDXDocument;
  projects: ProjectMDXDocument[];
  githubRes: any;
}) {
  const slides = projects.map((project) => ({
    slug: project.data.slug,
    title: project.data.title,
    description: project.data.description,
    image: project.data.featuredImage,
    color: project.data.color,
  }));

  return (
    <Page>
      <div className="w-full mb-16">
        <FeatureSlider slides={slides} />
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        {about && <MDRenderer source={about.content} />}
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        <GithubList githubRes={githubRes} />
      </div>
      <ProjectList projects={projects} />

      {about && <MDRenderer source={about.content} />}

      <h2 className={`mb-3 text-6xl font-bold`}>Developing Great Products</h2>
      <p className={`m-0 max-w-[30ch] text-2xl opacity-50`}>
        Frank is a Full Stack Software Engineer and Lead Designer specializing
        in software engineering, UX research, and product design.
      </p>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </Page>
  );
}
