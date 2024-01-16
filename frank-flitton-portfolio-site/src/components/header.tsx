import { mdiClose, mdiCoffee } from "@mdi/js";
import Icon from "@mdi/react";
import Image from "next/image";
import Link from "next/link";
import { ContactSection } from "./contactSection";
import { useLayoutEffect, useState } from "react";

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

  return (
    <>
      <div
        className={`font-futura z-10 w-full text-sm flex flex-col backdrop-blur-md bg-white/80 fixed ${
          isNavOpen ? "h-screen" : "h-[80px]"
        }`}
      >
        <div className="w-screen items-center justify-between flex h-[80px] p-4">
          <Link
            className="flex items-center gap-2 mix-ble bg-black/0 hover:bg-black/20 transition-colors duration-200"
            href="/"
          >
            <Image
              src="/img/branding/logo-transparent.svg"
              alt="Frank JE Flitton Logo"
              width={48}
              height={48}
              priority
            />
            <h1 className="text-2xl font-bold pr-2 text-black">Frank JE Flitton</h1>
          </Link>
          <button
            className="items-end justify-center"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <Icon
              className="hover:bg-black/10 p-2 mb-[-0.5rem]"
              path={isNavOpen ? mdiClose : mdiCoffee}
              color="black"
              size={1.5}
            ></Icon>
          </button>
        </div>
        {isNavOpen && <ContactSection isNavOpen={isNavOpen} />}
      </div>
      {/* Spacer */}
      <div className="h-[80px]"></div>
    </>
  );
}
