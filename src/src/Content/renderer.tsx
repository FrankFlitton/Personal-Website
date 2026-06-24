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

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Embedded Futura @font-face CSS for serialized SVGs.
 *
 * Diagrams are serialized to standalone `data:` URLs and shown in an <img>,
 * which is isolated from the page's stylesheet — so the site's webfont never
 * loads and text falls back to serif. We fetch the woff2 files once, base64
 * them, and inline an @font-face block into each SVG so it keeps Futura in the
 * lightbox. Cached at module scope so every diagram/rebuild reuses it.
 */
let fontFaceCSS: string | null = null;
let fontFacePromise: Promise<string> | null = null;

function loadFontFaceCSS(): Promise<string> {
  if (fontFaceCSS != null) return Promise.resolve(fontFaceCSS);
  if (fontFacePromise) return fontFacePromise;

  const toBase64 = async (url: string) => {
    const buf = await (await fetch(url)).arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  fontFacePromise = (async () => {
    try {
      const [book, bold] = await Promise.all([
        toBase64("/fonts/book.woff2"),
        toBase64("/fonts/bold.woff2"),
      ]);
      fontFaceCSS =
        `@font-face{font-family:"Futura";font-weight:normal;font-style:normal;` +
        `src:url("data:font/woff2;base64,${book}") format("woff2");}` +
        `@font-face{font-family:"Futura";font-weight:700;font-style:normal;` +
        `src:url("data:font/woff2;base64,${bold}") format("woff2");}`;
    } catch {
      fontFaceCSS = ""; // give up gracefully; text falls back to sans-serif
    }
    return fontFaceCSS;
  })();

  return fontFacePromise;
}

/**
 * Serialize a rendered diagram SVG to a self-contained data URL: pick the
 * visible SVG (components like UserJourneyMap render hidden mobile + desktop
 * variants), embed the webfont, and paint a theme-matched background so it
 * reads on the lightbox's dark backdrop.
 */
function serializeDiagram(el: Element): string | null {
  const svgs = Array.from(el.querySelectorAll("svg"));
  if (!svgs.length) return null; // not rendered yet — skip
  const svgEl =
    svgs.find((s) => s.getBoundingClientRect().width > 0) ?? svgs[0];

  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", SVG_NS);

  const isDark = document.documentElement.classList.contains("dark");
  const bg = isDark ? "#18181b" : "#ffffff";

  // Background rect sized to the viewBox (fallback to the rendered box).
  const vb = clone.getAttribute("viewBox");
  let x = 0, y = 0, w = 0, h = 0;
  if (vb) {
    [x, y, w, h] = vb.split(/[\s,]+/).map(Number);
  } else {
    const box = svgEl.getBoundingClientRect();
    w = box.width;
    h = box.height;
  }
  if (w && h) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(w));
    rect.setAttribute("height", String(h));
    rect.setAttribute("fill", bg);
    clone.insertBefore(rect, clone.firstChild);
  }

  if (fontFaceCSS) {
    const style = document.createElementNS(SVG_NS, "style");
    style.textContent = fontFaceCSS;
    clone.insertBefore(style, clone.firstChild);
  }
  clone.style.fontFamily = 'Futura, ui-sans-serif, system-ui, sans-serif';

  const svgStr = new XMLSerializer().serializeToString(clone);
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
}

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
      const url = serializeDiagram(el);
      if (!url) return; // not rendered yet — skip
      urls.push(url);
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

    // Embed the webfont, then rebuild so cached SVG data URLs include it.
    loadFontFaceCSS().then(() => rebuild());

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
