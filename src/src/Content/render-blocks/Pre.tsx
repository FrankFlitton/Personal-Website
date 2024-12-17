import hljs from "highlight.js";
import { useMemo } from "react";
import parse from "html-react-parser";

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
    <div className="bg-slate-800 rounded-lg">
      <pre>
        <Content />
      </pre>
    </div>
  );
};
