"use client";

import Image from "next/image";
import { useState } from "react";
import {
  taglineParts,
  behancePath,
  mediumNoPaddingPath,
  xComPath,
} from "@/const/const";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import Icon from "@mdi/react";

const footerSocials = [
  { name: "GitHub", url: "https://github.com/frankflitton", icon: mdiGithub },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/frankflitton",
    icon: mdiLinkedin,
  },
  { name: "X", url: "https://x.com/frankflitton", icon: xComPath },
  {
    name: "BeHance",
    url: "https://behance.net/frankflitton",
    icon: behancePath,
  },
  {
    name: "Medium",
    url: "https://frankflitton.medium.com/",
    icon: mediumNoPaddingPath,
  },
];

const FooterContactForm = () => {
  const inputClass =
    "block w-full p-3 mt-1 bg-white/5 border border-white/15 text-white placeholder-white/30 text-base focus:outline-none focus:border-white/40 transition-colors";
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = e.target as HTMLFormElement;
    const formData = new FormData(myForm);
    setMessage("Sending...");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setMessage("Message sent — I'll be in touch."))
      .catch(() => setMessage("Submission failed, please try again."));
  };

  return (
    <form
      name="footer-contact"
      data-netlify="true"
      method="post"
      onSubmit={handleSubmit}
      data-netlify-honeypot="form-name"
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="form-name" value="footer-contact" />
      <label className="hidden" htmlFor="footer-form-name">
        Website
      </label>
      <div>
        <label
          htmlFor="footer-name"
          className="text-xs uppercase tracking-widest text-white/50"
        >
          Name
        </label>
        <input
          className={inputClass}
          type="text"
          name="name"
          id="footer-name"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="footer-email"
          className="text-xs uppercase tracking-widest text-white/50"
        >
          Email
        </label>
        <input
          className={inputClass}
          type="email"
          name="email"
          id="footer-email"
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="footer-message"
          className="text-xs uppercase tracking-widest text-white/50"
        >
          Message
        </label>
        <textarea
          className={inputClass}
          name="message"
          id="footer-message"
          rows={4}
          placeholder="What's on your mind?"
          required
        />
      </div>
      <div className="flex items-center gap-4 mt-1">
        <button
          type="submit"
          className="bg-white text-neutral-900 hover:bg-white/90 px-6 py-3 text-sm uppercase tracking-widest font-medium transition-colors"
        >
          Send Message
        </button>
        {message && (
          <p
            className={`text-sm ${message.includes("fail") ? "text-red-400" : "text-white/50"}`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
};

export const Footer = () => {
  return (
    <footer className="font-futura relative text-white">
      {/* Main footer body */}
      <div className="bg-neutral-900 relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 pt-12 pb-8">
          {/* Identity + form */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 pb-12 border-b border-white/10">
            {/* Left: Identity */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    className="bg-white dark:invert"
                    src="/img/branding/logo-transparent.svg"
                    alt="Frank JE Flitton Logo"
                    width={52}
                    height={52}
                  />
                  <span className="text-xl font-bold tracking-tight">
                    Frank JE Flitton
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs uppercase tracking-widest text-white/40">
                  {taglineParts.map((part, i) => (
                    <span key={i}>{part}</span>
                  ))}
                </div>
                <p className="text-sm text-white/50 max-w-[32ch] leading-relaxed">
                  Open to senior SWE and UX Engineering roles. Let&apos;s build
                  something together.
                </p>
              </div>

              {/* Socials */}
              <div className="flex flex-row gap-2">
                {footerSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    title={`Frank Flitton on ${social.name}`}
                    className="p-2 hover:bg-white/10 transition-colors"
                  >
                    <Icon path={social.icon} color="white" size={1.1} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-white/90">
                Let&apos;s connect
              </h2>
              <FooterContactForm />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Frank Flitton
            </p>
            <nav className="flex gap-4 text-xs text-white/30">
              <a
                href="/about/"
                className="hover:text-white/70 transition-colors"
              >
                About
              </a>
              <a
                href="/blog/"
                className="hover:text-white/70 transition-colors"
              >
                Blog
              </a>
              <a
                href="/projects/"
                className="hover:text-white/70 transition-colors"
              >
                Projects
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
