import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { practice } from "../content/practice";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { isPending } from "../content/types";

/** Paths to every `pending(...)` value inside a content object. */
function findPending(value: unknown, path = ""): string[] {
  if (isPending(value)) return [`${path}: ${value.note}`];
  if (Array.isArray(value)) return value.flatMap((item, index) => findPending(item, `${path}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => findPending(item, path ? `${path}.${key}` : key));
  }
  return [];
}

// Phrases the brief rules out. A failing test here means copy drifted.
const banned = [
  /passionate/i,
  /turning ideas into reality/i,
  /seamless/i,
  /pixel[- ]perfect/i,
  /digital wizard/i,
  /cutting[- ]edge/i,
  /world[- ]class/i,
  /rockstar|ninja/i,
  /synerg/i,
  /leverag/i,
];

test("content avoids cliché copy", () => {
  const dir = join(process.cwd(), "content");
  for (const file of readdirSync(dir).filter((name) => name.endsWith(".ts"))) {
    const source = readFileSync(join(dir, file), "utf8");
    for (const pattern of banned) expect(source, `${file} matches ${pattern}`).not.toMatch(pattern);
  }
});

test("project slugs and practice ids are unique", () => {
  const slugs = projects.map((project) => project.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
  const ids = practice.map((entry) => entry.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("every case study has each section filled in", () => {
  for (const project of projects) {
    const { caseStudy } = project;
    expect(project.media.length, project.slug).toBeGreaterThan(0);
    for (const [section, items] of Object.entries(caseStudy)) {
      expect(items.length, `${project.slug}.${section}`).toBeGreaterThan(0);
    }
  }
});

test("there are three or four public projects to select", () => {
  const visible = projects.filter((project) => project.visibility === "public");
  expect(visible.length).toBeGreaterThanOrEqual(3);
  expect(visible.length).toBeLessThanOrEqual(4);
});

test("public content has no pending facts", () => {
  const publicContent = {
    profile,
    projects: projects.filter((project) => project.visibility === "public"),
    practice: practice.filter((entry) => entry.visibility === "public"),
  };
  expect(findPending(publicContent)).toEqual([]);
});
