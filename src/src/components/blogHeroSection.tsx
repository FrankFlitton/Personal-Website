import { Blog } from "@/types";
import Image from "next/image";

export default function BlogHeroSection({ blog }: { blog: Blog }) {
  return (
    <div className="w-full mx-auto relative overflow-x-clip mb-12">
      {/* Background ornamentation — mirrors home page hero */}
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
          />
        </div>
        <div className="absolute inset-5 object-cover opacity-100 dark:opacity:30">
          <Image
            className="object-cover w-full h-full"
            alt="Scan texture"
            src="/img/branding/blurB.png"
            width={960}
            height={540}
          />
        </div>
        <div className="absolute inset-5 object-cover mix-blend-overlay dark:mix-blend-normal opacity-10 dark:opacity:100"></div>
      </div>

      {/* 2-col layout: text left, card right — stacks on mobile */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-screen-lg mx-auto px-10 md:px-6 pt-16 pb-12 md:pt-20 md:pb-16 items-center">
        {/* Left: title, description, metadata */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl text-black dark:text-white mb-6 leading-tight md:leading-tight text-wrap-pretty">
            {blog.title}
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed text-wrap-pretty">
            {blog.description}
          </p>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
              Published On
            </h3>
            <p className="text-neutral-700 dark:text-neutral-200 md:pb-5">
              {blog.date}
            </p>
          </div>
        </div>

        {/* Right: stacked card with featured image */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <div className="h-full w-full mx-auto absolute inset-0">
            {/* Border */}
            <div className="absolute inset-[-1px] rounded-xl border bg-black border-neutral-600 dark:border-neutral-900 shadow-2xl"></div>
            <div className="absolute w-full h-full top-2 left-2 rounded-xl bg-neutral-800 blur opacity-20"></div>
            <div className="absolute w-full h-full top-2 left-2 rounded-xl bg-amber-500 dark:bg-blue-600 shadow-lg"></div>
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <Image
                src={blog.featuredImage}
                alt=""
                width={1920}
                height={1080}
                className="object-cover w-100 h-[100%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
