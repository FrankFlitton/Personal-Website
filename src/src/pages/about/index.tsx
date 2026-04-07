import { Page } from "@/components/page";
import { CTAButton } from "@/components/about/CTAButton";
import { PatentCallout } from "@/components/about/PatentCallout";
import { TimelineItem } from "@/components/about/TimelineItem";
import { mdiEmail, mdiGithub, mdiLinkedin } from "@mdi/js";

const AboutPage = () => {
  return (
    <Page>
      <main className="max-w-2xl mx-auto px-6 py-16 prose dark:prose-invert">
        {/* Positioning */}
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-3">
          About
        </p>
        <h1 className="text-3xl font-medium leading-snug mb-6">
          I build the layer where design and engineering actually meet.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-12">
          My background spans both sides of the stack. I've shipped production
          engineering and led UX research, often on the same project. That
          combination lets me build things that hold up technically and feel
          right to use. I started in the music industry designing and building
          audio software, which gave me an early, hands-on obsession with how
          people interact with tools. That thread has run through everything
          since.
        </p>

        <hr className="border-t border-neutral-200 dark:border-neutral-800 mb-12" />

        {/* Timeline */}
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-6">
          Career
        </p>

        <ol className="relative border-l border-neutral-200 dark:border-neutral-800 space-y-8 mb-12 pl-6 list-none">
          <TimelineItem
            period="Now"
            org="Building AI-native tools and design systems"
            detail="Focused on the intersection of engineering quality and user experience: internal tooling, component libraries, and developer-facing products."
            active
          />

          <TimelineItem
            period="Recent"
            org="AI companies"
            role="Lead engineer"
            detail="Full-stack development across AI/ML products, fintech platforms, and AI-driven investment tooling."
          />

          <TimelineItem
            period="The Forge"
            org="Google"
            role="Software engineer · internal infrastructure"
            detail="Built serving infrastructure used by UX research and internal documentation teams across the organisation."
          />

          <TimelineItem
            period="Innovation Lab"
            org="TD Bank"
            role="Lead engineer · design systems · named patent inventor"
            detail="Led a cross-functional team of engineers, designers, and BI analysts. Built the component library underpinning the innovation lab's design system, and drove a user research initiative from discovery through to a filed Canadian patent."
          />

          <TimelineItem
            period="Earlier"
            org="Music industry"
            role="Plugin development · UI/UX design"
            detail="Designed and built audio software for professional musicians. Clients included Korg. This is where the interest in human-tool interaction started."
          />
        </ol>

        <PatentCallout />

        <hr className="border-t border-neutral-200 dark:border-neutral-800 mb-12" />

        {/* Focus */}
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-3">
          What I'm focused on
        </p>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-12">
          I'm looking for Staff or Lead UXE roles where the work is internal
          tooling, design systems, or developer-facing products, places where
          engineering quality and user experience quality are equally on the
          line. I'm based in the Seattle area and open to hybrid or remote.
        </p>

        <hr className="border-t border-neutral-200 dark:border-neutral-800 mb-12" />

        {/* CTA */}
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-4">
          Get in touch
        </p>
        <div className="flex flex-wrap gap-3">
          <CTAButton
            href="https://linkedin.com/in/frankflitton"
            icon={mdiLinkedin}
          >
            LinkedIn
          </CTAButton>
          <CTAButton href="https://github.com/frankflitton" icon={mdiGithub}>
            GitHub
          </CTAButton>
          <CTAButton
            icon={mdiEmail}
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-contact"))
            }
          >
            Email
          </CTAButton>
        </div>
      </main>
    </Page>
  );
};

export default AboutPage;
