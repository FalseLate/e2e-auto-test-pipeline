// Playwright 通用配置模板
// 复制到项目根 playwright.config.js，按实际情况改占位符
// 注意：若项目 package.json 有 "type": "module"，本文件用 ESM（import）；否则改 CommonJS（require）
import { defineConfig, devices } from '@playwright/test';

const FRONTEND_PORT = 4173;            // TODO: 改成本项目 preview/dev 端口
const BACKEND_PORT = 8080;             // TODO: 改成本后端端口

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,                 // 串行，避免测试间串数据
  forbidOnlyIs: !!process.env.CI,
  retries: 0,
  workers: 1,                           // 串行
  timeout: 120_000,                     // 全局超时，AI 生成类接口慢
  expect: { timeout: 20_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  trace: 'on',                          // 全程录 trace
  screenshot: 'only-on-failure',
  use: {
    baseURL: `http://localhost:${FRONTEND_PORT}`,
    headless: false,                    // 有头可视化
    channel: 'msedge',                   // 本机 Edge；Chrome 用 'chrome'；不用内置浏览器
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15_000,
  },
  webServer: {
    // 自动起前端静态服务；若项目是 dev server，改 command
    command: 'npm run preview',
    url: `http://localhost:${FRONTEND_PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'local-edge', use: { ...devices['Desktop Edge'] } },
  ],
});
