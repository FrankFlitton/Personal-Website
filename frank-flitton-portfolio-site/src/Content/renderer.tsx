import React from "react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";

const YouTube = ({ id }: { id: string }) => {
  return (
    <p>
      <iframe
        src={"https://www.youtube.com/embed/" + id}
        width="100%"
        height="480"
        frameBorder="0"
        allowFullScreen
        style={{ maxWidth: 800, margin: "0 auto" }}
      ></iframe>
    </p>
  );
};

const IFrame = (
  props: React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >
) => {
  return (
    <p>
      <iframe
        width="100%"
        height="600"
        frameBorder="0"
        style={{ maxWidth: 800, margin: "0 auto" }}
        {...props}
      />
    </p>
  );
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

const components = { YouTube, IFrame, img, };

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
