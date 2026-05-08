// CyberCheck SaaS Authentication
// Connect to NEW Supabase account

const SUPABASE_URL = 'YOUR_NEW_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_NEW_SUPABASE_ANON_KEY';
const API_BASE = 'https://your-api-endpoint.vercel.app';

async function saasLogin(email, password) {
  const errorEl = document.getElementById('error');
  const loadingEl = document.getElementById('loading');

  errorEl.style.display = 'none';
  loadingEl.style.display = 'block';

  try {
    const response = await fetch(`${API_BASE}/api/saas/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('saas_token', data.token);
      localStorage.setItem('saas_user', JSON.stringify(data.user));
      window.location.href = 'saas-dashboard.html';
    } else {
      errorEl.textContent = data.error || 'Login failed';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = 'Error: ' + err.message;
    errorEl.style.display = 'block';
  } finally {
    loadingEl.style.display = 'none';
  }
}

async function saasSignup(businessName, email, password) {
  const errorEl = document.getElementById('error');
  const loadingEl = document.getElementById('loading');

  errorEl.style.display = 'none';
  loadingEl.style.display = 'block';

  try {
    const response = await fetch(`${API_BASE}/api/saas/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('saas_token', data.token);
      localStorage.setItem('saas_user', JSON.stringify(data.user));
      window.location.href = 'saas-dashboard.html';
    } else {
      errorEl.textContent = data.error || 'Signup failed';
      errorEl.style.display = 'block';
    }
  } catch (err) {
    errorEl.textContent = 'Error: ' + err.message;
    errorEl.style.display = 'block';
  } finally {
    loadingEl.style.display = 'none';
  }
}

function saasLogout() {
  localStorage.removeItem('saas_token');
  localStorage.removeItem('saas_user');
  window.location.href = 'saas-login.html';
}

function checkAuth() {
  const token = localStorage.getItem('saas_token');
  const onLoginPage = window.location.pathname.includes('saas-login');
  const onSignupPage = window.location.pathname.includes('saas-signup');

  if (!token && !onLoginPage && !onSignupPage) {
    window.location.href = 'saas-login.html';
  } else if (token && (onLoginPage || onSignupPage)) {
    window.location.href = 'saas-dashboard.html';
  }
}

function getToken() {
  return localStorage.getItem('saas_token');
}

function getUser() {
  const user = localStorage.getItem('saas_user');
  return user ? JSON.parse(user) : null;
}
