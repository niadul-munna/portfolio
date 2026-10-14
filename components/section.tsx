import type { ReactNode } from "react";
import { Container } from "./container";
import { SectionHeader } from "./section-header";

type SectionProps = {
  id: string;
  number: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

export function Section({ id, number, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-4 pt-20 lg:pt-32">
      <Container>
        <div className="border-t border-line pt-5 lg:pt-6">
          <SectionHeader id={`${id}-title`} number={number} title={title}>
            {intro}
          </SectionHeader>
          {children}
        </div>
      </Container>
    </section>
  );
}
