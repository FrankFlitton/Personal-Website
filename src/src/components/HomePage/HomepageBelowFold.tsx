import Link from "next/link";
import { Blog } from "@/types";
import CircleFlourish from "./CircleFlourish";
import useTheme from "@/hooks/useTheme";

export default function HomepageBelowFold({ blogs }: { blogs: Blog[] }) {
  const { isDark } = useTheme();
  const recentPosts = blogs.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-6 pb-24 space-y-20 prose dark:prose-invert">
      {/* ── Recent Highlights ─────────────────────────────────────────── */}
      <section>
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-6">
          Recent highlights
        </p>
        <ul className="space-y-4 list-none pl-0">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="mt-2 w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 flex-shrink-0" />
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed m-0">
                {h}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* ── Featured case study ───────────────────────────────────────── */}
      <section>
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-6">
          Featured work
        </p>
        <Link
          href="/projects/td-lab-shopping-optimizer"
          className="group grid grid-cols-1 sm:grid-cols-5 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
        >
          <div className="col-span-1 sm:col-span-3 h-48 sm:h-auto overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/projects/shopping-optimizer/featured.png"
              alt=""
              className="w-full h-full object-cover group-hover:scale-[1.02] m-0 transition-transform duration-300 ease-out"
            />
          </div>
          <div className="col-span-1 sm:col-span-2 p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs text-neutral-400 mb-2 m-0">
                TD Bank Innovation Lab
              </p>
              <h2 className="text-base font-medium mb-3 mt-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                Shopping Optimizer
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed m-0">
                Turned real-time flyer data and user research into an optimized
                grocery routing tool — from discovery through to a filed
                Canadian patent.
              </p>
            </div>
            <span className="text-sm text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mt-4 block">
              View case study →
            </span>
          </div>
        </Link>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* ── Recent writing ────────────────────────────────────────────── */}
      <section>
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-6">
          Recent writing
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
          {/* Featured post — full width on sm+, horizontal split */}
          {recentPosts[0] && (
            <Link
              href={`/blog/${recentPosts[0].slug}`}
              className="col-span-1 sm:col-span-2 group grid grid-cols-1 sm:grid-cols-5 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
            >
              {recentPosts[0].featuredImage && (
                <div className="col-span-1 sm:col-span-3 h-48 sm:h-auto overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={recentPosts[0].featuredImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                </div>
              )}
              <div
                className={`${recentPosts[0].featuredImage ? "col-span-1 sm:col-span-2" : "col-span-1 sm:col-span-5"} p-5 flex flex-col justify-center`}
              >
                <h3 className="text-sm font-medium mb-2 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                  {recentPosts[0].title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {recentPosts[0].description}
                </p>
              </div>
            </Link>
          )}

          {/* Remaining posts — stack on mobile, side-by-side on sm+ */}
          {recentPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="col-span-1 group flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors no-underline"
            >
              {post.featuredImage && (
                <div className="w-full h-36 overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featuredImage}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium mb-1 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="inline-block mt-6 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          All posts →
        </Link>
      </section>

      <hr className="border-t border-neutral-200 dark:border-neutral-800" />

      {/* ── Open source ───────────────────────────────────────────────── */}
      <section>
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-6">
          Open source
        </p>
        <ul className="space-y-4">
          {openSource.map((repo) => (
            <li key={repo.slug}>
              <a
                href={`https://github.com/FrankFlitton/${repo.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 no-underline"
              >
                <div>
                  <p className="text-sm font-medium mb-0.5 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors m-0">
                    {repo.name}
                  </p>
                  <p className="text-sm text-neutral-500 m-0">
                    {repo.description}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 flex-shrink-0 mt-1">
                  GitHub →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="https://github.com/frankflitton"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          More on GitHub →
        </a>
      </section>

      {/* ── Page-end flourish ─────────────────────────────────────────── */}
      <div className="flex justify-center pointer-events-none">
        <CircleFlourish isDark={isDark} />
      </div>
    </div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────

const highlights = [
  "Led Text-to-SQL LLM product with graph-based tool calling at Summation",
  "Architected AI/ML workflow builder driving 30% user growth at Union AI",
  "Rebuilt secure hosting platform serving 40,000+ monthly users at Google",
  "Powered AI-driven quant recommendations across $2 trillion in assets annually at Boosted AI",
  "Named inventor on Canadian patent CA 3092840, real-time group financial reconciliation",
];

const openSource = [
  {
    name: "prfect",
    slug: "prfect",
    description:
      "Analyzes git commits and generates pull request descriptions using local AI via Ollama.",
  },
  {
    name: "vue-2-img",
    slug: "vue-2-img",
    description:
      "Convert HTML sections and charts to JPG, PNG, or PDF for download or base64 encoding.",
  },
  {
    name: "date-search",
    slug: "date-search",
    description: "npm package to search and segment time series data.",
  },
];
