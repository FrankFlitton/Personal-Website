import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="font-futura z-10 w-full items-center justify-between text-sm flex backdrop-blur-md bg-white/80 fixed p-4">
        <span className="flex items-center gap-2 mix-ble">
          <Image
            src="/img/branding/logo-transparent.svg"
            alt="Frank JE Flitton Logo"
            width={48}
            height={48}
            priority
          />
          <h1 className="text-2xl font-bold">Frank JE Flitton</h1>
        </span>
        <div className="items-end justify-center">open nav</div>
      </div>
      {/* Spacer */}
      <div className="h-[80px]"></div>
    </>
  );
}
