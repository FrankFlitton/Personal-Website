export const fixMediumPublicationFooter = (html: string) => {
  return html.replace(/<h3>In Plain(.)+<img/, "<img");
};
