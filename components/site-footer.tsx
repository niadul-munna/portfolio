import { profile } from "@/content/profile";
import { isPending } from "@/content/types";
import { lastUpdated } from "@/lib/site";
import { Container } from "./container";

export function SiteFooter() {
  const channels = profile.contact.channels.flatMap((channel) =>
    isPending(channel.value)
      ? []
      : [
          {
            label: channel.label,
            href: channel.kind === "email" ? `mailto:${channel.value}` : channel.value,
            external: channel.kind !== "email",
            rel: channel.kind === "url" ? "me noopener" : undefined,
          },
        ],
  );

  return (
    <footer className="mt-24 lg:mt-36">
      <Container>
        <div className="page-grid gap-y-4 border-t border-line pt-6 pb-10 font-mono text-meta text-muted">
          <p className="col-span-full md:col-span-4 lg:col-span-3">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="col-span-full md:col-span-4 lg:col-span-6">
            {channels.length ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {channels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      className="link -my-2 inline-block py-2 text-ink"
                      {...(channel.external ? { target: "_blank", rel: channel.rel } : {})}
                    >
                      {channel.label}
                      {channel.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-3">Set in Geist, Newsreader and JetBrains Mono. Built with Next.js.</p>
          </div>
          <p className="col-span-full lg:col-span-3 lg:text-right">Updated {lastUpdated}</p>
        </div>
      </Container>
    </footer>
  );
}
