import {
  mdiButterfly,
  mdiCodeTags,
  mdiGithub,
  mdiLanguageCss3,
  mdiLanguageHtml5,
  mdiLanguageJavascript,
  mdiLanguagePython,
  mdiLanguageTypescript,
  mdiPowershell,
  mdiSass,
  mdiStar,
  mdiVuejs,
} from "@mdi/js";
import Icon from "@mdi/react";
import CircleFlourish from "./HomePage/CircleFlourish";

interface Repo {
  id: string;
  name: string;
  description: string;
  url: string;
  homepageUrl: string;
  stargazerCount: number;
  openGraphImageUrl: string;
  usesCustomOpenGraphImage: boolean;
  languages: {
    nodes: {
      name: string;
      color: string;
    }[];
    edges: {
      size: number;
    }[];
  };
}

export const GithubList = ({ githubRes }: { githubRes: any }) => {
  const title = "Open Source Code";
  const blurb =
    "Check out my open source code on Github. Here are a short list of software projects I can share.";

  const repos: Repo[] = githubRes?.data?.user?.pinnedItems?.nodes
    ? ([...githubRes.data.user.pinnedItems.nodes] as Repo[]).sort((a, b) => {
        // Sort items with custom open graph images first
        if (a.usesCustomOpenGraphImage && !b.usesCustomOpenGraphImage) return -1;
        if (!a.usesCustomOpenGraphImage && b.usesCustomOpenGraphImage) return 1;
        return 0;
      })
    : [];

  const languages = repos.map((r) =>
    r.languages.nodes.filter((_, i) => {
      const sum = r.languages.edges.reduce((acc, cur) => acc + cur.size, 0);
      return r.languages.edges[i].size / sum > 0.1;
    })
  );

  const formatLang = (lang: string) => {
    switch (lang) {
      case "JavaScript":
        return mdiLanguageJavascript;
      case "TypeScript":
        return mdiLanguageTypescript;
      case "Python":
        return mdiLanguagePython;
      case "HTML":
        return mdiLanguageHtml5;
      case "CSS":
        return mdiLanguageCss3;
      case "Dart":
        return mdiButterfly;
      case "Shell":
        return mdiPowershell;
      case "Vue":
        return mdiVuejs;
      case "SCSS":
        return mdiSass;
      default:
        return mdiCodeTags;
    }
  };

  return (
    <>
      <div className="w-full relative">
        <div className="absolute flex top-0 left-0 w-full bg-red">
          <div className="mx-auto">
            <CircleFlourish isDark={false} />
          </div>
        </div>
        <div className="relative block w-full py-5 mb-10 text-black dark:text-white">
          <h2 className="text-4xl font-bold block w-full text-center">
            {title}
          </h2>
        </div>
        <div className="flex text-center w-full mb-10">
          <a
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-300 dark:hover:bg-blue-900/50 mx-auto"
            role="button"
            href="https://github.com/frankflitton"
            target="_blank"
          >
            Follow me on Github
          </a>
        </div>
      </div>
      <div
        className={`grid grid-cols-3 gap-4 auto-rows-[175px] md:auto-rows-[200px] text-black dark:text-white`}
      >
        {repos &&
          repos.map((repo, i) => (
            <div
              key={repo.id}
              className={`col-span-3 ${
                !!repo.usesCustomOpenGraphImage
                  ? "row-span-2 md:row-span-1"
                  : "row-span-1"
              } bg-neutral-100 dark:bg-neutral-900 ${
                !!repo.usesCustomOpenGraphImage
                  ? "md:col-span-2"
                  : "md:col-span-1"
              } hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200`}
            >
              <div
                className={`grid ${
                  !!repo.usesCustomOpenGraphImage
                    ? "grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-2 md:gap-4"
                    : "grid-rows-1 grid-cols-2 gap-4"
                } grid-flow-col  w-full h-full`}
              >
                {!!repo.usesCustomOpenGraphImage && (
                  <div className="h-full w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      src={repo.openGraphImageUrl}
                      className="object-cover h-full w-full hover:scale-105 transition-all duration-200 ease"
                      width={100}
                      height={100}
                    ></img>
                  </div>
                )}
                <div
                  className={`grid grid-rows-3 grid-flow-col gap-4 w-full h-full ${
                    !!repo.usesCustomOpenGraphImage ? "p-4" : "p-4 col-span-2"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="justify-start">
                      <h3
                        className={`inline text-xl ${
                          repo.name.includes("-") ? "capitalize" : ""
                        }`}
                      >
                        {repo.name.includes("-")
                          ? repo.name.replaceAll("-", " ")
                          : repo.name}
                      </h3>
                    </div>
                    <div className="flex justify-end align-middle text-black/70 dark:text-white/70">
                      <Icon
                        path={mdiStar}
                        title="Github Stargazer Count"
                        size={0.75}
                        className="mt-[0.125rem]"
                      />
                      <span>{repo.stargazerCount}</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-start text-black/70 dark:text-white/70">
                    <p className="line-clamp-2 md:line-clamp-2">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="flex items-end justify-start">
                      <a
                        href={repo.url}
                        target="_blank"
                        role="button"
                        className="hover:bg-black/10 dark:hover:bg-white/20 p-2 ml-[-0.5rem] mb-[-0.5rem]"
                      >
                        Code on GitHub
                      </a>
                      {repo.homepageUrl && (
                        <a
                          href={repo.homepageUrl}
                          target="_blank"
                          role="button"
                          className="hover:bg-black/10 dark:hover:bg-white/20 p-2 mb-[-0.5rem]"
                        >
                          View Demo
                        </a>
                      )}
                    </div>
                    <div className="flex items-end justify-end">
                      {languages[i] &&
                        languages[i].map((lang) => (
                          <Icon
                            key={lang.name}
                            id={`${repo.id}-${lang.name}`}
                            path={formatLang(lang.name)}
                            color={lang.color}
                            title={lang.name}
                            size={1}
                            className="mt-[-0.5rem] inline-block bg-blend-multiply"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
