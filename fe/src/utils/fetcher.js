// Base URL: production dùng '/api' (xem bước 2), dev thì BE local
const BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';


export async function fetchJSON(path, opts) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;

  const headers = new Headers(opts?.headers || {});
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const init = {
    method: opts.method || 'GET',
    credentials: 'include',          // 🔴 BẮT BUỘC để gửi cookie cross-site
    ...opts,
    headers,
    // nếu có opts.json thì stringify
    body: opts.json !== undefined ? JSON.stringify(opts.json) : opts.body,
  };

  const res = await fetch(url, init);

  // debug nhanh khi lỗi
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `HTTP ${res.status}`);
  }
  // auto parse JSON
  return res.json();
}
