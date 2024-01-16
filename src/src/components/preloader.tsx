import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({
  isActive,
  className = "",
}: {
  isActive: boolean;
  className?: string;
}) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={`${className}`}
          exit={{
            opacity: 0,
            transition: { ease: "easeOut", duration: 1, delay: 0.1 },
          }}
        >
          <div className="preloader w-full h-full bg-black home-slider-height">
            <div className="lights">
              <svg viewBox="0 0 144 144">
                <ellipse cx="72" cy="72" rx="50" ry="50" />
                <ellipse cx="72" cy="72" rx="50" ry="50" />
                <ellipse cx="72" cy="72" rx="50" ry="50" />
              </svg>
            </div>
            <Image
              width={144}
              height={144}
              className="logo-overlay"
              src="/img/branding/logo-black.svg"
              alt="loading..."
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
