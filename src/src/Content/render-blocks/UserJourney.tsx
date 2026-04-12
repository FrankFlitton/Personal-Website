import { MermaidDiagram } from "./MermaidDiagram";

interface JourneyTask {
  label: string;
  score: number;
}

interface JourneySection {
  name: string;
  tasks: JourneyTask[];
}

interface UserJourneyProps {
  title: string;
  actor?: string;
  sections: JourneySection[];
}

const buildChart = (
  title: string,
  actor: string,
  sections: JourneySection[]
): string => {
  const sectionLines = sections.flatMap((section) => [
    `  section ${section.name}`,
    ...section.tasks.map(
      (task) => `    ${task.label.replace(/:/g, "-")}: ${task.score}: ${actor}`
    ),
  ]);
  return `journey\n  title ${title}\n${sectionLines.join("\n")}`;
};

export const UserJourney = ({
  title,
  actor = "User",
  sections,
}: UserJourneyProps) => {
  const chart = buildChart(title, actor, sections);
  return <MermaidDiagram chart={chart} />;
};
