import Image from "next/image";
import EndlessCircleAnimation from "./EndlessCircleAnimation";

export default function HeroSection() {
  return (
    <div className="w-[100cqw] h-full h-min-screen mx-auto relative overflow-x-clip ml-[-1em]">
      <div className="absolute inset-0 sm:inset-10">
        {/* <div className="absolute inset-5 bg-gradient-to-tr from-orange-300 to-cyan-100 dark:from-blue-950 dark:to-stone-700 opacity-20 dark:opacity-50"></div>
        <div className="absolute inset-5 bg-gradient-to-t from-amber-100 to-stone-400 dark:from-neutral-900 dark:to-black opacity-20 dark:opacity-60"></div> */}

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
        <div className="absolute inset-5 object-cover opacity-60 dark:opacity:30">
          <Image
            className="object-cover w-full h-full"
            alt="Scan texture"
            src="/img/branding/blurB.png"
            width={960}
            height={540}
          ></Image>
        </div>

        <div className="absolute inset-5 object-cover mix-blend-overlay dark:mix-blend-normal opacity-10 dark:opacity:100">
          <Image
            className="object-cover w-full h-full"
            alt="Scan texture"
            src="/img/branding/scan_texture_blk.png"
            width={960}
            height={540}
          ></Image>
        </div>
      </div>
      <div className="w-9/12 h-[calc(95dvh-80px)] mx-auto relative">
        <div className="h-full w-full sm:w-9/12 md:w-4/12 min-w-[300px] max-w-[600px] md:ml-[50%] mx-auto absolute inset-0">
          {/* Border */}
          <div className="absolute inset-[-1px] rounded-xl border bg-black border-neutral-600 dark:border-neutral-900 shadow-2xl"></div>

          {/* Bottom Gold */}
          <div className="absolute top-1/4 md:top-2/4 left-full w-[21vmin] h-[34vmin] rounded-xl ml-[-1rem] overflow-hidden shadow-lg">
            {/* Gold Bar */}
            <div className="absolute h-full w-full bg-gradient-to-bl from-amber-400 to-amber-500 dark:from-blue-600 dark:to-blue-800"></div>
            {/* Gold Blob */}
            <div className="absolute rounded-full top-10 left-10 w-[21cqh] h-[21cqh] bg-gradient-to-tr from-amber-400 to-amber-500 dark:from-blue-600 dark:to-blue-800"></div>
          </div>

          <div className="absolute w-full h-full top-2 left-2 rounded-xl bg-neutral-800 blur opacity-20"></div>
          <div className="absolute w-full h-full top-2 left-2 rounded-xl bg-amber-500 dark:bg-blue-600 shadow-lg"></div>
          <div className="absolute inset-0 rounded-xl overflow-hidden dark:hue-rotate-180 dark:brightness-75 dark:saturate-150">
            <EndlessCircleAnimation />
          </div>

          <div className="dark:hue-rotate-180 dark:saturate-150 absolute w-full h-full">
            {/* Top dotted border */}
            <div
              className="absolute inset-5"
              style={{
                backgroundImage:
                  "radial-gradient(closest-side at 15% 50%, goldenrod 0%, goldenrod 60%,transparent 61%)",
                backgroundPosition: "100% 0%",
                backgroundSize: "24px 8px",
                backgroundRepeat: "repeat-x",
              }}
            ></div>
            {/* Left dotted border */}
            <div
              className="absolute inset-5"
              style={{
                backgroundImage:
                  "radial-gradient(closest-side at 50% 15%, goldenrod 0%, goldenrod 60%,transparent 61%)",
                backgroundPosition: "0% 50%",
                backgroundSize: "8px 24px",
                backgroundRepeat: "repeat-y",
              }}
            ></div>
            {/* Right dotted border */}
            <div
              className="absolute inset-5"
              style={{
                backgroundImage:
                  "radial-gradient(closest-side at 50% 15%, goldenrod 0%, goldenrod 60%,transparent 61%)",
                backgroundPosition: "100% 50%",
                backgroundSize: "8px 24px",
                backgroundRepeat: "repeat-y",
              }}
            ></div>
            {/* Bottom dotted border */}
            <div
              className="absolute inset-5 text-blue-600"
              style={{
                backgroundImage:
                  "radial-gradient(closest-side at 15% 50%, goldenrod 0%, goldenrod 60%,transparent 61%)",
                backgroundPosition: "100% 100%",
                backgroundSize: "24px 8px",
                backgroundRepeat: "repeat-x",
              }}
            ></div>
          </div>

          {/* Top Gold */}
          <div className="absolute top-10 right-full w-[13vmin] h-[13vmin] rounded-full mr-[-0.5rem] overflow-hidden shadow-md">
            {/* Gold Bar */}
            <div className="absolute h-full w-full bg-gradient-to-bl from-amber-400 to-amber-500 dark:from-blue-600 dark:to-blue-800"></div>
            {/* Gold Blob */}
            {/* <div className="absolute rounded-full top-1/4 right-[21%] w-[113%] h-[113%] bg-gradient-to-tr from-amber-400 to-amber-500 dark:from-blue-600 dark:to-blue-800"></div> */}
            <div className="absolute rounded-full top-1/4 left-[21%] w-[100%] h-[100%] bg-gradient-to-tr from-amber-400 to-amber-500 dark:from-blue-600 dark:to-blue-800"></div>
          </div>
        </div>
        <div className="h-full md:w-6/12 w-full rounded-xl absolute inset-0">
          {/* center vertically */}
          <h2 className="md:text-7xl text-4xl font-bold stroke stroke-black text-white md:text-white drop-shadow-lg md:drop-shadow-none dark:text-white py-10 items-end md:items-center text-center sm:text-left flex h-full pt-20">
            <span className="p-5  flex flex-col w-full md:w-[--min-content]">
              <span>Lorem Ipsum </span>
              <span className="text-amber-500 dark:text-blue-700 drop-shadow-md">
                Dolor Amet
              </span>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
