import Link from "next/link";
import { profile } from "@/content/profile";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wideOnly: true },
  // Phones keep Work, Contact and CV on one row; About joins from 640px.
  { href: "/#about", label: "About", wideOnly: true },
  { href: "/#contact", label: "Contact" },
];

const linkClass =
  "-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 py-2 transition-colors duration-200 hover:text-ink";

export function SiteHeader() {
  return (
    <header>
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-6 pb-5 sm:pt-8">
        <Link
          href="/"
          className="-mx-1 inline-flex min-h-11 items-center px-1 text-ui font-medium tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-x-4 sm:gap-x-7">
          <nav aria-label="Primary">
            <ul className="flex items-baseline gap-x-4 text-ui text-muted sm:gap-x-7">
              {navigation.map((item) => (
                <li key={item.href} className={item.wideOnly ? "hidden sm:block" : undefined}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={profile.cv} type="application/pdf" target="_blank" className={linkClass}>
                  CV<span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
      <Container>
        <div className="border-t border-line" />
      </Container>
    </header>
  );
}
