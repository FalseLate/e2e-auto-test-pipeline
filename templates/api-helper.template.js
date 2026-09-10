// 接口层辅助函数模板
// 复制到 tests/_helpers/api.js，按本项目实际 API 改路径与字段
// 用途：阶段2 接口层先行，直接打后端，绕开 UI 验证业务逻辑

const API = process.env.BACKEND_URL || 'http://localhost:8080'; // TODO: 改后端地址

/**
 * 注册并登录一个全新测试用户，返回 { request, token, user }
 * request 已带上 Authorization: Bearer <token>
 */
export async function setupUser(request, { password = 'Test123456' } = {}) {
  const username = 'e2e_' + Date.now() + '_' + Math.floor(Math.random() * 1e5);
  await request.post(`${API}/api/auth/register`, {   // TODO: 改注册接口
    data: { username, password, nickname: 'E2E' },
  });
  const lr = await request.post(`${API}/api/auth/login`, {  // TODO: 改登录接口
    data: { username, password },
  });
  if (!lr.ok()) throw new Error('登录失败: ' + lr.status() + ' ' + await lr.text());
  const { token, user } = await lr.json();
  // 后续带鉴权请求：headers: { Authorization: 'Bearer ' + token }
  return { username, token, user };
}

/**
 * 把 token/user 注入浏览器 localStorage，刷新后保持登录态
 * 在 page.addInitScript 里调用
 */
export function localStorageAuthScript(token, user) {
  return (t, u) => {
    localStorage.setItem('token', t);                 // TODO: 改本项目实际键名
    localStorage.setItem('user', JSON.stringify(u));
  };
}

/**
 * 示例：上传文件并提取（按本项目实际改）
 */
export async function uploadDocument(request, token, filePath) {
  // const buf = await readFile(filePath);
  // return request.post(`${API}/api/upload`, { multipart: {...}, headers: {Authorization} });
}

export { API };
