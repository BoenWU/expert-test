// 实现阶段预览服务：以静态文件方式伺服工作区根目录（含 404.html）。
// 仅提供预览入口，不作为验收证据；浏览器验收由 QA 阶段独立执行。
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(here, "..", "..", "..");
const port = Number(process.env.PREVIEW_PORT || 0);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    const rel = urlPath === "/" ? "/404.html" : urlPath;
    const filePath = path.join(workspaceRoot, rel);
    if (!filePath.startsWith(workspaceRoot)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not Found");
  }
});

server.listen(port, "127.0.0.1", () => {
  const actual = server.address().port;
  console.log(`PREVIEW_URL http://127.0.0.1:${actual}/404.html`);
});
