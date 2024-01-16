import Link from "next/link";
import { Socials } from "./socials";

export const Footer = () => {
  return (
    <footer className="font-futura bg-black text-white">
      {/* two cols */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4 py-16">
        <div>
          <h2 className="mb-3 text-6xl font-bold ">
            Developing Great Products
          </h2>
          <p className="m-0 max-w-[30ch] text-2xl opacity-50 mb-16">
            Frank is a Full Stack Software Engineer and Lead Designer
            specializing in software engineering, UX research, and product
            design.
          </p>
          <Socials />
          <p className="mt-8 max-w-[30ch] opacity-50 mb-16">
            © {new Date().getFullYear()} Frank Flitton
          </p>
        </div>
      </div>
    </footer>
  );
};
