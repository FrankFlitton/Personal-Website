import { Blog } from "@/types";

export const sortBlogs = (a: Blog, b: Blog) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}