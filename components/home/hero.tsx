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
            className="col-span-full max-w-[22ch] text-display text-ink lg:col-span-11"
          >
            <span className="sr-only">
              {profile.name}, {profile.role.toLowerCase()}.{" "}
            </span>
            {profile.statement}
          </h1>
          <div className="col-span-full grid gap-y-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-6 lg:gap-x-8">
            <figure className="w-fit">
              <Image
                src={avatar}
                alt={profile.photo.alt}
                sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, 112px"
                loading="eager"
                className="size-28 rounded-[3px] border border-line bg-panel object-cover md:size-40 lg:size-48"
              />
            </figure>
            <div className="max-w-[40rem]">
              <p className="max-w-[60ch] text-body text-ink-soft">{profile.intro}</p>
              <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-ui sm:gap-x-8">
                <Link href="#work" className="link inline-flex min-h-11 items-center gap-1 font-medium text-ink">
                  Selected Work <span aria-hidden="true">↓</span>
                </Link>
                <Link href="#contact" className="link inline-flex min-h-11 items-center gap-1 text-ink">
                  Get in Touch <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <dl className="page-grid mt-12 gap-y-5 border-t border-line pt-5 lg:mt-16">
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
