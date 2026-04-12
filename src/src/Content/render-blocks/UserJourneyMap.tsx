import useTheme from "@/hooks/useTheme";

export interface JourneyStep {
  id: number;
  description: string;
  /** 1 = very negative, 5 = very positive */
  sentiment: number;
  quote?: string;
}

export interface JourneyPhase {
  name: string;
  steps: JourneyStep[];
}

export interface UserJourneyMapProps {
  title?: string;
  persona?: {
    name: string;
    role: string;
    bio: string;
    photo?: string;
  };
  expectations?: string[];
  phases: JourneyPhase[];
  /** Hide the SVG sentiment chart (e.g. when sentiment data isn't meaningful) */
  showChart?: boolean;
}

// ─── Chart layout ─────────────────────────────────────────────────────────────
const VB_W = 1100;
const VB_H = 420;
const PL = 55;    // plot left edge
const PR = 1055;  // plot right edge
const PT = 110;   // plot top  (headroom for above-quotes)
const PB = 310;   // plot bottom (footroom for below-quotes)
const PW = PR - PL;
const PH = PB - PT;

function stepX(i: number, total: number): number {
  if (total <= 1) return (PL + PR) / 2;
  return PL + (i / (total - 1)) * PW;
}

function sentY(s: number): number {
  return PT + ((5 - s) / 4) * PH;
}

function segColor(s1: number, s2: number, dark: boolean): string {
  const avg = (s1 + s2) / 2;
  if (avg >= 3.75) return dark ? "#2dd4bf" : "#0d9488";
  if (avg < 2.75) return dark ? "#f87171" : "#ef4444";
  return dark ? "#94a3b8" : "#64748b";
}

function dotColor(s: number, dark: boolean): string {
  if (s >= 3.75) return dark ? "#2dd4bf" : "#0d9488";
  if (s < 2.75) return dark ? "#f87171" : "#ef4444";
  return dark ? "#94a3b8" : "#64748b";
}

function wrapText(text: string, maxChars = 24): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (test.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

// ─── Mobile sentiment arc ─────────────────────────────────────────────────────
function SentimentChartMobile({
  steps,
  isDark,
  phases,
}: {
  steps: JourneyStep[];
  isDark: boolean;
  phases: JourneyPhase[];
}) {
  const n = steps.length;
  const VBW = 380;
  const VBH = 110;
  const PL = 15;
  const PR = 365;
  const PT = 26;   // headroom for phase labels
  const PB = 100;
  const CR = 9;
  const PW = PR - PL;
  const PH = PB - PT;

  const sx = (i: number) => (n <= 1 ? (PL + PR) / 2 : PL + (i / (n - 1)) * PW);
  const sy = (s: number) => PT + ((5 - s) / 4) * PH;

  const bgFill  = isDark ? "#18181b" : "#ffffff";
  const numColor = isDark ? "#f4f4f5" : "#1e293b";
  const refColor = isDark ? "#3f3f46" : "#e2e8f0";
  const labelColor = isDark ? "#52525b" : "#94a3b8";

  // Phase label positions and divider X values
  let offset = 0;
  const phaseMeta = phases.map((phase) => {
    const start = offset;
    const end   = offset + phase.steps.length - 1;
    offset += phase.steps.length;
    return { name: phase.name, start, end, labelX: (sx(start) + sx(end)) / 2 };
  });

  return (
    <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full" aria-hidden="true">
      {/* Phase labels */}
      {phaseMeta.map(({ name, labelX }) => (
        <text key={name} x={labelX} y={13} textAnchor="middle" fontSize="8" fontWeight="bold" fill={labelColor}>
          {name.toUpperCase()}
        </text>
      ))}

      {/* Phase dividers */}
      {phaseMeta.slice(0, -1).map(({ end }, pi) => {
        const divX = (sx(end) + sx(end + 1)) / 2;
        return (
          <line key={pi} x1={divX} y1={PT - 4} x2={divX} y2={PB + 4}
            stroke={refColor} strokeWidth="0.8" strokeDasharray="3 3" />
        );
      })}

      {/* Neutral reference line */}
      <line x1={PL} y1={sy(3)} x2={PR} y2={sy(3)}
        stroke={refColor} strokeWidth="0.8" strokeDasharray="4 4" />

      {/* Segment lines */}
      {steps.slice(0, -1).map((step, i) => {
        const next = steps[i + 1];
        return (
          <line key={`ms-${i}`}
            x1={sx(i)}  y1={sy(step.sentiment)}
            x2={sx(i + 1)} y2={sy(next.sentiment)}
            stroke={segColor(step.sentiment, next.sentiment, isDark)}
            strokeWidth="2" strokeLinecap="round" />
        );
      })}

      {/* Dots */}
      {steps.map((step, i) => {
        const cx = sx(i);
        const cy = sy(step.sentiment);
        const color = dotColor(step.sentiment, isDark);
        return (
          <g key={`md-${step.id}`}>
            <circle cx={cx} cy={cy} r={CR} fill={bgFill} stroke={color} strokeWidth="2" />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fontWeight="bold" fill={numColor}>
              {step.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Sentiment chart ──────────────────────────────────────────────────────────
function SentimentChart({
  steps,
  isDark,
}: {
  steps: JourneyStep[];
  isDark: boolean;
}) {
  const n = steps.length;
  const CR = 13;     // circle radius
  const QW = 190;    // quote box width
  const QLH = 16;    // quote line height
  const QPad = 10;   // quote box padding (top/bottom and left)

  const bgFill = isDark ? "#18181b" : "#ffffff";
  const numColor = isDark ? "#f4f4f5" : "#1e293b";
  const refColor = isDark ? "#3f3f46" : "#e2e8f0";
  const qBg = isDark ? "#27272a" : "#f8fafc";
  const qBorder = isDark ? "#52525b" : "#cbd5e1";
  const qText = isDark ? "#d4d4d8" : "#475569";
  const axisLabel = isDark ? "#71717a" : "#94a3b8";

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="w-full"
      aria-hidden="true"
    >
      {/* Reference lines */}
      {([5, 4, 3, 2, 1] as const).map((level) => (
        <line
          key={level}
          x1={PL}
          y1={sentY(level)}
          x2={PR}
          y2={sentY(level)}
          stroke={refColor}
          strokeWidth={level === 3 ? 1.5 : 1}
          strokeDasharray={level === 3 ? undefined : "5 5"}
        />
      ))}

      {/* Axis labels */}
      {[
        { level: 5, label: "+" },
        { level: 3, label: "·" },
        { level: 1, label: "–" },
      ].map(({ level, label }) => (
        <text
          key={level}
          x={PL - 14}
          y={sentY(level) + 5}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill={axisLabel}
        >
          {label}
        </text>
      ))}

      {/* Segments */}
      {steps.slice(0, -1).map((step, i) => {
        const next = steps[i + 1];
        return (
          <line
            key={`seg-${i}`}
            x1={stepX(i, n)}
            y1={sentY(step.sentiment)}
            x2={stepX(i + 1, n)}
            y2={sentY(next.sentiment)}
            stroke={segColor(step.sentiment, next.sentiment, isDark)}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}

      {/* Quote callouts — rendered before circles so circles sit on top */}
      {steps.map((step, i) => {
        if (!step.quote) return null;
        const cx = stepX(i, n);
        const cy = sentY(step.sentiment);
        const above = step.sentiment >= 3;
        const lines = wrapText(step.quote);
        const boxH = lines.length * QLH + QPad * 2;
        const boxX = Math.max(PL, Math.min(PR - QW, cx - QW / 2));
        const boxY = above ? cy - CR - 8 - boxH : cy + CR + 8;

        const sentColor = dotColor(step.sentiment, isDark);
        return (
          <g key={`quote-${step.id}`}>
            <line
              x1={cx}
              y1={above ? cy - CR : cy + CR}
              x2={cx}
              y2={above ? boxY + boxH : boxY}
              stroke={sentColor}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <rect
              x={boxX}
              y={boxY}
              width={QW}
              height={boxH}
              rx={4}
              fill={qBg}
              stroke={sentColor}
              strokeWidth="1.5"
            />
            {lines.map((line, li) => (
              <text
                key={li}
                x={boxX + QPad}
                y={boxY + QPad + 12 + li * QLH}
                fontSize="11"
                fontStyle="italic"
                fill={qText}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Step circles — on top */}
      {steps.map((step, i) => {
        const cx = stepX(i, n);
        const cy = sentY(step.sentiment);
        const color = dotColor(step.sentiment, isDark);
        return (
          <g key={`dot-${step.id}`}>
            <circle
              cx={cx}
              cy={cy}
              r={CR}
              fill={bgFill}
              stroke={color}
              strokeWidth="2.5"
            />
            <text
              x={cx}
              y={cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="bold"
              fill={numColor}
            >
              {step.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const UserJourneyMap = ({
  title,
  persona,
  expectations,
  phases,
  showChart = true,
}: UserJourneyMapProps) => {
  const { isDark } = useTheme();
  const allSteps = phases.flatMap((p) => p.steps);
  const label = title ?? (persona ? `${persona.name} — User Journey` : "User Journey");

  const b = isDark ? "border-zinc-700" : "border-slate-200";

  // Only register as a lightbox diagram when there's an SVG to serialize
  const diagramProps = showChart
    ? { "data-diagram": "true", "data-diagram-title": label }
    : {};

  return (
    <div
      {...diagramProps}
      className={`not-prose rounded-lg border ${b} overflow-hidden bg-white dark:bg-zinc-900 my-6 ${showChart ? "cursor-pointer hover:ring-2 hover:ring-slate-300 dark:hover:ring-zinc-600 transition-shadow" : ""}`}
    >
      {/* ── Persona + Expectations ── */}
      {persona && (
        <div className={`grid md:grid-cols-2 border-b ${b}`}>
          <div className={`flex gap-4 p-5 border-r ${b}`}>
            {persona.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={persona.photo}
                alt={persona.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0 self-start"
              />
            )}
            <div className="min-w-0">
              <div className="font-bold text-slate-900 dark:text-zinc-100 text-base leading-tight">
                {persona.name}
                <span className="font-normal text-slate-500 dark:text-zinc-400 ml-1.5">
                  — {persona.role}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-zinc-300 mt-1.5 leading-relaxed m-0">
                {persona.bio}
              </p>
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3">
              Expectations
            </div>
            <ul className="space-y-1.5 m-0 p-0 list-none">
              {(expectations ?? []).map((exp, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 dark:text-zinc-300 flex gap-2"
                >
                  <span className="text-slate-400 dark:text-zinc-500 flex-shrink-0 mt-px">
                    •
                  </span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Mobile: vertical stacked phases with inline quotes ── */}
      <div className={`sm:hidden border-b ${b}`}>
        {phases.map((phase, pi) => (
          <div key={phase.name} className={pi < phases.length - 1 ? `border-b ${b}` : ""}>
            <div className={`px-4 py-2 bg-slate-100 dark:bg-zinc-800`}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-400">
                {phase.name}
              </span>
            </div>
            {phase.steps.map((step, si) => {
              const color = dotColor(step.sentiment, isDark);
              return (
                <div
                  key={step.id}
                  className={`px-4 py-3 flex gap-3 ${si < phase.steps.length - 1 ? `border-b ${b}` : ""}`}
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ borderColor: color, color }}
                  >
                    {step.id}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 dark:text-zinc-300 leading-snug m-0">
                      {step.description}
                    </p>
                    {step.quote && (
                      <p className="text-xs italic text-slate-500 dark:text-zinc-400 mt-1.5 m-0 leading-relaxed">
                        "{step.quote}"
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Desktop: horizontal scrollable phase grid ── */}
      <div className="relative hidden sm:block">
        <div className={`overflow-x-auto border-b ${b}`}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${phases.length}, minmax(140px, 1fr))`,
              minWidth: `${phases.length * 140}px`,
            }}
          >
            {phases.map((phase, pi) => (
              <div
                key={phase.name}
                className={`p-4 ${pi < phases.length - 1 ? `border-r ${b}` : ""}`}
              >
                <div className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-2 py-1 rounded mb-3 text-center">
                  {phase.name}
                </div>
                <div className="space-y-2.5">
                  {phase.steps.map((step) => (
                    <div key={step.id} className="flex gap-2 items-start">
                      <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                        {step.id}
                      </span>
                      <span className="text-sm text-slate-700 dark:text-zinc-300 leading-snug">
                        {step.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sentiment chart ── */}
      {showChart && (
        <>
          {/* Mobile: compact arc chart preserving up/down sentiment positioning */}
          <div className={`sm:hidden px-3 py-3 border-t ${b}`}>
            <SentimentChartMobile steps={allSteps} isDark={isDark} phases={phases} />
          </div>

          {/* Desktop: full SVG chart */}
          <div className="hidden sm:block px-2 py-1">
            <SentimentChart steps={allSteps} isDark={isDark} />
          </div>
        </>
      )}
    </div>
  );
};
