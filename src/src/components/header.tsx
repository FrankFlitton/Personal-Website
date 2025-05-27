import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { mdiClose, mdiCoffee, mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";
import Icon from "@mdi/react";
import { ContactSection } from "./contactSection";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "@/hooks/useTheme";
import { useIsScrollPastY } from "@/hooks/useIsScrollPastY";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const body = globalThis.window ? window?.document?.body : null;
  const isVisible = useIsScrollPastY(30);
  const isMobile = useIsMobile();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useLayoutEffect(() => {
    if (!isMobile) {
      setIsNavOpen(false);
      return;
    }
  }, [isMobileNavOpen, isMobile]);

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

  const { isDark, toggleTheme } = useTheme();
  const isHomePage = usePathname() === "/";

  return (
    <>
      <div
        className={`font-futura z-10 w-full text-sm flex flex-col backdrop-blur-md bg-white/80 dark:bg-black/40 fixed ${isNavOpen ? "h-screen" : "h-[80px]"
          }`}
        style={{
          height: isMobileNavOpen
            ? isNavOpen
              ? "100dvh"
              : 120
            : isNavOpen
              ? "100dvh"
              : 80,
        }}
      >
        <div className="w-screen items-center justify-between flex h-[80px] p-4">
          <Link
            className="flex items-center gap-2 mix-ble bg-black/0 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-200"
            href="/"
            onClick={() => {
              setIsNavOpen(false);
              setIsMobileNavOpen(false);
            }}
          >
            <AnimatePresence mode="popLayout">
              {(isVisible || isMobile || !isHomePage) && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, right: 100 }}
                  animate={{ opacity: 1, right: 1 }}
                  exit={{ opacity: 0, right: 0 }}
                >
                  <Image
                    key="nav-logo"
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
                </motion.div>
              )}
            </AnimatePresence>
            <h1 className="text-2xl font-bold pr-2 text-black dark:text-white">
              Frank JE Flitton
            </h1>
          </Link>
          {isMobile && (
            <button
              onClick={() => {
                setIsMobileNavOpen(!isMobileNavOpen);
                if (isNavOpen && isMobileNavOpen) setIsNavOpen(false);
              }}
            >
              <Icon
                className={`hover:bg-black/20 dark:hover:bg-white/20 p-2
                  transition-transform duration-200
                ${isMobileNavOpen || isMobileNavOpen ? "rotate-0" : "rotate-45"
                  }`}
                path={mdiClose}
                color={isDark ? "white" : "black"}
                size={1.5}
              ></Icon>
            </button>
          )}
          {!isMobile && (
            <div className="items-end justify-center">
              <Link
                className="ml-2 px-3 py-2 text-lg text-black dark:text-white"
                href={"/about/"}
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                About
              </Link>
              <Link
                className="ml-2 px-3 py-2 text-lg text-black dark:text-white"
                href={"/blog/"}
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                Blog
              </Link>
              <Link
                className="mx-2 px-3 py-2 text-lg text-black dark:text-white"
                href={"/projects/"}
                onClick={() => {
                  setIsNavOpen(false);
                }}
              >
                Projects
              </Link>
              <button onClick={toggleTheme} title="Toggle theme" className="">
                <Icon
                  className="hover:bg-black/20 dark:hover:bg-white/20 hover:scale-110 mb-[-0.5rem] p-1"
                  path={isDark ? mdiWeatherSunny : mdiWeatherNight}
                  color={isDark ? "white" : "black"}
                  size={1.2}
                />
              </button>
              <button
                onClick={() => {
                  setIsNavOpen(!isNavOpen);
                  setIsMobileNavOpen(false);
                }}
              >
                <Icon
                  className="hover:bg-black/20 dark:hover:bg-white/20 p-2 mb-[-0.75rem] hover:scale-110"
                  path={isNavOpen ? mdiClose : mdiCoffee}
                  color={isDark ? "white" : "black"}
                  size={1.5}
                ></Icon>
              </button>
            </div>
          )}
        </div>
        <AnimatePresence mode="popLayout">
          {isMobileNavOpen && (
            <motion.div
              className="relative w-full"
              style={{ height: 40, minHeight: 40 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
              }}
            >
              <div
                key="mobile-nav-container"
                className="w-full flex flex-row-reverse pr-3"
              >
                <div className="items-end text-lg">
                  <Link
                    className="px-4"
                    href={"/about/"}
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      setIsNavOpen(false);
                    }}
                  >
                    About
                  </Link>
                  <Link
                    className="p-4"
                    href={"/blog/"}
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      setIsNavOpen(false);
                    }}
                  >
                    Blog
                  </Link>
                  <Link
                    className="p-4"
                    href={"/projects/"}
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      setIsNavOpen(false);
                    }}
                  >
                    Projects
                  </Link>
                  <button
                    onClick={toggleTheme}
                    title="Toggle theme"
                    className="p-4 flex items-center"
                  >
                    <Icon
                      path={isDark ? mdiWeatherSunny : mdiWeatherNight}
                      color={isDark ? "white" : "black"}
                      size={0.8}
                    />
                  </button>
                  <button onClick={() => setIsNavOpen(!isNavOpen)}>
                    <span className="p-4">Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {isNavOpen && (
            <motion.div
              className={`w-full box overflow-y-scroll`}
              style={{ height: `calc(100vh - ${isMobileNavOpen ? 120 : 80}px` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
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
