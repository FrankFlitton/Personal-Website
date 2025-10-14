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
};

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemPrefersDark: boolean;
}
