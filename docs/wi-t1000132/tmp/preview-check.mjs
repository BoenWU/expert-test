// Preview health check for the local static server (wi-t1000132).
// Command-line only; this is a service reachability probe, NOT browser acceptance evidence.
import { get } from "node:http";

const base = process.argv[2];
if (!base) {
  console.error("usage: node preview-check.mjs <http://127.0.0.1:port>");
  process.exit(2);
}

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const req = get(base + path, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
    req.setTimeout(5000, () => {
      req.destroy(new Error("request timeout"));
    });
  });
}

const page = await fetchPage("/404.html");
const missing = await fetchPage("/no-such-page");

const hasPageContent = (body) =>
  body.includes(">404<") &&
  body.includes("页面未找到") &&
  body.includes('href="/"') &&
  body.includes("返回首页");

const results = [
  ["preview-reachable", page.status === 200],
  ["preview-serves-404-page", hasPageContent(page.body)],
  ["unknown-path-returns-404-status", missing.status === 404],
  ["unknown-path-serves-404-page", hasPageContent(missing.body)],
];

let failed = 0;
for (const [id, ok] of results) {
  console.log(`${ok ? "PASS" : "FAIL"} [${id}]`);
  if (!ok) failed += 1;
}
console.log(
  failed === 0
    ? "RESULT: preview health check passed"
    : `RESULT: ${failed}/${results.length} checks failed`
);
process.exit(failed === 0 ? 0 : 1);
