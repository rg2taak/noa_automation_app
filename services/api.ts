
import axios from 'axios';

// آدرس جدید سرور بر اساس Swagger ارائه شده
const API_BASE_URL = 'http://194.33.105.203:3000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // افزایش زمان انتظار به ۱۰ ثانیه برای ارتباطات واقعی با سرور
});

// مدیریت توکن‌های امنیتی (Bearer Token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('noa_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// مدیریت خطاهای کلی سرور و پاسخ‌ها
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // سرور پاسخ داده اما وضعیت خطا (4xx یا 5xx) دارد
      console.error('API Error Response:', error.response.data);
      if (error.response.status === 401) {
        // مثلاً اگر توکن منقضی شده باشد
        // localStorage.removeItem('noa_auth_token');
      }
    } else if (error.request) {
      // درخواست ارسال شده اما پاسخی دریافت نشده (مشکل شبکه یا سرور)
      console.warn('API No Response:', error.request);
    } else {
      console.error('API Config Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
