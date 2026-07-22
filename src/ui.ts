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
  #toolbar { display: flex; gap: 8px; padding: 8px; border-bottom: 1px solid var(--border); align-items: center; }
  #editor-wrap { position: relative; padding: 8px; }
  #editor { width: 100%; height: 120px; background: var(--bg3); color: var(--text); border: 1px solid var(--border); border-radius: 4px; font-family: var(--mono); font-size: 13px; padding: 8px; resize: vertical; }
  #autocomplete { position: absolute; left: 8px; z-index: 20; background: var(--bg2); border: 1px solid var(--border); border-radius: 4px; max-height: 160px; overflow-y: auto; box-shadow: 0 4px 16px rgba(0,0,0,0.25); display: none; min-width: 200px; }
  #autocomplete.show { display: block; }
  .ac-item { padding: 4px 8px; cursor: pointer; font-family: var(--mono); font-size: 12px; white-space: nowrap; }
  .ac-item:hover, .ac-item.active { background: var(--active-bg); }
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
  table.grid tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
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
    <div id="toolbar">
      <button class="primary" id="run-btn" onclick="runQuery()">Run ▸</button>
      <button class="secondary" id="explain-btn" onclick="runQuery(false, true)">Explain</button>
      <button class="secondary" id="export-btn" onclick="exportCsv()">Export CSV</button>
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
  activeConnId = id;
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
  activeConnId = connId;
  renderConnList();
  const q = \`select * from "\${schema}"."\${name}" limit 100\`;
  document.getElementById('editor').value = q;
  runQuery();
}

async function runQuery(confirm, explain) {
  if (!activeConnId) return;
  hideAutocomplete();
  let sql = document.getElementById('editor').value.trim();
  if (!sql) return;
  if (explain && !/^\\s*explain\\b/i.test(sql)) sql = 'EXPLAIN ' + sql;
  const runBtn = document.getElementById('run-btn');
  runBtn.disabled = true;
  document.getElementById('status').textContent = explain ? 'Explaining…' : 'Running…';
  try {
    const res = await fetch(\`/api/connections/\${activeConnId}/query\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sql, confirm: !!confirm }),
    });
    const body = await res.json();
    if (res.status === 409 && body.needsConfirm) {
      openConfirmModal(body.reason, () => runQuery(true, explain));
      document.getElementById('status').textContent = '';
      return;
    }
    if (!res.ok) throw new Error(body.error || 'Query failed');
    renderResults(body);
    document.getElementById('status').textContent = \`\${body.rows.length} row(s)\`;
  } catch (err) {
    document.getElementById('results-wrap').innerHTML = \`<div class="error-msg">\${escapeHtml(err.message)}</div>\`;
    document.getElementById('status').textContent = '';
  } finally {
    runBtn.disabled = false;
  }
}

function renderResults(result) {
  const wrap = document.getElementById('results-wrap');
  if (!result.columns.length) {
    wrap.innerHTML = \`<div class="empty-state">\${result.command} OK — \${result.rowCount} row(s) affected</div>\`;
    return;
  }
  const table = document.createElement('table');
  table.className = 'grid';
  const thead = document.createElement('tr');
  for (const col of result.columns) {
    const th = document.createElement('th');
    th.textContent = col;
    thead.appendChild(th);
  }
  table.appendChild(thead);
  for (const row of result.rows) {
    const tr = document.createElement('tr');
    for (const cell of row) {
      const td = document.createElement('td');
      if (cell === null || cell === undefined) {
        td.textContent = 'NULL';
        td.className = 'null';
      } else if (typeof cell === 'object') {
        td.textContent = JSON.stringify(cell);
      } else {
        td.textContent = String(cell);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  wrap.innerHTML = '';
  wrap.appendChild(table);
}

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
      throw new Error(body.error || res.statusText);
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

function openConfirmModal(reason, onConfirm) {
  const overlay = document.getElementById('overlay-confirm');
  overlay.innerHTML = \`<div id="overlay" class="show"><div class="modal">
    <h2>Confirm destructive query</h2>
    <p style="font-size:12px;color:var(--text-dim)">\${escapeHtml(reason)}</p>
    <div class="actions">
      <button class="secondary" id="confirm-cancel">Cancel</button>
      <button class="danger" id="confirm-ok">Run anyway</button>
    </div>
  </div></div>\`;
  document.getElementById('confirm-cancel').onclick = () => { overlay.innerHTML = ''; };
  document.getElementById('confirm-ok').onclick = () => { overlay.innerHTML = ''; onConfirm(); };
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
  if (activeConnId === id) {
    activeConnId = null;
    document.getElementById('results-wrap').innerHTML = '<div class="empty-state">Pick a connection to get started.</div>';
  }
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

function tableCandidates() {
  const names = new Set();
  for (const t of cachedTables()) {
    names.add(t.name);
    names.add(t.schema + '.' + t.name);
  }
  return [...names];
}

function columnCandidates() {
  const names = new Set();
  for (const t of cachedTables()) for (const c of t.columns) names.add(c.name);
  return [...names];
}

function findTableInfo(name) {
  const lower = name.toLowerCase();
  return cachedTables().find((t) => t.name.toLowerCase() === lower || (t.schema + '.' + t.name).toLowerCase() === lower) || null;
}

const ALIAS_RE = /\\b(?:from|join)\\s+((?:[\\w]+\\.)?[\\w]+)\\s+(?:as\\s+)?([a-zA-Z_]\\w*)\\b/gi;
const NOT_AN_ALIAS = /^(where|group|order|having|join|on|inner|left|right|full|cross|using|set|values|limit|offset|as)$/i;

function buildAliasMap(sql) {
  const map = {};
  let m;
  ALIAS_RE.lastIndex = 0;
  while ((m = ALIAS_RE.exec(sql))) {
    if (NOT_AN_ALIAS.test(m[2])) continue;
    map[m[2].toLowerCase()] = m[1];
  }
  return map;
}

function resolveTableColumns(prefix, sql) {
  if (!prefix) return null;
  const aliasMap = buildAliasMap(sql);
  const resolved = aliasMap[prefix.toLowerCase()] || prefix;
  const info = findTableInfo(resolved);
  return info ? info.columns.map((c) => c.name) : null;
}

const TABLE_CONTEXT_RE = /\\b(from|join|into|update)\\b/gi;
const COLUMN_CONTEXT_RE = /\\b(select|where|and|or|on|set|by|having|values|when|case)\\b/gi;

function lastMatchEnd(regex, text) {
  regex.lastIndex = 0;
  let m;
  let lastEnd = -1;
  while ((m = regex.exec(text))) lastEnd = regex.lastIndex;
  return lastEnd;
}

function classifyContext(before) {
  const tableEnd = lastMatchEnd(TABLE_CONTEXT_RE, before);
  const columnEnd = lastMatchEnd(COLUMN_CONTEXT_RE, before);
  if (tableEnd === -1 && columnEnd === -1) return 'column';
  return tableEnd > columnEnd ? 'table' : 'column';
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

function showAutocomplete(matches) {
  acMatches = matches;
  acIndex = 0;
  const box = document.getElementById('autocomplete');
  box.innerHTML = matches
    .map((m, i) => \`<div class="ac-item\${i === 0 ? ' active' : ''}" data-i="\${i}">\${escapeHtml(m)}</div>\`)
    .join('');
  box.classList.add('show');
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
  const replacement = acMatches[index];
  editor.value = value.slice(0, acStart) + replacement + value.slice(acEnd);
  const cursor = acStart + replacement.length;
  editor.setSelectionRange(cursor, cursor);
  hideAutocomplete();
  editor.focus();
}

function handleEditorInput() {
  const editor = document.getElementById('editor');
  const { start, end, word } = currentWordRange(editor);
  if (!word) {
    hideAutocomplete();
    return;
  }

  const dotIdx = word.lastIndexOf('.');
  const context = classifyContext(editor.value.slice(0, start));

  let matches;
  if (dotIdx >= 0 && context !== 'table') {
    const prefix = word.slice(0, dotIdx);
    const colPrefix = word.slice(dotIdx + 1);
    const cols = resolveTableColumns(prefix, editor.value) ?? [];
    matches = cols.filter((c) => c.toLowerCase().startsWith(colPrefix.toLowerCase())).map((c) => prefix + '.' + c);
  } else if (context === 'table') {
    matches = tableCandidates().filter((c) => c.toLowerCase().startsWith(word.toLowerCase()));
  } else {
    matches = columnCandidates().filter((c) => c.toLowerCase().startsWith(word.toLowerCase()));
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
