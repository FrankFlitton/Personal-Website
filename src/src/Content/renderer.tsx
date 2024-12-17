import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { DialogSlider } from "@/components/dialogSlider";
import "highlight.js/styles/default.min.css";
import { Pre as pre } from "./render-blocks/Pre";
import { YouTube } from "./render-blocks/YouTube";
import { Img } from "./render-blocks/Img";
import { Gist } from "./render-blocks/Gist";
import { IFrame } from "./render-blocks/IFrame";
import { NPM } from "./render-blocks/NPM";
import { Hr as hr } from "./render-blocks/Hr";

const components = { YouTube, IFrame, Img, Gist, pre, NPM, hr };

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
        return img?.nodeName === "IMG";
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
        className={`wrapper prose prose-slate dark:prose-invert ${className}`}
        ref={ref}
        onClick={handleClick}
      >
        <MDXRemote {...source} components={components} />
      </div>
    </>
  );
}
