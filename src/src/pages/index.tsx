import type { GetStaticProps, Metadata } from "next";
import { MDLoadDir, MDLoadFile } from "@/Content/loader";
import { Blog, MDXDocument, ProjectMDXDocument } from "@/types";
import { GithubList } from "@/components/githubList";
import { Page } from "@/components/page";
import { BlogList } from "@/components/blogList";
import { PageMeta } from "@/components/pageMeta";
import HeroSection from "@/components/HomePage/HeroSection";
import { sortBlogs } from "@/util/sortBlogs";

export const metadata: Metadata = {
  title: "Developing Great Products - Frank JE Flitton",
  description:
    "Frank is a Software Engineer and Lead Designer specializing engineering software for the web, UX research, and product design.",
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

  const blogs = await MDLoadDir<Blog>("../content/blog");
  const simpleBlogs = blogs.map((b) => b.data).sort(sortBlogs);

  return {
    props: {
      blogs: simpleBlogs,
      githubRes,
    },
  };
};

export default function Home({
  githubRes,
  blogs,
}: {
  about: MDXDocument;
  projects: ProjectMDXDocument[];
  githubRes: any;
  blogs: Blog[];
}) {
  return (
    <Page>
      <PageMeta color="#000000" />
      <div className="mb-20">
        <HeroSection />
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        <GithubList githubRes={githubRes} />
      </div>
      <div className="w-full mb-16 max-w-screen-lg m-auto">
        <BlogList blogs={blogs} />
      </div>
    </Page>
  );
}
