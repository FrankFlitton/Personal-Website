import { tagline } from "@/const/const";
import { Socials } from "./socials";

export const Footer = () => {
  return (
    <footer
      className="font-futura bg-neutral-900 text-white"
      style={{
        backgroundImage: "url(/img/branding/scan_texture_blk.png)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* two cols */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4 py-16 max-w-screen-xl mx-auto">
        <div>
          <h4 className="m-0 max-w-[30ch] text-2xl opacity-50 mb-16">
            {tagline}
          </h4>
          <Socials />
          <p className="mt-8 max-w-[30ch] opacity-50 mb-16">
            © {new Date().getFullYear()} Frank Flitton
          </p>
        </div>
      </div>
    </footer>
  );
};
