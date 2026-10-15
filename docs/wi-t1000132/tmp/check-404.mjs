// Static structure self-check for 404.html (wi-t1000132, implementation stage)
// Reads the deliverable from the workspace root and asserts the approved
// architecture baseline: single self-contained file, no external resources,
// no scripts, zh-CN semantics, native keyboard-reachable home link.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const file = join(process.cwd(), "404.html");
let html = "";
try {
  html = readFileSync(file, "utf8");
} catch (err) {
  console.error(`FAIL 404.html is not readable: ${err.message}`);
  process.exit(1);
}

const checks = [
  {
    id: "file-nonempty",
    desc: "404.html exists and is non-empty",
    run: () => html.trim().length > 0,
  },
  {
    id: "doctype-html5",
    desc: "HTML5 doctype declared",
    run: () => /^<!DOCTYPE html>/i.test(html.trim()),
  },
  {
    id: "lang-zh-cn",
    desc: 'document declares lang="zh-CN"',
    run: () => /<html[^>]*lang="zh-CN"/.test(html),
  },
  {
    id: "charset-utf8",
    desc: "UTF-8 charset meta present",
    run: () => /<meta[^>]*charset="utf-8"/i.test(html),
  },
  {
    id: "title-404",
    desc: "title contains 404 and page-not-found wording",
    run: () => /<title>[^<]*404[^<]*页面未找到[^<]*<\/title>/.test(html),
  },
  {
    id: "error-code-404",
    desc: 'visible "404" marker rendered in main area',
    run: () => /class="error-code"[^>]*>\s*404\s*</.test(html),
  },
  {
    id: "headline-not-found",
    desc: '"页面未找到" headline present',
    run: () => /<h1[^>]*>\s*页面未找到\s*<\/h1>/.test(html),
  },
  {
    id: "desc-not-exist",
    desc: '"当前地址不存在" explanation text present',
    run: () => /当前地址不存在或已被移除/.test(html),
  },
  {
    id: "home-link-root",
    desc: 'native anchor "返回首页" with href="/"',
    run: () => /<a[^>]*class="btn-home"[^>]*href="\/"[^>]*>\s*返回首页\s*<\/a>|<a[^>]*href="\/"[^>]*class="btn-home"[^>]*>\s*返回首页\s*<\/a>/.test(html),
  },
  {
    id: "focus-visible-style",
    desc: "keyboard focus style (focus-visible outline) defined",
    run: () => /\.btn-home:focus-visible\s*\{[^}]*outline/.test(html),
  },
  {
    id: "inline-style-only",
    desc: "styles are inline; no external stylesheet link",
    run: () => /<style>[\s\S]*<\/style>/.test(html) && !/<link[^>]*rel="stylesheet"/i.test(html),
  },
  {
    id: "no-scripts",
    desc: "no script element used",
    run: () => !/<script[\s>]/i.test(html),
  },
  {
    id: "no-external-resources",
    desc: "no external URLs referenced (styles, fonts, images, imports)",
    run: () => !/(?:https?:)?\/\//.test(html) && !/@import/.test(html),
  },
  {
    id: "single-main-landmark",
    desc: "exactly one <main> landmark wraps the content",
    run: () => (html.match(/<main[\s>]/gi) || []).length === 1,
  },
];

let failed = 0;
for (const check of checks) {
  let ok = false;
  try {
    ok = check.run();
  } catch {
    ok = false;
  }
  console.log(`${ok ? "PASS" : "FAIL"} [${check.id}] ${check.desc}`);
  if (!ok) failed += 1;
}

console.log(
  failed === 0
    ? `RESULT: all ${checks.length} checks passed`
    : `RESULT: ${failed}/${checks.length} checks failed`
);
process.exit(failed === 0 ? 0 : 1);
