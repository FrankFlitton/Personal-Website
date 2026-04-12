import { MermaidDiagram } from "./MermaidDiagram";

export const Mermaid = ({ chart, title }: { chart: string; title?: string }) => (
  <MermaidDiagram chart={chart} title={title} />
);
