import { useLayoutEffect, useState } from "react";

export const useIsScrollPastY = (y: number) => {
  const [isPastY, setIsPastY] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > y) {
        setIsPastY(true);
      } else {
        setIsPastY(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [y]);

  return isPastY;
};
