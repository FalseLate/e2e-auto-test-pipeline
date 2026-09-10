# 工作范例：智复习项目 E2E 回归（供参考，不是流程本身）

> 这是一次真实项目的完整测试记录。流程本身是项目无关的，这里展示"按 SKILL.md 跑完后长什么样"。新项目不要照搬这里的选择器和业务规则，只参考做法。

## 项目背景
- 前端：Vue3，`npm run preview` 托管 dist，端口 4173
- 后端：SpringBoot jar，端口 8080
- 业务：做题 App，PDCA 错题闭环、懒人模式/试卷模式双做题模式、手势选答案
- 题库：上传 docx 提取 380 题

## 关键做法
1. **环境探测**：发现用户误把 playwright 装在 `frontend/src/` 子目录，迁到 frontend 根；浏览器用本机 Edge（channel: msedge），不下载内置浏览器。
2. **项目侦察**：
   - 读 router 列出全部页面（/login / /question-bank / /practice / /wrong-questions / /favorites / /history）
   - 读 PracticeView 发现真实选择器是 `.opt`（不是猜的 `.option-item`），`.res .wrong` 是后代选择器不是连写
   - grep 出 localStorage 键：`token`、`practice_draft_{sectionId}`、`subj_ans_{qid}`
   - 读后端 Controller 发现前端请求 `/user/favorites` 而后端实际是 `/api/collection`（P0 bug）
3. **接口层先行**：用 request fixture 验证判分（多选 BA=AB 归一、判断题字母归一）、错题状态机（第1次对锁1天/答错清零/连对4次掌握）、缺答案自动补判。
4. **UI 层后行**：验证草稿双模式互通、刷新保留、脏 localStorage 不白屏、快速连点不划蓝、loading 关不开关。
5. **时间模拟**：用户同意只改测试用户数据，用 SQL `UPDATE user_wrong_question SET next_review_time=DATE_SUB(NOW(),INTERVAL 1 DAY)` 模拟到期。

## 最终结果
17 passed / 1 failed。4 个 bug：
- P0 收藏不调后端 + 前后端路径错
- P1 AI 返回截断 → 空题假成功 + loading 不关
- P2 错因刷新不回显（组件没传 initialTypes）
- P3 MyBatis-Plus 忽略 null，掌握后 next_review_time 未落库清空

## 教训
- 不读代码就猜选择器，会反复失败（`.option-item` 不存在，实际 `.opt`）
- 接口层先做，能快速区分前后端 bug
- 前端判"成功"要看实际数据，不能只看接口状态——这次就是 count=10 但题目数组空
