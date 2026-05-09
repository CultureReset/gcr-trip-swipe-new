// ============================================
// Dynamic Module Loader v2
// Loads dashboard tabs from the user's installed apps (user_modules table).
// Installing an app just adds a row — no backend changes needed.
// All data stays on the backend. Frontend just shows/hides tabs.
// ============================================

var MODULE_LOADER_VERSION = '2.0';

// Legacy fallback — used if the API is unavailable
var LEGACY_CORE_MODULES = [
  'overview', 'profile', 'media', 'pages', 'customers', 'coupons',
  'analytics', 'seo', 'social', 'faq', 'reviews', 'messaging',
  'billing', 'theme', 'connections', 'domain', 'publish'
];

// ── Primary: fetch installed modules from API ─────────────────
async function initBusinessTypeModules() {
  var API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/api'
    : 'https://api.cybercheck.com/api';

  var siteId  = window._siteId  || (window._business && window._business.site_id) || '';
  var token   = window._authToken || localStorage.getItem('cc_token') || '';

  var activeModules = LEGACY_CORE_MODULES; // fallback

  if (siteId && token) {
    try {
      var res = await fetch(API + '/modules/active-ids?site_id=' + siteId, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        var data = await res.json();
        activeModules = data.modules || LEGACY_CORE_MODULES;
        window._installedModules = activeModules;
      }
    } catch(e) {
      console.warn('[module-loader] API unavailable, using legacy fallback:', e.message);
      // Legacy fallback — derive from business type
      var businessType = (window._business && window._business.type) || 'generic';
      activeModules = getLegacyModules(businessType);
    }
  } else {
    // No auth yet (onboarding), keep core only
    var businessType = (window._business && window._business.type) || 'generic';
    activeModules = getLegacyModules(businessType);
  }

  applyModules(activeModules);
}

// ── Apply: show/hide nav tabs ─────────────────────────────────
function applyModules(activeModules) {
  document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
    var page = item.dataset.page;
    item.style.display = activeModules.indexOf(page) > -1 ? '' : 'none';
  });

  // Add "App Store" nav item if not already there
  if (!document.querySelector('.nav-item[data-page="app-store"]')) {
    var appStoreItem = document.createElement('div');
    appStoreItem.className = 'nav-item';
    appStoreItem.setAttribute('data-page', 'app-store');
    appStoreItem.innerHTML = '🛍️ App Store';
    appStoreItem.style.cssText = 'margin-top:8px;border-top:1px solid rgba(255,255,255,0.1);padding-top:8px;';
    appStoreItem.onclick = function() { openAppStore(); };
    var nav = document.querySelector('.nav-items, .sidebar-nav, nav');
    if (nav) nav.appendChild(appStoreItem);
  }

  hideEmptySections();
}

// ── Open App Store ────────────────────────────────────────────
// The App Store runs as a page within the dashboard — no new window needed.
// Dashboard pages should handle data-page="app-store" to load app-store.html inline.
function openAppStore() {
  // If using router-based dashboard, navigate to app store
  if (typeof window['navigateTo'] === 'function') {
    window['navigateTo']('app-store');
    return;
  }
  // If using hash routing
  if (document.getElementById('app-store-container')) {
    document.querySelectorAll('.page-section, .dashboard-section').forEach(function(s) { s.style.display = 'none'; });
    document.getElementById('app-store-container').style.display = 'block';
    return;
  }
  // Fallback — open in current tab
  var siteId = window._siteId || '';
  window.location.href = 'modules-dashboard/app-store.html?site_id=' + siteId;
}

// ── Check if a module is installed ───────────────────────────
function isModuleActive(moduleName) {
  var installed = window._installedModules || LEGACY_CORE_MODULES;
  return installed.indexOf(moduleName) > -1;
}

// ── Refresh after install/uninstall ──────────────────────────
async function refreshModules() {
  window._installedModules = null;
  await initBusinessTypeModules();
}

// Listen for install/uninstall messages from App Store iframe
window.addEventListener('message', function(e) {
  if (e.data && (e.data.type === 'module-installed' || e.data.type === 'module-uninstalled')) {
    refreshModules();
  }
});

// ── Helpers ───────────────────────────────────────────────────
function hideEmptySections() {
  document.querySelectorAll('.nav-section-label').forEach(function(label) {
    var sibling = label.nextElementSibling;
    var hasVisible = false;
    while (sibling && !sibling.classList.contains('nav-section-label')) {
      if (sibling.classList.contains('nav-item') && sibling.style.display !== 'none') {
        hasVisible = true;
        break;
      }
      sibling = sibling.nextElementSibling;
    }
    label.style.display = hasVisible ? '' : 'none';
  });
}

// Legacy fallback by business type (used when API is unavailable)
function getLegacyModules(businessType) {
  var sets = {
    rental:     ['inventory','availability','addons','locations','bookings','waivers','waitlist','boat-rental'],
    restaurant: ['menu','specials','waitlist','events'],
    salon:      ['staff','appointments','services','bookings','waitlist','waivers'],
    shop:       ['inventory','bookings'],
    service:    ['staff','bookings','appointments','services','waitlist','waivers'],
    charter:    ['charter-booking','bookings','waivers','availability'],
    photo:      ['photographer-booking','bookings','availability'],
    taxi:       ['rides-dispatch'],
  };
  return LEGACY_CORE_MODULES.concat(sets[businessType] || []);
}

function getBusinessTypeName(type) {
  var names = {
    rental: 'Rental Business', restaurant: 'Restaurant', salon: 'Salon & Spa',
    shop: 'Retail Shop', service: 'Service Business', charter: 'Fishing Charter',
    photo: 'Photographer', taxi: 'Taxi / Transport', generic: 'Business'
  };
  return names[type] || names.generic;
}

function getBusinessTypes() {
  return [
    { value: 'rental',     label: 'Rental Business',    examples: 'Boats, bikes, equipment' },
    { value: 'restaurant', label: 'Restaurant',         examples: 'Restaurants, cafes, food trucks' },
    { value: 'salon',      label: 'Salon & Spa',        examples: 'Hair, nails, spa services' },
    { value: 'shop',       label: 'Retail Shop',        examples: 'Boutique, gift shop, online store' },
    { value: 'service',    label: 'Service Business',   examples: 'Cleaning, repair, consulting' },
    { value: 'charter',    label: 'Fishing Charter',    examples: 'Inshore, offshore, deep sea' },
    { value: 'photo',      label: 'Photographer',       examples: 'Portraits, events, commercial' },
    { value: 'taxi',       label: 'Taxi / Transport',   examples: 'Rideshare, taxi, shuttle' },
  ];
}
