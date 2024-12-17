import { Blog } from "@/types";
import Image from "next/image";

export default function BlogHeroSection({ blog }: { blog: Blog }) {
  return (
    <>
      <div className="h-full max-w-screen-lg mt-16 mx-auto w-full sm:w-2/3">
        <h2 className="mx-auto text-center text-5xl text-black dark:text-white mb-8">
          {blog.title}
        </h2>
        <p className="mx-auto text-center text-2xl text-neutral-500 dark:text-neutral-400 mb-16">
          {blog.description}
        </p>
      </div>
      <div className="w-full h-[50vh] h-max-[50vh] md:h-[60vh] md:h-max-[60vh] mx-auto relative overflow-x-clip mb-12">
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
          <div className="absolute inset-5 object-cover mix-blend-overlay dark:mix-blend-normal opacity-10 dark:opacity:100"></div>
        </div>
        <div className="sm:w-2/3 w-9/12 h-[50vh] md:h-[60vh] mx-auto relative">
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
              ></Image>
            </div>
          </div>
          {/* end black */}
        </div>
      </div>
      <div className="max-w-screen-lg w-full sm:w-2/3 mb-16 mx-auto grid grid-flow-row-dense grid-cols-1 grid-rows-1">
        <div className="">
          <h3 className="text-md font-bold my-0">Published On</h3>
          <p className="text-gray-500 dark:text-gray-200 mb-2">{blog.date}</p>
        </div>
      </div>
    </>
  );
}
