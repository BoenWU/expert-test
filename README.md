# 500 静态网页

一个打开即显示 HTTP 500 服务器错误提示的静态页面，纯前端实现，不依赖任何服务端能力。

## 特性

- 首屏直接呈现错误码 `500`、错误说明与后续建议，无需任何交互或数据请求。
- 零网络请求、零外部资源：样式与脚本随构建产物内联，字体使用系统字体栈。
- 构建产物为单个 `dist/index.html`，可直接双击以本地文件方式打开，离线表现与联网一致。

## 本地运行

```bash
npm install
npm run dev
```

Vite 开发服务器会输出本地预览地址（默认 `http://localhost:5173`）。

## 构建

```bash
npm run build
```

构建结果位于 `dist/index.html`，可直接用浏览器打开。

## 单元测试

```bash
npm test
```

## 目录结构

```text
index.html            # 页面入口
src/main.jsx          # React 挂载入口
src/App.jsx           # 错误页组件
src/errorPageContent.js  # 页面文案常量
src/styles/app.css    # 页面样式（页面级 CSS）
tests/unit            # 单元测试
deploy/Dockerfile     # 可选的静态托管部署基线
```