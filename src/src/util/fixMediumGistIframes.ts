const mediumMediaIdToGistId = (match: RegExpExecArray) =>
  fetch(match[1])
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      const token = "/raw/";
      const rawIndex = text.indexOf(token);
      // const endOfId = text.indexOf("/", token.length + rawIndex);
      const subString = text.substring(rawIndex - 32, rawIndex);

      const data = {
        find: match[0],
        replace: subString,
      };
      return data;
    });

export const gistReferenceTemplate = (id: string) => {
  return `<iframe id="gist-${id}" class="gist-iframe" width="600" height="auto" frameborder="0" src="/gist/${id}/"></iframe>`;
};

export const fixMediumGistIframes = async (html: string): Promise<string> => {
  // Regular expression to find iframes with the specific structure
  const iframeRegex =
    /<iframe[^>]*>\s*<a href="(https:\/\/medium\.com\/media\/[^\s]+)".*?<\/a>\s*<\/iframe>/g;

  const findAll = html.matchAll(iframeRegex);

  const promises = [...findAll].map((match) => {
    return mediumMediaIdToGistId(match);
  });
  const ids = await Promise.all(promises);

  // Replace the iframes with the href content
  let newHtml = html;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    newHtml = newHtml.replace(id.find, gistReferenceTemplate(id.replace));
  }

  return newHtml;
};
