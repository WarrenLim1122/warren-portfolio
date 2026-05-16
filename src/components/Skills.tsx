/**
 * Skills — capability, grouped for recruiters (not a logo wall).
 *
 * Three legible buckets in typographic cards. Rendered through the same
 * CarouselShell as Credentials so the page has one carousel idiom: on
 * desktop all three sit side-by-side; on small screens they scroll.
 */

import { SKILLS } from "../constants";
import { Section } from "./ui/Section";
import { CarouselShell } from "./ui/CarouselShell";
import { Reveal } from "./ui/Reveal";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Technical & Analytical Range"
      title="What I actually operate."
      description="Grouped by what they do, not by logo. Modelling judgement, automation that removes manual work, and the platforms institutions run on."
    >
      <CarouselShell ariaLabel="Skill groups" step={360}>
        {SKILLS.map((group, i) => (
          <Reveal
            key={group.label}
            delay={i * 0.07}
            className="flex w-[300px] flex-shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-8 sm:w-[340px] md:w-[calc((100%-2.5rem)/3)] md:min-w-0"
          >
            <span className="u-index text-3xl text-navy/15">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-navy">
              {group.label}
            </h3>
            <span className="mt-5 mb-6 h-px w-full u-hairline" />
            <ul className="flex flex-col gap-4">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] font-medium text-ink/80"
                >
                  <span
                    aria-hidden
                    className="text-gold"
                    style={{ fontSize: "0.6rem" }}
                  >
                    ◆
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </CarouselShell>
    </Section>
  );
}
