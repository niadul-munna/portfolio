import type { Note } from "./types";

/** Drafts stay out of production until the owner approves the writing. */
export const notes: Note[] = [
  {
    slug: "when-two-numbers-disagree-check-the-time-zone",
    visibility: "draft",
    title: "When two numbers disagree, check the time zone",
    date: "2026-10-14",
    summary:
      "CDN analytics totals were lower than the backend’s figures because the date picker and the backend disagreed about midnight. I aligned requests to whole UTC days and kept the display time zone out of the query key.",
    standfirst:
      "A date range can look right on the screen and still ask for the wrong data. In the CDN console, the date picker used local time while the backend counted traffic in whole UTC days. That difference was enough to make two totals disagree.",
    relatedProject: "tenbyte-cdn",
    body: [
      {
        kind: "p",
        text: "The symptom was a lower total in the CDN analytics than in the backend’s own figures. Both numbers described traffic over a date range, so they looked comparable. They weren’t. The frontend and backend had different definitions of where a day started, and the interface didn’t make that difference visible.",
      },
      {
        kind: "p",
        text: "The date picker built ranges at the viewer’s local midnight. The backend grouped traffic into whole UTC days. A date written on a screen doesn’t carry that distinction by itself. Before comparing totals, I need to know which midnight each side means, and whether the boundaries describe the same period of time.",
      },
      { kind: "h2", text: "Midnight depends on where you stand" },
      {
        kind: "p",
        text: "In Bangladesh, UTC midnight is 06:00 local time. Starting a request at local midnight therefore starts it inside a UTC day. The same mismatch happens at the other end of the range. Each range clipped a partial day at both ends instead of covering the whole UTC days that the backend used for its figures.",
      },
      {
        kind: "p",
        text: "That distinction matters because the unit being counted is already defined by the backend. The browser can format a timestamp in local time, but formatting doesn’t change the boundary of the bucket it came from. If I want a total that agrees with the backend’s daily figures, the request has to use those daily boundaries too.",
      },
      { kind: "h2", text: "One range for the data, another choice for the labels" },
      {
        kind: "p",
        text: "I changed the ranges to request whole UTC days. The totals then matched the backend. I also added a display time-zone toggle so people could read times in a way that made sense to them. The same boundary alignment went into the WAF analytics, where the data was also aggregated in UTC.",
      },
      {
        kind: "p",
        text: "The important part of the toggle is what it changes: presentation. It doesn’t ask for a different set of traffic. Switching the display time zone should show the same buckets with different labels. In Bangladesh, that means making the 06:00 local start of a UTC day clear rather than presenting it as local midnight.",
      },
      {
        kind: "p",
        text: "I kept that choice out of the TanStack Query key. The query key describes the data being requested, including the UTC range. Putting the display time zone in it would make a formatting change select another cache entry, refetch identical data and introduce a loading state for a choice that didn’t need a request.",
      },
      {
        kind: "p",
        text: "This is an illustrative example of that separation, not a copy of company code. The range belongs to the query; the display choice belongs to the rendering step. The names matter less than keeping those responsibilities apart.",
      },
      {
        kind: "code",
        language: "typescript",
        code: "const queryKey = [\n  \"cdn-analytics\",\n  { from: utcRange.from, to: utcRange.to },\n];\n\n// displayTimeZone is used when formatting labels.",
      },
      { kind: "h2", text: "The cost is in every place a time appears" },
      {
        kind: "p",
        text: "Keeping the display choice separate has a cost. Times have to be formatted at render time everywhere they appear, rather than being formatted once when the data arrives. Any place that shows a time needs to use the current display choice. Otherwise the toggle can change one label while leaving another in the previous time zone.",
      },
      {
        kind: "p",
        text: "I think of the check as three separate questions. They are easy to combine in a date picker, but keeping them separate makes a mismatch easier to explain:",
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
        text: "The lesson I took from this is small enough to use before investigating anything more complicated. When two numbers disagree, check the time zone of both numbers first. A chart and a backend can each be correct about the interval they were given while still disagreeing, because the intervals only look the same on the screen.",
      },
    ],
  },
  {
    slug: "one-url-two-responses-caching-nextjs-behind-a-cdn",
    visibility: "draft",
    title: "One URL, two responses: caching Next.js behind a CDN",
    date: "2026-10-14",
    summary:
      "A shared cache can confuse Next.js HTML with a server component payload from the same URL. Keeping those responses apart and purging all six locales fixed two caching bugs on the Tenbyte website.",
    standfirst:
      "Some of the hardest bugs on the Tenbyte website only appeared with the CDN in front. The origin could serve the right response while a shared cache served the wrong one. I had to look at the path between Next.js and the reader, including what happened after an editor saved.",
    relatedProject: "tenbyte-website",
    body: [
      {
        kind: "p",
        text: "The website runs on Next.js and has six locales. English uses unprefixed URLs; the other five use language prefixes. Content changes need to reach visitors without a deploy. That makes caching part of the publishing behaviour: a page can be correct at the origin and still be wrong for someone reading a stored response.",
      },
      { kind: "h2", text: "The URL doesn’t tell the whole story" },
      {
        kind: "p",
        text: "Next.js serves both an HTML page and a React Server Component payload from the same URL. Those responses have different jobs. The HTML is the page a reader or crawler expects to receive. The RSC payload is part of how the application delivers its server component output. Treating them as interchangeable breaks that expectation.",
      },
      {
        kind: "p",
        text: "A shared cache keyed on the URL alone can store the RSC payload and later hand it to a crawler asking for the page. The URL matches, so a cache that only considers that URL has no reason to choose differently. The origin’s ability to return the correct HTML doesn’t help if the request is answered before reaching it.",
      },
      {
        kind: "p",
        text: "I corrected the cache headers so server component payloads stayed out of shared caches. The boundary to check is how `Cache-Control` and `Vary` are handled together by the origin and CDN. The first describes caching instructions; the second describes request headers that distinguish responses. That contract has to survive the shared cache in front of Next.js.",
      },
      {
        kind: "p",
        text: "I wouldn’t turn this into a universal header snippet without checking the application and cache configuration. The useful result is concrete: a request for HTML must receive HTML, even when another request to the same URL asked for a server component payload. Testing the origin alone leaves the shared cache’s choice out of the test.",
      },
      { kind: "h2", text: "English had a different cache key" },
      {
        kind: "p",
        text: "The second bug appeared when English pages were edited. English was the default language and kept its existing bare URLs. The other locales had prefixes. That was a reasonable routing decision, but it meant the English cache key had a different shape from the others. English edits weren’t being purged until the save behaviour covered that difference.",
      },
      {
        kind: "p",
        text: "I changed saving a page to purge it in all six locales. The important detail is all six, including the one without a prefix. A loop over language-prefixed paths can look complete while leaving out the default language. The set of URLs to clear needs to match the routes readers can actually visit.",
      },
      {
        kind: "p",
        text: "Keeping English unprefixed preserves the history of those URLs, and `/en/` paths redirect to the bare canonical path. I still think that is a useful choice for readers. Its cost is that the default language needs explicit attention anywhere the application works with cache keys. Routing and invalidation have to agree about the same exception.",
      },
      { kind: "h2", text: "Two smaller settings with visible consequences" },
      {
        kind: "p",
        text: "Missing static files were another routing problem. Their requests were caught by the `[locale]` route and failed slowly with a 500. They now return a 404 straight away. A missing file shouldn’t travel through page handling until it becomes a server error. The response status needs to describe the resource that was requested.",
      },
      {
        kind: "p",
        text: "The blog index had also stopped being cached because a forced-dynamic setting had quietly turned caching off. Correcting that restored caching. That setting was small, but its effect reached every request for the index. It belongs in the same review as the cache headers and purge paths, because each can change the behaviour readers receive.",
      },
      { kind: "h2", text: "Test the path a reader uses" },
      {
        kind: "p",
        text: "My lesson from this work is to test caching with the CDN in the loop. For this site, that means checking the response type at a shared URL, checking edits in every locale, and checking what happens to missing files. Each is a different way the application and the layer in front of it can disagree.",
      },
      {
        kind: "p",
        text: "A successful origin response only answers one part of the question. I also need to know what the shared cache stored, what it serves to the next request, and whether saving content clears the right URLs. Those are the boundaries where these bugs lived, and they are the boundaries I want the test to include.",
      },
    ],
  },
];
