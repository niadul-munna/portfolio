import Link from "next/link";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { ExperienceList } from "@/components/home/experience-list";
import { Hero } from "@/components/home/hero";
import { PracticeList } from "@/components/home/practice-list";
import avatar from "@/assets/avatar.jpg";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { WorkIndex } from "@/components/work-index";
import { experience, profile, skills } from "@/content/profile";
import { isPending } from "@/content/types";
import { siteUrl, visibleNotes, visiblePractice, visibleProjects } from "@/lib/site";

const sections = ["work", "beyond", "experience", "about", ...(visibleNotes.length ? ["notes"] : []), "contact"];

function sectionNumber(id: string) {
  return String(sections.indexOf(id) + 1).padStart(2, "0");
}

function personSchema() {
  const sameAs = profile.contact.channels.flatMap((channel) =>
    channel.kind === "url" && !isPending(channel.value) ? [channel.value] : [],
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.fullName,
    jobTitle: profile.role,
    description: profile.description,
    url: siteUrl,
    image: `${siteUrl}${avatar.src}`,
    email: profile.contact.channels.flatMap((channel) =>
      channel.kind === "email" && !isPending(channel.value) ? [`mailto:${channel.value}`] : [],
    )[0],
    worksFor: { "@type": "Organization", name: profile.employer, url: profile.employerUrl },
    address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
    knowsAbout: skills.flatMap((group) => group.items.split(", ")),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <Hero />

      <Section
        id="work"
        number={sectionNumber("work")}
        title="Selected work"
        intro="Employer projects, most of them team work. Each case study says what shipped and what is still in progress or review."
      >
        <WorkIndex projects={visibleProjects} />
      </Section>

      <Section
        id="beyond"
        number={sectionNumber("beyond")}
        title="Beyond the interface"
        intro="The interface is most of my job, not all of it. Recent work on the other side of the API, with an honest status for each."
      >
        <PracticeList entries={visiblePractice} />
      </Section>

      <Section id="experience" number={sectionNumber("experience")} title="Experience">
        <ExperienceList positions={experience} />
      </Section>

      <Section id="about" number={sectionNumber("about")} title="About">
        <About />
      </Section>

      {visibleNotes.length ? (
        <Section id="notes" number={sectionNumber("notes")} title="Engineering notes">
          <ul>
            {visibleNotes.map((note) => (
              <li key={note.slug} className="page-grid gap-y-2 border-t border-line py-6 last:border-b">
                <time dateTime={note.date} className="col-span-full font-mono text-meta text-muted lg:col-span-3">
                  {note.date}
                </time>
                <div className="col-span-full md:col-span-6">
                  <Link href={`/notes/${note.slug}`} className="link text-ink">
                    {note.title}
                  </Link>
                  {note.visibility === "draft" ? (
                    <p className="mt-2 font-mono text-meta text-muted">Draft, not published</p>
                  ) : null}
                  <p className="mt-1 text-ui text-muted">{note.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section id="contact" number={sectionNumber("contact")} title="Contact">
        <Contact />
      </Section>
    </>
  );
}
