import Image from "next/image";

type ImgProps = {
  alt?: string;
  /**
   * Rounded corners + drop shadow + hairline border.
   *
   * Product screenshots and UI captures usually have a white or near-white
   * background that bleeds into the page. `framed` lifts them off it so the
   * edge of the screenshot reads as the edge of an artifact. Photographs and
   * full-bleed art generally shouldn't use it.
   *
   * Authored as a bare attribute in MDX (`<Img src="…" framed />`), which
   * arrives as `true`; the string forms are tolerated for hand-written cases.
   */
  framed?: boolean | string;
  className?: string;
  [key: string]: any;
};

const FRAME_CLASSES = [
  "rounded-xl",
  "shadow-xl shadow-slate-900/15 dark:shadow-black/50",
  "ring-1 ring-slate-900/10 dark:ring-white/10",
].join(" ");

export const Img = ({ alt, framed, className = "", ...props }: ImgProps) => {
  const isFramed = framed === true || framed === "" || framed === "true";

  return (
    <p>
      <figure>
        <Image
          {...props}
          alt={alt ? alt : ""}
          width={500}
          height={500}
          className={[
            "w-full mb-4 inline-block",
            isFramed ? FRAME_CLASSES : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    </p>
  );
};
