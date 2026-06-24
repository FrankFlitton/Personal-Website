import Link from "next/link";
import { Page } from "@/components/page";
import { PageMeta } from "@/components/pageMeta";

const AirtimePrivacyPage = () => {
  return (
    <Page>
      <PageMeta
        title="Privacy Policy — Airtime for Google Meet"
        description="Airtime for Google Meet is 100% local. It has no server, sends no data anywhere, and uses no analytics or third-party services."
        color="#5b8def"
      />
      <main className="max-w-2xl mx-auto px-6 py-16 prose dark:prose-invert">
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-3">
          <Link
            href="/airtime"
            className="no-underline hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            Airtime for Google Meet
          </Link>
        </p>
        <h1 className="text-3xl font-medium leading-snug mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400 mb-10">
          Effective date: June 22, 2026
        </p>

        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Airtime for Google Meet (&ldquo;the extension&rdquo;) is a browser
          extension that shows how much each participant speaks during a Google
          Meet call. This policy explains what the extension accesses and stores.
        </p>

        <div className="not-prose my-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-5">
          <p className="text-sm font-medium mb-1">The short version</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed m-0">
            Everything stays on your device. The extension has no server, sends
            no data anywhere, and uses no analytics or third-party services.
          </p>
        </div>

        <h2 className="text-xl font-medium mt-10 mb-3">
          What the extension accesses
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          While you are on a <code>meet.google.com</code> call, the extension
          reads the following directly from the page, in your browser:
        </p>
        <ul className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          <li>Participant display names shown on the call.</li>
          <li>
            Visual speaking and mute indicators (to detect who is talking, and
            for how long).
          </li>
          <li>
            The meeting code in the page URL (used as a label for saved
            meetings).
          </li>
        </ul>

        <h2 className="text-xl font-medium mt-10 mb-3">
          What the extension stores
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          The extension saves a short summary of each meeting — participant
          display names, total talk time, and talk-time percentage — to your
          browser&apos;s local storage (<code>chrome.storage.local</code>). It
          keeps up to the 20 most recent meetings so you can review them in the
          extension&apos;s popup and History view.
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          This data is stored <strong>only on your own computer</strong>. It is
          never transmitted to the developer or any third party.
        </p>

        <h2 className="text-xl font-medium mt-10 mb-3">
          What the extension does NOT do
        </h2>
        <ul className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          <li>It does not send your data to any server or to the developer.</li>
          <li>It does not use analytics, tracking, or advertising.</li>
          <li>It does not access audio, video, or microphone streams.</li>
          <li>It does not sell or share your data with anyone.</li>
          <li>
            It does not run on any site other than <code>meet.google.com</code>.
          </li>
        </ul>

        <h2 className="text-xl font-medium mt-10 mb-3">
          Your control over your data
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          The saved meeting history lives in your browser. You can remove it at
          any time by clearing the extension&apos;s storage or by uninstalling
          the extension, which deletes all of its locally stored data.
        </p>

        <h2 className="text-xl font-medium mt-10 mb-3">Contact</h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Questions about this policy? Email{" "}
          <a href="mailto:fflitton@gmail.com">fflitton@gmail.com</a>.
        </p>

        <h2 className="text-xl font-medium mt-10 mb-3">Changes</h2>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          If this policy changes, the updated version will be posted at this URL
          with a new effective date.
        </p>
      </main>
    </Page>
  );
};

export default AirtimePrivacyPage;
