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
        className={`font-futura flex min-h-screen flex-col pl-4 pr-4 w-full ${className}`}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};
