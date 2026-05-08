// App Loader - Dynamically loads installed apps

async function loadApps() {
  const appStore = document.getElementById('appStore');
  const token = getToken();

  if (!token) return;

  appStore.innerHTML = '<div class="loading">Loading apps...</div>';

  try {
    const response = await fetch(`${API_BASE}/api/saas/apps/available`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const apps = await response.json();

    const installedResponse = await fetch(`${API_BASE}/api/saas/user/installed-apps`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const installedApps = await installedResponse.json();
    const installedIds = installedApps.map(a => a.id);

    appStore.innerHTML = apps.map(app => `
      <div class="app-card">
        <div class="app-icon">${app.icon}</div>
        <div class="app-name">${app.name}</div>
        <div class="app-desc">${app.description}</div>
        <button class="app-button ${installedIds.includes(app.id) ? 'installed' : ''}"
                onclick="toggleApp('${app.id}', ${installedIds.includes(app.id)})">
          ${installedIds.includes(app.id) ? 'Installed' : 'Install'}
        </button>
      </div>
    `).join('');
  } catch (err) {
    appStore.innerHTML = '<div class="loading">Error loading apps: ' + err.message + '</div>';
  }
}

async function toggleApp(appId, installed) {
  const token = getToken();
  const method = installed ? 'DELETE' : 'POST';
  const endpoint = installed ? `/api/saas/user/apps/${appId}` : '/api/saas/user/apps/install';

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: method === 'POST' ? JSON.stringify({ appId }) : undefined
    });

    if (response.ok) {
      loadApps(); // Reload to show updated state
    }
  } catch (err) {
    alert('Error updating app: ' + err.message);
  }
}

function registerApp(appId, appCode) {
  // When an app loads, it registers itself with the dashboard
  window._registeredApps = window._registeredApps || {};
  window._registeredApps[appId] = appCode;
}

function getInstalledApps() {
  // Returns list of installed apps for this user
  return fetch(`${API_BASE}/api/saas/user/installed-apps`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  }).then(r => r.json());
}
