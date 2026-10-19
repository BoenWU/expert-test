# 静态站点 · 404 页面（wi-t1000299）

自包含的 404 静态页面：结构与样式全部内联于单个 HTML 文件，无外部资源、无脚本、无服务端依赖。

## 文件结构

- `public/` — 站点根目录（部署时以该目录内容作为站点根）
  - `404.html` — 404 页面（主交付物）
  - `index.html` — 站点首页（“返回首页”链接的目标页面）
- `tests/check-static-page.mjs` — 开发侧内容断言检查
- `scripts/preview-server.mjs` — 本地 HTTP 预览服务器（可选，仅开发预览用）

## 本地查看（无服务端）

用浏览器直接打开 `public/404.html` 即可，页面不依赖任何服务端程序。

## 本地预览（可选，HTTP 方式）

```bash
node scripts/preview-server.mjs [port]   # 默认端口 4840
```

访问 `http://localhost:4840/404.html`；访问任意不存在的路径将返回该 404 页面（HTTP 404）。

## 部署

把 `public/` 目录内容发布到任意静态托管根目录；或将服务器错误页指向 `/404.html`，例如（nginx）：

```nginx
error_page 404 /404.html;
```

## 开发检查

```bash
node tests/check-static-page.mjs
```
