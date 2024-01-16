import { MDXDocument } from "@/types";
import { readFileSync, readdirSync } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { join } from "path";
import { parse } from "yaml";

export async function MDLoadFile<T>(path: string) {
  const readFile = readFileSync(join(process.cwd(), path), "utf8");

  const fileName = path.split("/").pop() ?? "";

  if (!readFile.trim().startsWith("---")) {
    const mdxSource = await serialize(readFile);
    const doc: MDXDocument<null> = {
      id: fileName,
      data: null,
      content: mdxSource,
    };
    return doc;
  }

  const readLines = readFile.split("\n");
  readLines.shift();
  const yamlEndIndex = readLines.findIndex((s) => s.trim().startsWith("---"));

  const yamlLines = readLines.slice(0, yamlEndIndex);
  const yamlString = yamlLines.join("\n").replace(/\-\-\-/g, '');
  const data: T = parse(yamlString);

  const contentSource = readLines.slice(yamlEndIndex + 1).join("\n");
  const mdxSource = await serialize(contentSource);

  const doc: MDXDocument<T> = {
    id: fileName,
    data: data,
    content: mdxSource,
  };
  return doc;
}

export async function MDLoadDir<T>(path: string) {
  const documentSources = readdirSync(join(process.cwd(), path));
  const documents = await Promise.all(
    documentSources.map(async (document) => {
      const projectSource = await MDLoadFile<T>(join(path, document));
      return {
        ...projectSource,
      } as MDXDocument<T & { id: string }>;
    })
  );

  return documents;
}
