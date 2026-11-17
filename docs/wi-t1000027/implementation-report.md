# 实现报告：500 静态网页

## 结论

已按已批准的 [需求基线](requirements.md) 与 [架构基线](architecture-baseline.md) 落地一个 React + Vite 静态错误页。页面首屏直接呈现 HTTP `500` 错误码、简体中文错误说明与后续建议，样式与脚本内联进单个 `index.html`，无服务端进程、无接口请求、无外部网络资源。单元测试与生产构建均通过；浏览器视觉与 `file://` 打开方式的验收结论留给 QA 阶段。

## 实现范围

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面入口，声明 `lang="zh-CN"` 与页面标题 |
| `src/main.jsx` | React 挂载入口，引入页面级样式 |
| `src/App.jsx` | 错误页组件：状态徽标、错误码、标题、说明、建议、页脚（内联 SVG 图标） |
| `src/errorPageContent.js` | 页面文案常量（错误码、标题、说明、建议、状态英文标签） |
| `src/styles/app.css` | 页面级 CSS：居中单列排版、浅色底、单一强调色、系统字体栈 |
| `vite.config.js` | `base: './'` + 单文件内联插件，保证构建产物可脱离服务器直接打开 |
| `package.json` / `package-lock.json` | 依赖与脚本（`dev` / `build` / `preview` / `test`），锁定版本与 `deploy/Dockerfile` 的 `npm ci` 一致 |
| `tests/unit/error-page.test.mjs` | 单元测试：错误码、中文文案、无外部资源、无网络请求 |
| `README.md` | 运行、构建、测试与目录说明 |

设计阶段已生成的 `deploy/Dockerfile` 与 `.dockerignore` 按实际情况复用，未作修改：其 `npm ci` + `npm run build` + `nginx` 静态托管的链路与本次依赖、脚本和构建输出 `dist/` 一致。

## 调用链

```text
index.html (#root)
  └─ src/main.jsx            createRoot(...).render(<App />)
       ├─ src/App.jsx        error-page > error-panel > 徽标 / 500 / 标题 / 说明 / 建议
       │    └─ src/errorPageContent.js   文案唯一来源
       └─ src/styles/app.css 居中排版与响应式约束
```

数据来源只有随文件发布的文案常量，没有状态、持久化或网络层，因此不存在跨端一致性问题。

## 验收项实现对应

- **AC-01（打开即呈现 500 错误提示）**：`src/App.jsx` 首屏静态渲染错误码 `500`（带 `aria-label="错误码 500"`）、标题「服务器出错了」、错误说明与建议文案；文案取自 `src/errorPageContent.js`，不依赖交互、加载态或数据请求。
- **AC-02（无服务端与外部网络依赖）**：`vite.config.js` 使用 `base: './'` 与单文件内联，构建产物只有 `dist/index.html`，其中没有任何 `src` / `href` 资源引用；样式使用系统字体栈，图标为内联 SVG，源码中无 `fetch`、`XMLHttpRequest`、`EventSource`、`WebSocket`，也无外部资源地址。

## 开发验证

| checkId | 命令 / 动作 | 工作目录 | 结果 | 证据 |
| --- | --- | --- | --- | --- |
| unit-tests | `npm test` | 项目根目录 | 通过，4/4 | 4 项断言全部通过：错误码为 `500`；标题/说明/建议为简体中文且非空并含「服务器」；页面源码无外部资源地址与远程 `@import`，入口脚本为本地相对路径；源码无 `fetch`/`XMLHttpRequest`/`EventSource`/`WebSocket` |
| production-build | `npm run build` | 项目根目录 | 通过 | `vite v5.4.21` 转换 32 个模块，输出单个 `dist/index.html`（146.67 kB，gzip 47.97 kB），JS 与 CSS 均已内联 |
| dist-self-contained | 产物扫描：`ls dist`、`grep -oE '(src\|href)="[^"]*"' dist/index.html` | 项目根目录 | 通过 | `dist` 目录仅有 `index.html`；产物中不存在任何 `src` / `href` 资源引用，无外链脚本或样式表 |
| dev-server-start | `npm run dev -- --port 5391 --strictPort --host 127.0.0.1` | 项目根目录 | 通过 | Vite 102ms 就绪，`curl` 返回 HTTP 200；预览地址 http://127.0.0.1:5391/ |

说明：产物中出现的 `http://www.w3.org/...` 与 `reactjs.org/docs/error-decoder.html` 字样来自 React 运行时的 XML 命名空间常量与错误提示文案，不构成资源加载；产物内已无任何需要浏览器发起请求的资源引用。

## QA 交接

- 启动命令：`npm run dev`（工作目录为项目根目录，当前预览地址 http://127.0.0.1:5391/）。
- 离线验证入口：`npm run build` 后直接以本地文件方式打开 `dist/index.html`，无需启动任何服务。
- 无登录、无测试账号、无测试数据或初始化脚本；页面为纯展示，无表单、无写入、无状态流转。
- 无自动推进/随机结果/定时任务类逻辑，不需要额外确定性验证入口。

## 遗留与风险

- 浏览器实际渲染、视觉表现与 `file://` 直接打开的结论由 QA 阶段独立启动服务后验证，本阶段不据此声称验收通过。
- `deploy/Dockerfile` 的镜像构建未在本阶段执行，仅确认其依赖文件、脚本与输出目录与本实现一致。