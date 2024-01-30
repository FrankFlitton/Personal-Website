import Head from "next/head";

export const PageMeta = ({
  title,
  description,
  image,
  color,
}: {
  title?: string;
  description?: string;
  image?: string;
  color?: string;
}) => {
  const metaTitle = title
    ? `${title} | Frank JE Flitton | Developing Great Products`
    : "Frank JE Flitton | Developing Great Products";
  const metaDescription = description
    ? description
    : "Frank is a Full Stack Software Engineer and Lead Designer specializing in software engineering, UX research, and product design.";
  const metaImage = !!image?.length ? image : "/img/og-image.png";
  const metaImageURL = metaImage.startsWith("http")
    ? metaImage
    : `https://frankflitton.com${metaImage}`;
  const metaColor = color ? color : "#000000";

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="theme-color" content={metaColor} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={"@frankflitton"} />
      <meta name="twitter:creator" content={"@frankflitton"} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImageURL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={metaImageURL} />
    </Head>
  );
};
