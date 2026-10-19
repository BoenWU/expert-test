// 404 静态页面开发侧内容断言（不启动浏览器、不依赖服务端）。
// 运行：node tests/check-static-page.mjs
// 退出码：0 = 全部通过；1 = 存在失败项。
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// U+FEFF（UTF-8 BOM）与 U+FFFD（UTF-8 解码替换字符）以码点数值表示，
// 避免 JS 源文件中出现不可见特殊字符。
const BOM = String.fromCharCode(0xfeff);
const REPLACEMENT = String.fromCharCode(0xfffd);

let page = '';
let home = '';
let pageReadError = null;
let homeReadError = null;

try {
  page = await readFile(join(siteRoot, '404.html'), 'utf-8');
} catch (err) {
  pageReadError = err;
}
try {
  home = await readFile(join(siteRoot, 'index.html'), 'utf-8');
} catch (err) {
  homeReadError = err;
}

const results = [];
function check(id, condition, detail) {
  results.push({ id, status: condition ? 'pass' : 'fail', detail });
}

check('FR-M1-1-code', pageReadError === null && page.includes('404'), '404.html 可读且展示 "404" 状态码标识');
check('FR-M1-1-title', page.includes('页面未找到'), '404.html 展示中文 "页面未找到" 提示');
check('FR-M1-2-lang', /<html[^>]*lang="zh-CN"/.test(page), '根元素声明 lang="zh-CN"');
check('FR-M1-3-doctype', /^<!DOCTYPE html>/i.test(page.trim()), 'HTML5 doctype 声明');
check('FR-M1-3-charset', /<meta[^>]+charset=["']?utf-8["']?/i.test(page), 'UTF-8 编码声明');
check(
  'FR-M1-3-no-external',
  !/(<script[\s>]|<link[\s>]|src=["']https?:|@import|url\(\s*["']?https?:)/i.test(page),
  '无外部 JS/CSS/图片引用，全部内容随页面文件交付'
);
check(
  'NF-01-no-runtime-request',
  !/(fetch\(|XMLHttpRequest|localStorage|sessionStorage|WebSocket)/i.test(page),
  '无脚本请求与浏览器存储，纯静态无服务端依赖'
);
check('FR-M2-1-link', /<a[^>]+href="index\.html"[^>]*>/.test(page), '“返回首页”链接指向同目录 index.html');
check('FR-M2-1-target-exists', homeReadError === null && home.length > 0, '链接目标 index.html 存在（返回入口可用）');
check(
  'FR-M2-2-clickable',
  /class="back-home"/.test(page) && /\.back-home\s*\{/.test(page),
  '返回入口具有与正文区分的可点击样式'
);
check('NF-02-no-bom', page.charCodeAt(0) !== 0xfeff, '文件无 UTF-8 BOM');
check('NF-02-utf8-decodable', !page.includes(REPLACEMENT), '文件按 UTF-8 解码无替换字符');
check('AC-01-home-readable', homeReadError === null && /<html[^>]*lang="zh-CN"/.test(home), 'index.html 同为自包含 UTF-8 中文静态页');

let failed = 0;
for (const r of results) {
  const mark = r.status === 'pass' ? 'PASS' : 'FAIL';
  console.log(`${mark}  ${r.id}  ${r.detail}`);
  if (r.status === 'fail') failed += 1;
}
if (pageReadError) console.error(`读取 404.html 失败: ${pageReadError.message}`);
if (homeReadError) console.error(`读取 index.html 失败: ${homeReadError.message}`);

if (failed === 0) {
  console.log(`\n全部 ${results.length} 项检查通过。`);
  process.exit(0);
} else {
  console.error(`\n${failed}/${results.length} 项检查失败。`);
  process.exit(1);
}
