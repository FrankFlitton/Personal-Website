import Image from "next/image";
import Link from "next/link";
import { Page } from "@/components/page";
import { PageMeta } from "@/components/pageMeta";

// TODO: swap in the live Chrome Web Store listing URL once published.
const CHROME_STORE_URL =
  "https://chromewebstore.google.com/search/Airtime%20for%20Google%20Meet";

const features = [
  {
    icon: "⏱️",
    title: "Live speaking-time tracking",
    body: "Every participant's talk time, measured in real time as the call happens.",
  },
  {
    icon: "📊",
    title: "Per-person percentages",
    body: "Live bars and percentages show exactly how airtime is split across the room.",
  },
  {
    icon: "⚖️",
    title: "Fair-share line",
    body: "A reference marker for an even split — instantly see who's over or under.",
  },
  {
    icon: "🪟",
    title: "Follows picture-in-picture",
    body: "Stays with Meet's PiP window when you switch tabs, so the numbers travel with you.",
  },
  {
    icon: "🕘",
    title: "Automatic history",
    body: "Keeps your last 20 meetings so you can look back at how conversations went.",
  },
  {
    icon: "🔒",
    title: "100% private",
    body: "No account, no servers, no tracking. Everything stays on your device.",
  },
];

const ChromeStoreButton = ({ className = "" }: { className?: string }) => (
  <a
    href={CHROME_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-transform hover:scale-[1.02] no-underline ${className}`}
  >
    <svg
      viewBox="0 0 48 48"
      width="20"
      height="20"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="24" cy="24" r="9" fill="#fff" />
      <circle cx="24" cy="24" r="7.2" fill="#4285F4" />
    </svg>
    Add to Chrome — it&apos;s free
  </a>
);

const AirtimeLandingPage = () => {
  return (
    <Page>
      <PageMeta
        title="Airtime for Google Meet — Speaking Time Tracker"
        description="See how airtime is shared in Google Meet. Live fair-share line, per-person bars, and local history. Know if everyone's getting heard."
        image="/img/projects/airtime/airtime-live-centered.png"
        color="#5b8def"
      />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8fb6f9] to-[#5b8def] px-6 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
            <Image
              src="/img/projects/airtime/icon-128.png"
              alt="Airtime icon"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </div>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            See how airtime is shared
            <br className="hidden sm:block" /> in Google Meet.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Airtime adds a live panel that tracks how long each person speaks —
            with a fair-share line so you can tell whether everyone&apos;s
            getting heard, or one voice is doing all the talking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ChromeStoreButton />
            <a
              href="#features"
              className="rounded-lg px-5 py-3 text-sm font-medium text-white/90 ring-1 ring-white/40 transition-colors hover:bg-white/10 no-underline"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-xs text-white/70">
            Works automatically on meet.google.com · No sign-up
          </p>
        </div>
      </section>

      {/* Screenshots */}
      <section className="mx-auto w-full max-w-5xl px-2 py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/projects/airtime/airtime-live-centered.png"
              alt="The live Airtime panel during a Google Meet call, showing per-person talk-time bars and a fair-share line."
              className="w-full"
            />
            <figcaption className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
              Live panel — per-person bars and the fair-share marker, updating
              in real time.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/projects/airtime/airtime-history-centered.png"
              alt="The Airtime history view listing recent meetings with talk-time breakdowns."
              className="w-full"
            />
            <figcaption className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
              History — your last 20 meetings, stored locally on your device.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Two zoom levels */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
              For the room
            </p>
            <h3 className="mb-2 text-lg font-medium">
              Is everyone getting heard?
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              The fair-share marker shows what an even split would look like, so
              facilitators can make sure quieter people get airtime and meetings
              stay balanced.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
            <p className="mb-2 text-xs uppercase tracking-widest text-neutral-400">
              For you
            </p>
            <h3 className="mb-2 text-lg font-medium">
              Am I dominating or fading?
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              The panel collapses to a single chip showing your own talk-time %,
              so you can keep yourself honest without watching everyone else.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto w-full max-w-4xl scroll-mt-24 px-6 py-16"
      >
        <h2 className="mb-10 text-center text-2xl font-medium sm:text-3xl">
          Everything in the panel
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
            >
              <div className="mb-3 text-2xl">{f.icon}</div>
              <h3 className="mb-1.5 text-base font-medium">{f.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-16">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="mb-3 text-2xl">🔒</div>
          <h2 className="mb-2 text-xl font-medium">Private by design</h2>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            No account, no servers, no tracking. All data is stored locally in
            your browser (<code>chrome.storage.local</code>) and never leaves
            your machine. Airtime can&apos;t access your audio, video, or
            microphone — it only reads the on-screen speaking indicators.
          </p>
          <Link
            href="/airtime/privacy"
            className="mt-4 inline-block text-sm font-medium text-[#5b8def] hover:underline"
          >
            Read the full privacy policy →
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-3xl px-6 pb-24 text-center">
        <h2 className="mb-3 text-2xl font-medium sm:text-3xl">
          Know if everyone&apos;s getting heard.
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          Add Airtime to Chrome, join a Meet call, and the panel appears
          automatically.
        </p>
        <ChromeStoreButton className="!bg-[#5b8def] !text-white shadow-md" />
      </section>
    </Page>
  );
};

export default AirtimeLandingPage;
