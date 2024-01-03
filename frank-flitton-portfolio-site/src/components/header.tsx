import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="z-10 w-full items-center justify-between text-sm lg:flex mix-blend-exclusion invert fixed p-4">
        <span className="flex items-center gap-2">
          <Image
            src="/icon.png"
            alt="Vercel Logo"
            className="dark:invert"
            width={48}
            height={48}
            priority
          />
          <h1 className="text-2xl font-bold">Frank Flitton</h1>
        </span>
        <div className="items-end justify-center">open nav</div>
      </div>
      {/* Spacer */}
      <div className="h-24"></div>
    </>
  );
}
