# 404 静态网页 · 实现报告

## 变更内容

新增仓库根目录 `404.html`：一个自包含的纯静态 404 页面，HTML 结构与 CSS 样式内联于同一文件，无 JavaScript、无外部资源（不引用 CDN、外链字体、外链图片或脚本）、无客户端存储。直接以 file:// 方式在浏览器打开即可完整展示，全程无需任何服务端——这是需求基线的强制边界，也是选择单文件自包含承载的根因（见已批准架构基线）。

## 实现范围与结构

实现依据：需求基线 `docs/wi-t1000340/requirements.md`（sha256:6027445a7f00f324e46d5e2845299a1bd8b198843c5fdce4e59522446eba7970）与架构基线 `docs/wi-t1000340/architecture-baseline.md`（sha256:01c9264ce23b0a148d8f8f3442681b2a3304eb36481f4499e3632dd568d173d9）。

页面交付要素：

- 显著的「404」标识：独立大字号文本节点（`clamp(88px, 22vw, 148px)`），深色 `#0f172a`，页面最强视觉层级。
- 主标题 `h1`「页面未找到」，附一句简短辅助说明「您访问的页面可能已被移动或不存在。」。
- 唯一交互入口：「返回首页」链接，`href="/"`（站点根路径），实心按钮样式，含 `hover` 与 `focus-visible` 状态；不引入其他导航、搜索或候选链接。
- 文档声明：`lang="zh-CN"`、`charset="UTF-8"`、响应式 viewport；文案为简体中文。
- 视觉：内联 CSS，浅灰背景（`#f5f7fa`）+ 居中排版 + 深色高对比文字（正文 `#475569` 对浅背景约 7:1，高于 WCAG AA 正文要求的 4.5:1；标题层级对比更高），保证以 file:// 离线打开时样式完整渲染、无任何运行时样式回退缺失。

调用链说明：本交付为纯静态单文件，不存在 UI → API → 领域 → 存储的调用链；渲染链为「浏览器直接加载 `404.html` → 内联样式即时渲染 → 点击『返回首页』导航至站点根路径 `/`」。无服务端程序、后端接口、构建工具链或运行时数据参与，页面不产生任何浏览器状态。

## 开发侧验证（实际执行）

验证方式：对交付文件执行静态结构断言（临时探针脚本，位于任务授权写入范围内的 `docs/wi-t1000340/.tmp/`，阶段收口后清理）。

- 命令：`node docs/wi-t1000340/.tmp/dev-checks.mjs`
- 工作目录：工作区根（`wi-t1000340` 工作树根目录）
- 退出码：0
- 结果：15/15 断言通过

| checkId | 断言内容 | 结果 |
| --- | --- | --- |
| CHK-01-doctype | 文档以 `<!DOCTYPE html>` 开头 | PASS |
| CHK-02-lang | html 根标签声明 `lang="zh-CN"` | PASS |
| CHK-03-charset | 声明 `charset="UTF-8"` | PASS |
| CHK-04-viewport | 声明响应式 viewport | PASS |
| CHK-05-title | title 含「页面未找到」 | PASS |
| CHK-06-404-mark | 页面文本节点包含显著的「404」标识 | PASS |
| CHK-07-h1 | h1 标题为「页面未找到」 | PASS |
| CHK-08-home-link | 存在「返回首页」链接且 `href="/"` | PASS |
| CHK-09-utf8-text | 中文文案以 UTF-8 正确解码且辅助说明存在 | PASS |
| CHK-10-no-script | 无 script 标签（零 JS 依赖） | PASS |
| CHK-11-no-external-url | 无任何外部 URL / 协议引用 | PASS |
| CHK-12-no-ext-assets | 无图片、外链样式表、iframe 或 CSS url() 资源 | PASS |
| CHK-13-inline-style | 样式内联于单个 `<style>` 标签 | PASS |
| CHK-14-no-storage | 无 localStorage/sessionStorage/Cookie/IndexedDB 访问 | PASS |
| CHK-15-single-doc | 单一完整 HTML 文档 | PASS |

说明：本阶段为开发边界，不启动浏览器执行 E2E 渲染或点击交互验证（含 file:// 打开实测），该部分按工作流阶段边界留给 verification 阶段执行。

## 验收标准状态

| AC | 内容 | 本阶段状态 | 说明 |
| --- | --- | --- | --- |
| AC-01 | 无服务端直接打开 404 页面，呈现未找到提示并可返回首页 | 实现侧交付完成；运行时验证 not-run（待 verification 阶段） | 实现侧前置条件已全部满足：静态文件已交付、无服务端依赖、404 标识与「页面未找到」文案存在、「返回首页」入口 `href="/"` 存在。runtime-render 与 interaction 证据按 AC 验证动作（file:// 直接打开、点击入口）在 verification 阶段采集，本阶段不代 QA 声称通过。 |

## 遗留风险与后续

- 运行时渲染与「返回首页」点击交互未在本阶段实测（开发侧边界不做浏览器 E2E），留待 verification 阶段按 AC-01 验证；除该既定阶段边界外无其他已知风险：交付零依赖、零构建、零运行时数据，不存在构建或环境漂移面。
- 「返回首页」链接目标 `/` 为需求与设计基线冻结决定；部署到真实站点时自然指向站点根路径，无需实现侧调整。
