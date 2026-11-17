import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

import { ERROR_PAGE_COPY } from '../../src/errorPageContent.js';

const projectRoot = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));

async function readSource(relativePath) {
  return readFile(path.join(projectRoot, relativePath), 'utf8');
}

test('错误页固定呈现 HTTP 500 错误码', () => {
  assert.equal(ERROR_PAGE_COPY.code, '500');
});

test('错误页文案为简体中文且完整可读', () => {
  const hanCharacters = /[\u4e00-\u9fff]/;
  const { title, description, hint } = ERROR_PAGE_COPY;

  for (const [field, value] of Object.entries({ title, description, hint })) {
    assert.equal(typeof value, 'string', `${field} 必须是字符串`);
    assert.ok(value.trim().length > 0, `${field} 不能为空`);
    assert.match(value, hanCharacters, `${field} 应包含简体中文文案`);
  }

  assert.match(description, /服务器/, '说明文案应点明服务器错误');
});

test('页面源码不引用任何外部网络资源', async () => {
  const sources = await Promise.all(
    ['index.html', 'src/App.jsx', 'src/main.jsx', 'src/styles/app.css'].map(readSource),
  );

  for (const source of sources) {
    assert.doesNotMatch(source, /https?:\/\//i, '静态页面不应包含外部资源地址');
    assert.doesNotMatch(source, /@import\s+url/i, '样式不应引入远程资源');
  }

  const html = sources[0];
  const scriptSources = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  assert.ok(scriptSources.length > 0, '页面入口应包含应用脚本');
  for (const scriptSource of scriptSources) {
    assert.match(scriptSource, /^\.?\//, '应用脚本必须使用本地相对路径');
    assert.doesNotMatch(scriptSource, /^\/\//, '应用脚本不得指向协议相对的外部地址');
  }
});

test('页面不发起网络请求，保持无服务端依赖', async () => {
  const sources = await Promise.all(
    ['src/App.jsx', 'src/main.jsx', 'src/errorPageContent.js'].map(readSource),
  );

  for (const source of sources) {
    assert.doesNotMatch(source, /\bfetch\s*\(/, '页面不应发起 fetch 请求');
    assert.doesNotMatch(source, /XMLHttpRequest/, '页面不应使用 XMLHttpRequest');
    assert.doesNotMatch(source, /EventSource|WebSocket/, '页面不应建立长连接');
  }
});