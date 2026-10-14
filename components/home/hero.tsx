import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/avatar.jpg";
import { Container } from "@/components/container";
import { profile } from "@/content/profile";

const facts = [
  { term: "Role", detail: profile.role },
  { term: "Employer", detail: `${profile.employer}, since Jul 2025` },
  { term: "Based in", detail: `${profile.location} (${profile.timezone})` },
  { term: "Focus", detail: profile.focus },
];

export function Hero() {
  return (
    <section aria-labelledby="intro-title" className="pt-14 sm:pt-20 lg:pt-28">
      <Container>
        <div className="page-grid gap-y-8">
          <h1
            id="intro-title"
            className="col-span-full max-w-[22ch] text-display text-ink [text-wrap:pretty] lg:col-span-11"
          >
            <span className="sr-only">
              {profile.name}, {profile.role.toLowerCase()}.{" "}
            </span>
            {profile.statement}
          </h1>
          <figure className="col-span-full md:col-span-2 lg:col-span-3">
            <Image
              src={avatar}
              alt={profile.photo.alt}
              sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, 112px"
              loading="eager"
              className="size-28 rounded-[3px] border border-line bg-panel object-cover md:size-40 lg:size-48"
            />
          </figure>
          <div className="col-span-full md:col-span-6 lg:col-span-6">
            <p className="max-w-[60ch] text-body text-ink-soft">{profile.intro}</p>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-ui">
              <Link href="#work" className="link font-medium text-ink">
                See selected work <span aria-hidden="true">↓</span>
              </Link>
              <Link href="#contact" className="link text-ink">
                Get in touch <span aria-hidden="true">→</span>
              </Link>
              <a href={profile.cv} className="link text-ink" type="application/pdf" target="_blank">
                CV <span className="font-mono text-meta text-muted">PDF</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>

        <dl className="page-grid mt-16 gap-y-5 border-t border-line pt-5 lg:mt-24">
          {facts.map((fact) => (
            <div key={fact.term} className="col-span-2 md:col-span-4 lg:col-span-3">
              <dt className="font-mono text-meta text-muted">{fact.term}</dt>
              <dd className="mt-1 text-ui text-ink">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
