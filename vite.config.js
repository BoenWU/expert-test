import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// 页面必须能直接以本地文件方式打开：构建产物内联样式与脚本，
// 并使用相对路径，避免 file:// 下的模块跨域限制。
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
});