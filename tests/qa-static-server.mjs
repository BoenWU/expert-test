// QA 临时静态验证服务：仅绑定 127.0.0.1，服务当前目录（public/）下的交付文件。
// 用途：verification 阶段在真实浏览器中渲染验收 public/403.html（预览浏览器不支持 file:// 协议）。
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 41731;
const HOST = "127.0.0.1";
const root = process.cwd();

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root)) {
    res.statusCode = 403;
    res.end("forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`QA static server listening on http://${HOST}:${PORT}/`);
});
