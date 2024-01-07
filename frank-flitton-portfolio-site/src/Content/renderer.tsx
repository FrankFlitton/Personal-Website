import React from "react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import { MDXDocument } from "@/types";

const YouTube = ({ id }: { id: string }) => {
  return (
    <iframe
      src={"https://www.youtube.com/embed/" + id}
      width="100%"
      height="480"
      frameBorder="0"
      allowFullScreen
      style={{ maxWidth: 800, margin: "0 auto" }}
    ></iframe>
  );
};

const IFrame = (
  props: React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >
) => {
  return (
    <iframe
      width="100%"
      height="600"
      frameBorder="0"
      style={{ maxWidth: 800, margin: "0 auto" }}
      {...props}
    />
  );
};

const p = (
  // @ts-ignore
  { children }
) => {
  return <p className="mb-4 block">{children}</p>;
};

const img = (
  // @ts-ignore
  props
) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      width={500}
      height={500}
      className="w-full mb-4 inline-block"
    />
  );
};

const Test = () => {
  return "TESTING123123";
};

const components = { Test, YouTube, IFrame, img, p };

export function MDRenderer({
  source,
  className = "",
}: {
  source: any;
  className?: string;
}) {
  return (
    <div className={`wrapper prose prose-slate ${className}`}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}
