import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface FeatureProjectData {
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  client: string;
  clientUrl: string;
  projectUrl: string;
  color: string;
  category: string;
  contributions: string[];
  longDescription: string;
}

export interface MDXDocument<T = Record<string, unknown> | null> {
  id: string;
  data: T;
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

export interface ProjectMDXDocument extends MDXDocument<FeatureProjectData> {}

export type Blog = {
  bar: number;
  categories: string[];
  "content:encoded": string;
  "content:encodedSnippet": string;
  creator: string;
  "dc:creator": string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};
