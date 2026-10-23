# 实现报告：服务访问 500 静态网页

> 工作项：wi-t1000364 ｜ 阶段：implementation ｜ 路线：simple-frontend（inline）

## 1. 变更行为与实现依据

本次交付在全新工作区中新建**一张自包含的 HTTP 500 错误提示静态网页**：访问者在浏览器中直接打开该文件即可看到状态码 "500"、标题"服务器内部错误"及错误含义说明；页面内容与样式全部随 HTML 文件本身内联提供，全程不依赖任何服务端程序。

实现依据为已批准的 `docs/wi-t1000364/requirements.md`（AC-01）与已冻结的 `docs/wi-t1000364/architecture-baseline.md`（单文件自包含静态 HTML、内联 `<style>`、无脚本、无外部资源、无构建、无启动命令）。

## 2. 实现范围

| 项 | 内容 |
| --- | --- |
| 新增文件 | `public/500.html`（1808 字节，UTF-8） |
| 技术形态 | 单文件静态 HTML，`<style>` 内联样式，`lang="zh-CN"`，含 viewport 适配 |
| 页面内容 | 状态码 `500`、标题"服务器内部错误"、说明文案（服务器处理请求遇到内部错误，请稍后重试）、"返回首页"静态链接（`href="/"`，页内静态锚点，不引入动态行为） |
| 视觉体系 | 沿用本项目同类 404 错误页（wi-t1000340）的设计语言：系统字体栈、居中卡片、深蓝主按钮，保证错误页系列产品一致性 |
| 无服务端 | 无 `<script>`、无内联事件、无外部 CSS/字体/图片引用、无网络请求；`file://` 协议直接打开即可完整呈现 |
| 未变更 | 工作区此前无源码，无既有行为、数据或契约需要保持；未引入任何构建流程、依赖清单或服务端程序 |

存放路径说明：架构基线授权实现阶段在源码写范围内确定文件路径；本阶段选择 `public/`（可公开托管的静态资源目录）内的 `500.html`，文件名直接表达 500 错误页语义。

## 3. 开发验证（本阶段实际执行）

以本次专用临时脚本（`scripts/impl-selfcheck.mjs`，运行后已清理）执行静态检查，命令 `node scripts/impl-selfcheck.mjs`，工作目录为工作项工作区根目录，退出码 `0`，16/16 项通过：

| 检查项 | 结果 | 说明 |
| --- | --- | --- |
| file-delivered | passed | 文件存在且非空（1808 字节） |
| no-script-tag | passed | 无 `<script>` |
| no-external-refs | passed | 无任何外部 URL 引用 |
| no-inline-handlers | passed | 无 on* 内联事件属性 |
| style-inline | passed | 样式由文件内 `<style>` 提供，无外链样式表 |
| no-image-assets | passed | 无图片资源引用 |
| doctype / html-lang / charset-utf8 / viewport | passed | 文档基础结构完整 |
| title-500 | passed | `<title>500 · 服务器内部错误</title>` |
| head-body-html-closed | passed | head/body/html 均正确闭合 |
| tag-balance | passed | 栈式标签配对解析全部闭合 |
| status-code-500 | passed | 页面显示状态码 500 |
| heading-server-error | passed | 页面显示"服务器内部错误"标题 |
| description-server-error | passed | 页面含 500 错误含义说明文案 |

另有预览入口可用性检查：本地静态文件服务（仅作预览入口，非交付组件）对 `http://127.0.0.1:4371/500.html` 返回 `200`、`text/html`、1808 字节，与文件实体一致。

## 4. 验证边界

- 本阶段为开发侧静态自检，**未执行浏览器渲染验收**：AC-01 要求的 runtime-render 证据（页面渲染无空白、无脚本错误、可见 500 提示、`file://` 直开呈现）由后续验证阶段在浏览器中独立执行。
- 上述预览 URL 仅为查看入口，不构成验收证据；交付物本身不依赖该服务。

## 5. 遗留风险

- 无功能性遗留风险。`返回首页` 链接指向站点根路径，在 `file://` 直开或独立托管时目标是否存在取决于实际站点结构（需求未规定该入口，仅作静态锚点提供）。
