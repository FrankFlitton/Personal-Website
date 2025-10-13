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
        <div className="relative block w-full py-5 mb-8 text-black dark:text-white">
          <h3 className="text-2xl font-bold block w-full text-center opacity-80">
            {title}
          </h3>
        </div>
        <div className="flex text-center w-full mb-8">
          <a
            className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 mx-auto px-4 py-2 rounded text-sm transition-colors duration-200"
            role="button"
            href="https://github.com/frankflitton"
            target="_blank"
          >
            View on GitHub
          </a>
        </div>
      </div>
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[140px] text-black dark:text-white`}
      >
        {repos &&
          repos.slice(0, 8).map((repo, i) => (
            <div
              key={repo.id}
              className={`col-span-1 row-span-1 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 rounded`}
            >
              <a
                href={repo.url}
                target="_blank"
                className="grid grid-rows-3 grid-flow-col gap-2 w-full h-full p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="justify-start">
                    <h4
                      className={`text-sm font-semibold line-clamp-1 ${
                        repo.name.includes("-") ? "capitalize" : ""
                      }`}
                    >
                      {repo.name.includes("-")
                        ? repo.name.replaceAll("-", " ")
                        : repo.name}
                    </h4>
                  </div>
                  <div className="flex justify-end align-middle text-black/70 dark:text-white/70">
                    <Icon
                      path={mdiStar}
                      title="Github Stargazer Count"
                      size={0.6}
                      className="mt-[0.125rem]"
                    />
                    <span className="text-xs">{repo.stargazerCount}</span>
                  </div>
                </div>

                <div className="flex items-start justify-start text-black/70 dark:text-white/70">
                  <p className="line-clamp-2 text-xs">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-end justify-start">
                  {languages[i] &&
                    languages[i].slice(0, 3).map((lang) => (
                      <Icon
                        key={lang.name}
                        id={`${repo.id}-${lang.name}`}
                        path={formatLang(lang.name)}
                        color={lang.color}
                        title={lang.name}
                        size={0.7}
                        className="inline-block bg-blend-multiply mr-1"
                      />
                    ))}
                </div>
              </a>
            </div>
          ))}
      </div>
    </>
  );
};
