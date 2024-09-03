import dynamic from "next/dynamic";
import { memo, useEffect } from "react";

const ReactEmbedGist = dynamic(() => import("react-embed-gist"), {
  ssr: false,
});

const GistClient = ({ id }: { id: string }) => {
  const registerMutationObserver = () => {
    if (globalThis.window) {
      const targetNode = document.getElementById(id);
      if (!targetNode) return;

      const config = { attributes: true, childList: true, subtree: true };

      const callback = () => {
        const iframeParent = globalThis.window.parent;
        if (iframeParent) {
          iframeParent.postMessage("GIST_IFRAME_UPDATED");
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    }
  };

  useEffect(() => {
    registerMutationObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={id}>
      <ReactEmbedGist gist={`FrankFlitton/${id}`} titleClass="hidden" />
    </div>
  );
};

export default memo(GistClient);
