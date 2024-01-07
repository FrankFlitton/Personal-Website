import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="font-futura z-10 w-full items-center justify-between text-sm flex backdrop-blur-md bg-white/80 fixed p-4">
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
          <h1 className="text-2xl font-bold pr-2">Frank JE Flitton</h1>
        </Link>
        <div className="items-end justify-center">open nav</div>
      </div>
      {/* Spacer */}
      <div className="h-[80px]"></div>
    </>
  );
}
