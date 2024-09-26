import { Footer } from "./footer";

export const Page = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={`font-futura flex min-h-screen flex-col pl-4 pr-4 w-full ${className} bg-white dark:bg-black  dark:text-white`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};
