# 验证报告

## 验证结论

pass-with-risk

## 摘要

独立验证 500 静态网页是否满足「打开即呈现 500 错误提示」与「无服务端、无外部网络依赖即可正常显示」两项验收。

变更行为：React + Vite 实现的单文件静态 500 错误页：首屏呈现 500 错误码与简体中文说明，构建产物可脱离服务端以本地文件方式直接打开且样式完整。

非目标：
- 不验证部署到 nginx/Docker 的线上托管表现
- 不验证跳转入口、移动端专项适配、品牌规范等需求基线中标注为未规定的内容

## 验证环境

macOS 本机 Chrome 无头浏览器 + Vite 开发服务 Chrome headless (local file://) / Vite 5.4.21 / Node 项目 wi-t1000027-500-page@1.0.0；无业务数据、无账号与登录；页面仅含随文件发布的静态中文文案

## 验证检查

| 检查项 | 类型 | 状态 | 证据 |
|---|---|---|---|
| QA-01 | browser-ui | passed | 以本轮 Vite 开发服务 http://127.0.0.1:5391/ 打开页面：首屏即渲染错误码 500（92.16px/132px、红色 rgb(200,64,47)、加粗）、标题「服务器出错了」、副标题 INTERNAL SERVER ERROR、中文说明与建议文案，页脚「HTTP 500 · 服务器错误」；页面语言 zh-CN。1280×800 与 512×884 两种视口下错误码水平居中偏差均为 0px，无横向滚动，1280×800 下文档高度 800px 内容完整不裁切；控制台无报错，img 数量 0。<br>AC-01: 首屏无任何交互即显示：服务暂时不可用 / 500 / 服务器出错了 / INTERNAL SERVER ERROR / 中文错误说明与建议 / HTTP 500 · 服务器错误 (passed)<br>AC-01: 1280×800 下错误码字号 132px、颜色 rgb(200,64,47)、字体加粗，水平居中偏差 0px，文档高度 800px 无横向溢出无裁切；512px 窄视口下同样居中且无横向滚动；控制台无错误 (passed) |
| QA-02 | browser-ui | passed | 在未启动任何服务端进程时用本机 Chrome 无头模式以 file:// 直接打开构建产物 dist/index.html：DOM 渲染出 500 错误码与全部中文文案，截图显示浅灰背景+白色卡片居中、大号红色 500、标题与说明分层完整的样式（无缺样式、无空白、无报错页）。产物单文件 146,903 字节，页面内 src/href 引用 0 个，样式与脚本全部内联（style 1 段、script 2 段），无 @import；渲染日志中资源加载失败与控制台错误计数为 0。<br>AC-02: file:// 打开 dist/index.html 后正常渲染 500 文案与完整样式；仅 1 个内联样式段与 2 个内联脚本，无任何 src/href 外链请求；资源加载失败与控制台错误计数为 0 (passed) |

## 验收覆盖

| 验收项 | 结果 | 证据 |
|---|---|---|
| AC-01 | met | QA-01 |
| AC-02 | met | QA-02 |

## 缺陷

- —

## 未执行项

- —

## 剩余风险

- 构建产物内联了 Vite 的模块预加载辅助函数（内含 fetch 代码路径），本页无动态导入，运行时不触发；如后续新增动态导入会引入同源静态请求。
- 验证覆盖 Chrome 桌面与 512px 窄视口，未在 Safari/Firefox 及其他移动终端上实际打开。

<!-- structured-report:v1
{"decision":"pass-with-risk","summary":{"objective":"独立验证 500 静态网页是否满足「打开即呈现 500 错误提示」与「无服务端、无外部网络依赖即可正常显示」两项验收。","changedBehavior":"React + Vite 实现的单文件静态 500 错误页：首屏呈现 500 错误码与简体中文说明，构建产物可脱离服务端以本地文件方式直接打开且样式完整。","nonGoals":["不验证部署到 nginx/Docker 的线上托管表现","不验证跳转入口、移动端专项适配、品牌规范等需求基线中标注为未规定的内容"],"riskLabels":[]},"environment":{"name":"macOS 本机 Chrome 无头浏览器 + Vite 开发服务","version":"Chrome headless (local file://) / Vite 5.4.21 / Node 项目 wi-t1000027-500-page@1.0.0","dataProfile":"无业务数据、无账号与登录；页面仅含随文件发布的静态中文文案"},"verification":[{"checkId":"QA-01","type":"browser-ui","status":"passed","plan":[{"requirementId":"AC-01","kind":"runtime-render","action":"用浏览器直接打开该静态页面文件。","expected":"首屏无需任何交互即完整显示 500 错误码与错误说明文案，文字可读、布局完整。"},{"requirementId":"AC-01","kind":"visual-style","action":"用浏览器直接打开该静态页面文件。","expected":"首屏无需任何交互即完整显示 500 错误码与错误说明文案，文字可读、布局完整。"}],"evidence":"以本轮 Vite 开发服务 http://127.0.0.1:5391/ 打开页面：首屏即渲染错误码 500（92.16px/132px、红色 rgb(200,64,47)、加粗）、标题「服务器出错了」、副标题 INTERNAL SERVER ERROR、中文说明与建议文案，页脚「HTTP 500 · 服务器错误」；页面语言 zh-CN。1280×800 与 512×884 两种视口下错误码水平居中偏差均为 0px，无横向滚动，1280×800 下文档高度 800px 内容完整不裁切；控制台无报错，img 数量 0。","testStrategy":{"traits":[],"mode":"direct","maxAttempts":2},"observation":{"method":"browser","actor":"expert","reference":"agent_browser 本轮会话：open http://127.0.0.1:5391/ + snapshot + get text/attr/count 断言 + 只读 eval 版式测量（1280×800 与 512×884）+ errors 读取"},"assertions":[{"requirementId":"AC-01","kind":"runtime-render","action":"用浏览器直接打开该静态页面文件。","expected":"首屏无需任何交互即完整显示 500 错误码与错误说明文案，文字可读、布局完整。","actual":"首屏无任何交互即显示：服务暂时不可用 / 500 / 服务器出错了 / INTERNAL SERVER ERROR / 中文错误说明与建议 / HTTP 500 · 服务器错误","status":"passed"},{"requirementId":"AC-01","kind":"visual-style","action":"用浏览器直接打开该静态页面文件。","expected":"首屏无需任何交互即完整显示 500 错误码与错误说明文案，文字可读、布局完整。","actual":"1280×800 下错误码字号 132px、颜色 rgb(200,64,47)、字体加粗，水平居中偏差 0px，文档高度 800px 无横向溢出无裁切；512px 窄视口下同样居中且无横向滚动；控制台无错误","status":"passed"}]},{"checkId":"QA-02","type":"browser-ui","status":"passed","plan":[{"requirementId":"AC-02","kind":"runtime-render","action":"在本地未启动任何服务端进程的条件下，以本地文件方式打开页面并观察页面样式与文案。","expected":"页面正常渲染，样式与文案完整，不出现资源加载失败导致的缺样式、空白或报错提示。"}],"evidence":"在未启动任何服务端进程时用本机 Chrome 无头模式以 file:// 直接打开构建产物 dist/index.html：DOM 渲染出 500 错误码与全部中文文案，截图显示浅灰背景+白色卡片居中、大号红色 500、标题与说明分层完整的样式（无缺样式、无空白、无报错页）。产物单文件 146,903 字节，页面内 src/href 引用 0 个，样式与脚本全部内联（style 1 段、script 2 段），无 @import；渲染日志中资源加载失败与控制台错误计数为 0。","testStrategy":{"traits":[],"mode":"direct","maxAttempts":2},"observation":{"method":"browser","actor":"expert","reference":"本机 Chrome 无头渲染 file://dist/index.html：--dump-dom 输出 + 1280×800 截图（/tmp/t1000027-offline-1280.png）+ --enable-logging=stderr 资源与错误日志"},"assertions":[{"requirementId":"AC-02","kind":"runtime-render","action":"在本地未启动任何服务端进程的条件下，以本地文件方式打开页面并观察页面样式与文案。","expected":"页面正常渲染，样式与文案完整，不出现资源加载失败导致的缺样式、空白或报错提示。","actual":"file:// 打开 dist/index.html 后正常渲染 500 文案与完整样式；仅 1 个内联样式段与 2 个内联脚本，无任何 src/href 外链请求；资源加载失败与控制台错误计数为 0","status":"passed"}]}],"coverage":{"acceptance":"AC-01: 页面打开后，访问者可看到清晰的 “500” 错误码标识，以及说明发生服务器错误的提示文案。; AC-02: 在没有任何后端服务运行、且不加载外部网络资源的情况下，页面仍能完整呈现，样式与文案均正常。","mandatoryAcceptance":[{"id":"AC-01","source":"requirements.md#AC-01","surface":"user-interface","status":"met","checkIds":["QA-01"],"evidenceKinds":["runtime-render","visual-style"],"evidence":"QA-01 通过：页面首屏即显示错误码 500、中文标题「服务器出错了」与错误说明及建议文案，1280×800 与 512px 视口下居中、无遮挡、无横向滚动，控制台无报错。"},{"id":"AC-02","source":"requirements.md#AC-02","surface":"user-interface","status":"met","checkIds":["QA-02"],"evidenceKinds":["runtime-render"],"evidence":"QA-02 通过：未启动任何服务端时以 file:// 打开单文件产物 dist/index.html，样式与文案完整渲染，页面零外部资源引用、零资源加载失败，源码无网络调用。"}],"riskLabels":[],"verificationTypes":["browser-ui"]},"defects":[],"skippedChecks":[],"residualRisks":["构建产物内联了 Vite 的模块预加载辅助函数（内含 fetch 代码路径），本页无动态导入，运行时不触发；如后续新增动态导入会引入同源静态请求。","验证覆盖 Chrome 桌面与 512px 窄视口，未在 Safari/Firefox 及其他移动终端上实际打开。"],"baselineUpdates":[],"testStrategyVersion":1}
-->
