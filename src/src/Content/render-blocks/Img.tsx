import Image from "next/image";

type ImgProps = {
  src: string;
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
  /**
   * Constrain by viewport height instead of column width.
   *
   * Phone captures are far taller than they are wide, so the default
   * `w-full` stretches them across the prose column and down several screen
   * heights. `tall` caps the height, lets the width follow the image's own
   * aspect ratio, and centres the result. Since the image is never scaled
   * past its natural size it also stays sharp.
   *
   * Authored as a bare attribute in MDX (`<Img src="…" tall />`).
   */
  tall?: boolean | string;
  className?: string;
  [key: string]: any;
};

const FRAME_CLASSES = [
  "rounded-xl",
  "shadow-xl shadow-slate-900/15 dark:shadow-black/50",
  "ring-1 ring-slate-900/10 dark:ring-white/10",
].join(" ");

const isSet = (v?: boolean | string) => v === true || v === "" || v === "true";

export const Img = ({ alt, framed, tall, className = "", ...props }: ImgProps) => {
  const isFramed = isSet(framed);
  const isTall = isSet(tall);

  // w-full and w-auto would both land in the class list otherwise, and there's
  // no tailwind-merge here to resolve them — pick one sizing rule up front.
  const sizing = isTall
    ? "max-h-[80vh] w-auto mx-auto block"
    : "w-full inline-block";

  return (
    <p>
      <figure>
        <Image
          {...props}
          alt={alt ? alt : ""}
          width={500}
          height={500}
          className={[
            sizing,
            "mb-4",
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
