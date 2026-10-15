import type { Note } from "./types";

/** Drafts stay out of production until the owner approves the writing. */
export const notes: Note[] = [
  {
    slug: "when-two-numbers-disagree-check-the-time-zone",
    visibility: "public",
    title: "When two numbers disagree, check the time zone",
    date: "2026-10-15",
    summary:
      "CDN analytics totals were lower when local date boundaries cut across the backend’s UTC day buckets. I aligned daily requests to UTC and kept display-zone changes out of the query key.",
    standfirst:
      "The chart and backend reported different totals for what looked like the same date range. The mismatch was in the boundaries: the console used local midnight while daily analytics were grouped by UTC day.",
    relatedProject: "tenbyte-cdn",
    body: [
      {
        kind: "p",
        text: "The symptom was a lower total in the CDN analytics than in the backend’s own figures. Both numbers described traffic over a date range, so they looked comparable. They weren’t. The frontend and backend had different definitions of where a day started, and the interface didn’t make that difference visible.",
      },
      {
        kind: "p",
        text: "The date picker originally built day ranges at the viewer’s local midnight, while the backend grouped traffic by UTC day. The analytics endpoint treats `from` as inclusive and `to` as exclusive: it selects timestamps with `timestamp >= from` and `timestamp < to`. Those boundaries have to describe the same interval before the totals can be compared.",
      },
      { kind: "h2", text: "Midnight depends on where you stand" },
      {
        kind: "p",
        text: "In Bangladesh, UTC midnight is 06:00 local time. Take a calendar day here: local midnight is 18:00 UTC on the previous date, and the next local midnight is 18:00 UTC on the selected date. That range starts six hours into one UTC day and ends eighteen hours into the next, so it cuts across two daily buckets instead of covering complete UTC days.",
      },
      {
        kind: "p",
        text: "The fix was to build whole-day analytics ranges on UTC boundaries, matching the backend’s daily buckets; afterward, the totals matched. The API’s half-open range also means a timestamp exactly at `to` is excluded, so adjacent ranges don’t count a boundary bucket twice.",
      },
      {
        kind: "p",
        text: "This did not mean rounding every kind of range to whole days. The picker also supports rolling windows such as the last 48 hours, which should remain exact instants. Expanding that window to UTC midnights could turn a 48-hour request into a 72-hour request and include data the viewer never selected. I aligned calendar-day presets to the UTC bucket boundaries and left rolling windows at their original `from` and `to` instants. That keeps one correction from changing the meaning of another kind of query.",
      },
      { kind: "h2", text: "One range for the data, another choice for the labels" },
      {
        kind: "p",
        text: "I aligned the daily ranges to UTC, then added a display time-zone toggle so people could read the same data in UTC or local time. I applied the same UTC-aligned date selection to the WAF analytics.",
      },
      {
        kind: "p",
        text: "The selected zone changes presentation, not the requested data. In Bangladesh, a UTC-day bucket starts at 06:00 local time. The chart can label that instant in local time, but the bucket still begins at UTC midnight.",
      },
      {
        kind: "p",
        text: "I kept the display zone out of the TanStack Query key. The analytics request is built from the distribution, granularity and UTC `from`/`to` values; the component reads the zone only when it formats chart labels. Since the request URL—and therefore this query’s cache key—doesn’t change when the zone changes, the chart can re-render with new labels without fetching the same data again.",
      },
      {
        kind: "p",
        text: "This example illustrates the separation; it isn’t company code. The UTC range identifies the data request. The display zone belongs to formatting after the response arrives.",
      },
      {
        kind: "code",
        language: "typescript",
        code: "const queryKey = [\n  \"cdn-analytics\",\n  { from: utcRange.from, to: utcRange.to },\n];\n\n// displayTimeZone is used when formatting labels, not in this key.",
      },
      { kind: "h2", text: "The cost is in every place a time appears" },
      {
        kind: "p",
        text: "The trade-off is that every timestamp must be formatted with the current display zone wherever it appears. Formatting once when data arrives would leave some labels stale when the viewer changes zones.",
      },
      {
        kind: "p",
        text: "When totals disagree, I check three things separately:",
      },
      {
        kind: "list",
        items: [
          "Which time zone defines the backend’s day?",
          "Do the request boundaries cover those whole days?",
          "Which time zone is being used to label the result?",
        ],
      },
      {
        kind: "p",
        text: "A chart and a backend can both be right about the intervals they received and still report different totals. When two numbers disagree, I check the time zone and boundaries behind each one before looking for a calculation bug.",
      },
    ],
  },
  {
    slug: "one-url-two-responses-caching-nextjs-behind-a-cdn",
    visibility: "public",
    title: "One URL, two responses: caching Next.js behind a CDN",
    date: "2026-10-15",
    summary:
      "A CDN served an RSC payload in place of HTML. The response fix had to bypass shared caching, and page invalidation had to cover all six locale paths.",
    standfirst:
      "Some bugs on the Tenbyte website only appeared through the CDN. On its Next.js 15.5.9 App Router, one cached response gave an HTML request a server-component payload. A separate purge path also missed English’s unprefixed URL.",
    relatedProject: "tenbyte-website",
    body: [
      {
        kind: "p",
        text: "The site uses the Next.js 15.5.9 App Router and has six locales. English uses unprefixed URLs; the other five use language prefixes. Editors need published changes to reach visitors without a deploy, so I had to check both the Next.js origin and the CDN in front of it.",
      },
      { kind: "h2", text: "The URL doesn’t tell the whole story" },
      {
        kind: "p",
        text: "The App Router can return HTML for a page request and a React Server Component (RSC) payload for client navigation or prefetching. They may share a page path, but they are different response types: a browser or crawler asking for HTML needs a document, while the client router needs the RSC payload to update the rendered tree.",
      },
      {
        kind: "p",
        text: "I observed Cloudflare return a cached `text/x-component` response to a request that expected HTML. A cache-busted request to the same page returned HTML, showing that the origin could produce the right document while the cached response was wrong. This points to response-variant handling at that CDN; it doesn’t establish that every CDN, or URL-only cache keys in general, behave this way.",
      },
      {
        kind: "p",
        text: "Next signals response variation with `Vary`, including the `rsc` request header. In this setup, Cloudflare did not honor that value, so it could replay a cached RSC response for an HTML request. The `_rsc` parameter and `RSC` header were stripped before middleware ran; I matched `RSC: 1` in Next.js `headers()` configuration instead.",
      },
      {
        kind: "p",
        text: "The origin-side change excluded RSC responses from shared caching: for requests marked `RSC: 1`, it set both `CDN-Cache-Control` and `Cache-Control` to `private, no-store`, leaving the regular HTML cache policy unchanged. At the edge, the change also required a Cloudflare bypass rule for those requests and a purge of already-cached variants. This was response exclusion, not a new cache-key design or a fix that relied on `_rsc` to separate variants.",
      },
      { kind: "h2", text: "English had a different cache key" },
      {
        kind: "p",
        text: "The second issue appeared after editing an English page. English is the default locale, so `/about` is its real cache path; `/en/about` is not. The other five locales use prefixed paths. A purge loop that only builds prefixed URLs therefore leaves the English response in the CDN.",
      },
      {
        kind: "p",
        text: "I changed page saves to revalidate the Next.js routes and purge the CDN URLs for all six locales, including English’s bare path. The purge list now follows the URLs readers can actually visit rather than assuming every locale has a prefix.",
      },
      {
        kind: "p",
        text: "Keeping English unprefixed preserves its existing URLs. That is useful for readers, but the default locale needs explicit handling anywhere routing, revalidation or CDN invalidation enumerates locale paths.",
      },
      { kind: "h2", text: "A separate cache setting on the blog index" },
      {
        kind: "p",
        text: "I also found that `force-dynamic` overrode the blog index’s `revalidate = 600` setting, so the route rendered on each request instead of using its ten-minute revalidation. In a follow-up change I removed the override so ISR could apply. This was a separate origin-cache issue, not the cause of the RSC response mix-up.",
      },
      { kind: "h2", text: "Test the path a reader uses" },
      {
        kind: "p",
        text: "A useful check has to go through the CDN: request the same page as HTML and as RSC, then verify each response type. After a content save, check invalidation for every locale, including the unprefixed English URL, and repeat the requests to see what the next visitor actually receives.",
      },
      {
        kind: "p",
        text: "An origin response alone cannot show what the shared cache stored or will serve next. I check the response type and cache behavior at the edge, then confirm that a save clears the origin and CDN variants across all six locale paths.",
      },
    ],
  },
];
