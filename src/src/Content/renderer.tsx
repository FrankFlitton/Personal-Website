import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { DialogSlider } from "@/components/dialogSlider";
import { Pre as pre } from "./render-blocks/Pre";
import { YouTube } from "./render-blocks/YouTube";
import { Img } from "./render-blocks/Img";
import { Gist } from "./render-blocks/Gist";
import { IFrame } from "./render-blocks/IFrame";
import { NPM } from "./render-blocks/NPM";
import { Hr as hr } from "./render-blocks/Hr";
import { Code as code } from "./render-blocks/Code";
import { Mermaid } from "./render-blocks/Mermaid";
import { UserJourney } from "./render-blocks/UserJourney";
import { UserJourneyMap } from "./render-blocks/UserJourneyMap";

const components = { YouTube, IFrame, Img, Gist, pre, NPM, hr, code, Mermaid, UserJourney, UserJourneyMap };

/** Build ordered media list (images + diagrams) from current DOM state. */
function collectMedia(root: HTMLElement): { urls: string[]; alts: string[]; elements: Element[] } {
  const urls: string[] = [];
  const alts: string[] = [];
  const elements: Element[] = [];

  root.querySelectorAll<Element>("img, [data-diagram]").forEach((el) => {
    if (el.nodeName === "IMG") {
      const img = el as HTMLImageElement;
      if (!img.src) return;
      urls.push(img.src);
      alts.push(img.alt);
      elements.push(el);
    } else {
      const svgEl = el.querySelector("svg");
      if (!svgEl) return; // not rendered yet — skip
      const svgStr = new XMLSerializer().serializeToString(svgEl);
      urls.push("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr));
      alts.push((el as HTMLElement).dataset.diagramTitle || "Diagram");
      elements.push(el);
    }
  });

  return { urls, alts, elements };
}

export function MDRenderer({
  source,
  className = "",
}: {
  source: any;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState<number>(-1);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imgAlts, setImgAlts] = useState<string[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target || !ref.current) return;

    // Image click — match by src URL
    if (target.nodeName === "IMG") {
      const src = (target as HTMLImageElement).src;
      const index = imageUrls.indexOf(src);
      if (index >= 0) setImageIndex(index);
      return;
    }

    // Diagram click — rebuild list synchronously so SVG data URLs are fresh,
    // then batch-update state and open to the correct position
    const diagramEl = target.closest("[data-diagram]");
    if (diagramEl) {
      const { urls, alts, elements } = collectMedia(ref.current);
      const pos = elements.indexOf(diagramEl);
      setImageUrls(urls);
      setImgAlts(alts);
      if (pos >= 0) setImageIndex(pos);
    }
  };

  // Rebuild media list on mount and whenever content (including async diagrams) changes.
  // MutationObserver catches SVGs that render after the initial mount.
  useEffect(() => {
    if (!ref.current) return;

    const rebuild = () => {
      if (!ref.current) return;
      const { urls, alts } = collectMedia(ref.current);
      setImageUrls(urls);
      setImgAlts(alts);
    };

    rebuild();

    let timer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(rebuild, 200);
    });

    observer.observe(ref.current, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
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
        className={`wrapper prose prose-lg prose-slate dark:prose-invert ${className}`}
        ref={ref}
        onClick={handleClick}
      >
        <MDXRemote {...source} components={components} />
      </div>
    </>
  );
}
