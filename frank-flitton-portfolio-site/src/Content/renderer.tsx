import React from "react";
import { MDXRemote } from "next-mdx-remote";

const YouTube = ({ id }: { id: string }) => {
  return (
    <iframe
      src={"https://www.youtube.com/embed/" + id}
      width="100%"
      height="480"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

const IFrame = (
  props: React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >
) => {
  return <iframe {...props} />;
};

const Test = () => {
  return "TESTING123123";
};

const components = { Test, YouTube, IFrame };

export function MDRenderer({
  // @ts-ignore
  source,
}) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
