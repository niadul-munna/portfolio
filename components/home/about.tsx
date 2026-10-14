import { profile, skills } from "@/content/profile";

export function About() {
  return (
    <div className="page-grid gap-y-12">
      <div className="col-span-full md:col-span-6 lg:col-span-6 lg:col-start-4">
        {profile.about.map((paragraph, index) => (
          <p
            key={index}
            className={`max-w-[34em] font-serif text-[1.1875rem] leading-[1.55] text-ink-soft md:text-[1.3125rem] ${index > 0 ? "mt-5" : ""}`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <dl className="col-span-full grid content-start gap-5 sm:grid-cols-2 md:col-span-8 lg:col-span-3 lg:grid-cols-1">
        {skills.map((group) => (
          <div key={group.area}>
            <dt className="font-mono text-meta text-ink">{group.area}</dt>
            <dd className="mt-1 text-ui text-muted">{group.items}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
