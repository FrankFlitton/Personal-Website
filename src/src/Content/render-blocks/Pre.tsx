import hljs from "highlight.js";
import { useMemo } from "react";
import parse from "html-react-parser";
import "highlight.js/styles/srcery.min.css";

/**
 * markdown's ``` builtin
 * @param props
 * @returns
 */
export const Pre = (props: any) => {
  const code = hljs.highlight(`${props?.children?.props?.children || ""}`, {
    language:
      (props?.children?.props?.className).replace("language-", "") || null,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Content = useMemo(() => {
    return () => parse(code.value);
  }, [code.value]);
  return (
    <div className="rounded-lg">
      <pre className="bg-zinc-900">
        <Content />
      </pre>
    </div>
  );
};
