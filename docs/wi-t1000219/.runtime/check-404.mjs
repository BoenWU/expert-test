// 开发侧静态自检：验证 404.html 满足需求/设计基线中的可静态核验断言。
// 仅做文件内容与结构检查，不启动浏览器（浏览器验收由 QA 阶段负责）。
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(here, "..", "..", "..");
const target = path.join(workspaceRoot, "404.html");

const results = [];
function check(id, description, ok, evidence) {
  results.push({ id, description, status: ok ? "passed" : "failed", evidence });
  console.log(`${ok ? "PASS" : "FAIL"} ${id} ${description}${evidence ? ` | ${evidence}` : ""}`);
}

let html = "";
let sizeBytes = 0;
try {
  const buf = await readFile(target);
  sizeBytes = buf.byteLength;
  html = buf.toString("utf8");
} catch (err) {
  console.error(`FAIL file-read 无法读取 404.html: ${err.message}`);
  process.exit(1);
}

check("file-exists", "交付物 404.html 存在于工作区根目录", true, `${target} (${sizeBytes} bytes)`);
check("doctype", "文档以 <!DOCTYPE html> 开头", /^\s*<!DOCTYPE html>/i.test(html), "首行 DOCTYPE");
check("lang", "声明简体中文语言 lang=\"zh-CN\"", /<html[^>]+lang="zh-CN"/.test(html), "<html lang=\"zh-CN\">");
check("charset", "声明 UTF-8 字符集", /<meta[^>]+charset="utf-8"/i.test(html), "<meta charset=\"utf-8\">");
check("title", "包含页面标题", /<title>[^<]*404[^<]*<\/title>/.test(html), "<title>页面不存在（404）</title>");
check("code-404", "首屏显著展示 404 错误标识", /<h1[^>]*>\s*404\s*<\/h1>/.test(html), "<h1 class=\"error-code\">404</h1>");
check("message", "包含“页面不存在”简体中文提示文案", html.includes("抱歉，您访问的页面不存在"), "“抱歉，您访问的页面不存在”");
check("home-entry", "提供“返回首页”入口且指向站点根路径", /<a[^>]+href="\/"[^>]*>\s*返回首页\s*<\/a>/.test(html), "<a class=\"back-home\" href=\"/\">返回首页</a>");
check("no-script", "不含任何 JavaScript", !/<script/i.test(html), "无 <script> 标签");
check("no-external-resource", "不引用外部资源（无 http/https 资源链接）", !/(?:src|href)\s*=\s*["']https?:/i.test(html) && !/@import/i.test(html) && !/url\(\s*["']?https?:/i.test(html), "无外部 src/href/@import/url() 引用");
check("no-build-dependency", "样式内联于同一文件、无构建步骤依赖", /<style>/.test(html) && !/<link[^>]+rel=["']stylesheet/i.test(html), "内联 <style>，无外部样式表");
check("tag-balance", "html/head/body/main 结构标签闭合完整", (() => {
  for (const tag of ["html", "head", "body", "main", "style", "title"]) {
    const open = (html.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, "gi")) || []).length;
    if (open !== close) return false;
  }
  return true;
})(), "开闭标签数量一致");
check("size-budget", "单文件轻量（< 20KB）", sizeBytes < 20 * 1024, `${sizeBytes} bytes`);

const failed = results.filter((r) => r.status === "failed");
console.log(`\nsummary: ${results.length - failed.length}/${results.length} passed`);
if (failed.length > 0) {
  console.error(`failed checks: ${failed.map((f) => f.id).join(", ")}`);
  process.exit(1);
}
process.exit(0);
