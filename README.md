# e2e-playwright-regression

> 一套通用的 Playwright 端到端回归测试工作流，写给任意前后端 Web 项目。

<p align="left">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright&logoColor=white">
  <img alt="Chromium Edge" src="https://img.shields.io/badge/browser-local%20Edge%2FChrome-0078D4">
  <img alt="mode" src="https://img.shields.io/badge/run-headless%3Afalse-blue">
</p>

---

## 这是什么

一个**项目无关**的 E2E 回归测试方法论 + 可复用模板集。它不绑死任何技术栈——Vue / React / Angular 前端，Java / Node / Python / Go 后端，都能套。

核心理念很简单：

1. **先把环境和项目读明白，再动手写用例**，不靠猜；
2. **接口层先行**，后端业务逻辑打穿了再点 UI，出问题立刻定位是哪端；
3. **串行、有头、全程 trace**，失败留证据；
4. 最后产出**分级缺陷报告 + 质量评分**，而不是一句"过了/没过"。

> 本仓库附带一个真实项目（智复习）的完整测试范例，供参考做法，**不要照搬其中的选择器和业务规则**。

---

## 特性

- 🔍 **环境自探测**：自动找 Playwright 装哪了、后端怎么起、依赖端口活没活
- 🗺️ **项目动态侦察**：读路由、读组件拿真实选择器、grep 持久化键、对前后端 API 路径
- 🔌 **接口层先行**：用 request fixture 直接打后端，验证业务规则
- 🖱️ **UI 层后行**：真点页面，测交互、刷新、脏数据、快速连点
- 🧰 **即用模板**：`playwright.config.js` / API helper / 报告模板，复制改占位即可
- 📊 **分级报告**：P0 阻断 → P3 数据干净，附质量评分

---

## 目录结构

```
Auto_test_skill/
├── SKILL.md                          # 通用主流程（6 阶段方法论）
├── README.md                         # 你正在看的这个
├── templates/
│   ├── playwright.config.template.js # channel / headless:false / webServer / trace / 串行
│   ├── api-helper.template.js        # 注册登录、localStorage 注入、数据准备范式
│   └── report.template.md            # 缺陷分级 + 质量评分模板
└── references/
    ├── worked-example-zhifuxi.md     # 真实项目完整测试范例
    └── pitfalls.md                    # 跨项目通用坑清单
```

---

## 工作流（6 阶段）

| 阶段 | 做什么 |
|---|---|
| 0 环境探测 | 前后端怎么起、端口、依赖服务、Playwright 是否就绪 |
| 1 项目侦察 | 读路由/组件拿真实选择器，读 Controller 拿 API 与业务规则 |
| 2 接口先行 | request fixture 直接打后端，验证业务逻辑 |
| 3 定范围 | 和用户确认：测全部 / 重点哪块 / 忽略哪块 / 时间模拟方案 |
| 4 出计划 | 用例清单 + 数据准备，用户确认后才执行 |
| 5 执行 | 串行、有头、trace，失败留截图 |
| 6 出报告 | 分级缺陷 + 根因 + 修复建议 + 质量评分 |

---

## 快速开始

```bash
# 1. 复制模板到被测项目根目录
copy templates\playwright.config.template.js  your-project\playwright.config.js

# 2. 按 TODO 改端口、channel、baseURL
# 3. 复制 api helper 到 tests/ 下，按项目实际 API 改路径
# 4. 按 report 模板格式产出报告
```

**铁律**：只测试，不改业务代码；改测试数据前先经用户同意；真实硬件（摄像头/麦克风/支付）人工测；有回归问题就标不通过。

---

## 最后

这只是一个普通大学生课余做的自动化测试小工具，水平有限，不喜勿喷，欢迎多多交流，有建议我也会持续改进。
