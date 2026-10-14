import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container>
      <div className="page-grid gap-y-6 pt-20 lg:pt-32">
        <p className="col-span-full font-mono text-meta text-muted lg:col-span-3">404</p>
        <div className="col-span-full lg:col-span-9">
          <h1 className="text-title text-ink">There’s nothing at this address.</h1>
          <p className="mt-5 max-w-[52ch] text-body text-ink-soft">
            The page may have moved, or the link may be mistyped. The{" "}
            <Link href="/#work" className="link text-ink">
              selected work
            </Link>{" "}
            is a good place to start.
          </p>
        </div>
      </div>
    </Container>
  );
}
