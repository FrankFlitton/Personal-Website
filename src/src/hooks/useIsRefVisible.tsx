import { useEffect, useState } from "react";

export const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isIntersecting;
};
