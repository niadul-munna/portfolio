import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3100);

/**
 * Runs against a production build (`pnpm build` first, or `pnpm verify`).
 * Locally it uses the installed Google Chrome to avoid a browser download;
 * in CI, run `pnpm exec playwright install chromium` and it uses that instead.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    channel: process.env.CI ? undefined : "chrome",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chrome", use: { ...devices["Desktop Chrome"], channel: process.env.CI ? undefined : "chrome" } }],
  webServer: {
    command: `pnpm start --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
