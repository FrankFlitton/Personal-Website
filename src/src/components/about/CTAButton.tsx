import Icon from "@mdi/react";

export function CTAButton({
  href,
  icon,
  onClick,
  children,
}: {
  href?: string;
  icon: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const className =
    "text-sm font-medium border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 no-underline";

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        <Icon path={icon} size={0.75} />
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      <Icon path={icon} size={0.75} />
      {children}
    </a>
  );
}
