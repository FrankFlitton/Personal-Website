import AsciiGrid from "@/components/CanvasAnimations/asciiGrid";
import PlatonicSolids3D from "@/components/CanvasAnimations/platonicSolids3D";
import CircleFlourish from "@/components/HomePage/CircleFlourish";
import EndlessCircleAnimation from "@/components/HomePage/EndlessCircleAnimation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tagline } from "@/const/const";
import DarkToggle from "@/components/CanvasAnimations/darkToggle";
import useTheme from "@/hooks/useTheme";

export default function Home() {
  const [contentLayout, setContentLayout] = useState<"bento" | "content">(
    "bento"
  );
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const { isDark, theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setCursorPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      id="main-layout"
      layout
      className="grid gap-[1px] h-screen"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={
        {
          "--cursor-x": `${cursorPosition.x}%`,
          "--cursor-y": `${cursorPosition.y}%`,
          backgroundImage: isDark
            ? `radial-gradient(circle at var(--cursor-x) var(--cursor-y), #3b82f6 0%, #1e40af 50%, #1e3a8a 100%)`
            : `radial-gradient(circle at var(--cursor-x) var(--cursor-y), #fbbf24 0%, #f59e0b 50%, #d97706 100%)`,
          gridTemplateColumns:
            contentLayout === "bento"
              ? "repeat(3, minmax(0, 1fr))"
              : "50px auto",
          gridTemplateRows:
            contentLayout === "bento"
              ? "repeat(4, minmax(0, 1fr))"
              : "auto 50px 50px 50px 50px 50px",
          gridAutoFlow: "column",
        } as React.CSSProperties
      }
    >
      <motion.div
        layout
        style={{
          gridColumn: contentLayout === "bento" ? "span 2" : "span 1",
          gridRow: contentLayout === "bento" ? "span 3" : "span 1",
          width: contentLayout === "bento" ? "100%" : "auto",
        }}
        className="bg-black flex items-center justify-center rounded-br-xl overflow-hidden"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0, ease: "easeInOut" }}
      >
        <div className="relative inset-0 size-full">
          <div className="absolute inset-0 size-full">
            <EndlessCircleAnimation isDark={isDark} />
          </div>
          <AnimatePresence>
            {contentLayout === "bento" && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute z-10 text-white p-4 bottom-8"
              >
                <p className="text-2xl text-white dark:text-neutral-400 w-full sm:w-2/3">
                  {tagline}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div layout className="row-span-1 col-span-1 p-2 bg-black">
        <AsciiGrid isDark={isDark} />
      </motion.div>
      <motion.div
        layout
        className="row-span-1 col-span-1 p-2 bg-black text-white"
        onClick={() =>
          setContentLayout(contentLayout === "content" ? "bento" : "content")
        }
      >
        icon here
      </motion.div>
      <motion.div layout className="row-span-1 col-span-1 bg-black">
        <PlatonicSolids3D isDark={isDark} />
      </motion.div>
      <motion.div layout className="row-span-1 p-2 bg-black">
        <CircleFlourish isDark={isDark} full />
      </motion.div>
      <motion.div
        layout
        className="row-span-1 col-span-1 p-2 bg-black text-white"
      >
        <DarkToggle />
      </motion.div>
      <AnimatePresence>
        {contentLayout === "content" && (
          <motion.div
            className="row-span-6 p-2 bg-black text-white"
            onClick={() =>
              setContentLayout(
                contentLayout === "content" ? "bento" : "content"
              )
            }
          >
            CONTENT
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
