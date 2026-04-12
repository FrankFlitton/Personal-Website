import { MermaidDiagram } from "./MermaidDiagram";

export const Mermaid = ({ chart }: { chart: string }) => (
  <MermaidDiagram chart={chart} />
);
