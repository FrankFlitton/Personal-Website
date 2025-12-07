import useTheme from "@/hooks/useTheme";

interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  color: string;
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
    color: "blue",
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
    color: "purple",
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
    color: "amber",
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
    color: "green",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-900 dark:text-blue-100",
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-900 dark:text-purple-100",
    badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-900 dark:text-amber-100",
    badge: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-900 dark:text-green-100",
    badge: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  },
};

export default function SkillsSection() {
  const { isDark } = useTheme();

  return (
    <div className="w-full mb-16 max-w-screen-lg mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 text-center">
        Technical Expertise
      </h2>
      <p className="text-center text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
        Deep experience across the full stack, from distributed systems to user interfaces
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const colors = colorClasses[category.color as keyof typeof colorClasses];
          return (
            <div
              key={category.title}
              className={`p-6 rounded-lg border ${colors.bg} ${colors.border} transition-all hover:shadow-lg`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${colors.text}`}>
                {category.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
          Recent Highlights
        </h3>
        <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>
              Led Text-to-SQL LLM product with graph-based tool calling (Pydantic)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            <span>
              Architected AI/ML workflow builder driving 30% user growth at Union AI
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-2">•</span>
            <span>
              Rebuilt secure hosting platform serving 40,000+ monthly users at Google
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>
              Managed $2 trillion in assets annually with AI-driven quant systems at Boosted AI
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
