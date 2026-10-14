import Link from "next/link";
import { profile } from "@/content/profile";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wideOnly: true },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header>
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-6 pb-5 sm:pt-8">
        <Link
          href="/"
          className="-mx-1 px-1 text-ui font-medium tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-x-4 sm:gap-x-7">
          <nav aria-label="Primary">
            <ul className="flex items-baseline gap-x-4 text-ui text-muted sm:gap-x-7">
              {navigation.map((item) => (
                <li key={item.href} className={item.wideOnly ? "hidden sm:block" : undefined}>
                  <Link
                    href={item.href}
                    className="-mx-1 inline-block px-1 py-2 transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
