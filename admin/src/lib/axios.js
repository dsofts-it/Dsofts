import axios from 'axios';

let raw = import.meta.env.VITE_API_URL;
let baseURL = 'http://localhost:5000/api';

if (typeof raw === 'string' && raw.trim().length > 0) {
  try {
    const u = new URL(raw);
    let normalized = u.toString().replace(/\/$/, '');
    if (!/\/api$/.test(normalized)) normalized = normalized + '/api';
    baseURL = normalized;
  } catch {}
}

const api = axios.create({ baseURL, withCredentials: true });

export default api;

