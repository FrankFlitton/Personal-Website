import Image from "next/image";
import { useLayoutEffect } from "react";

export const ContactSection = ({ isNavOpen }: { isNavOpen: boolean }) => {
  const inputClass =
    "block w-full p-4 mt-2 text-gray-900 border border-gray-300 bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500";

  // add focus to first input when nav opens
  useLayoutEffect(() => {
    if (!globalThis.window) return;
    setTimeout(() => {
      const firstInput = document.querySelector("input");
      if (isNavOpen && firstInput) {
        firstInput.focus();
      }
    }, 100);
  }, [isNavOpen]);

  return (
    <div className="h-[calc(100dvh-80px)] w-full box overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full sm:min-h-full">
        <div className="h-full bg-black text-white px-4 py-12 relative">
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
            </div>
          </div>
          <div className="absolute top-10 left-[calc(100%-1rem)] w-8 h-8 rotate-45 bg-black"></div>
        </div>
        <div>
          <form
            className="flex flex-col h-full mb-8"
            name="contact"
            method="POST"
            data-netlify="true"
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
              <input
                type="hidden"
                name="form-name"
                value="website-contact"
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
                  defaultValue="Message"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  className="bg-black hover:bg-gray-800 text-white py-4 px-8 text-xl text-left mt-4 inline-block"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
