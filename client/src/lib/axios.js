import axios from 'axios';

// Normalize VITE_API_URL so both of these work:
// - https://your-server.onrender.com (we will append /api)
// - https://your-server.onrender.com/api (used as-is)
let raw = import.meta.env.VITE_API_URL;
let baseURL = 'http://localhost:5000/api';

if (typeof raw === 'string' && raw.trim().length > 0) {
  try {
    // Ensure we have an absolute URL and no trailing slash
    const u = new URL(raw);
    let normalized = u.toString().replace(/\/$/, '');
    if (!/\/api$/.test(normalized)) {
      normalized = normalized + '/api';
    }
    baseURL = normalized;
  } catch {
    // If VITE_API_URL is a relative or invalid URL, fall back to localhost
    if (!/\/api$/.test(raw)) raw = raw.replace(/\/$/, '') + '/api';
    baseURL = raw;
  }
}

const api = axios.create({ baseURL, withCredentials: true });

export default api;
