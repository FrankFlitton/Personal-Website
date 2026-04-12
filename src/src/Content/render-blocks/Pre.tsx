import hljs from "highlight.js";
import { useMemo } from "react";
import parse from "html-react-parser";
import "highlight.js/styles/srcery.min.css";
import { MermaidDiagram } from "./MermaidDiagram";

/**
 * markdown's ``` builtin
 * @param props
 * @returns
 */
export const Pre = (props: any) => {
  const className = props?.children?.props?.className ?? "";
  const rawCode = `${props?.children?.props?.children || ""}`;

  if (className === "language-mermaid") {
    return <MermaidDiagram chart={rawCode} />;
  }

  const lang = className.replace("language-", "");
  const code = lang
    ? hljs.highlight(rawCode, { language: lang })
    : hljs.highlightAuto(rawCode);
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
