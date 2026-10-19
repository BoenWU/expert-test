// 纯静态站点本地预览服务器（开发预览用，非交付物运行依赖）。
// 站点本身不依赖任何服务端：页面可直接以 file:// 方式打开。
// 运行：node scripts/preview-server.mjs [port]   默认端口 4840
// 行为：提供 public/ 目录内容；未匹配路径返回 public/404.html（HTTP 404）。
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, isAbsolute, join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const port = Number(process.argv[2] || process.env.PORT || 4840);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';

    const relativePath = normalize(pathname).replace(/^[\\/]+/, '');
    const filePath = join(siteRoot, relativePath);
    const containment = relative(siteRoot, filePath);
    if (containment.startsWith('..') || isAbsolute(containment)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    const file = await readFile(filePath, 'utf-8').catch(() => null);
    if (file !== null) {
      res.writeHead(200, { 'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream' });
      res.end(file);
      return;
    }

    const notFoundPage = await readFile(join(siteRoot, '404.html'), 'utf-8');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(notFoundPage);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Preview server: http://localhost:${port}/404.html (serving ${siteRoot})`);
});
