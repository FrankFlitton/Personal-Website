import { readFileSync, readdirSync } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import { parse } from "yaml";

type MDXData = {
  data: Record<string, any>;
  content: string;
};

export const MDLoadFile = async (path: string) => {
  const readFile = readFileSync(join(process.cwd(), path), "utf8");

  if (!readFile.trim().startsWith("---")) {
    const mdxSource = await serialize(readFile);
    return { data: null, content: mdxSource };
  }

  const readLines = readFile.split("\n");
  readLines.shift();
  const yamlEndIndex = readLines.indexOf("---");

  const yamlLines = readLines.slice(0, yamlEndIndex);
  const yamlString = yamlLines.join("\n");
  const data = parse(yamlString);

  const contentSource = readLines.slice(yamlEndIndex + 1).join("\n");
  const mdxSource = await serialize(contentSource);

  return { data, content: mdxSource };
};

export const MDLoadDir = async (path: string) => {
  const documentSources = readdirSync(join(process.cwd(), path));
  const documents = await Promise.all(
    documentSources.map(async (document) => {
      const projectSource = await MDLoadFile(join(path, document));
      return { slug: document.replace(".md", ""), ...projectSource };
    })
  );

  return documents;
};
