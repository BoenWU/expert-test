// Preview-only static file server for 404.html (wi-t1000132).
// The deliverable itself stays a serverless static file; this local server
// only exposes a preview URL and binds a random loopback port to avoid
// colliding with other tasks.
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = join(root, "404.html");

const server = createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }
  let body = "";
  try {
    body = readFileSync(pagePath);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404.html is missing from the workspace root");
    return;
  }
  const url = new URL(req.url, "http://127.0.0.1");
  const isPage = url.pathname === "/" || url.pathname === "/404.html" || url.pathname === "/404.html/";
  res.writeHead(isPage ? 200 : 404, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(req.method === "HEAD" ? undefined : body);
});

server.listen(0, "127.0.0.1", () => {
  const { port } = server.address();
  process.stdout.write(`PREVIEW_URL=http://127.0.0.1:${port}/404.html\n`);
});
