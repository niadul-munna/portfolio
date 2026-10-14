import type { ReactNode } from "react";
import type { SchematicId } from "@/content/types";

/*
 * Line drawings of the shape of each project, in a 480 × 360 frame.
 * They are figures, not screenshots: no real data, no product chrome.
 * Numbered callouts are explained by `schematicLegends`, rendered as HTML
 * so the text stays legible at any size.
 */

export const schematicLegends: Record<SchematicId, string[]> = {
  library: [
    "Folder tree",
    "Search, scoped to the open folder",
    "Status filter with an “isn’t” operator",
    "More rows load as you scroll",
  ],
  analytics: [
    "Range requested in whole UTC days",
    "Local midnight in Bangladesh (UTC+6), where ranges used to start",
    "Display time zone: changes labels, not the query",
    "Breakdown per distribution",
  ],
  edge: [
    "Editors save in the CMS",
    "Pages render as server components",
    "The edge keys on the URL plus the RSC header",
    "A save purges every locale; English has no prefix",
  ],
  tenants: [
    "Each shop arrives on its own host",
    "The tenant is resolved before any query runs",
    "Row-level security returns only that tenant’s rows",
  ],
};

function Callout({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g className="s-callout">
      <circle cx={x} cy={y} r={8} />
      <text x={x} y={y + 0.5}>
        {n}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 5;
  const a1 = angle + Math.PI * 0.82;
  const a2 = angle - Math.PI * 0.82;
  return (
    <g>
      <line className="s-soft" x1={x1} y1={y1} x2={x2} y2={y2} />
      <path
        className="s-soft"
        d={`M ${x2 + head * Math.cos(a1)} ${y2 + head * Math.sin(a1)} L ${x2} ${y2} L ${x2 + head * Math.cos(a2)} ${y2 + head * Math.sin(a2)}`}
      />
    </g>
  );
}

function Svg({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <svg
      className="schematic"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ----------------------------------------------------------------- library */

function Library() {
  const folders = [
    { y: 84, indent: 0, length: 48 },
    { y: 106, indent: 0, length: 40 },
    { y: 128, indent: 12, length: 44 },
    { y: 150, indent: 12, length: 50, current: true },
    { y: 172, indent: 24, length: 34 },
    { y: 194, indent: 0, length: 44 },
  ];
  const columns = [152, 254, 356];
  const rows = [84, 160, 236];

  return (
    <>
      <rect className="s-window" x={24} y={24} width={432} height={312} rx={4} />
      <line className="s-line" x1={136} y1={24} x2={136} y2={336} />
      <line className="s-line" x1={136} y1={68} x2={456} y2={68} />

      {/* folder tree */}
      <line className="s-ink" x1={40} y1={50} x2={84} y2={50} />
      {folders.map((folder) => (
        <g key={folder.y}>
          {folder.current ? (
            <rect className="s-wash" x={32} y={folder.y - 11} width={98} height={22} rx={2} />
          ) : null}
          <rect
            className={folder.current ? "s-accent" : "s-soft"}
            x={40 + folder.indent}
            y={folder.y - 4}
            width={9}
            height={7}
            rx={1}
          />
          <line
            className={folder.current ? "s-accent" : "s-line"}
            x1={56 + folder.indent}
            y1={folder.y}
            x2={56 + folder.indent + folder.length}
            y2={folder.y}
          />
        </g>
      ))}

      {/* toolbar: search, status filter, sort */}
      <rect className="s-line" x={152} y={36} width={130} height={20} rx={3} />
      <circle className="s-soft" cx={163} cy={45} r={4} />
      <line className="s-soft" x1={166} y1={48} x2={169} y2={51} />
      <line className="s-line" x1={178} y1={46} x2={232} y2={46} />
      <rect className="s-accent" x={304} y={36} width={70} height={20} rx={10} />
      <text x={314} y={50} className="s-label-ink">
        ≠ failed
      </text>
      <rect className="s-line" x={398} y={36} width={42} height={20} rx={3} />
      <line className="s-soft" x1={407} y1={41} x2={427} y2={41} />
      <line className="s-soft" x1={407} y1={46} x2={421} y2={46} />
      <line className="s-soft" x1={407} y1={51} x2={415} y2={51} />

      {/* grid; the last row is still loading */}
      {rows.map((y, rowIndex) =>
        columns.map((x, columnIndex) => {
          const selected = rowIndex === 0 && columnIndex === 1;
          const loading = rowIndex === rows.length - 1;
          return (
            <g key={`${x}-${y}`}>
              <rect
                className={`${selected ? "s-accent s-wash" : "s-line"} ${loading ? "s-dash" : ""}`}
                x={x}
                y={y}
                width={84}
                height={47}
                rx={2}
              />
              {selected ? (
                <path className="s-dot" d={`M ${x + 38} ${y + 17} L ${x + 38} ${y + 30} L ${x + 49} ${y + 23.5} Z`} />
              ) : null}
              <line
                className={`${loading ? "s-line s-dash" : "s-soft"}`}
                x1={x}
                y1={y + 60}
                x2={x + (selected ? 70 : 60)}
                y2={y + 60}
              />
              <line className="s-line" x1={x} y1={y + 68} x2={x + 34} y2={y + 68} />
            </g>
          );
        }),
      )}

      <Callout n={1} x={120} y={106} />
      <Callout n={2} x={293} y={46} />
      <Callout n={3} x={386} y={46} />
      <Callout n={4} x={440} y={236} />
    </>
  );
}

/* --------------------------------------------------------------- analytics */

function trafficPath() {
  // A deterministic diurnal curve: six days, a peak in each.
  const points: string[] = [];
  const dayAmplitude = [0.82, 0.9, 0.74, 1, 0.86, 0.78];
  for (let x = 56; x <= 440; x += 4) {
    const t = (x - 56) / 64;
    const day = Math.min(5, Math.floor(t));
    const phase = t - Math.floor(t);
    const amplitude = dayAmplitude[day] ?? 0.8;
    const wave = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
    const y = 214 - (18 + 92 * amplitude * wave ** 1.6);
    points.push(`${x === 56 ? "M" : "L"} ${x} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

function Analytics() {
  const boundaries = [56, 120, 184, 248, 312, 376, 440];
  return (
    <>
      <rect className="s-window" x={24} y={24} width={432} height={312} rx={4} />
      <line className="s-line" x1={24} y1={68} x2={456} y2={68} />

      {/* range picker and time zone toggle */}
      <rect className="s-line" x={40} y={36} width={168} height={20} rx={3} />
      <text x={50} y={50}>
        01 Sep → 06 Sep
      </text>
      <rect className="s-line" x={352} y={36} width={88} height={20} rx={3} />
      <rect className="s-wash" x={353} y={37} width={42} height={18} rx={2} />
      <line className="s-line" x1={396} y1={36} x2={396} y2={56} />
      <text x={363} y={50} className="s-label-ink">
        UTC
      </text>
      <text x={403} y={50}>
        Local
      </text>

      {/* one UTC day, highlighted */}
      <rect className="s-wash" x={184} y={88} width={64} height={144} />

      {/* day boundaries at 00:00 UTC */}
      {boundaries.map((x) => (
        <line key={x} className="s-line s-dash" x1={x} y1={88} x2={x} y2={232} />
      ))}
      <line className="s-line" x1={56} y1={232} x2={440} y2={232} />

      {/* where a local-midnight range used to start */}
      <line className="s-accent s-dash" x1={168} y1={96} x2={168} y2={232} />

      <path className="s-ink" d={trafficPath()} />

      {boundaries.slice(0, -1).map((x, index) => (
        <text key={x} x={x + 32} y={250} textAnchor="middle">
          {String(index + 1).padStart(2, "0")}
        </text>
      ))}

      {/* per-distribution table */}
      <line className="s-line" x1={40} y1={270} x2={440} y2={270} />
      {[292, 314].map((y) => (
        <g key={y}>
          <line className="s-soft" x1={40} y1={y} x2={118} y2={y} />
          <line className="s-line" x1={330} y1={y} x2={372} y2={y} />
          <line className="s-line" x1={400} y1={y} x2={440} y2={y} />
        </g>
      ))}

      <Callout n={1} x={220} y={46} />
      <Callout n={2} x={168} y={88} />
      <Callout n={3} x={340} y={46} />
      <Callout n={4} x={440} y={270} />
    </>
  );
}

/* -------------------------------------------------------------------- edge */

function Edge() {
  const locales = ["en", "ms", "id", "zh", "vi", "bn"];
  return (
    <>
      {/* request path */}
      <rect className="s-window" x={24} y={60} width={108} height={40} rx={3} />
      <text x={78} y={84} textAnchor="middle" className="s-label-ink">
        Payload CMS
      </text>
      <Arrow x1={132} y1={80} x2={166} y2={80} />
      <rect className="s-window" x={168} y={60} width={116} height={40} rx={3} />
      <text x={226} y={84} textAnchor="middle" className="s-label-ink">
        Next.js · RSC
      </text>
      <Arrow x1={284} y1={80} x2={318} y2={80} />
      <rect className="s-window" x={320} y={60} width={116} height={40} rx={3} />
      <rect className="s-accent" x={320} y={60} width={116} height={40} rx={3} />
      <text x={378} y={84} textAnchor="middle" className="s-label-ink">
        Edge cache
      </text>

      {/* one URL, two responses */}
      <line className="s-soft" x1={378} y1={100} x2={378} y2={124} />
      <line className="s-soft" x1={332} y1={124} x2={420} y2={124} />
      <Arrow x1={332} y1={124} x2={332} y2={158} />
      <Arrow x1={420} y1={124} x2={420} y2={158} />
      <rect className="s-window" x={300} y={160} width={64} height={30} rx={3} />
      <text x={332} y={179} textAnchor="middle" className="s-label-ink">
        HTML
      </text>
      <rect className="s-window" x={376} y={160} width={88} height={30} rx={3} />
      <text x={420} y={179} textAnchor="middle" className="s-label-ink">
        RSC payload
      </text>
      <text x={316} y={144} textAnchor="end">
        key: URL + Vary
      </text>

      {/* purge on save, across every locale */}
      <line className="s-accent s-dash" x1={78} y1={100} x2={78} y2={240} />
      <text x={88} y={176}>
        on save
      </text>
      <line className="s-accent" x1={70} y1={240} x2={410} y2={240} />
      {locales.map((locale, index) => {
        const x = 42 + index * 68;
        return (
          <g key={locale}>
            <line className="s-accent" x1={x + 28} y1={240} x2={x + 28} y2={266} />
            <rect className="s-window" x={x} y={268} width={56} height={26} rx={3} />
            {index === 0 ? (
              <rect className="s-accent" x={x} y={268} width={56} height={26} rx={3} />
            ) : null}
            <text x={x + 28} y={285} textAnchor="middle" className="s-label-ink">
              {locale}
            </text>
          </g>
        );
      })}
      <text x={42} y={318}>
        cached pages, one set per locale
      </text>

      <Callout n={1} x={132} y={60} />
      <Callout n={2} x={284} y={60} />
      <Callout n={3} x={200} y={140} />
      <Callout n={4} x={98} y={268} />
    </>
  );
}

/* ----------------------------------------------------------------- tenants */

function Tenants() {
  const hosts = [
    { label: "shop-a", y: 56 },
    { label: "shop-b", y: 164, active: true },
    { label: "shop-c", y: 272 },
  ];
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const visible = new Set([1, 4, 5, 8]);

  return (
    <>
      {hosts.map((host) => (
        <g key={host.label}>
          <rect className="s-window" x={24} y={host.y} width={116} height={32} rx={3} />
          {host.active ? (
            <rect className="s-accent" x={24} y={host.y} width={116} height={32} rx={3} />
          ) : null}
          <text x={40} y={host.y + 20} className="s-label-ink">
            {host.label}
          </text>
          <line
            className={host.active ? "s-accent" : "s-line"}
            x1={140}
            y1={host.y + 16}
            x2={196}
            y2={180 + (host.y - 164) / 14}
          />
        </g>
      ))}

      <rect className="s-window" x={196} y={148} width={96} height={64} rx={3} />
      <text x={244} y={174} textAnchor="middle" className="s-label-ink">
        app
      </text>
      <text x={244} y={194} textAnchor="middle">
        tenant = b
      </text>

      <Arrow x1={292} y1={180} x2={334} y2={180} />

      <rect className="s-window" x={336} y={40} width={120} height={280} rx={3} />
      <text x={350} y={62} className="s-label-ink">
        orders
      </text>
      <text x={442} y={62} textAnchor="end" className="s-label-accent">
        RLS
      </text>
      <line className="s-line" x1={336} y1={74} x2={456} y2={74} />
      {rows.map((row) => {
        const y = 96 + row * 25;
        const shown = visible.has(row);
        return (
          <g key={row} opacity={shown ? 1 : 0.55}>
            {shown ? <rect className="s-wash" x={340} y={y - 9} width={112} height={18} rx={2} /> : null}
            <rect
              className={shown ? "s-accent" : "s-line s-dash"}
              x={350}
              y={y - 3.5}
              width={7}
              height={7}
              rx={1}
            />
            <line
              className={shown ? "s-ink" : "s-line s-dash"}
              x1={366}
              y1={y}
              x2={shown ? 430 : 418}
              y2={y}
            />
          </g>
        );
      })}

      <Callout n={1} x={140} y={56} />
      <Callout n={2} x={292} y={148} />
      <Callout n={3} x={456} y={40} />
    </>
  );
}

const drawings: Record<SchematicId, () => ReactNode> = {
  library: Library,
  analytics: Analytics,
  edge: Edge,
  tenants: Tenants,
};

export function Schematic({ id, title }: { id: SchematicId; title?: string }) {
  const Drawing = drawings[id];
  return (
    <Svg title={title}>
      <Drawing />
    </Svg>
  );
}
