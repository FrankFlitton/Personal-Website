import { useEffect, useId, useRef, useState } from "react";
import useTheme from "@/hooks/useTheme";

const lightVars = {
  background: "#f8fafc",
  primaryColor: "#e2e8f0",
  primaryTextColor: "#0f172a",
  primaryBorderColor: "#94a3b8",
  lineColor: "#64748b",
  secondaryColor: "#f1f5f9",
  tertiaryColor: "#e2e8f0",
  edgeLabelBackground: "#f8fafc",
  nodeTextColor: "#1e293b",
  fontFamily: "Futura, sans-serif",
  fontSize: "15px",
};

const darkVars = {
  background: "#18181b",
  primaryColor: "#27272a",
  primaryTextColor: "#f4f4f5",
  primaryBorderColor: "#52525b",
  lineColor: "#a1a1aa",
  secondaryColor: "#3f3f46",
  tertiaryColor: "#27272a",
  edgeLabelBackground: "#18181b",
  nodeTextColor: "#e4e4e7",
  fontFamily: "Futura, sans-serif",
  fontSize: "15px",
};

const PADDING = 20;

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const { isDark } = useTheme();
  const reactId = useId();
  const renderCount = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !globalThis.window) return;

    let cancelled = false;

    const run = async () => {
      const mermaid = (await import("mermaid")).default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: isDark ? darkVars : lightVars,
        fontFamily: "Futura, sans-serif",
        flowchart: { curve: "basis" },
      });

      try {
        renderCount.current += 1;
        const safeId = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}-${renderCount.current}`;
        const result = await mermaid.render(safeId, chart.trim());
        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
          setSvg("");
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [chart, isDark, mounted, reactId]);

  // After SVG renders into the DOM, clip viewBox to actual content bounds
  // to eliminate dead vertical space (common in journey/gantt diagrams)
  useEffect(() => {
    if (!svg || !containerRef.current) return;
    const svgEl = containerRef.current.querySelector("svg") as SVGSVGElement | null;
    if (!svgEl) return;

    try {
      const bbox = svgEl.getBBox();
      if (bbox.height > 0) {
        const newViewBox = `${bbox.x - PADDING} ${bbox.y - PADDING} ${bbox.width + PADDING * 2} ${bbox.height + PADDING * 2}`;
        svgEl.setAttribute("viewBox", newViewBox);
        svgEl.removeAttribute("height");
        svgEl.style.maxWidth = "100%";
        svgEl.style.width = "100%";
      }
    } catch {
      // getBBox can throw in some environments — leave SVG as-is
    }
  }, [svg]);

  if (!mounted) {
    return <div className="min-h-[120px] rounded-lg" aria-hidden />;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-950/30 border border-red-700 p-4 text-red-400 text-sm font-mono my-6">
        <strong>Diagram error:</strong> {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto rounded-lg p-4 bg-slate-50 dark:bg-zinc-900"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
