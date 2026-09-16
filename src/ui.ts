export const html = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>bdbc</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMmQ2ZmM0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iNSIgcng9IjkiIHJ5PSIzIi8+PHBhdGggZD0iTTIxIDV2NmMwIDEuNjYtNC4wMyAzLTkgM3MtOS0xLjM0LTktM1Y1Ii8+PHBhdGggZD0iTTIxIDExdjZjMCAxLjY2LTQuMDMgMy05IDNzLTktMS4zNC05LTN2LTYiLz48L3N2Zz4=" />
<style>
  :root {
    --bg: #f5f5f7; --bg2: #ffffff; --bg3: #ececef; --border: #d7d7db;
    --text: #1e1f22; --text-dim: #6b6d72; --accent: #2d6fc4; --danger: #c23b3b;
    --active-bg: #d3e3f7; --success: #2f8f4e;
    --mono: "SF Mono", Menlo, Consolas, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1e1f22; --bg2: #26282b; --bg3: #2b2d30; --border: #393b40;
      --text: #dfe1e5; --text-dim: #8a8d93; --accent: #4a8fdb; --danger: #d75353;
      --active-bg: #35577e; --success: #5cb85c;
    }
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, system-ui, sans-serif; background: var(--bg); color: var(--text); font-size: 13px; }
  #app { display: flex; height: 100vh; }
  #sidebar { width: 260px; min-width: 160px; max-width: 600px; background: var(--bg2); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; flex-shrink: 0; }
  #sidebar-resizer { width: 5px; flex-shrink: 0; cursor: col-resize; background: transparent; position: relative; }
  #sidebar-resizer:hover, #sidebar-resizer.dragging { background: var(--accent); }
  #sidebar-header { padding: 10px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }
  #sidebar-header h1 { font-size: 13px; margin: 0; font-weight: 600; }
  #conn-list { list-style: none; margin: 0; padding: 4px; flex: 1; overflow-y: auto; }
  .conn-block { margin-bottom: 2px; }
  .conn-row { padding: 7px 8px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 6px; justify-content: space-between; font-weight: 600; font-size: 12.5px; }
  .conn-row:hover { background: var(--bg3); }
  .conn-row.active { background: var(--active-bg); }
  .conn-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; display: flex; align-items: center; gap: 5px; }
  .conn-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .conn-actions { display: flex; gap: 6px; visibility: hidden; flex-shrink: 0; }
  .conn-row:hover .conn-actions { visibility: visible; }
  .icon-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 2px; display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 4px; }
  .icon-btn:hover { color: var(--text); background: rgba(128,128,128,0.15); }
  .icon-btn svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .chevron { display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; font-size: 15px; line-height: 1; color: var(--text-dim); transition: transform 0.1s; flex-shrink: 0; }
  .chevron.open { transform: rotate(90deg); }
  .conn-tables { margin: 2px 0 6px 15px; padding-left: 9px; border-left: 1px solid var(--border); }
  .schema-group { margin-bottom: 2px; }
  .schema-name { font-size: 11px; font-weight: 600; color: var(--text-dim); padding: 4px 8px; text-transform: uppercase; letter-spacing: 0.03em; cursor: pointer; display: flex; align-items: center; gap: 4px; border-radius: 4px; }
  .schema-name:hover { background: var(--bg3); }
  .table-item { padding: 4px 8px 4px 20px; cursor: pointer; border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12.5px; }
  .table-item:hover { background: var(--bg3); }
  .sidebar-msg { padding: 4px 8px 4px 16px; font-size: 12px; color: var(--text-dim); }
  #new-conn-btn { background: var(--accent); border: none; color: white; border-radius: 4px; padding: 4px 8px; cursor: pointer; font-size: 12px; }
  #main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  #tab-bar { display: none; overflow-x: auto; background: var(--bg2); border-bottom: 1px solid var(--border); flex-shrink: 0; }
  .tab { display: flex; align-items: center; gap: 6px; padding: 6px 8px 6px 10px; font-size: 12px; cursor: pointer; border-right: 1px solid var(--border); white-space: nowrap; color: var(--text-dim); }
  .tab.active { background: var(--bg); color: var(--text); font-weight: 600; }
  .tab:hover { background: var(--bg3); }
  .tab-close { background: none; border: none; color: inherit; cursor: pointer; padding: 0 3px; font-size: 13px; line-height: 1.4; border-radius: 3px; }
  .tab-close:hover { background: rgba(128,128,128,0.25); }
  #toolbar { display: flex; gap: 8px; padding: 8px; border-bottom: 1px solid var(--border); align-items: center; }
  .conn-badge { display: none; align-items: center; gap: 6px; font-weight: 600; font-size: 12px; padding: 4px 10px; background: var(--bg3); border: 1px solid var(--border); border-radius: 4px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
  #editor-wrap { position: relative; padding: 8px; }
  #editor { width: 100%; height: 120px; background: var(--bg3); color: var(--text); border: 1px solid var(--border); border-radius: 4px; font-family: var(--mono); font-size: 13px; padding: 8px; resize: vertical; }
  #autocomplete { position: absolute; z-index: 20; background: var(--bg2); border: 1px solid var(--border); border-radius: 4px; max-height: 160px; overflow-y: auto; box-shadow: 0 4px 16px rgba(0,0,0,0.25); display: none; min-width: 200px; }
  #autocomplete.show { display: block; }
  .ac-item { display: flex; align-items: center; gap: 6px; padding: 4px 8px; cursor: pointer; font-family: var(--mono); font-size: 12px; white-space: nowrap; }
  .ac-item:hover, .ac-item.active { background: var(--active-bg); }
  .ac-kind { flex-shrink: 0; width: 14px; height: 14px; border-radius: 3px; color: white; font-size: 9px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
  .ac-kind-table { background: var(--accent); }
  .ac-kind-column { background: var(--success); }
  .ac-kind-keyword { background: var(--text-dim); }
  .ac-kind-operator { background: var(--danger); }
  .ac-text { overflow: hidden; text-overflow: ellipsis; }
  button.primary { background: var(--accent); border: none; color: white; border-radius: 4px; padding: 6px 14px; cursor: pointer; font-size: 12px; }
  button.secondary { background: var(--bg3); border: 1px solid var(--border); color: var(--text); border-radius: 4px; padding: 6px 14px; cursor: pointer; font-size: 12px; }
  button.danger { background: var(--danger); border: none; color: white; border-radius: 4px; padding: 6px 14px; cursor: pointer; font-size: 12px; }
  button:disabled { opacity: 0.5; cursor: default; }
  #status { color: var(--text-dim); padding: 0 8px; font-size: 12px; }
  #results-wrap { flex: 1; overflow: auto; padding: 0 8px 8px; }
  table.grid { border-collapse: collapse; width: max-content; min-width: 100%; font-family: var(--mono); font-size: 12px; }
  table.grid th, table.grid td { border: 1px solid var(--border); padding: 4px 8px; text-align: left; white-space: nowrap; max-width: 400px; overflow: hidden; text-overflow: ellipsis; }
  table.grid th { background: var(--bg3); position: sticky; top: 0; color: var(--text-dim); }
  table.grid td.null { color: var(--text-dim); font-style: italic; }
  table.grid tr.alt td { background: rgba(255,255,255,0.02); }
  table.grid tr.filtered-out { display: none; }
  table.grid th { min-width: 110px; vertical-align: top; }
  .th-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .filter-wrap { position: relative; margin-top: 4px; display: flex; align-items: center; }
  #results-wrap.filters-hidden .filter-wrap { display: none; }
  .filter-icon { position: absolute; left: 4px; font-size: 10px; line-height: 1; color: var(--text-dim); pointer-events: none; }
  .col-filter { width: 100%; box-sizing: border-box; background: var(--bg); border: 1px dashed var(--border); color: var(--text); border-radius: 3px; padding: 1px 14px 1px 15px; font-family: var(--mono); font-size: 11px; font-weight: normal; }
  .col-filter::placeholder { color: var(--text-dim); font-style: italic; }
  .col-filter:focus { outline: none; border: 1px solid var(--accent); }
  .col-filter.active { border: 1px solid var(--accent); color: var(--accent); }
  .filter-clear { position: absolute; right: 2px; background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 12px; line-height: 1; padding: 0 2px; display: none; }
  .col-filter.active ~ .filter-clear { display: block; }
  .filter-clear:hover { color: var(--text); }
  button.secondary.toggled { border-color: var(--accent); color: var(--accent); }
  table.grid td { cursor: cell; }
  table.grid td.selected { outline: 2px solid var(--accent); outline-offset: -2px; }
  table.grid td.editing { outline: 2px solid var(--success); outline-offset: -2px; background: var(--bg2); white-space: normal; cursor: text; }
  table.grid td.saving { opacity: 0.6; }
  table.grid td.save-error { outline: 2px solid var(--danger); }
  table.grid tr.new-row td { background: var(--active-bg); cursor: text; white-space: normal; }
  table.grid tr.pending-delete td { text-decoration: line-through; background: rgba(194,59,59,0.15); color: var(--danger); }
  table.grid tr.pending-delete.saving td { opacity: 0.6; }
  table.grid tr.new-row.saving td { opacity: 0.6; }
  #overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 10; }
  #overlay.show { display: flex; }
  .modal { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 16px; width: 340px; }
  .modal h2 { margin: 0 0 12px; font-size: 14px; }
  .modal label { display: block; font-size: 11px; color: var(--text-dim); margin: 8px 0 3px; }
  .modal input[type=text], .modal input[type=password], .modal input[type=number] {
    width: 100%; background: var(--bg3); border: 1px solid var(--border); color: var(--text); border-radius: 4px; padding: 5px 7px; font-size: 12px;
  }
  .modal .row { display: flex; gap: 8px; }
  .modal .row > div { flex: 1; }
  .modal .checkbox-row { display: flex; align-items: center; gap: 6px; margin-top: 10px; }
  .modal .actions { display: flex; justify-content: space-between; margin-top: 16px; }
  .modal .actions .left { display: flex; gap: 8px; }
  .empty-state { color: var(--text-dim); padding: 20px; text-align: center; }
  .error-msg { color: var(--danger); padding: 8px; font-size: 12px; white-space: pre-wrap; }
  .error-panel { display: flex; flex-direction: column; gap: 4px; }
  .err-message { font-weight: 600; }
  .err-loc { cursor: pointer; text-decoration: underline; color: var(--accent); width: fit-content; }
  .err-detail, .err-hint, .err-code { color: var(--text-dim); font-style: normal; }
</style>
</head>
<body>
<div id="app">
  <div id="sidebar">
    <div id="sidebar-header">
      <h1>Connections</h1>
      <button id="new-conn-btn" onclick="openConnModal()">+ New</button>
    </div>
    <ul id="conn-list"></ul>
  </div>
  <div id="sidebar-resizer"></div>
  <div id="main">
    <div id="tab-bar"></div>
    <div id="toolbar">
      <span id="active-conn-badge" class="conn-badge"></span>
      <button class="primary" id="run-btn" onclick="runQuery()">Run ▸</button>
      <button class="secondary" id="explain-btn" onclick="runQuery(false, true)">Explain</button>
      <button class="secondary" id="export-btn" onclick="exportCsv()">Export CSV</button>
      <button class="secondary" id="copy-csv-btn" onclick="copyCsv()">Copy CSV</button>
      <button class="secondary toggled" id="toggle-filters-btn" onclick="toggleFilters()" title="Show/hide the per-column filter boxes (Cmd/Ctrl+F)">Filters</button>
      <button class="secondary" id="clear-filters-btn" onclick="clearFilters()" style="display:none">Clear filters</button>
      <span id="filter-status"></span>
      <span id="status"></span>
    </div>
    <div id="editor-wrap">
      <textarea id="editor" placeholder="select * from ..." spellcheck="false"></textarea>
      <div id="autocomplete"></div>
    </div>
    <div id="results-wrap"><div class="empty-state">Pick a connection to get started.</div></div>
  </div>
</div>

<div id="overlay">
  <div class="modal" id="conn-modal">
    <h2 id="conn-modal-title">New connection</h2>
    <input type="hidden" id="f-id" />
    <label>Connection string (optional)</label>
    <div class="row">
      <div><input type="text" id="f-connstring" placeholder="postgres://user:pass@host:5432/db" /></div>
    </div>
    <button class="secondary" style="margin-top:6px; width:100%;" onclick="parseConnString()">Parse into fields ▾</button>
    <hr style="border-color: var(--border); margin: 12px 0;" />
    <label>Name</label>
    <input type="text" id="f-name" placeholder="Local dev" />
    <div class="row">
      <div style="flex:2"><label>Host</label><input type="text" id="f-host" placeholder="localhost" /></div>
      <div style="flex:1"><label>Port</label><input type="number" id="f-port" value="5432" /></div>
    </div>
    <label>Database</label>
    <input type="text" id="f-database" placeholder="postgres" />
    <div class="row">
      <div><label>User</label><input type="text" id="f-user" placeholder="postgres" /></div>
      <div><label>Password</label><input type="password" id="f-password" placeholder="(unchanged)" /></div>
    </div>
    <div class="checkbox-row"><input type="checkbox" id="f-ssl" /><label style="margin:0;">Use SSL</label></div>
    <div id="conn-modal-error" class="error-msg"></div>
    <div class="actions">
      <div class="left">
        <button class="secondary" onclick="testConnModal()">Test</button>
        <button class="secondary" onclick="closeConnModal()">Cancel</button>
      </div>
      <button class="primary" onclick="saveConnModal()">Save</button>
    </div>
  </div>
</div>

<div id="overlay-confirm">
</div>

<script>
let connections = [];
let activeConnId = null;
const tablesCache = new Map();
const expandedConns = new Set();
const expandedSchemas = new Set();
const tabState = new Map(); // connId -> { sql, result, error, status }
let tabOrder = [];

function openTab(connId) {
  if (!tabState.has(connId)) {
    tabState.set(connId, { sql: '', result: null, error: null, status: '' });
    tabOrder.push(connId);
  }
  switchTab(connId);
}

function renderActiveConnBadge() {
  const badge = document.getElementById('active-conn-badge');
  if (!activeConnId) {
    badge.style.display = 'none';
    badge.innerHTML = '';
    badge.title = '';
    return;
  }
  const conn = connections.find((c) => c.id === activeConnId);
  badge.style.display = 'inline-flex';
  if (!conn) {
    badge.innerHTML = '(deleted connection)';
    badge.title = '';
    return;
  }
  badge.innerHTML = \`<span class="conn-dot"></span>\${escapeHtml(conn.name)}\`;
  badge.title = \`\${conn.host}:\${conn.port}/\${conn.database}\`;
}

function switchTab(connId) {
  if (connId === activeConnId) {
    renderTabBar();
    renderActiveConnBadge();
    return;
  }
  if (activeConnId && tabState.has(activeConnId)) {
    tabState.get(activeConnId).sql = document.getElementById('editor').value;
  }
  activeConnId = connId;
  const state = tabState.get(connId) || { sql: '', result: null, error: null, status: '' };
  document.getElementById('editor').value = state.sql;
  document.getElementById('status').textContent = state.status || '';
  if (state.error) {
    renderQueryError(state.error, state.sql);
  } else if (state.result) {
    renderResults(state.result);
  } else {
    resetResultsState();
    document.getElementById('results-wrap').innerHTML = '<div class="empty-state">Run a query to see results.</div>';
  }
  hideAutocomplete();
  renderTabBar();
  renderActiveConnBadge();
  renderConnList();
}

function closeTab(connId, e) {
  if (e) e.stopPropagation();
  if (!tabState.has(connId)) return;
  tabState.delete(connId);
  tabOrder = tabOrder.filter((id) => id !== connId);
  if (activeConnId === connId) {
    activeConnId = null;
    const next = tabOrder[tabOrder.length - 1] || null;
    if (next) {
      switchTab(next);
    } else {
      document.getElementById('editor').value = '';
      document.getElementById('status').textContent = '';
      resetResultsState();
      document.getElementById('results-wrap').innerHTML = '<div class="empty-state">Pick a connection to get started.</div>';
      renderTabBar();
      renderActiveConnBadge();
      renderConnList();
    }
  } else {
    renderTabBar();
  }
}

function renderTabBar() {
  const bar = document.getElementById('tab-bar');
  if (!tabOrder.length) {
    bar.innerHTML = '';
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  bar.innerHTML = tabOrder
    .map((id) => {
      const conn = connections.find((c) => c.id === id);
      const name = conn ? conn.name : '(deleted)';
      const active = id === activeConnId ? ' active' : '';
      return \`<div class="tab\${active}" data-id="\${id}"><span class="tab-name">\${escapeHtml(name)}</span><button class="tab-close" data-id="\${id}" title="Close tab">×</button></div>\`;
    })
    .join('');
  bar.querySelectorAll('.tab').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-close')) return;
      switchTab(el.dataset.id);
    });
  });
  bar.querySelectorAll('.tab-close').forEach((el) => {
    el.addEventListener('click', (e) => closeTab(el.dataset.id, e));
  });
}

async function api(path, opts) {
  const res = await fetch(path, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || res.statusText);
  }
  return res.json();
}

async function loadConnections() {
  connections = await api('/api/connections');
  renderConnList();
  renderActiveConnBadge();
}

function renderConnList() {
  const list = document.getElementById('conn-list');
  list.innerHTML = '';
  for (const c of connections) {
    const li = document.createElement('li');
    li.className = 'conn-block';
    const row = document.createElement('div');
    row.className = 'conn-row' + (c.id === activeConnId ? ' active' : '');
    row.innerHTML = \`<span class="conn-name" title="\${c.host}:\${c.port}/\${c.database}">
        <span class="chevron\${expandedConns.has(c.id) ? ' open' : ''}">▸</span><span class="conn-dot"></span>\${escapeHtml(c.name)}
      </span>
      <span class="conn-actions">
        <button class="icon-btn" title="Refresh tables" onclick="event.stopPropagation(); refreshConn('\${c.id}')"><svg viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0 0 20.49 15"/></svg></button>
        <button class="icon-btn" title="Edit" onclick="event.stopPropagation(); openConnModal('\${c.id}')"><svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg></button>
        <button class="icon-btn" title="Delete" onclick="event.stopPropagation(); deleteConn('\${c.id}')"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </span>\`;
    row.onclick = () => toggleConn(c.id);
    li.appendChild(row);
    if (expandedConns.has(c.id)) {
      const holder = document.createElement('div');
      holder.className = 'conn-tables';
      renderConnTables(holder, c.id);
      li.appendChild(holder);
    }
    list.appendChild(li);
  }
}

async function toggleConn(id) {
  const wasActive = id === activeConnId;
  openTab(id);
  if (expandedConns.has(id) && wasActive) {
    expandedConns.delete(id);
  } else {
    expandedConns.add(id);
  }
  renderConnList();
  if (!tablesCache.has(id)) {
    tablesCache.set(id, 'loading');
    renderConnList();
    try {
      const tables = await api(\`/api/connections/\${id}/tables\`);
      tablesCache.set(id, tables);
    } catch (err) {
      tablesCache.set(id, { error: err.message });
    }
    if (expandedConns.has(id)) renderConnList();
  }
}

function renderConnTables(container, connId) {
  const cached = tablesCache.get(connId);
  if (!cached || cached === 'loading') {
    container.innerHTML = '<div class="sidebar-msg">Loading…</div>';
    return;
  }
  if (cached.error) {
    container.innerHTML = \`<div class="error-msg">\${escapeHtml(cached.error)}</div>\`;
    return;
  }
  if (cached.length === 0) {
    container.innerHTML = '<div class="sidebar-msg">No tables</div>';
    return;
  }
  const bySchema = {};
  for (const t of cached) (bySchema[t.schema] ||= []).push(t);
  for (const schema of Object.keys(bySchema).sort()) {
    const key = connId + '|' + schema;
    const group = document.createElement('div');
    group.className = 'schema-group';
    const header = document.createElement('div');
    header.className = 'schema-name';
    header.innerHTML = \`<span class="chevron\${expandedSchemas.has(key) ? ' open' : ''}">▸</span>\${escapeHtml(schema)}\`;
    header.onclick = (e) => {
      e.stopPropagation();
      if (expandedSchemas.has(key)) expandedSchemas.delete(key);
      else expandedSchemas.add(key);
      renderConnList();
    };
    group.appendChild(header);
    if (expandedSchemas.has(key)) {
      for (const t of bySchema[schema]) {
        const item = document.createElement('div');
        item.className = 'table-item';
        item.textContent = t.name;
        item.title = t.columns.map(c => c.name + ' ' + c.type).join(', ');
        item.onclick = (e) => { e.stopPropagation(); previewTable(connId, schema, t.name); };
        group.appendChild(item);
      }
    }
    container.appendChild(group);
  }
}

function previewTable(connId, schema, name) {
  openTab(connId);
  const q = \`select * from "\${schema}"."\${name}" limit 100\`;
  document.getElementById('editor').value = q;
  if (tabState.has(connId)) tabState.get(connId).sql = q;
  runQuery();
}

function setTabStatus(connId, text) {
  if (tabState.has(connId)) tabState.get(connId).status = text;
  if (connId === activeConnId) document.getElementById('status').textContent = text;
}

async function runQuery(confirm, explain) {
  if (!activeConnId) return;
  hideAutocomplete();
  const connId = activeConnId;
  const rawSql = document.getElementById('editor').value.trim();
  if (!rawSql) return;
  const wasPrefixed = explain && !/^\\s*explain\\b/i.test(rawSql);
  const sql = wasPrefixed ? 'EXPLAIN ' + rawSql : rawSql;
  const explainOffset = wasPrefixed ? 'EXPLAIN '.length : 0;
  const runBtn = document.getElementById('run-btn');
  runBtn.disabled = true;
  setTabStatus(connId, explain ? 'Explaining…' : 'Running…');
  try {
    const res = await fetch(\`/api/connections/\${connId}/query\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql, confirm: !!confirm }),
    });
    const body = await res.json();
    if (res.status === 409 && body.needsConfirm) {
      openConfirmModal(body.reason, () => runQuery(true, explain));
      setTabStatus(connId, '');
      return;
    }
    if (!res.ok) {
      const errObj = typeof body.error === 'string' ? { message: body.error } : (body.error || { message: 'Query failed' });
      throw { ...errObj, explainOffset };
    }
    if (tabState.has(connId)) {
      tabState.get(connId).result = body;
      tabState.get(connId).error = null;
    }
    if (connId === activeConnId) renderResults(body);
    setTabStatus(connId, \`\${body.rows.length} row(s)\`);
  } catch (err) {
    const errObj = err && typeof err === 'object' && 'message' in err ? err : { message: String(err && err.message ? err.message : err) };
    if (tabState.has(connId)) {
      tabState.get(connId).result = null;
      tabState.get(connId).error = errObj;
    }
    if (connId === activeConnId) renderQueryError(errObj, rawSql);
    setTabStatus(connId, '');
  } finally {
    runBtn.disabled = false;
  }
}

function computeLineCol(sql, position) {
  if (position == null || position < 1) return null;
  const clamped = Math.min(position, sql.length + 1);
  let line = 1;
  let col = 1;
  for (let i = 0; i < clamped - 1; i++) {
    if (sql[i] === '\\n') {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col, offset: clamped - 1 };
}

function renderQueryError(err, editorSql) {
  resetResultsState();
  const wrap = document.getElementById('results-wrap');
  const rawOffset = err.position != null ? err.position - (err.explainOffset || 0) : undefined;
  const loc = rawOffset != null ? computeLineCol(editorSql, rawOffset) : null;
  const parts = [];
  parts.push(\`<div class="err-message">\${escapeHtml(err.message || 'Query failed')}</div>\`);
  if (loc) {
    parts.push(\`<div class="err-loc" data-offset="\${loc.offset}">Ln \${loc.line}, Col \${loc.col}</div>\`);
  }
  if (err.detail) parts.push(\`<div class="err-detail"><b>Detail:</b> \${escapeHtml(err.detail)}</div>\`);
  if (err.hint) parts.push(\`<div class="err-hint"><b>Hint:</b> \${escapeHtml(err.hint)}</div>\`);
  if (err.sqlState) parts.push(\`<div class="err-code">SQLSTATE \${escapeHtml(err.sqlState)}</div>\`);
  wrap.innerHTML = \`<div class="error-msg error-panel">\${parts.join('')}</div>\`;
  const locEl = wrap.querySelector('.err-loc');
  if (locEl) {
    locEl.onclick = () => {
      const editor = document.getElementById('editor');
      const off = Number(locEl.dataset.offset);
      editor.focus();
      editor.setSelectionRange(off, off);
    };
  }
}

let resultsEditInfo = null;
let resultsColumns = [];
let resultsRows = [];
let resultsFilters = [];
let editingCell = null;
let editingOriginalText = '';
let selectedCell = null;
let pendingRow = null;
let pendingDeleteRow = null;

function ensureTablesLoaded(connId) {
  if (tablesCache.has(connId)) return;
  tablesCache.set(connId, 'loading');
  api(\`/api/connections/\${connId}/tables\`)
    .then((tables) => tablesCache.set(connId, tables))
    .catch((err) => tablesCache.set(connId, { error: err.message }));
}

function columnType(colName) {
  if (!resultsEditInfo) return null;
  const info = findTableInfo(resultsEditInfo.schema + '.' + resultsEditInfo.table);
  if (!info) return null;
  const col = info.columns.find((c) => c.name === colName);
  return col ? col.type : null;
}

function toPgArrayLiteral(arr) {
  const esc = (v) =>
    v === null || v === undefined ? 'NULL' : '"' + String(v).replace(/\\\\/g, '\\\\\\\\').replace(/"/g, '\\\\"') + '"';
  return '{' + arr.map(esc).join(',') + '}';
}

function serializeForColumn(colName, text) {
  const colType = columnType(colName);
  if (colType !== 'ARRAY' && colType !== 'json' && colType !== 'jsonb') {
    return { ok: true, value: text };
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: \`"\${colName}" needs valid JSON, e.g. \${colType === 'ARRAY' ? '["a","b"]' : '{"k":"v"}'}\` };
  }
  if (colType === 'ARRAY') {
    if (!Array.isArray(parsed)) return { ok: false, error: \`"\${colName}" needs a JSON array, e.g. ["a","b"]\` };
    return { ok: true, value: toPgArrayLiteral(parsed) };
  }
  return { ok: true, value: parsed };
}

function resetResultsState() {
  resultsEditInfo = null;
  resultsColumns = [];
  resultsRows = [];
  resultsFilters = [];
  visibleRowIndices = null;
  editingCell = null;
  selectedCell = null;
  pendingRow = null;
  pendingDeleteRow = null;
}

function renderResults(result) {
  const wrap = document.getElementById('results-wrap');
  resetResultsState();
  resultsEditInfo = result.edit || null;
  resultsColumns = result.columns;
  resultsRows = result.rows;
  if (resultsEditInfo) ensureTablesLoaded(activeConnId);
  if (!result.columns.length) {
    wrap.innerHTML = \`<div class="empty-state">\${result.command} OK — \${result.rowCount} row(s) affected</div>\`;
    return;
  }
  const table = document.createElement('table');
  table.className = 'grid';
  const thead = document.createElement('tr');
  thead.className = 'head-row';
  resultsFilters = result.columns.map(() => '');
  result.columns.forEach((col, colIndex) => {
    const th = document.createElement('th');
    const label = document.createElement('div');
    label.className = 'th-label';
    label.textContent = col;
    label.title = col;
    const wrap2 = document.createElement('div');
    wrap2.className = 'filter-wrap';
    const icon = document.createElement('span');
    icon.className = 'filter-icon';
    icon.textContent = '\u2315';
    const input = document.createElement('input');
    input.className = 'col-filter';
    input.type = 'text';
    input.placeholder = 'Filter ' + col;
    input.title = 'Filter rows by ' + col + '. Substring by default; !text excludes; =, !=, >, >=, <, <= compare (numeric when both sides are numbers).';
    input.dataset.col = String(colIndex);
    input.addEventListener('input', () => {
      resultsFilters[colIndex] = input.value;
      input.classList.toggle('active', !!input.value.trim());
      applyFilters();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && input.value) {
        e.preventDefault();
        e.stopPropagation();
        input.value = '';
        resultsFilters[colIndex] = '';
        input.classList.remove('active');
        applyFilters();
      }
    });
    const clearBtn = document.createElement('button');
    clearBtn.className = 'filter-clear';
    clearBtn.type = 'button';
    clearBtn.title = 'Clear this filter';
    clearBtn.textContent = '\u00d7';
    clearBtn.addEventListener('click', () => {
      input.value = '';
      resultsFilters[colIndex] = '';
      input.classList.remove('active');
      applyFilters();
    });
    wrap2.appendChild(icon);
    wrap2.appendChild(input);
    wrap2.appendChild(clearBtn);
    th.appendChild(label);
    th.appendChild(wrap2);
    thead.appendChild(th);
  });
  table.appendChild(thead);
  result.rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell, colIndex) => {
      const td = document.createElement('td');
      td.dataset.row = String(rowIndex);
      td.dataset.col = String(colIndex);
      setCellDisplay(td, cell);
      td.addEventListener('click', () => selectCell(td));
      td.addEventListener('dblclick', () => maybeStartEdit(td, rowIndex, colIndex));
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  wrap.innerHTML = '';
  wrap.appendChild(table);
  applyFilters();
}

function matchFilter(text, q) {
  const lower = text.toLowerCase();
  const m = q.match(/^(>=|<=|!=|<>|>|<|=)\\s*(.*)$/);
  if (m) {
    const op = m[1];
    const rhs = m[2].trim();
    const a = Number(text);
    const b = Number(rhs);
    if (rhs !== '' && text.trim() !== '' && !Number.isNaN(a) && !Number.isNaN(b)) {
      if (op === '>') return a > b;
      if (op === '>=') return a >= b;
      if (op === '<') return a < b;
      if (op === '<=') return a <= b;
      if (op === '=') return a === b;
      return a !== b;
    }
    if (op === '=') return lower === rhs.toLowerCase();
    if (op === '!=' || op === '<>') return lower !== rhs.toLowerCase();
    return lower.includes(q.toLowerCase());
  }
  if (q.startsWith('!')) return !lower.includes(q.slice(1).toLowerCase());
  return lower.includes(q.toLowerCase());
}

function activeFilters() {
  return resultsFilters
    .map((f, colIndex) => ({ colIndex, q: (f || '').trim() }))
    .filter((f) => f.q);
}

function rowMatchesFilters(tr, filters) {
  return filters.every((f) => {
    const td = tr.cells[f.colIndex];
    return td ? matchFilter(td.textContent, f.q) : false;
  });
}

let visibleRowIndices = null;

function applyFilters() {
  const table = document.querySelector('#results-wrap table.grid');
  if (!table) return;
  const filters = activeFilters();
  visibleRowIndices = filters.length ? new Set() : null;
  let shown = 0;
  let total = 0;
  for (const tr of table.rows) {
    if (tr.classList.contains('head-row') || tr.classList.contains('new-row')) continue;
    total++;
    let show = rowMatchesFilters(tr, filters);
    if (!show && ((editingCell && tr.contains(editingCell)) || (pendingDeleteRow && pendingDeleteRow.tr === tr))) {
      show = true;
    }
    tr.classList.toggle('filtered-out', !show);
    if (show) {
      tr.classList.toggle('alt', shown % 2 === 1);
      shown++;
      if (visibleRowIndices) visibleRowIndices.add(Number(tr.cells[0].dataset.row));
    } else {
      tr.classList.remove('alt');
    }
  }
  const status = document.getElementById('filter-status');
  const btn = document.getElementById('clear-filters-btn');
  if (filters.length) {
    status.textContent = \`Showing \${shown} of \${total} rows\`;
    btn.style.display = '';
  } else {
    status.textContent = '';
    btn.style.display = 'none';
  }
}

function toggleFilters() {
  const wrap = document.getElementById('results-wrap');
  const hidden = wrap.classList.toggle('filters-hidden');
  document.getElementById('toggle-filters-btn').classList.toggle('toggled', !hidden);
  if (hidden) clearFilters();
  else focusFirstFilter();
}

function focusFirstFilter() {
  const input = document.querySelector('#results-wrap .col-filter');
  if (input) input.focus();
}

function clearFilters() {
  resultsFilters = resultsFilters.map(() => '');
  for (const input of document.querySelectorAll('#results-wrap .col-filter')) {
    input.value = '';
    input.classList.remove('active');
  }
  applyFilters();
}

function setCellDisplay(td, cell) {
  if (cell === null || cell === undefined) {
    td.textContent = 'NULL';
    td.className = 'null';
  } else if (typeof cell === 'object') {
    td.textContent = JSON.stringify(cell);
    td.className = '';
  } else {
    td.textContent = String(cell);
    td.className = '';
  }
}

function selectAllText(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function inConfirmOverlay(el) {
  if (!el || typeof el.closest !== 'function') return false;
  return !!el.closest('#overlay-confirm');
}

function isTextEntry(el) {
  if (!el || el.nodeType !== 1) return false;
  if (el.isContentEditable) return true;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

function selectCell(td) {
  if (editingCell) return;
  if (selectedCell) selectedCell.classList.remove('selected');
  selectedCell = td;
  td.classList.add('selected');
  selectAllText(td);
}

function maybeStartEdit(td, rowIndex, colIndex) {
  if (editingCell === td) return;
  startEdit(td, rowIndex, colIndex);
}

function startEdit(td, rowIndex, colIndex) {
  if (!resultsEditInfo) {
    document.getElementById('status').textContent =
      "Not editable: query must be a simple single-table select whose results include the table's primary key.";
    return;
  }
  if (pendingDeleteRow) {
    showUnsavedDeleteWarning();
    return;
  }
  if (selectedCell) { selectedCell.classList.remove('selected'); selectedCell = null; }
  editingCell = td;
  editingOriginalText = td.textContent;
  td.classList.remove('null', 'save-error');
  td.classList.add('editing');
  td.contentEditable = 'true';
  td.focus();
  selectAllText(td);
  td.addEventListener('keydown', onEditKeydown);
}

function isCellDirty() {
  return !!editingCell && editingCell.textContent !== editingOriginalText;
}

function exitEditState() {
  if (editingCell) {
    editingCell.contentEditable = 'false';
    editingCell.classList.remove('editing', 'save-error', 'saving');
    editingCell.removeEventListener('keydown', onEditKeydown);
  }
  editingCell = null;
  editingOriginalText = '';
}

function revertEdit() {
  const td = editingCell;
  if (!td) return;
  const rowIndex = Number(td.dataset.row);
  const colIndex = Number(td.dataset.col);
  setCellDisplay(td, resultsRows[rowIndex][colIndex]);
  exitEditState();
}

function onEditKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    saveEdit();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    revertEdit();
  } else if (e.key === 'Enter') {
    e.preventDefault();
  }
}

async function saveEdit() {
  const td = editingCell;
  if (!td) return;
  const rowIndex = Number(td.dataset.row);
  const colIndex = Number(td.dataset.col);
  const colName = resultsColumns[colIndex];
  const newText = td.textContent;
  td.classList.remove('save-error');
  document.getElementById('status').textContent = 'Saving…';
  if (newText === editingOriginalText) {
    exitEditState();
    document.getElementById('status').textContent = '';
    return;
  }
  const serialized = serializeForColumn(colName, newText);
  if (!serialized.ok) {
    td.classList.add('save-error');
    document.getElementById('status').textContent = serialized.error;
    return;
  }
  const pk = resultsEditInfo.pkColumns.map((pkCol) => ({
    column: pkCol,
    value: resultsRows[rowIndex][resultsColumns.indexOf(pkCol)],
  }));
  td.classList.add('saving');
  try {
    const res = await api(\`/api/connections/\${activeConnId}/update-cell\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        schema: resultsEditInfo.schema,
        table: resultsEditInfo.table,
        pk,
        column: colName,
        value: serialized.value,
      }),
    });
    td.classList.remove('saving');
    if (!res.rowCount) {
      td.classList.add('save-error');
      document.getElementById('status').textContent = 'Save failed: no rows matched — the row may have changed underneath you.';
      return;
    }
    const colType = columnType(colName);
    resultsRows[rowIndex][colIndex] =
      colType === 'ARRAY' || colType === 'json' || colType === 'jsonb' ? JSON.parse(newText) : newText;
    document.getElementById('status').textContent = \`Saved (\${res.rowCount} row\${res.rowCount === 1 ? '' : 's'}).\`;
    exitEditState();
  } catch (err) {
    td.classList.remove('saving');
    td.classList.add('save-error');
    document.getElementById('status').textContent = 'Save failed: ' + err.message;
  }
}

function renumberResultRows() {
  const table = document.querySelector('#results-wrap table.grid');
  if (!table) return;
  const rows = Array.from(table.querySelectorAll('tr')).filter((tr) => !tr.classList.contains('new-row'));
  rows.shift(); // header row
  rows.forEach((tr, rowIndex) => {
    Array.from(tr.children).forEach((td) => { td.dataset.row = String(rowIndex); });
  });
}

function hasUnsavedDelete() {
  return !!pendingDeleteRow;
}

function markRowPendingDelete(td) {
  if (editingCell || pendingRow) return;
  if (!resultsEditInfo) {
    document.getElementById('status').textContent =
      "Can't delete: this result isn't tied to an editable table.";
    return;
  }
  const tr = td.parentElement;
  if (pendingDeleteRow && pendingDeleteRow.tr === tr) return;
  if (pendingDeleteRow && pendingDeleteRow.tr !== tr) {
    showUnsavedDeleteWarning(() => markRowPendingDelete(td));
    return;
  }
  pendingDeleteRow = { tr, rowIndex: Number(td.dataset.row) };
  tr.classList.add('pending-delete');
  document.getElementById('status').textContent = 'Row marked for deletion — Cmd+Enter to delete, Esc to undo.';
}

function cancelPendingDelete() {
  if (!pendingDeleteRow) return;
  pendingDeleteRow.tr.classList.remove('pending-delete');
  pendingDeleteRow = null;
  document.getElementById('status').textContent = '';
}

async function commitPendingDelete() {
  if (!pendingDeleteRow) return;
  const { tr, rowIndex } = pendingDeleteRow;
  const row = resultsRows[rowIndex];
  const pk = resultsEditInfo.pkColumns.map((pkCol) => ({
    column: pkCol,
    value: row[resultsColumns.indexOf(pkCol)],
  }));
  tr.classList.add('saving');
  document.getElementById('status').textContent = 'Deleting…';
  try {
    const res = await api(\`/api/connections/\${activeConnId}/delete-row\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schema: resultsEditInfo.schema, table: resultsEditInfo.table, pk }),
    });
    if (!res.rowCount) {
      tr.classList.remove('saving');
      document.getElementById('status').textContent = 'Delete failed: no rows matched — the row may have changed underneath you.';
      return;
    }
    tr.remove();
    resultsRows.splice(rowIndex, 1);
    renumberResultRows();
    pendingDeleteRow = null;
    selectedCell = null;
    applyFilters();
    document.getElementById('status').textContent = \`Deleted (\${res.rowCount} row\${res.rowCount === 1 ? '' : 's'}).\`;
  } catch (err) {
    tr.classList.remove('saving');
    document.getElementById('status').textContent = 'Delete failed: ' + err.message;
  }
}

let closeDeleteWarning = null;

function showUnsavedDeleteWarning(onProceed) {
  if (!pendingDeleteRow) { if (onProceed) onProceed(); return; }
  if (closeDeleteWarning) closeDeleteWarning();
  const overlay = document.getElementById('overlay-confirm');
  overlay.innerHTML = \`<div id="overlay" class="show"><div class="modal">
    <h2>Unsaved row deletion</h2>
    <p style="font-size:12px;color:var(--text-dim)">A row is marked for deletion. Press Cmd+Enter to delete it, or undo the mark.</p>
    <div class="actions">
      <button class="secondary" id="warn-keep">Keep mark</button>
      <button class="danger" id="warn-discard">Undo mark</button>
    </div>
  </div></div>\`;
  const close = () => {
    overlay.innerHTML = '';
    document.removeEventListener('keydown', onKeydown, true);
    closeDeleteWarning = null;
  };
  closeDeleteWarning = close;
  function onKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      close();
      commitPendingDelete();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }
  document.getElementById('warn-keep').onclick = () => { close(); };
  document.getElementById('warn-discard').onclick = () => { close(); cancelPendingDelete(); if (onProceed) onProceed(); };
  document.addEventListener('keydown', onKeydown, true);
}

function hasUnsavedNewRow() {
  return !!pendingRow && pendingRow.touched.some(Boolean);
}

function startNewRow() {
  if (!resultsEditInfo) {
    document.getElementById('status').textContent =
      "Can't add a row: this result isn't tied to an editable table.";
    return;
  }
  if (pendingDeleteRow) {
    showUnsavedDeleteWarning();
    return;
  }
  if (editingCell && isCellDirty()) {
    showUnsavedEditWarning();
    return;
  }
  if (editingCell) exitEditState();
  if (pendingRow) {
    pendingRow.tds[0].focus();
    return;
  }
  const table = document.querySelector('#results-wrap table.grid');
  if (!table) return;
  const tr = document.createElement('tr');
  tr.className = 'new-row';
  const tds = resultsColumns.map((_, colIndex) => {
    const td = document.createElement('td');
    td.contentEditable = 'true';
    const onKeydown = (e) => onNewRowKeydown(e, colIndex);
    td._newRowKeydown = onKeydown;
    td.addEventListener('keydown', onKeydown);
    td.addEventListener('input', () => { pendingRow.touched[colIndex] = true; });
    tr.appendChild(td);
    return td;
  });
  table.appendChild(tr);
  pendingRow = { tr, tds, touched: resultsColumns.map(() => false) };
  tds[0].focus();
  tr.scrollIntoView({ block: 'nearest' });
  document.getElementById('status').textContent = 'New row: Tab between fields, Cmd+Enter to save, Esc to cancel.';
}

function cancelNewRow() {
  if (!pendingRow) return;
  pendingRow.tr.remove();
  pendingRow = null;
  document.getElementById('status').textContent = 'New row discarded.';
}

function onNewRowKeydown(e, colIndex) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    submitNewRow();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    cancelNewRow();
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const next = colIndex + (e.shiftKey ? -1 : 1);
    if (next >= 0 && next < pendingRow.tds.length) pendingRow.tds[next].focus();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const next = colIndex + 1;
    if (next < pendingRow.tds.length) pendingRow.tds[next].focus();
    else submitNewRow();
  }
}

async function submitNewRow() {
  if (!pendingRow) return;
  const values = {};
  for (let i = 0; i < resultsColumns.length; i++) {
    if (!pendingRow.touched[i]) continue;
    const colName = resultsColumns[i];
    const serialized = serializeForColumn(colName, pendingRow.tds[i].textContent);
    if (!serialized.ok) {
      pendingRow.tds[i].classList.add('save-error');
      document.getElementById('status').textContent = serialized.error;
      return;
    }
    values[colName] = serialized.value;
  }
  if (!Object.keys(values).length) {
    document.getElementById('status').textContent = 'Type a value in at least one column before saving.';
    return;
  }
  pendingRow.tds.forEach((td) => td.classList.remove('save-error'));
  pendingRow.tr.classList.add('saving');
  try {
    const res = await api(\`/api/connections/\${activeConnId}/insert-row\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schema: resultsEditInfo.schema, table: resultsEditInfo.table, values }),
    });
    const row = pendingRow;
    const newRow = resultsColumns.map((c) => (res.row && c in res.row ? res.row[c] : null));
    const rowIndex = resultsRows.length;
    resultsRows.push(newRow);
    row.tds.forEach((td, i) => {
      td.contentEditable = 'false';
      td.classList.remove('save-error');
      td.removeEventListener('keydown', td._newRowKeydown);
      td.dataset.row = String(rowIndex);
      td.dataset.col = String(i);
      setCellDisplay(td, newRow[i]);
      td.addEventListener('click', () => selectCell(td));
      td.addEventListener('dblclick', () => maybeStartEdit(td, rowIndex, i));
    });
    row.tr.classList.remove('new-row', 'saving');
    document.getElementById('status').textContent = 'Row added.';
    pendingRow = null;
  } catch (err) {
    pendingRow.tr.classList.remove('saving');
    document.getElementById('status').textContent = 'Insert failed: ' + err.message;
  }
}

function showUnsavedRowWarning() {
  if (!pendingRow) return;
  const overlay = document.getElementById('overlay-confirm');
  overlay.innerHTML = \`<div id="overlay" class="show"><div class="modal">
    <h2>Unsaved new row</h2>
    <p style="font-size:12px;color:var(--text-dim)">You started a new row. Press Cmd+Enter to save it, or discard it.</p>
    <div class="actions">
      <button class="secondary" id="warn-keep">Keep editing</button>
      <button class="danger" id="warn-discard">Discard row</button>
    </div>
  </div></div>\`;
  const close = () => { overlay.innerHTML = ''; document.removeEventListener('keydown', onKeydown, true); };
  function onKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      close();
      submitNewRow();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
      if (pendingRow) pendingRow.tds[0].focus();
    }
  }
  document.getElementById('warn-keep').onclick = () => { close(); if (pendingRow) pendingRow.tds[0].focus(); };
  document.getElementById('warn-discard').onclick = () => { close(); cancelNewRow(); };
  document.addEventListener('keydown', onKeydown, true);
}

function showUnsavedEditWarning() {
  const td = editingCell;
  if (!td) return;
  const overlay = document.getElementById('overlay-confirm');
  overlay.innerHTML = \`<div id="overlay" class="show"><div class="modal">
    <h2>Unsaved cell edit</h2>
    <p style="font-size:12px;color:var(--text-dim)">This cell has an unsaved change. Press Cmd+Enter to save it, or discard it.</p>
    <div class="actions">
      <button class="secondary" id="warn-keep">Keep editing</button>
      <button class="danger" id="warn-discard">Discard changes</button>
    </div>
  </div></div>\`;
  const close = () => { overlay.innerHTML = ''; document.removeEventListener('keydown', onKeydown, true); };
  function onKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      close();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
      td.focus();
    }
  }
  document.getElementById('warn-keep').onclick = () => { close(); td.focus(); };
  document.getElementById('warn-discard').onclick = () => { close(); revertEdit(); };
  document.addEventListener('keydown', onKeydown, true);
}

document.addEventListener('mousedown', (e) => {
  if (inConfirmOverlay(e.target)) return;
  if (editingCell && !editingCell.contains(e.target) && isCellDirty()) {
    e.preventDefault();
    return;
  }
  if (pendingRow && !pendingRow.tr.contains(e.target) && hasUnsavedNewRow()) {
    e.preventDefault();
    return;
  }
  if (pendingDeleteRow && !pendingDeleteRow.tr.contains(e.target)) {
    e.preventDefault();
  }
}, true);

document.addEventListener('click', (e) => {
  if (inConfirmOverlay(e.target)) return;
  if (editingCell && !editingCell.contains(e.target)) {
    if (!isCellDirty()) {
      exitEditState();
    } else {
      e.preventDefault();
      e.stopPropagation();
      showUnsavedEditWarning();
      return;
    }
  }
  if (pendingRow && !pendingRow.tr.contains(e.target)) {
    if (!hasUnsavedNewRow()) {
      cancelNewRow();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    showUnsavedRowWarning();
    return;
  }
  if (pendingDeleteRow && !pendingDeleteRow.tr.contains(e.target)) {
    e.preventDefault();
    e.stopPropagation();
    showUnsavedDeleteWarning();
  }
}, true);

document.addEventListener('keydown', (e) => {
  if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'f') return;
  if (!document.querySelector('#results-wrap .col-filter')) return;
  e.preventDefault();
  const wrap = document.getElementById('results-wrap');
  if (wrap.classList.contains('filters-hidden')) toggleFilters();
  else focusFirstFilter();
}, true);

document.addEventListener('keydown', (e) => {
  if (!e.ctrlKey || e.key.toLowerCase() !== 'n') return;
  if (isTextEntry(e.target) && e.target !== selectedCell) return;
  if (document.getElementById('overlay').classList.contains('show')) return;
  if (document.getElementById('overlay-confirm').innerHTML.trim()) return;
  if (!activeConnId) return;
  e.preventDefault();
  startNewRow();
}, true);

document.addEventListener('keydown', (e) => {
  if (document.getElementById('overlay').classList.contains('show')) return;
  if (document.getElementById('overlay-confirm').innerHTML.trim()) return;
  if (isTextEntry(e.target) && !(selectedCell && selectedCell === e.target)) return;
  if ((e.key === 'Backspace' || e.key === 'Delete') && selectedCell && !editingCell) {
    e.preventDefault();
    markRowPendingDelete(selectedCell);
    return;
  }
  if (pendingDeleteRow) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      commitPendingDelete();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelPendingDelete();
    }
  }
}, true);

document.addEventListener('copy', (e) => {
  if (!selectedCell || editingCell) return;
  if (isTextEntry(e.target) && e.target !== selectedCell) return;
  e.preventDefault();
  e.clipboardData.setData('text/plain', selectedCell.textContent);
}, true);

async function exportCsv() {
  if (!activeConnId) return;
  const sql = document.getElementById('editor').value.trim();
  if (!sql) return;
  const url = \`/api/connections/\${activeConnId}/export\`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      const msg = typeof body.error === 'string' ? body.error : (body.error && body.error.message) || res.statusText;
      throw new Error(msg);
    }
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    document.getElementById('status').textContent = 'Export failed: ' + err.message;
  }
}

function escapeCsvCell(value) {
  if (value === null || value === undefined) return '';
  let str;
  if (value instanceof Date) str = value.toISOString();
  else if (typeof value === 'object') str = JSON.stringify(value);
  else str = String(value);
  if (/[",\\n\\r]/.test(str)) return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

function resultsToCsv() {
  const lines = [resultsColumns.map(escapeCsvCell).join(',')];
  resultsRows.forEach((row, rowIndex) => {
    if (visibleRowIndices && !visibleRowIndices.has(rowIndex)) return;
    lines.push(row.map(escapeCsvCell).join(','));
  });
  return lines.join('\\r\\n') + '\\r\\n';
}

let copyCsvFlashTimeout = null;

function flashCopyCsvButton(text) {
  const btn = document.getElementById('copy-csv-btn');
  if (copyCsvFlashTimeout) clearTimeout(copyCsvFlashTimeout);
  const original = 'Copy CSV';
  btn.textContent = text;
  copyCsvFlashTimeout = setTimeout(() => {
    btn.textContent = original;
    copyCsvFlashTimeout = null;
  }, 1200);
}

async function copyCsv() {
  if (!resultsColumns.length) {
    flashCopyCsvButton('Nothing to copy');
    return;
  }
  const csv = resultsToCsv();
  try {
    await navigator.clipboard.writeText(csv);
    flashCopyCsvButton('Copied!');
  } catch (err) {
    flashCopyCsvButton('Copy failed');
  }
}

function openConfirmModal(reason, onConfirm, title) {
  const overlay = document.getElementById('overlay-confirm');
  overlay.innerHTML = \`<div id="overlay" class="show"><div class="modal">
    <h2>\${escapeHtml(title || 'Confirm destructive query')}</h2>
    <p style="font-size:12px;color:var(--text-dim)">\${escapeHtml(reason)}</p>
    <div class="actions">
      <button class="secondary" id="confirm-cancel">Cancel</button>
      <button class="danger" id="confirm-ok">Run anyway</button>
    </div>
  </div></div>\`;
  const close = () => { overlay.innerHTML = ''; document.removeEventListener('keydown', onKeydown, true); };
  const run = () => { close(); onConfirm(); };
  function onKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); run(); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  }
  document.getElementById('confirm-cancel').onclick = close;
  document.getElementById('confirm-ok').onclick = run;
  document.addEventListener('keydown', onKeydown, true);
}

function openConnModal(id) {
  document.getElementById('conn-modal-error').textContent = '';
  const conn = id ? connections.find(c => c.id === id) : null;
  document.getElementById('conn-modal-title').textContent = conn ? 'Edit connection' : 'New connection';
  document.getElementById('f-id').value = conn ? conn.id : '';
  document.getElementById('f-connstring').value = '';
  document.getElementById('f-name').value = conn ? conn.name : '';
  document.getElementById('f-host').value = conn ? conn.host : 'localhost';
  document.getElementById('f-port').value = conn ? conn.port : 5432;
  document.getElementById('f-database').value = conn ? conn.database : '';
  document.getElementById('f-user').value = conn ? conn.user : '';
  document.getElementById('f-password').value = '';
  document.getElementById('f-password').placeholder = conn && conn.hasPassword ? '(unchanged)' : '';
  document.getElementById('f-ssl').checked = conn ? conn.ssl : false;
  document.getElementById('overlay').classList.add('show');
}

function parseConnString() {
  const errEl = document.getElementById('conn-modal-error');
  const raw = document.getElementById('f-connstring').value.trim();
  if (!raw) return;
  try {
    const withScheme = /^[a-z]+:\\/\\//i.test(raw) ? raw : 'postgres://' + raw;
    const u = new URL(withScheme);
    const database = decodeURIComponent(u.pathname.replace(/^\\//, ''));
    if (u.username) document.getElementById('f-user').value = decodeURIComponent(u.username);
    if (u.password) document.getElementById('f-password').value = decodeURIComponent(u.password);
    if (u.hostname) document.getElementById('f-host').value = u.hostname;
    document.getElementById('f-port').value = u.port || 5432;
    if (database) document.getElementById('f-database').value = database;
    const sslmode = u.searchParams.get('sslmode') || u.searchParams.get('ssl');
    if (sslmode) document.getElementById('f-ssl').checked = !['disable', 'false', '0'].includes(sslmode.toLowerCase());
    if (!document.getElementById('f-name').value) {
      document.getElementById('f-name').value = database || u.hostname || 'connection';
    }
    errEl.style.color = 'var(--success)';
    errEl.textContent = 'Parsed. Review fields below and Save.';
  } catch (err) {
    errEl.style.color = 'var(--danger)';
    errEl.textContent = 'Could not parse connection string: ' + err.message;
  }
}

function closeConnModal() {
  document.getElementById('overlay').classList.remove('show');
}

function readConnForm() {
  return {
    name: document.getElementById('f-name').value.trim(),
    host: document.getElementById('f-host').value.trim(),
    port: parseInt(document.getElementById('f-port').value, 10) || 5432,
    database: document.getElementById('f-database').value.trim(),
    user: document.getElementById('f-user').value.trim(),
    password: document.getElementById('f-password').value,
    ssl: document.getElementById('f-ssl').checked,
  };
}

async function testConnModal() {
  const errEl = document.getElementById('conn-modal-error');
  errEl.textContent = 'Testing…';
  try {
    const body = readConnForm();
    const id = document.getElementById('f-id').value;
    const result = await api('/api/test-draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, id: id || undefined }),
    });
    errEl.style.color = result.ok ? 'var(--success)' : 'var(--danger)';
    errEl.textContent = result.ok ? 'Connection OK' : result.error;
  } catch (err) {
    errEl.style.color = 'var(--danger)';
    errEl.textContent = err.message;
  }
}

async function saveConnModal() {
  const errEl = document.getElementById('conn-modal-error');
  const id = document.getElementById('f-id').value;
  const body = readConnForm();
  if (!body.name || !body.host || !body.database || !body.user) {
    errEl.textContent = 'Name, host, database and user are required.';
    return;
  }
  try {
    if (id) {
      await api(\`/api/connections/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } else {
      await api('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
    closeConnModal();
    await loadConnections();
  } catch (err) {
    errEl.textContent = err.message;
  }
}

async function deleteConn(id) {
  if (!confirm('Delete this connection?')) return;
  await api(\`/api/connections/\${id}\`, { method: 'DELETE' });
  tablesCache.delete(id);
  expandedConns.delete(id);
  closeTab(id);
  await loadConnections();
}

async function refreshConn(id) {
  tablesCache.delete(id);
  for (const key of [...expandedSchemas]) {
    if (key.startsWith(id + '|')) expandedSchemas.delete(key);
  }
  if (expandedConns.has(id)) {
    renderConnList();
    tablesCache.set(id, 'loading');
    renderConnList();
    try {
      const tables = await api(\`/api/connections/\${id}/tables\`);
      tablesCache.set(id, tables);
    } catch (err) {
      tablesCache.set(id, { error: err.message });
    }
    renderConnList();
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let acMatches = [];
let acIndex = -1;
let acStart = 0;
let acEnd = 0;

function cachedTables() {
  const cached = tablesCache.get(activeConnId);
  return Array.isArray(cached) ? cached : [];
}

function findTableInfo(name, pseudoTables) {
  const lower = name.toLowerCase();
  const real = cachedTables().find((t) => t.name.toLowerCase() === lower || (t.schema + '.' + t.name).toLowerCase() === lower);
  if (real) return real;
  return (pseudoTables || []).find((t) => t.name.toLowerCase() === lower) || null;
}

// ---- statement splitting (semicolon-aware, quote/comment/dollar-quote safe) ----

function splitStatements(sql) {
  const stmts = [];
  let state = 'NORMAL';
  let stmtStart = 0;
  let dollarTag = null;
  let blockDepth = 0;
  const n = sql.length;
  let i = 0;
  while (i < n) {
    const c = sql[i];
    if (state === 'NORMAL') {
      if (c === "'") { state = 'SINGLE'; i++; continue; }
      if (c === '"') { state = 'DOUBLE'; i++; continue; }
      if (c === '-' && sql[i + 1] === '-') { state = 'LINE'; i += 2; continue; }
      if (c === '/' && sql[i + 1] === '*') { state = 'BLOCK'; blockDepth = 1; i += 2; continue; }
      if (c === '$') {
        const m = /^\\$[A-Za-z_]*\\$/.exec(sql.slice(i));
        if (m) { dollarTag = m[0]; state = 'DOLLAR'; i += m[0].length; continue; }
      }
      if (c === ';') {
        stmts.push({ start: stmtStart, end: i, text: sql.slice(stmtStart, i) });
        stmtStart = i + 1;
        i++;
        continue;
      }
      i++;
      continue;
    }
    if (state === 'SINGLE') {
      if (c === "'") {
        if (sql[i + 1] === "'") { i += 2; continue; }
        state = 'NORMAL'; i++; continue;
      }
      i++; continue;
    }
    if (state === 'DOUBLE') {
      if (c === '"') {
        if (sql[i + 1] === '"') { i += 2; continue; }
        state = 'NORMAL'; i++; continue;
      }
      i++; continue;
    }
    if (state === 'LINE') {
      if (c === '\\n') state = 'NORMAL';
      i++; continue;
    }
    if (state === 'BLOCK') {
      if (c === '/' && sql[i + 1] === '*') { blockDepth++; i += 2; continue; }
      if (c === '*' && sql[i + 1] === '/') { blockDepth--; i += 2; if (blockDepth === 0) state = 'NORMAL'; continue; }
      i++; continue;
    }
    if (state === 'DOLLAR') {
      if (sql.startsWith(dollarTag, i)) { state = 'NORMAL'; i += dollarTag.length; dollarTag = null; continue; }
      i++; continue;
    }
    i++;
  }
  stmts.push({ start: stmtStart, end: n, text: sql.slice(stmtStart, n) });
  return stmts;
}

function statementAt(statements, pos) {
  for (const s of statements) {
    if (pos >= s.start && pos <= s.end) return s;
  }
  return statements[statements.length - 1] || { start: 0, end: 0, text: '' };
}

// Blanks out (space-fills, same length) string/comment/dollar-quote spans so a
// regex tokenizer downstream doesn't get confused by SQL-looking text inside literals.
function maskNonSql(text) {
  const chars = text.split('');
  let state = 'NORMAL';
  let dollarTag = null;
  let blockDepth = 0;
  const n = text.length;
  let i = 0;
  while (i < n) {
    const c = text[i];
    if (state === 'NORMAL') {
      if (c === "'") { state = 'SINGLE'; chars[i] = ' '; i++; continue; }
      if (c === '"') { state = 'DOUBLE'; chars[i] = ' '; i++; continue; }
      if (c === '-' && text[i + 1] === '-') { state = 'LINE'; chars[i] = ' '; chars[i + 1] = ' '; i += 2; continue; }
      if (c === '/' && text[i + 1] === '*') { state = 'BLOCK'; blockDepth = 1; chars[i] = ' '; chars[i + 1] = ' '; i += 2; continue; }
      if (c === '$') {
        const m = /^\\$[A-Za-z_]*\\$/.exec(text.slice(i));
        if (m) {
          dollarTag = m[0];
          state = 'DOLLAR';
          for (let k = 0; k < m[0].length; k++) chars[i + k] = ' ';
          i += m[0].length;
          continue;
        }
      }
      i++;
      continue;
    }
    if (state === 'SINGLE') {
      chars[i] = ' ';
      if (c === "'") {
        if (text[i + 1] === "'") { chars[i + 1] = ' '; i += 2; continue; }
        state = 'NORMAL'; i++; continue;
      }
      i++; continue;
    }
    if (state === 'DOUBLE') {
      chars[i] = ' ';
      if (c === '"') {
        if (text[i + 1] === '"') { chars[i + 1] = ' '; i += 2; continue; }
        state = 'NORMAL'; i++; continue;
      }
      i++; continue;
    }
    if (state === 'LINE') {
      if (c === '\\n') { state = 'NORMAL'; i++; continue; }
      chars[i] = ' '; i++; continue;
    }
    if (state === 'BLOCK') {
      if (c === '/' && text[i + 1] === '*') { blockDepth++; chars[i] = ' '; chars[i + 1] = ' '; i += 2; continue; }
      if (c === '*' && text[i + 1] === '/') { blockDepth--; chars[i] = ' '; chars[i + 1] = ' '; i += 2; if (blockDepth === 0) state = 'NORMAL'; continue; }
      chars[i] = ' '; i++; continue;
    }
    if (state === 'DOLLAR') {
      if (text.startsWith(dollarTag, i)) {
        for (let k = 0; k < dollarTag.length; k++) chars[i + k] = ' ';
        state = 'NORMAL'; i += dollarTag.length; dollarTag = null; continue;
      }
      chars[i] = ' '; i++; continue;
    }
    i++;
  }
  return chars.join('');
}

function matchingParenEnd(text, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    if (text[i] === '(') depth++;
    else if (text[i] === ')') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return text.length;
}

// ---- per-statement analysis: CTEs, FROM/JOIN tables, alias map ----

const ALIAS_RE = /\\b(?:from|join)\\s+((?:[\\w]+\\.)?[\\w]+)\\s+(?:as\\s+)?([a-zA-Z_]\\w*)\\b/gi;
const NOT_AN_ALIAS = /^(where|group|order|having|join|on|inner|left|right|full|cross|using|set|values|limit|offset|as)$/i;

function extractCtes(maskedStmt) {
  const ctes = [];
  const head = /^\\s*with\\s+/i.exec(maskedStmt);
  if (!head) return ctes;
  let i = head[0].length;
  while (true) {
    const nameMatch = /^([a-zA-Z_]\\w*)/.exec(maskedStmt.slice(i));
    if (!nameMatch) break;
    const name = nameMatch[1];
    i += nameMatch[0].length;
    i += (/^\\s*/.exec(maskedStmt.slice(i)) || [''])[0].length;
    if (maskedStmt[i] === '(') {
      i = matchingParenEnd(maskedStmt, i) + 1;
      i += (/^\\s*/.exec(maskedStmt.slice(i)) || [''])[0].length;
    }
    const asMatch = /^as\\s*/i.exec(maskedStmt.slice(i));
    if (!asMatch) break;
    i += asMatch[0].length;
    if (maskedStmt[i] !== '(') break;
    const bodyClose = matchingParenEnd(maskedStmt, i);
    ctes.push(name.toLowerCase());
    i = bodyClose + 1;
    i += (/^\\s*/.exec(maskedStmt.slice(i)) || [''])[0].length;
    if (maskedStmt[i] === ',') {
      i++;
      i += (/^\\s*/.exec(maskedStmt.slice(i)) || [''])[0].length;
      continue;
    }
    break;
  }
  return ctes;
}

function analyzeStatement(stmtText) {
  const masked = maskNonSql(stmtText);
  const ctes = extractCtes(masked);
  const pseudoTables = ctes.map((name) => ({ schema: '', name, columns: [] }));
  const aliasMap = {};
  for (const name of ctes) aliasMap[name] = name;
  let m;
  ALIAS_RE.lastIndex = 0;
  while ((m = ALIAS_RE.exec(masked))) {
    if (NOT_AN_ALIAS.test(m[2])) continue;
    aliasMap[m[2].toLowerCase()] = m[1];
  }
  return { ctes, pseudoTables, aliasMap };
}

function tableCandidates(analysis) {
  const names = new Set();
  for (const t of cachedTables()) {
    names.add(t.name);
    names.add(t.schema + '.' + t.name);
  }
  for (const t of (analysis ? analysis.pseudoTables : [])) names.add(t.name);
  return [...names];
}

function referencedTables(analysis) {
  const tables = [];
  for (const alias of Object.keys(analysis.aliasMap)) {
    const info = findTableInfo(analysis.aliasMap[alias], analysis.pseudoTables);
    if (info) tables.push(info);
  }
  return tables;
}

function columnCandidates(analysis) {
  const refs = analysis ? referencedTables(analysis) : [];
  const names = new Set();
  if (refs.length) {
    for (const t of refs) for (const c of t.columns) names.add(c.name);
  } else {
    for (const t of cachedTables()) for (const c of t.columns) names.add(c.name);
  }
  return [...names];
}

function resolveTableColumns(prefix, analysis) {
  if (!prefix) return null;
  const resolved = analysis.aliasMap[prefix.toLowerCase()] || prefix;
  const info = findTableInfo(resolved, analysis.pseudoTables);
  return info ? info.columns.map((c) => c.name) : null;
}

// ---- tokenizing + positional classification ----

function tokenize(maskedText) {
  const TOKEN_RE = /\\b[A-Za-z_][A-Za-z0-9_]*\\b|<>|<=|>=|!=|[(),.;=<>]/g;
  const tokens = [];
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(maskedText))) {
    tokens.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  }
  return tokens;
}

const CLAUSE_KEYWORDS = new Set(['select', 'from', 'join', 'where', 'and', 'or', 'on', 'set', 'by', 'having', 'values', 'when', 'case', 'into', 'update', 'with', 'group', 'order', 'limit', 'offset', 'returning', 'using', 'insert', 'delete']);
const TABLE_KEYWORDS = new Set(['from', 'join', 'into', 'update']);

function enclosingClauseIsTableList(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i].text.toLowerCase();
    if (t === 'from' || t === 'join') return true;
    if (['select', 'where', 'set', 'values', 'on', 'and', 'or', 'having'].includes(t)) return false;
  }
  return false;
}

function classifyPosition(tokens) {
  if (!tokens.length) return 'clause-start';
  const last = tokens[tokens.length - 1];
  const lastLower = last.text.toLowerCase();
  if (TABLE_KEYWORDS.has(lastLower)) return 'table';
  if (CLAUSE_KEYWORDS.has(lastLower)) return 'column';
  if (last.text === ',') return enclosingClauseIsTableList(tokens) ? 'table' : 'column';
  if (last.text === '(') return 'clause-start';
  if (/^[A-Za-z_]\\w*$/.test(last.text)) {
    // a bare identifier was just completed — if it's sitting in a FROM/JOIN table
    // list, the next thing is a clause keyword (JOIN/WHERE/...), not a comparison operator
    return enclosingClauseIsTableList(tokens) ? 'table-cont' : 'operator';
  }
  return 'column';
}

// ---- candidate lists ----

const KEYWORDS_CLAUSE_START = ['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'WITH', 'EXPLAIN'];
const KEYWORDS_AFTER_TABLE = ['JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'WHERE', 'ON', 'GROUP BY', 'ORDER BY', 'LIMIT', 'SET', 'VALUES', 'RETURNING'];
const OPERATORS = ['=', '<>', '<', '>', '<=', '>=', 'LIKE', 'ILIKE', 'IN', 'IS NULL', 'IS NOT NULL', 'BETWEEN'];
const KEYWORDS_CLAUSE_CONTINUATION = ['AND', 'OR'];

function byPrefix(arr, word, kind) {
  const w = word.toLowerCase();
  return arr.filter((c) => c.toLowerCase().startsWith(w)).map((text) => ({ text, kind }));
}

function buildCandidates(position, word, analysis, tokens) {
  if (position === 'clause-start') return byPrefix(KEYWORDS_CLAUSE_START, word, 'keyword');
  if (position === 'table') return byPrefix(tableCandidates(analysis), word, 'table');
  if (position === 'table-cont') return byPrefix(KEYWORDS_AFTER_TABLE, word, 'keyword');
  if (position === 'operator') {
    return [...byPrefix(OPERATORS, word, 'operator'), ...byPrefix(KEYWORDS_CLAUSE_CONTINUATION, word, 'keyword')];
  }
  return byPrefix(columnCandidates(analysis), word, 'column');
}

function currentWordRange(editor) {
  const pos = editor.selectionStart;
  const value = editor.value;
  const before = value.slice(0, pos);
  const m = before.match(/[\\w."]+$/);
  const start = m ? pos - m[0].length : pos;
  return { start, end: pos, word: m ? m[0] : '' };
}

function hideAutocomplete() {
  acMatches = [];
  acIndex = -1;
  const box = document.getElementById('autocomplete');
  box.classList.remove('show');
  box.innerHTML = '';
}

function createAcMirror(editor) {
  let mirror = document.getElementById('ac-mirror');
  if (!mirror) {
    mirror = document.createElement('div');
    mirror.id = 'ac-mirror';
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.style.wordWrap = 'break-word';
    mirror.style.top = '0';
    mirror.style.left = '0';
    document.getElementById('editor-wrap').appendChild(mirror);
  }
  const style = getComputedStyle(editor);
  ['fontFamily', 'fontSize', 'lineHeight', 'padding', 'border', 'boxSizing'].forEach((p) => {
    mirror.style[p] = style[p];
  });
  mirror.style.width = editor.clientWidth + 'px';
  return mirror;
}

function getCaretCoords(editor) {
  const mirror = createAcMirror(editor);
  mirror.textContent = editor.value.slice(0, editor.selectionStart);
  const marker = document.createElement('span');
  marker.textContent = '.';
  mirror.appendChild(marker);
  const style = getComputedStyle(editor);
  const mirrorRect = mirror.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();
  const editorRect = editor.getBoundingClientRect();
  const lineHeight = parseFloat(style.lineHeight) || 16;
  return {
    left: markerRect.left - mirrorRect.left,
    top: markerRect.top - mirrorRect.top + lineHeight - editor.scrollTop,
  };
}

function showAutocomplete(matches) {
  acMatches = matches;
  acIndex = 0;
  const box = document.getElementById('autocomplete');
  box.innerHTML = matches
    .map(
      (m, i) =>
        \`<div class="ac-item\${i === 0 ? ' active' : ''}" data-i="\${i}"><span class="ac-kind ac-kind-\${m.kind}">\${m.kind[0].toUpperCase()}</span><span class="ac-text">\${escapeHtml(m.text)}</span></div>\`,
    )
    .join('');
  box.classList.add('show');
  const editor = document.getElementById('editor');
  const coords = getCaretCoords(editor);
  box.style.left = coords.left + 'px';
  box.style.top = coords.top + 'px';
  for (const el of box.querySelectorAll('.ac-item')) {
    el.onmousedown = (e) => {
      e.preventDefault();
      acceptAutocomplete(Number(el.dataset.i));
    };
  }
}

function acceptAutocomplete(index) {
  const editor = document.getElementById('editor');
  const value = editor.value;
  const replacement = acMatches[index].text;
  editor.value = value.slice(0, acStart) + replacement + value.slice(acEnd);
  const cursor = acStart + replacement.length;
  editor.setSelectionRange(cursor, cursor);
  hideAutocomplete();
  editor.focus();
}

function handleEditorInput() {
  const editor = document.getElementById('editor');
  if (activeConnId && tabState.has(activeConnId)) tabState.get(activeConnId).sql = editor.value;
  const { start, end, word } = currentWordRange(editor);
  if (!word) {
    hideAutocomplete();
    return;
  }

  const statements = splitStatements(editor.value);
  const stmt = statementAt(statements, start);
  const analysis = analyzeStatement(stmt.text);

  const beforeCursorInStmt = editor.value.slice(stmt.start, start);
  const tokens = tokenize(maskNonSql(beforeCursorInStmt));
  const position = classifyPosition(tokens);

  const dotIdx = word.lastIndexOf('.');
  let matches;
  if (dotIdx >= 0 && position !== 'table') {
    const prefix = word.slice(0, dotIdx);
    const colPrefix = word.slice(dotIdx + 1);
    const cols = resolveTableColumns(prefix, analysis) ?? [];
    matches = cols
      .filter((c) => c.toLowerCase().startsWith(colPrefix.toLowerCase()))
      .map((c) => ({ text: prefix + '.' + c, kind: 'column' }));
  } else {
    matches = buildCandidates(position, word, analysis, tokens);
  }

  matches = matches.slice(0, 8);
  if (!matches.length) {
    hideAutocomplete();
    return;
  }
  acStart = start;
  acEnd = end;
  showAutocomplete(matches);
}

function handleEditorKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault();
    runQuery();
    return;
  }
  if (!acMatches.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    acIndex = (acIndex + 1) % acMatches.length;
    updateAutocompleteActive();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    acIndex = (acIndex - 1 + acMatches.length) % acMatches.length;
    updateAutocompleteActive();
  } else if (e.key === 'Enter' || e.key === 'Tab') {
    e.preventDefault();
    acceptAutocomplete(acIndex);
  } else if (e.key === 'Escape') {
    hideAutocomplete();
  }
}

function updateAutocompleteActive() {
  const box = document.getElementById('autocomplete');
  const items = box.querySelectorAll('.ac-item');
  items.forEach((el, i) => el.classList.toggle('active', i === acIndex));
}

document.getElementById('editor').addEventListener('input', handleEditorInput);
document.getElementById('editor').addEventListener('keydown', handleEditorKeydown);
document.getElementById('editor').addEventListener('blur', hideAutocomplete);

(function initSidebarResize() {
  const sidebar = document.getElementById('sidebar');
  const resizer = document.getElementById('sidebar-resizer');
  const saved = localStorage.getItem('bdbc.sidebarWidth');
  if (saved) sidebar.style.width = saved + 'px';

  let dragging = false;
  resizer.addEventListener('mousedown', (e) => {
    dragging = true;
    resizer.classList.add('dragging');
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const width = Math.max(160, Math.min(600, e.clientX));
    sidebar.style.width = width + 'px';
  });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    resizer.classList.remove('dragging');
    localStorage.setItem('bdbc.sidebarWidth', parseInt(sidebar.style.width, 10));
  });
})();

loadConnections();
</script>
</body>
</html>
`;
