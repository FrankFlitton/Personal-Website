import { Blog } from "@/types";
import Parser from "rss-parser";

type CustomFeed = {};

const parser: Parser<CustomFeed, Blog> = new Parser({
  customFields: {
    feed: [],
    item: ["bar", "title"],
  },
});

export const mediumRSSFeed = (async () => {
  const feed = await parser.parseURL("https://frankflitton.medium.com/feed");
  return feed;
})();
