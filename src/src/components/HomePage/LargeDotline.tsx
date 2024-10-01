export default function LargeDotLine({
  className,
  color,
  colorDark,
  textAlign,
}: {
  className?: string;
  color?: string;
  colorDark?: string;
  textAlign?: "left" | "right" | "justify";
}) {
  return (
    // Array builder for the dotline
    // tailwind compiler didn't like the escape for "•" in an array
    // so it's hardcoded here
    <div
      className={`
        after:absolute
        after:w-full
        after:h-full
        after:inset-0
        after:text-${color || "amber-500"}
        after:dark:text-${colorDark || "blue-600"}
        after:tracking-[0.5rem]
        after:leading-[1.5rem]
        after:text-[1rem]
        after:text-${textAlign || "justify"}
        after:overflow-hidden
        after:break-words
        after:content-['••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••']
        ${className}`.replace(/\s+/g, " ")}
    ></div>
  );
}
