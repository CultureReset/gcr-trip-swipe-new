// ============================================================
// Unified Bookings Manager — modular, data-driven
// Auto-detects which booking apps are installed and shows only those tabs.
// Adding a new booking type = add one entry to BOOKING_CONFIGS below.
// ============================================================

var BOOKING_CONFIGS = {
  'photographer-booking': {
    label: 'Photo Sessions',
    icon: '📷',
    endpoint: '/api/photographer/bookings',
    dateField: 'session_date',
    timeField: 'session_time',
    cols: [
      { key: 'customer_name',  label: 'Customer' },
      { key: 'session_name',   label: 'Session' },
      { key: 'session_date',   label: 'Date', type: 'date' },
      { key: 'session_time',   label: 'Time', type: 'time' },
      { key: 'deposit_amount', label: 'Deposit', type: 'money' },
      { key: 'status',         label: 'Status', type: 'badge' },
    ],
    actions: ['confirm','complete','cancel'],
  },
  'charter-booking': {
    label: 'Charters',
    icon: '🎣',
    endpoint: '/api/charter/bookings',
    dateField: 'trip_date',
    timeField: 'departure_time',
    cols: [
      { key: 'customer_name',  label: 'Customer' },
      { key: 'charter_name',   label: 'Charter' },
      { key: 'trip_date',      label: 'Date', type: 'date' },
      { key: 'departure_time', label: 'Time', type: 'time' },
      { key: 'party_size',     label: 'Anglers' },
      { key: 'deposit_amount', label: 'Deposit', type: 'money' },
      { key: 'status',         label: 'Status', type: 'badge' },
    ],
    actions: ['confirm','complete','cancel'],
  },
  'boat-rental': {
    label: 'Rentals',
    icon: '⛵',
    endpoint: '/api/boat-rental/rentals',
    dateField: 'rental_date',
    cols: [
      { key: 'customer_name', label: 'Customer' },
      { key: 'boat_name',     label: 'Boat' },
      { key: 'rental_date',   label: 'Date', type: 'date' },
      { key: 'rental_type',   label: 'Type', type: 'capitalize' },
      { key: 'party_size',    label: 'Passengers' },
      { key: 'deposit_amount',label: 'Deposit', type: 'money' },
      { key: 'status',        label: 'Status', type: 'badge' },
    ],
    actions: ['confirm','complete','cancel'],
  },
  'rides-dispatch': {
    label: 'Rides',
    icon: '🚗',
    endpoint: '/api/rides',
    dateField: 'created_at',
    cols: [
      { key: 'customer_name',     label: 'Customer' },
      { key: 'pickup_location',   label: 'Pickup' },
      { key: 'destination',       label: 'Drop-off' },
      { key: 'passenger_count',   label: 'Pax' },
      { key: 'created_at',        label: 'Requested', type: 'datetime' },
      { key: 'status',            label: 'Status', type: 'badge' },
    ],
    actions: [],
  },
  'bookings': {
    label: 'Bookings',
    icon: '📅',
    endpoint: '/api/bookings',
    dateField: 'date',
    cols: [
      { key: 'customer_name', label: 'Customer' },
      { key: 'service',       label: 'Service' },
      { key: 'date',          label: 'Date', type: 'date' },
      { key: 'total_price',   label: 'Total', type: 'money' },
      { key: 'status',        label: 'Status', type: 'badge' },
    ],
    actions: ['confirm','complete','cancel'],
  },
};

var _ubState = {
  activeTab: null,
  filter: 'all',
  search: '',
  data: {},       // { moduleId: [] }
  loading: {},    // { moduleId: bool }
  installedTabs: [],
};

// ── Entry point — call this from admin.html or bookings tab ──
function initUnifiedBookings(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var installed = window._installedModules || [];
  _ubState.installedTabs = Object.keys(BOOKING_CONFIGS).filter(function(id) {
    return installed.indexOf(id) > -1;
  });

  if (!_ubState.installedTabs.length) {
    container.innerHTML = ubEmptyState();
    return;
  }

  _ubState.activeTab = _ubState.installedTabs[0];
  container.innerHTML = ubShell();
  ubBindEvents();
  ubLoadTab(_ubState.activeTab);
}

// ── Shell HTML ────────────────────────────────────────────────
function ubShell() {
  var tabs = _ubState.installedTabs.map(function(id) {
    var cfg = BOOKING_CONFIGS[id];
    return '<button class="ub-tab' + (id === _ubState.activeTab ? ' active' : '') + '" data-tab="' + id + '">'
      + cfg.icon + ' ' + cfg.label + '</button>';
  }).join('');

  return '<div class="ub-wrap">'
    + '<div class="ub-header">'
    +   '<div class="ub-tabs">' + tabs + '</div>'
    +   '<div class="ub-controls">'
    +     '<input class="ub-search" placeholder="Search..." id="ub-search" oninput="ubOnSearch(this.value)">'
    +     '<select class="ub-filter" id="ub-filter" onchange="ubOnFilter(this.value)">'
    +       '<option value="all">All</option>'
    +       '<option value="pending">Pending</option>'
    +       '<option value="confirmed">Confirmed</option>'
    +       '<option value="completed">Completed</option>'
    +       '<option value="cancelled">Cancelled</option>'
    +     '</select>'
    +   '</div>'
    + '</div>'
    + '<div class="ub-body" id="ub-body"></div>'
    + '</div>';
}

function ubEmptyState() {
  return '<div class="ub-empty">'
    + '<div class="ub-empty-icon">📅</div>'
    + '<h3>No booking apps installed</h3>'
    + '<p>Go to the <a onclick="openAppStore()" style="color:#38bdf8;cursor:pointer">App Store</a> to install Photographer Booking, Charter Booking, Boat Rental, or other booking tools.</p>'
    + '</div>';
}

// ── Tab loading ───────────────────────────────────────────────
async function ubLoadTab(moduleId) {
  _ubState.activeTab = moduleId;

  // Update tab highlight
  document.querySelectorAll('.ub-tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.tab === moduleId);
  });

  var body = document.getElementById('ub-body');
  if (!body) return;

  // Return cached data if already loaded
  if (_ubState.data[moduleId]) {
    ubRender(moduleId);
    return;
  }

  body.innerHTML = '<div class="ub-loading"><div class="ub-spinner"></div>Loading...</div>';
  _ubState.loading[moduleId] = true;

  try {
    var API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:3000/api' : 'https://api.cybercheck.com/api';
    var cfg = BOOKING_CONFIGS[moduleId];
    var siteId = window._siteId || '';
    var token  = window._authToken || localStorage.getItem('cc_token') || '';

    var url = API + cfg.endpoint.replace('/api','') + '?site_id=' + siteId;
    var res = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
    var data = await res.json();
    _ubState.data[moduleId] = Array.isArray(data) ? data : (data.bookings || data.rentals || data.rides || []);
    ubRender(moduleId);
  } catch(e) {
    body.innerHTML = '<div class="ub-error">Failed to load. ' + e.message + '</div>';
  }
  _ubState.loading[moduleId] = false;
}

// ── Render table ──────────────────────────────────────────────
function ubRender(moduleId) {
  var cfg = BOOKING_CONFIGS[moduleId];
  var rows = _ubState.data[moduleId] || [];

  // Filter
  if (_ubState.filter !== 'all') {
    rows = rows.filter(function(r) { return r.status === _ubState.filter; });
  }
  if (_ubState.search) {
    var q = _ubState.search.toLowerCase();
    rows = rows.filter(function(r) {
      return (r.customer_name || '').toLowerCase().includes(q)
          || (r.customer_phone || '').toLowerCase().includes(q);
    });
  }

  // Sort by date desc
  rows = rows.slice().sort(function(a, b) {
    return new Date(b[cfg.dateField] || 0) - new Date(a[cfg.dateField] || 0);
  });

  var body = document.getElementById('ub-body');
  if (!rows.length) {
    body.innerHTML = '<div class="ub-empty-rows">No bookings found</div>';
    return;
  }

  var thead = '<tr>' + cfg.cols.map(function(c) { return '<th>' + c.label + '</th>'; }).join('') + '<th></th></tr>';
  var tbody = rows.map(function(row) {
    var cells = cfg.cols.map(function(c) {
      return '<td>' + ubFormatCell(row[c.key], c.type) + '</td>';
    }).join('');
    var actions = ubRowActions(moduleId, row);
    return '<tr>' + cells + '<td>' + actions + '</td></tr>';
  }).join('');

  body.innerHTML = '<div class="ub-table-wrap"><table class="ub-table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table></div>';
}

// ── Format cell values ────────────────────────────────────────
function ubFormatCell(val, type) {
  if (val === null || val === undefined || val === '') return '<span class="ub-na">—</span>';
  if (type === 'money') return '$' + Number(val).toFixed(2);
  if (type === 'date') return new Date(val + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (type === 'time') return ubFmt12(String(val));
  if (type === 'datetime') return new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  if (type === 'capitalize') return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  if (type === 'badge') return '<span class="ub-badge ub-badge-' + val + '">' + val + '</span>';
  return String(val);
}

function ubFmt12(t) {
  if (!t) return '';
  var parts = t.split(':');
  var h = parseInt(parts[0]), m = parts[1] || '00';
  return (h % 12 || 12) + ':' + m + ' ' + (h >= 12 ? 'PM' : 'AM');
}

// ── Row actions ───────────────────────────────────────────────
function ubRowActions(moduleId, row) {
  var cfg = BOOKING_CONFIGS[moduleId];
  if (!cfg.actions.length) return '';
  var status = row.status || 'pending';
  var html = '<div class="ub-actions">';
  if (status === 'pending' && cfg.actions.indexOf('confirm') > -1) {
    html += '<button class="ub-btn ub-btn-confirm" onclick="ubUpdateStatus(\'' + moduleId + '\',\'' + row.id + '\',\'confirmed\')">Confirm</button>';
  }
  if ((status === 'confirmed' || status === 'pending') && cfg.actions.indexOf('complete') > -1) {
    html += '<button class="ub-btn ub-btn-complete" onclick="ubUpdateStatus(\'' + moduleId + '\',\'' + row.id + '\',\'completed\')">Done</button>';
  }
  if (status !== 'cancelled' && status !== 'completed' && cfg.actions.indexOf('cancel') > -1) {
    html += '<button class="ub-btn ub-btn-cancel" onclick="ubUpdateStatus(\'' + moduleId + '\',\'' + row.id + '\',\'cancelled\')">Cancel</button>';
  }
  html += '</div>';
  return html;
}

// ── Status update ─────────────────────────────────────────────
async function ubUpdateStatus(moduleId, bookingId, newStatus) {
  var API = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/api' : 'https://api.cybercheck.com/api';
  var cfg = BOOKING_CONFIGS[moduleId];
  var token = window._authToken || localStorage.getItem('cc_token') || '';

  // Determine correct PATCH endpoint
  var endpointMap = {
    'photographer-booking': '/api/photographer/bookings/' + bookingId,
    'charter-booking':      '/api/charter/bookings/' + bookingId,
    'boat-rental':          '/api/boat-rental/rentals/' + bookingId,
    'bookings':             '/api/bookings/' + bookingId,
  };
  var endpoint = endpointMap[moduleId] || (cfg.endpoint + '/' + bookingId);

  try {
    var res = await fetch(API + endpoint.replace('/api',''), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) throw new Error('Failed');

    // Update local cache
    var idx = (_ubState.data[moduleId] || []).findIndex(function(r) { return r.id === bookingId; });
    if (idx > -1) _ubState.data[moduleId][idx].status = newStatus;
    ubRender(moduleId);
  } catch(e) {
    alert('Could not update: ' + e.message);
  }
}

// ── Refresh ───────────────────────────────────────────────────
function ubRefresh() {
  delete _ubState.data[_ubState.activeTab];
  ubLoadTab(_ubState.activeTab);
}

// ── Events ────────────────────────────────────────────────────
function ubBindEvents() {
  document.querySelectorAll('.ub-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      delete _ubState.data[btn.dataset.tab]; // always fresh on tab switch
      ubLoadTab(btn.dataset.tab);
    });
  });
}
function ubOnSearch(q) { _ubState.search = q; ubRender(_ubState.activeTab); }
function ubOnFilter(v) { _ubState.filter = v; ubRender(_ubState.activeTab); }

// ── CSS — injected once ───────────────────────────────────────
(function ubInjectStyles() {
  if (document.getElementById('ub-styles')) return;
  var s = document.createElement('style');
  s.id = 'ub-styles';
  s.textContent = `
    .ub-wrap { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .ub-header { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
    .ub-tabs { display:flex; gap:6px; flex-wrap:wrap; }
    .ub-tab { padding:8px 16px; border-radius:20px; border:1.5px solid #334155; background:transparent; color:#94a3b8; font-size:0.85rem; font-weight:600; cursor:pointer; transition:all 0.15s; }
    .ub-tab.active { background:#2563eb; border-color:#2563eb; color:#fff; }
    .ub-tab:hover:not(.active) { border-color:#475569; color:#e2e8f0; }
    .ub-controls { display:flex; gap:8px; }
    .ub-search { padding:8px 12px; border:1.5px solid #334155; border-radius:8px; background:#0f172a; color:#e2e8f0; font-size:0.85rem; width:180px; }
    .ub-search:focus { outline:none; border-color:#2563eb; }
    .ub-filter { padding:8px 10px; border:1.5px solid #334155; border-radius:8px; background:#0f172a; color:#e2e8f0; font-size:0.85rem; cursor:pointer; }
    .ub-table-wrap { overflow-x:auto; border-radius:12px; border:1px solid #1e293b; }
    .ub-table { width:100%; border-collapse:collapse; font-size:0.875rem; }
    .ub-table thead { background:#1e293b; }
    .ub-table th { padding:10px 14px; text-align:left; font-size:0.75rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em; white-space:nowrap; }
    .ub-table td { padding:12px 14px; border-top:1px solid #1e293b; color:#cbd5e1; vertical-align:middle; }
    .ub-table tbody tr:hover td { background:#1e293b; }
    .ub-na { color:#334155; }
    .ub-badge { display:inline-block; padding:2px 10px; border-radius:20px; font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; }
    .ub-badge-pending   { background:#fef3c720; color:#fbbf24; border:1px solid #fbbf2440; }
    .ub-badge-confirmed { background:#dbeafe20; color:#60a5fa; border:1px solid #60a5fa40; }
    .ub-badge-completed { background:#dcfce720; color:#4ade80; border:1px solid #4ade8040; }
    .ub-badge-cancelled { background:#fee2e220; color:#f87171; border:1px solid #f8717140; }
    .ub-actions { display:flex; gap:6px; }
    .ub-btn { padding:5px 12px; border-radius:6px; font-size:0.78rem; font-weight:700; cursor:pointer; border:none; transition:opacity 0.15s; }
    .ub-btn:active { opacity:0.7; }
    .ub-btn-confirm  { background:#1d4ed8; color:#fff; }
    .ub-btn-complete { background:#15803d; color:#fff; }
    .ub-btn-cancel   { background:#991b1b20; color:#f87171; border:1px solid #f8717130; }
    .ub-loading { display:flex; align-items:center; gap:10px; padding:40px; color:#475569; }
    .ub-spinner { width:20px; height:20px; border:2px solid #334155; border-top-color:#2563eb; border-radius:50%; animation:ubspin 0.7s linear infinite; }
    @keyframes ubspin { to { transform:rotate(360deg); } }
    .ub-empty { text-align:center; padding:60px 20px; color:#475569; }
    .ub-empty-icon { font-size:2.5rem; margin-bottom:10px; }
    .ub-empty h3 { font-size:1rem; color:#94a3b8; margin-bottom:6px; }
    .ub-empty p { font-size:0.85rem; }
    .ub-empty-rows { text-align:center; padding:40px; color:#475569; font-size:0.9rem; }
    .ub-error { text-align:center; padding:40px; color:#f87171; font-size:0.9rem; }
  `;
  document.head.appendChild(s);
})();
