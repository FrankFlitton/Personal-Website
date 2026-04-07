export function TimelineItem({
  period,
  org,
  role,
  detail,
  active = false,
}: {
  period: string;
  org: string;
  role?: string;
  detail?: string;
  active?: boolean;
}) {
  return (
    <li className="relative">
      <span
        className={`absolute -left-[29.5px] top-[19px] w-2.5 h-2.5 rounded-full border ${
          active
            ? "bg-neutral-900 border-neutral-900 dark:bg-white dark:border-white"
            : "bg-white border-neutral-300 dark:bg-neutral-900 dark:border-neutral-600"
        }`}
      />
      <p className="text-xs text-neutral-400 mb-0.5">{period}</p>
      <p className="text-sm font-medium mb-0.5">{org}</p>
      {role && <p className="text-xs text-neutral-400 mb-1">{role}</p>}
      {detail && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {detail}
        </p>
      )}
    </li>
  );
}
