// Lists every unconfirmed fact (`pending("...")`) and every draft item in
// /content. Exits with 1 while any pending fact sits in public content, so it
// can gate a deploy. Pending facts inside drafts are reported but don't block,
// because drafts never reach a production build.
//
//   pnpm check:content
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = new URL("../content/", import.meta.url).pathname;
const files = (await readdir(dir)).filter((file) => file.endsWith(".ts") && file !== "types.ts");

const blocking = [];
const inDrafts = [];
const drafts = [];

for (const file of files) {
  const source = await readFile(join(dir, file), "utf8");
  // Content entries are objects in top-level arrays, opened at two spaces.
  const entries = source.split(/\n(?=  \{\n)/);
  let line = 1;
  for (const entry of entries) {
    const isDraft = /visibility:\s*"draft"/.test(entry);
    const name = entry.match(/(?:slug|id):\s*"([^"]+)"/)?.[1];
    if (isDraft) drafts.push(`content/${file}  ${name ?? "(unnamed)"}`);
    entry.split("\n").forEach((text, offset) => {
      for (const match of text.matchAll(/pending\(\s*"([^"]+)"\s*\)/g)) {
        const item = `content/${file}:${line + offset}  ${match[1]}`;
        (isDraft ? inDrafts : blocking).push(item);
      }
    });
    line += entry.split("\n").length;
  }
}

const print = (title, items) => {
  if (!items.length) return;
  console.log(`${title} (${items.length}):`);
  for (const item of items) console.log(`  ${item}`);
  console.log("");
};

print("Pending facts in public content — blocking", blocking);
print("Drafts, left out of production builds", drafts);
print("Pending facts inside drafts — not blocking", inDrafts);
if (!blocking.length) console.log("Public content has no pending facts.");

process.exitCode = blocking.length ? 1 : 0;
