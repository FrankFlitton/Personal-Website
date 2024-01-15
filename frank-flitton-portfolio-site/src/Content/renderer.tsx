import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import { DialogSlider } from "@/components/dialogSlider";

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

const components = { YouTube, IFrame, img };

export function MDRenderer({
  source,
  className = "",
}: {
  source: any;
  className?: string;
}) {
  // Assemble the list of images and their descriptions for the slider
  // (done at runtime)
  const ref = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState<number>(-1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imgAlts, setImgAlts] = useState<string[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    if (!target) return;
    if (target?.nodeName !== "IMG" && !target.src) return;
    const index = imageUrls.indexOf(target.src);
    setImageIndex(index);
  };

  useEffect(() => {
    if (ref.current) {
      const imageNodes = ref.current.querySelectorAll("img");
      if (!imageNodes) return;

      const images = Array.from(imageNodes).filter((n) => {
        const img = n as HTMLImageElement;
        return n?.nodeName === "IMG";
      });

      // list of image src
      const urls = images.map((image) => image.src);
      const alts = images.map((image) => image.alt);
      setImageUrls(urls);
      setImgAlts(alts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.current, source.compiledSource]);

  return (
    <>
      <DialogSlider
        images={imageUrls}
        descriptions={imgAlts}
        openToIndex={imageIndex}
        onClose={(i) => setImageIndex(i)}
      />
      <div
        className={`wrapper prose prose-slate ${className}`}
        ref={ref}
        onClick={handleClick}
      >
        <MDXRemote {...source} components={components} />
      </div>
    </>
  );
}
