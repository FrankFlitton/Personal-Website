import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface FeatureProjectData {
  title: string;
  slug: string;
  featured: boolean;
  description: string;
  featuredImage: string;
  client: string;
  clientUrl: string;
  projectUrl: string;
  color: string;
  category: string;
  contributions: string[];
  longDescription: string;
  cta?: string;
}

export interface MDXDocument<T = Record<string, unknown> | null> {
  id: string;
  data: T;
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

export interface ProjectMDXDocument extends MDXDocument<FeatureProjectData> { }

export type Blog = {
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  date: string;
  link: string;
  categories: string[];
  /**
   * Set `false` to keep a post off the home page. It still appears at /blog.
   * Omitted means eligible.
   */
  homepage?: boolean;
  /**
   * Posts sharing a series name collapse into a single home-page slot, so a
   * burst of related posts can't take over the page.
   */
  series?: string;
  /**
   * Within a series, represent it with this post instead of the newest one.
   */
  seriesLead?: boolean;
};
