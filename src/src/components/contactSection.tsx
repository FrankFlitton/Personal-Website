import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { Socials } from "./socials";

export const ContactSection = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const inputClass =
    "block w-full p-4 mt-2 text-gray-900 border border-gray-300 bg-gray-50 text-lg focus:ring-blue-500 focus:border-blue-500";

  const [message, setMessage] = useState("");

  // add focus to first input when nav opens
  useLayoutEffect(() => {
    if (!globalThis.window) return;
    setTimeout(() => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) return;
      const firstInput = document.querySelector("input");
      if (isNavOpen && firstInput) {
        firstInput.focus();
      }
    }, 100);
  }, [isNavOpen]);

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
      .then(() => {
        setMessage("Form successfully submitted");
      })
      .catch(() => {
        setMessage("Form submission failed");
      });
  };

  return (
    <div className="h-full w-full box overflow-y-scroll bg-white md:bg-transparent dark:bg-black/80 dark:md:bg-black/80">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full sm:min-h-full">
        <div className="h-full bg-black dark:bg-black/50 text-white px-4 py-12 relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Image
                className="w-[50%] sm:w-auto mb-4"
                src="/img/branding/FrankFlitton.jpeg"
                alt="Frank Flitton"
                width={200}
                height={200}
              />
            </div>
            <div className="col-span-2 prose text-white">
              <h2 className="text-5xl mb-8 text-white">Let&apos;s Talk!</h2>
              <p>
                As an ex-Google UX Engineer with a decade in software
                engineering and product design, I&apos;m excited to explore new
                professional avenues.
              </p>

              <Socials />
            </div>
          </div>
          <div className="absolute top-[calc(100%-1rem)] md:top-[3.5rem] left-5 md:left-[calc(100%-1rem)] w-8 h-8 rotate-45 bg-black"></div>
        </div>
        <div className="pt-4 md:pt-0">
          <form
            className="flex flex-col h-full mb-8"
            name="contact"
            data-netlify="true"
            method="post"
            onSubmit={handleSubmit}
            data-netlify-honeypot="form-name"
          >
            <div className="grid grid-cols-1 gap-4 p-4">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  className={inputClass}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                />
              </div>
              {/* Honeypot */}
              <label htmlFor="form-name" className="hidden">
                Website Contact
              </label>
              <input
                type="hidden"
                name="form-name"
                placeholder="website-contact"
                value="contact"
                className="hidden"
              ></input>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  className={inputClass}
                  name="message"
                  id="message"
                  rows={5}
                  placeholder="Message"
                  required
                />
              </div>
              <div>
                <button
                  className="bg-white/10 hover:bg-white/20 text-white py-4 px-8 text-xl text-left mt-4 inline-block"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
              <div>
                {message && (
                  <p
                    className={`text-sm ${
                      !message.includes("fail")
                        ? "text-gray-400"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
