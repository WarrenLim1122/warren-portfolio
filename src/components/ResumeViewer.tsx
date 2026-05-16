/**
 * ResumeViewer — close on the full record.
 *
 * Academic standing stated plainly (strong signal), a slim framed
 * preview of the CV, and one prominent magnetic download. No download
 * friction: the primary action is unmissable.
 */

import { Download, FileText } from "lucide-react";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { StatBadge } from "./ui/StatBadge";
import { MagneticButton } from "./ui/MagneticButton";

export default function ResumeViewer() {
  return (
    <Section
      id="resume"
      index="06"
      eyebrow="Curriculum Vitae"
      title="The full record."
      description="First-Class Honours track at NTU. The complete CV — experience, credentials, and academics — in one document."
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Reveal>
            <StatBadge
              value="4.61"
              label="GPA · 5.00 scale"
              caption="First-Class Honours standing — Banking & Finance, NTU Singapore."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton
                href="/resume.pdf"
                download="Warren_Lim_Resume.pdf"
                variant="primary"
                ariaLabel="Download Warren Lim's CV (PDF)"
              >
                <Download size={16} strokeWidth={2.4} />
                Download CV
              </MagneticButton>
              <MagneticButton
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                ariaLabel="Open CV in a new tab"
              >
                <FileText size={15} />
                Open in tab
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <figure className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_90px_-55px_rgba(15,48,87,0.4)]">
            <figcaption className="flex items-center justify-between border-b border-line bg-paper-2/60 px-6 py-3.5">
              <span className="u-eyebrow text-[10px] text-graphite">
                Warren_Lim_Resume.pdf
              </span>
              <span className="u-tabular text-[11px] text-graphite/70">PDF</span>
            </figcaption>
            <div className="max-h-[560px] overflow-hidden p-4 sm:p-7">
              <img
                src="/resume.jpg"
                alt="Warren Lim — Curriculum Vitae preview"
                className="w-full rounded-lg border border-line"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
