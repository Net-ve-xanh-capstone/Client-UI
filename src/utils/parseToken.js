import { store } from '../store/configureStore.js';
import { logout } from '../store/auth/authSlice.js';

const dispatch = store.dispatch;

export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(base64);
  } catch (error) {
    console.error('Token không hợp lệ', error);
    return null;
  }
}

export function handleLogout() {
  dispatch(logout());
  window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
}