import { expect, test, type Page } from "@playwright/test";
import { notes } from "../content/notes";
import { practice } from "../content/practice";
import { projects } from "../content/projects";

const publicSlugs = projects.filter((p) => p.visibility === "public").map((p) => p.slug);
const draftSlugs = projects.filter((p) => p.visibility === "draft").map((p) => p.slug);
const showDrafts = process.env.SHOW_DRAFTS === "1";
const publicNotes = notes.filter((note) => note.visibility === "public");
const draftNotes = notes.filter((note) => note.visibility === "draft");
const visibleNotes = notes.filter((note) => note.visibility === "public" || showDrafts);
const pages = ["/", ...publicSlugs.map((slug) => `/work/${slug}`), ...visibleNotes.map((note) => `/notes/${note.slug}`)];
const widths = [320, 375, 768, 1440, 1920];

/**
 * Console errors and failed requests. Failed requests are tracked by URL, so
 * the browser's generic "Failed to load resource" message is skipped. Vercel's
 * own endpoints (/_vercel/*, e.g. Speed Insights) only exist on Vercel and 404
 * under `next start`, so they are ignored.
 */
async function trackConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (message.text().startsWith("Failed to load resource")) return;
    errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() < 400) return;
    if (new URL(response.url()).pathname.startsWith("/_vercel/")) return;
    errors.push(`${response.status()} ${response.url()}`);
  });
  return errors;
}

for (const path of pages) {
  test.describe(`page ${path}`, () => {
    for (const width of widths) {
      test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }

    test("has one h1, a canonical URL, and no console errors", async ({ page }) => {
      const errors = await trackConsoleErrors(page);
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /.+/);
      expect(errors).toEqual([]);
    });
  });
}

test("every internal link resolves", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    const hrefs = await page.locator("a[href^='/']").evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute("href") ?? ""),
    );
    for (const href of hrefs) seen.add(href.split("#")[0] || "/");
  }
  for (const href of seen) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("unknown case studies and notes return 404; drafts require preview", async ({ request }) => {
  expect((await request.get("/work/not-a-project")).status()).toBe(404);
  expect((await request.get("/notes/not-a-note")).status()).toBe(404);
  for (const slug of draftSlugs) {
    expect((await request.get(`/work/${slug}`)).status()).toBe(showDrafts ? 200 : 404);
  }
  for (const note of draftNotes) {
    expect((await request.get(`/notes/${note.slug}`)).status()).toBe(showDrafts ? 200 : 404);
    if (!showDrafts) {
      for (const image of ["opengraph-image", "twitter-image"]) {
        expect((await request.get(`/notes/${note.slug}/${image}`)).status()).toBe(404);
      }
    }
  }
});

test("sitemap lists the home page, public case studies and public notes only", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const slug of publicSlugs) expect(xml).toContain(`/work/${slug}`);
  for (const slug of draftSlugs) expect(xml).not.toContain(`/work/${slug}`);
  expect(xml).toMatch(/<loc>[^<]+\/<\/loc>/);
  for (const note of publicNotes) expect(xml).toContain(`/notes/${note.slug}`);
  for (const note of draftNotes) expect(xml).not.toContain(`/notes/${note.slug}`);
});

test("home page lists visible notes and labels drafts", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#notes")).toHaveCount(visibleNotes.length ? 1 : 0);
  for (const note of notes) {
    const link = page.locator(`#notes a[href='/notes/${note.slug}']`);
    await expect(link).toHaveCount(visibleNotes.includes(note) ? 1 : 0);
    if (showDrafts && note.visibility === "draft") {
      await expect(link.locator("..").getByText("Draft, not published")).toBeVisible();
    }
  }
});

for (const note of visibleNotes) {
  test(`note ${note.slug} has article metadata, structured data and social images`, async ({ page, request }) => {
    await page.goto(`/notes/${note.slug}`);
    await expect(page.locator("h1")).toHaveText(note.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/notes/${note.slug}$`));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", note.summary);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
    await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute("content", note.date);

    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json ?? "{}");
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.headline).toBe(note.title);
    expect(data.datePublished).toBe(note.date);
    expect(data.author).toMatchObject({ "@type": "Person", name: "Niadul Islam" });
    expect(data.mainEntityOfPage).toMatch(new RegExp(`/notes/${note.slug}$`));

    if (note.visibility === "draft") {
      await expect(page.getByText("Draft, not published. Awaiting review.")).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    }
    if (note.relatedProject) {
      await expect(page.locator(`article footer a[href='/work/${note.relatedProject}']`)).toBeVisible();
    }
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const url = await page.locator(selector).first().getAttribute("content");
      expect(url).toBeTruthy();
      const response = await request.get(new URL(url!).pathname);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toBe("image/png");
      expect((await response.body()).length).toBeGreaterThan(1000);
    }
  });
}

test("home page publishes Person structured data", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(json ?? "{}");
  expect(data["@type"]).toBe("Person");
  expect(data.name).toBe("Niadul Islam");
});

test("standalone header, hero and footer controls have comfortable mobile targets", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  const controls = page.locator('body > header a, body > header button, section[aria-labelledby="intro-title"] a, body > footer a');
  for (const control of await controls.all()) {
    if (!(await control.isVisible())) continue;
    const box = await control.boundingBox();
    const label = (await control.getAttribute("aria-label")) ?? (await control.textContent()) ?? "Control";
    expect(box?.height, label).toBeGreaterThanOrEqual(44);
    expect(box?.width, label).toBeGreaterThanOrEqual(44);
  }
});

test("practice case study links navigate within the current tab", async ({ page }) => {
  for (const entry of practice.filter((item) => item.visibility === "public" && item.relatedProject)) {
    await page.goto("/");
    const row = page.locator("#beyond li").filter({ has: page.getByRole("heading", { name: entry.title, exact: true }) });
    const link = row.getByRole("link", { name: /case study/ });
    await expect(link).not.toHaveAttribute("target", "_blank");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/work/${entry.relatedProject}$`));
  }
});

for (const slug of publicSlugs) {
  test(`case study ${slug} supports keyboard jumps to its main sections`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(`/work/${slug}`);
    const navigation = page.getByRole("navigation", { name: "Case study sections" });
    for (const [label, id] of [["What I did", "contributions"], ["Decisions", "decisions"], ["Outcome", "outcome"]]) {
      await navigation.getByRole("link", { name: label, exact: true }).focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeFocused();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });
}

test.describe("work index", () => {
  const plateOpacities = (page: Page) =>
    page.locator(".work-plate").evaluateAll((plates) => plates.map((plate) => getComputedStyle(plate).opacity));

  test("hover and keyboard focus reveal a project's plate on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();

    // Resting state: the first plate is shown.
    await page.mouse.move(2, 2);
    await expect.poll(() => plateOpacities(page)).toEqual(["1", ...publicSlugs.slice(1).map(() => "0")]);

    // Hover the second row.
    const second = page.locator(".work-link").nth(1);
    const box = await second.boundingBox();
    if (!box) throw new Error("second work row has no box");
    await page.mouse.move(box.x + 40, box.y + box.height / 2);
    await expect.poll(async () => (await plateOpacities(page))[1]).toBe("1");
    await expect.poll(async () => (await plateOpacities(page))[0]).toBe("0");

    // Keyboard focus on the last row reveals its plate.
    await page.mouse.move(2, 2);
    await page.locator(".work-link").last().focus();
    await expect.poll(async () => (await plateOpacities(page)).at(-1)).toBe("1");
  });

  test("plates are static and visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const states = await page
      .locator(".work-plate")
      .evaluateAll((plates) => plates.map((plate) => [getComputedStyle(plate).position, getComputedStyle(plate).opacity]));
    for (const [position, opacity] of states) {
      expect(position).toBe("static");
      expect(opacity).toBe("1");
    }
  });

  test("transitions are removed under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const duration = await page
      .locator(".work-plate")
      .first()
      .evaluate((plate) => parseFloat(getComputedStyle(plate).transitionDuration));
    expect(duration).toBeLessThan(0.01);
  });
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test.describe("theme toggle", () => {
  const background = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const light = "rgb(247, 247, 244)";
  const dark = "rgb(21, 22, 20)";

  test("follows the system, switches, persists, and clears back to the system", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Dark theme" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(await background(page)).toBe(light);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(await background(page)).toBe(dark);

    // The saved choice is applied before hydration, so there is no flash.
    await page.reload();
    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
    expect(await background(page)).toBe(dark);

    // Choosing the system's own theme removes the override.
    await page.getByRole("button", { name: "Dark theme" }).click();
    expect(await page.evaluate(() => document.documentElement.dataset.theme ?? null)).toBeNull();
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
    expect(await background(page)).toBe(light);
  });

  test("keeps open tabs in sync", async ({ context }) => {
    const first = await context.newPage();
    const second = await context.newPage();
    for (const tab of [first, second]) {
      await tab.emulateMedia({ colorScheme: "light" });
      await tab.goto("/");
    }
    await first.getByRole("button", { name: "Dark theme" }).click();
    await expect.poll(() => background(second)).toBe(dark);
    await expect(second.getByRole("button", { name: "Dark theme" })).toHaveAttribute("aria-pressed", "true");
  });
});
