import { useEffect, useState } from "react";

export const ProgressRing = ({
  activeIndex,
  markerIndex,
  totalLength,
  className = "",
}: {
  activeIndex: number;
  markerIndex: number;
  totalLength: number;
  className?: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsActive(activeIndex === markerIndex);
    }, 10);
  }, [activeIndex, markerIndex]);

  return (
    <div className={`${isActive ? "active" : ""} progress-ring ${className}`}>
      <svg viewBox="0 0 89 89" xmlns="http://www.w3.org/2000/svg">
        <circle cx="44.5" cy="44.5" r="43.5" />
      </svg>
      <span className="number">{markerIndex + 1}</span>
      <hr />
      <span className="number">{totalLength}</span>
    </div>
  );
};
