import { PendingMark } from "@/components/pending-mark";
import { profile } from "@/content/profile";
import { isPending, type ContactChannel } from "@/content/types";

function ChannelValue({ channel }: { channel: ContactChannel }) {
  if (isPending(channel.value)) return <PendingMark item={channel.value} />;

  const href = channel.kind === "email" ? `mailto:${channel.value}` : channel.value;
  const text = channel.display ?? channel.value.replace(/^https?:\/\//, "");
  const newTab = channel.kind !== "email";
  return (
    <a
      href={href}
      className="link text-ink"
      {...(channel.kind === "url" ? { rel: "me noopener" } : {})}
      {...(channel.kind === "file" ? { type: "application/pdf" } : {})}
      {...(newTab ? { target: "_blank" } : {})}
    >
      {text}
      {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export function Contact() {
  const { lead, note, channels } = profile.contact;
  return (
    <div className="page-grid gap-y-10">
      <div className="col-span-full lg:col-span-8 lg:col-start-4">
        <p className="max-w-[24ch] text-title text-ink">{lead}</p>
        <p className="mt-6 text-body text-ink-soft">{note}</p>
      </div>
      <dl className="col-span-full grid gap-y-0 lg:col-span-6 lg:col-start-4">
        {channels.map((channel) => (
          <div
            key={channel.label}
            className="grid grid-cols-[4.75rem_1fr] items-baseline gap-x-4 border-t border-line py-4 last:border-b sm:grid-cols-[6.5rem_1fr]"
          >
            <dt className="font-mono text-meta text-muted">{channel.label}</dt>
            <dd className="min-w-0 text-ui break-words">
              <ChannelValue channel={channel} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
