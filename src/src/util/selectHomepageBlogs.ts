import { Blog } from "@/types";
import { sortBlogs } from "./sortBlogs";

/**
 * Pick the posts shown on the home page.
 *
 * Straight recency is a bad fit once you write in series: publishing three
 * related posts in a week hands them every slot and the home page stops
 * representing the range of the writing. Two frontmatter controls fix that:
 *
 * - `homepage: false` keeps a post off the home page entirely. It still shows
 *   up at /blog and in the sitemap.
 * - `series: "<name>"` collapses every post sharing that name into a single
 *   slot. The series is represented by its newest post, unless one is marked
 *   `seriesLead: true` — useful when the pillar post should be the door into
 *   the series even after later entries are published.
 *
 * Posts with no `series` are unaffected and behave exactly as before.
 */
export const selectHomepageBlogs = (blogs: Blog[], limit = 3): Blog[] => {
  const eligible = [...blogs]
    .filter((post) => post.homepage !== false)
    .sort(sortBlogs);

  const claimed = new Set<string>();
  const picked: Blog[] = [];

  for (const post of eligible) {
    if (!post.series) {
      picked.push(post);
      continue;
    }

    if (claimed.has(post.series)) continue;
    claimed.add(post.series);

    // Represent the series by its designated lead, else by this post — which,
    // because `eligible` is sorted, is the series' most recent entry.
    const lead = eligible.find((p) => p.series === post.series && p.seriesLead);
    picked.push(lead ?? post);
  }

  return picked.slice(0, limit);
};
