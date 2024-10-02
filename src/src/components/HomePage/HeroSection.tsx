import Image from "next/image";
import EndlessCircleAnimation from "./EndlessCircleAnimation";
import LargeDotLine from "./LargeDotline";
import useIsDark from "@/hooks/useIsDark";
import { tagline } from "@/const/const";

export default function HeroSection() {
  const isDark = useIsDark();
  return (
    <>
      <div className="w-[100cqw] h-[75vh] h-max-[75vh] mx-auto relative overflow-x-clip ml-[-1em]">
        <div className="absolute inset-0 sm:inset-10">
          {/* light */}
          <div className="absolute inset-5 bg-gradient-to-t from-slate-400 to-neutral-300 opacity-100 dark:opacity-0"></div>
          <div className="absolute inset-5 bg-gradient-to-tr from-amber-600 to-amber-400 opacity-30 dark:opacity-0 bg-blend-color-burn"></div>
          {/* dark */}
          <div className="absolute inset-5 bg-gradient-to-tr from-orange-300 to-cyan-100 dark:from-blue-950 dark:to-stone-700 opacity-0 dark:opacity-50"></div>
          <div className="absolute inset-5 bg-gradient-to-t from-neutral-900 to-black opacity-0 dark:opacity-60"></div>

          <div className="absolute inset-5 object-cover opacity-100 dark:opacity:20">
            <Image
              className="object-cover w-full h-full"
              alt="Scan texture"
              src="/img/branding/blurA.png"
              width={960}
              height={540}
            ></Image>
          </div>
          <div className="absolute inset-5 object-cover opacity-100 dark:opacity:30">
            <Image
              className="object-cover w-full h-full"
              alt="Scan texture"
              src="/img/branding/blurB.png"
              width={960}
              height={540}
            ></Image>
          </div>

          <div className="absolute inset-5 object-cover mix-blend-overlay dark:mix-blend-normal opacity-10 dark:opacity:100">
            {/* <Image
              className="object-cover w-full h-full"
              alt="Scan texture"
              src="/img/branding/scan_texture_blk.png"
              width={960}
              height={540}
            ></Image> */}
          </div>
        </div>
        <div className="w-9/12 h-[calc(75dvh)] mx-auto relative">
          <div className="h-full w-full mx-auto absolute inset-0">
            {/* Border */}
            <div className="absolute inset-[-1px] rounded-xl border bg-black border-neutral-600 dark:border-neutral-900 shadow-2xl"></div>

            <div className="absolute w-full h-full top-2 left-2 rounded-xl bg-neutral-800 blur opacity-20"></div>
            <div className="absolute w-full h-full top-2 left-2 rounded-xl bg-amber-500 dark:bg-blue-600 shadow-lg"></div>
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <EndlessCircleAnimation isDark={isDark} />
            </div>

            <div className="absolute w-full h-full">
              {/* Top dotted border */}
              {/* <LargeDotLine className="absolute top-5 left-5 right-5 h-5" /> */}
              {/* Bottom dotted border */}
              {/* <LargeDotLine
                className="absolute bottom-5 left-5 right-5 h-5 text-right"
                textAlign="right"
              /> */}
              {/* Left dotted border */}
              {/* <LargeDotLine className="absolute top-10 left-5 bottom-10 w-5" /> */}
              {/* Right dotted border */}
              {/* <LargeDotLine className="absolute top-10 right-5 bottom-10 w-5" /> */}
            </div>

            <div className="h-full w-full absolute inset-15">
              {/* <div className="items-end md:items-center text-center flex h-full flex-col md:justify-end justify-end">
                <div>
                  <h2 className="md:text-7xl text-4xl font-bold stroke stroke-black text-white md:text-white drop-shadow-lg md:drop-shadow-none dark:text-white py-10 items-end md:items-center pt-20">
                    <span className="px-5 pb-10 md:pb-0 flex flex-col w-full">
                      <span>Let&apos;s Build the Future Together</span>
                      <span className="bg-amber-500 dark:bg-blue-700 h-1 w-3/6 md:w-2/6 mx-auto mt-10 mb-5">
                        &nbsp;
                      </span>
                    </span>
                  </h2>
                </div>
              </div> */}
            </div>
          </div>
          {/* end black */}
        </div>
      </div>
      <div className="h-full max-w-screen-lg w-full mt-16 mx-auto">
        <p
          className="mx-auto text-center text-2xl text-neutral-500 dark:text-neutral-400 mb-16 w-full sm:w-2/3"
        >
          {tagline}
        </p>
      </div>
    </>
  );
}
