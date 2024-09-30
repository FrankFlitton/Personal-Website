import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { mdiClose, mdiCoffee } from "@mdi/js";
import Icon from "@mdi/react";
import { ContactSection } from "./contactSection";
import { motion, AnimatePresence } from "framer-motion";
import useIsDark from "@/hooks/useIsDark";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const body = globalThis.window ? window?.document?.body : null;

  useLayoutEffect(() => {
    if (!globalThis.window) return;
    // setIsNavOpen false when pressing esc key
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Add noscroll class to body when nav is open
  useLayoutEffect(() => {
    if (!body) return;
    if (isNavOpen) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  }, [isNavOpen, body?.classList, body]);

  const isDark = useIsDark();

  return (
    <>
      <div
        className={`font-futura z-10 w-full text-sm flex flex-col backdrop-blur-md bg-white/80 dark:bg-black/40 fixed ${
          isNavOpen ? "h-screen" : "h-[80px]"
        }`}
      >
        <div className="w-screen items-center justify-between flex h-[80px] p-4">
          <Link
            className="flex items-center gap-2 mix-ble bg-black/0 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-200"
            href="/"
          >
            <Image
              src={
                isDark
                  ? "/img/branding/logo-black.svg"
                  : "/img/branding/logo-transparent.svg"
              }
              alt="Frank JE Flitton Logo"
              className="dark:bg-white"
              width={48}
              height={48}
              priority
            />
            <h1 className="text-2xl font-bold pr-2 text-black dark:text-white">
              Frank JE Flitton
            </h1>
          </Link>
          <button
            className="items-end justify-center"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <Icon
              className="hover:bg-black/20 dark:hover:bg-white/20 p-2 mb-[-0.5rem]"
              path={isNavOpen ? mdiClose : mdiCoffee}
              color={isDark ? "white" : "black"}
              size={1.5}
            ></Icon>
          </button>
        </div>
        <AnimatePresence mode="popLayout">
          {isNavOpen && (
            <motion.div
              className="h-[calc(100dvh-80px)] w-full box overflow-y-scroll"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
              }}
            >
              <ContactSection key="contact-container" isNavOpen={isNavOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Spacer */}
      <div className="h-[80px] bg-white dark:bg-black"></div>
    </>
  );
}
