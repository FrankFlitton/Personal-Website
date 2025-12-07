import CircleFlourish from "./CircleFlourish";

interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Infrastructure",
    description: "Distributed systems, APIs, and cloud architecture",
    skills: [
      "Python",
      "Java",
      "Spring Boot",
      "Node.js",
      "FastAPI",
      "Flask",
      "Pydantic",
      "SQL",
      "BigQuery",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Azure",
      "CI/CD",
      "Serverless",
      "gRPC",
      "Protocol Buffers",
      "Express.js",
    ],
  },
  {
    title: "AI/ML & Data",
    description: "Machine learning systems and data pipelines",
    skills: [
      "Text-to-SQL LLMs",
      "TensorFlow.js",
      "AI Agents",
      "Tool Calling",
      "OpenCV",
      "Jupyter Notebooks",
      "Data Visualization",
      "ETL Pipelines",
      "Time Series Analysis",
      "BigQuery",
    ],
  },
  {
    title: "Frontend & UX Engineering",
    description: "User interfaces and design systems",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Redux",
      "Vue.js",
      "Flutter",
      "Dart",
      "Tailwind CSS",
      "Framer Motion",
      "Design Systems",
      "Figma-to-Code",
      "Accessibility (a11y)",
      "Performance Optimization",
    ],
  },
  {
    title: "Leadership & Process",
    description: "Team leadership and technical strategy",
    skills: [
      "Team Leadership (15+ engineers)",
      "System Architecture",
      "Technical Documentation",
      "Code Review",
      "Agile/Scrum",
      "UX Research",
      "Product Strategy",
      "Incident Response",
      "Mentorship",
    ],
  },
];

const highlights = [
  "Led Text-to-SQL LLM product with graph-based tool calling (Pydantic)",
  "Architected AI/ML workflow builder driving 30% user growth at Union AI",
  "Rebuilt secure hosting platform serving 40,000+ monthly users at Google",
  "Managed $2 trillion in assets annually with AI-driven quant systems at Boosted AI",
];

export default function SkillsSection() {
  return (
    <div className="w-full relative max-w-screen-lg mx-auto">
      <div className="absolute flex top-0 left-0 w-full">
        <div className="mx-auto">
          <CircleFlourish isDark={false} />
        </div>
      </div>
      <div className="relative block w-full py-5 mb-10 text-black dark:text-white">
        <h2 className="text-4xl font-bold block w-full text-center">
          Technical Expertise
        </h2>
      </div>
      <div className="flex w-3/4 mx-auto mb-10 text-center prose prose-lg dark:prose-invert">
        <p>
          Deep experience across the full stack, from distributed systems to user interfaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {skillCategories.map((category) => {
          return (
            <div
              key={category.title}
              className="bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 p-6"
            >
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 p-6">
        <h3 className="text-xl font-bold text-black dark:text-white mb-4">
          Recent Highlights
        </h3>
        <ul className="space-y-3">
          {highlights.map((highlight, i) => (
            <li key={i} className="flex items-start text-black/70 dark:text-white/70">
              <span className="mr-3 text-black/40 dark:text-white/40">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
