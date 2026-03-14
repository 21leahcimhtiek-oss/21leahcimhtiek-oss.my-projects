/**
 * ═══════════════════════════════════════════════
 * AUTOSTACK — CORE APP
 * Navigation, toast, ticker, dashboard renders
 * ═══════════════════════════════════════════════
 */

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */
function navigate(view) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show selected view
  const el = document.getElementById('view-' + view);
  if (el) el.classList.add('active');

  // Highlight nav item
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick') === `navigate('${view}')`) {
      n.classList.add('active');
    }
  });

  // Update page title
  const titles = {
    dashboard:    'Dashboard',
    contacts:     'Contacts',
    acquisition:  'Acquisition',
    conversion:   'Conversion',
    nurture:      'Nurture',
    sales:        'Sales Pipeline',
    retention:    'Retention',
    analytics:    'Analytics',
    orchestration:'Orchestration',
    creatives:    'Creatives',
    copy:         'Copy Bank',
  };
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = titles[view] || view;
}

/* ─────────────────────────────────────────
   TOAST NOTIFICATION
───────────────────────────────────────── */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ─────────────────────────────────────────
   TICKER BAR
───────────────────────────────────────── */
function renderTicker() {
  const el = document.getElementById('ticker');
  if (!el || !Store.tickerItems.length) return;

  // Duplicate items for seamless loop
  const items = [...Store.tickerItems, ...Store.tickerItems];
  el.innerHTML = items.map(t =>
    `<span class="ticker-item"><span>${t.icon}</span><span>${t.text}</span></span>`
  ).join('');
}

/* ─────────────────────────────────────────
   DASHBOARD — STAT CARDS
───────────────────────────────────────── */
function renderDashStats() {
  const el = document.getElementById('dash-stats');
  if (!el) return;

  if (!Store.dashStats.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">No stats configured. Add data to Store.dashStats</div>';
    return;
  }

  el.innerHTML = Store.dashStats.map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-change ${s.dir}">${s.dir === 'up' ? '▲' : '▼'} ${s.change}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   DASHBOARD — CAMPAIGN LIST
───────────────────────────────────────── */
function renderDashCampaigns() {
  const el = document.getElementById('dash-campaigns');
  if (!el) return;

  if (!Store.campaigns.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No campaigns yet. Add data to Store.campaigns</div>';
    return;
  }

  el.innerHTML = Store.campaigns.slice(0, 5).map(c => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px;">
      <div>
        <div style="font-weight:600;">${c.name}</div>
        <div style="color:var(--text-muted);font-size:11px;">${c.channel}</div>
      </div>
      <span class="badge badge-${c.status === 'active' ? 'green' : c.status === 'paused' ? 'yellow' : 'blue'}">${c.status}</span>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   DASHBOARD — REVENUE CHART
───────────────────────────────────────── */
function renderRevenueChart() {
  const el = document.getElementById('revenue-chart');
  if (!el) return;

  if (!Store.channelRevenue.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No revenue data. Add data to Store.channelRevenue</div>';
    return;
  }

  const max = Math.max(...Store.channelRevenue.map(r => r.revenue));
  el.innerHTML = `<div class="bar-chart">` +
    Store.channelRevenue.map(r => `
      <div class="bar-row">
        <div class="bar-label">${r.channel}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.round(r.revenue / max * 100)}%;background:${r.color || 'var(--brand)'};"></div>
        </div>
        <div class="bar-value">$${(r.revenue / 1000).toFixed(0)}K</div>
      </div>
    `).join('') +
  `</div>`;
}

/* ─────────────────────────────────────────
   DASHBOARD — EVENT FEED
───────────────────────────────────────── */
function renderEventFeed() {
  const el = document.getElementById('event-feed');
  if (!el) return;

  if (!Store.events.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No events yet. Add data to Store.events</div>';
    return;
  }

  el.innerHTML = Store.events.map(e => `
    <div class="event-item">
      <div class="event-dot" style="background:${e.color || 'var(--brand)'}"></div>
      <div>${e.text}</div>
      <div class="event-time">${e.time}</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   CONTACTS
───────────────────────────────────────── */
function renderContacts(data) {
  const body = document.getElementById('contacts-body');
  if (!body) return;

  const list = data || Store.contacts;
  if (!list.length) {
    body.innerHTML = '<tr><td colspan="6" style="color:var(--text-muted);padding:20px;text-align:center;">No contacts yet. Add data to Store.contacts</td></tr>';
    return;
  }

  body.innerHTML = list.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td style="color:var(--text-muted)">${c.email}</td>
      <td><span class="badge badge-${stageColor(c.stage)}">${c.stage}</span></td>
      <td>${c.score}</td>
      <td style="color:var(--green);font-weight:700;">$${c.ltv?.toLocaleString() || 0}</td>
      <td style="color:var(--text-muted)">${c.lastActivity}</td>
    </tr>
  `).join('');
}

function filterContacts(q) {
  const filtered = Store.contacts.filter(c =>
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.email.toLowerCase().includes(q.toLowerCase()) ||
    c.stage.toLowerCase().includes(q.toLowerCase())
  );
  renderContacts(filtered);
}

function stageColor(stage) {
  const map = { Lead: 'blue', MQL: 'yellow', SQL: 'brand', Customer: 'green', Churned: 'red' };
  return map[stage] || 'blue';
}

/* ─────────────────────────────────────────
   ACQUISITION — AD CARDS
───────────────────────────────────────── */
function renderAdCards() {
  const el = document.getElementById('ad-cards');
  if (!el) return;

  if (!Store.campaigns.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No campaigns yet. Add data to Store.campaigns</div>';
    return;
  }

  el.innerHTML = Store.campaigns.map(c => `
    <div class="ad-card">
      <div class="ad-card-header">
        <div class="ad-channel">${c.channel}</div>
        <span class="badge badge-${c.status === 'active' ? 'green' : 'yellow'}">${c.status}</span>
      </div>
      <div style="font-size:13px;font-weight:700;margin-bottom:8px;">${c.name}</div>
      <div class="ad-metric"><span>Budget</span><span>$${c.budget?.toLocaleString()}</span></div>
      <div class="ad-metric"><span>Spent</span><span>$${c.spent?.toLocaleString()}</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, Math.round((c.spent/c.budget)*100))}%"></div></div>
      <div class="ad-metric" style="margin-top:10px;"><span>Impressions</span><span>${c.impressions?.toLocaleString()}</span></div>
      <div class="ad-metric"><span>Clicks</span><span>${c.clicks?.toLocaleString()}</span></div>
      <div class="ad-metric"><span>Conversions</span><span>${c.conversions}</span></div>
      <div class="ad-metric"><span>CPA</span><span>$${c.cpa}</span></div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   CONVERSION — A/B TESTS
───────────────────────────────────────── */
function renderABTests() {
  const el = document.getElementById('ab-tests');
  if (!el) return;

  if (!Store.abTests.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No A/B tests yet. Add data to Store.abTests</div>';
    return;
  }

  el.innerHTML = Store.abTests.map(t => `
    <div style="padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="font-weight:700;margin-bottom:8px;">${t.name}</div>
      <div style="display:flex;gap:12px;font-size:12px;">
        <div style="flex:1;background:var(--bg);border-radius:8px;padding:10px;">
          <div style="color:var(--text-muted);margin-bottom:4px;">Variant A — ${t.variantA.label}</div>
          <div style="font-size:18px;font-weight:800;">${t.variantA.cvr}</div>
        </div>
        <div style="flex:1;background:var(--bg);border-radius:8px;padding:10px;border:1px solid var(--green);">
          <div style="color:var(--green);margin-bottom:4px;">Winner B — ${t.variantB.label}</div>
          <div style="font-size:18px;font-weight:800;color:var(--green);">${t.variantB.cvr}</div>
        </div>
      </div>
      <div style="margin-top:8px;font-size:12px;color:var(--text-muted);">Lift: <strong style="color:var(--green)">${t.lift}</strong></div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   CONVERSION — FUNNEL
───────────────────────────────────────── */
function renderFunnel() {
  const el = document.getElementById('funnel');
  if (!el) return;

  if (!Store.funnelSteps.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No funnel data. Add data to Store.funnelSteps</div>';
    return;
  }

  el.innerHTML = Store.funnelSteps.map(s => `
    <div class="funnel-step">
      <div class="funnel-label">${s.label}</div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="funnel-value">${s.value}</div>
        <div class="funnel-pct">${s.pct}</div>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   NURTURE — SEQUENCES
───────────────────────────────────────── */
function renderSequences() {
  const el = document.getElementById('sequences');
  if (!el) return;

  if (!Store.sequences.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No sequences yet. Add data to Store.sequences</div>';
    return;
  }

  el.innerHTML = Store.sequences.map(s => `
    <div class="sequence-card">
      <div class="sequence-header">
        <div class="sequence-name">${s.name}</div>
        <span class="badge badge-${s.status === 'active' ? 'green' : 'yellow'}">${s.status}</span>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">Trigger: ${s.trigger}</div>
      <div style="display:flex;gap:16px;font-size:12px;margin-bottom:10px;">
        <span>Open Rate: <strong>${s.openRate}</strong></span>
        <span>Click Rate: <strong>${s.clickRate}</strong></span>
      </div>
      <div class="sequence-steps">
        ${s.steps.map(step => `<span class="step-pill">${step}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   SALES — PIPELINE KANBAN
───────────────────────────────────────── */
function renderPipeline() {
  const el = document.getElementById('pipeline');
  if (!el) return;

  const stages = ['Lead', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'];

  if (!Store.deals.length) {
    el.innerHTML = stages.map(stage => `
      <div class="pipeline-col">
        <div class="pipeline-col-title">${stage}</div>
        <div style="color:var(--text-muted);font-size:12px;text-align:center;padding:20px 0;">Empty</div>
      </div>
    `).join('');
    return;
  }

  el.innerHTML = stages.map(stage => {
    const deals = Store.deals.filter(d => d.stage === stage);
    return `
      <div class="pipeline-col">
        <div class="pipeline-col-title">${stage} (${deals.length})</div>
        ${deals.map(d => `
          <div class="deal-card">
            <div class="deal-name">${d.name}</div>
            <div class="deal-value">$${d.value?.toLocaleString()}</div>
            <div class="deal-meta">${d.owner} · ${d.closeDate}</div>
            <div class="deal-meta">${d.probability}% probability</div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

/* ─────────────────────────────────────────
   RETENTION — LOYALTY TIERS
───────────────────────────────────────── */
function renderLoyalty() {
  const el = document.getElementById('loyalty-grid');
  if (!el) return;

  if (!Store.loyalty.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No loyalty tiers. Add data to Store.loyalty</div>';
    return;
  }

  el.innerHTML = `<div class="loyalty-grid">` +
    Store.loyalty.map(t => `
      <div class="loyalty-card">
        <div class="loyalty-tier" style="color:${t.color}">${t.tier}</div>
        <div class="loyalty-count">${t.count?.toLocaleString()}</div>
        <div class="loyalty-label">members</div>
      </div>
    `).join('') +
  `</div>`;
}

/* ─────────────────────────────────────────
   RETENTION — RULES
───────────────────────────────────────── */
function renderRules() {
  const el = document.getElementById('rules');
  if (!el) return;

  if (!Store.rules.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No rules yet. Add data to Store.rules</div>';
    return;
  }

  el.innerHTML = Store.rules.map((r, i) => `
    <div class="rule-row">
      <div>
        <div class="rule-name">${r.name}</div>
        <div class="rule-detail">IF ${r.condition} → THEN ${r.action}</div>
      </div>
      <label class="toggle">
        <input type="checkbox" ${r.status ? 'checked' : ''} onchange="toggleRule(${i}, this.checked)">
        <span class="toggle-slider"></span>
      </label>
    </div>
  `).join('');
}

function toggleRule(index, value) {
  Store.rules[index].status = value;
  showToast(`Rule "${Store.rules[index].name}" ${value ? 'enabled' : 'disabled'}`);
}

/* ─────────────────────────────────────────
   ANALYTICS — KPI TABLE
───────────────────────────────────────── */
function renderKPITable() {
  const body = document.getElementById('kpi-table');
  if (!body) return;

  if (!Store.kpis.length) {
    body.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted);padding:20px;text-align:center;">No KPIs yet. Add data to Store.kpis</td></tr>';
    return;
  }

  body.innerHTML = Store.kpis.map(k => `
    <tr>
      <td><strong>${k.metric}</strong></td>
      <td style="color:var(--text-muted)">${k.target}</td>
      <td style="font-weight:700">${k.actual}</td>
      <td><span class="badge badge-${k.status === 'hit' ? 'green' : k.status === 'warning' ? 'yellow' : 'red'}">
        ${k.status === 'hit' ? '✓ Hit' : k.status === 'warning' ? '⚠ Close' : '✗ Miss'}
      </span></td>
    </tr>
  `).join('');
}

/* ─────────────────────────────────────────
   ANALYTICS — ATTRIBUTION
───────────────────────────────────────── */
function renderAttribution() {
  const el = document.getElementById('attribution');
  if (!el) return;

  if (!Store.channelRevenue.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No attribution data. Add data to Store.channelRevenue</div>';
    return;
  }

  const total = Store.channelRevenue.reduce((s, r) => s + r.revenue, 0);
  el.innerHTML = Store.channelRevenue.map(r => `
    <div class="attr-row">
      <div class="attr-channel">${r.channel}</div>
      <div class="attr-bar">
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.round(r.revenue/total*100)}%;background:${r.color || 'var(--brand)'}"></div></div>
      </div>
      <div class="attr-pct">${Math.round(r.revenue/total*100)}%</div>
      <div class="attr-rev">$${(r.revenue/1000).toFixed(0)}K</div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   ORCHESTRATION — WORKFLOWS
───────────────────────────────────────── */
function renderWorkflows() {
  const el = document.getElementById('workflows');
  if (!el) return;

  if (!Store.workflows.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No workflows yet. Add data to Store.workflows</div>';
    return;
  }

  el.innerHTML = Store.workflows.map(w => `
    <div class="workflow-card">
      <div class="workflow-header">
        <div class="workflow-name">${w.name}</div>
        <span class="badge badge-${w.status === 'active' ? 'green' : 'yellow'}">${w.status}</span>
      </div>
      <div class="workflow-trigger">⚡ Trigger: ${w.trigger}</div>
      <div class="workflow-steps">
        ${w.steps.map((s, i) => `
          ${i > 0 ? '<span class="wf-arrow">→</span>' : ''}
          <span class="wf-step">${s}</span>
        `).join('')}
      </div>
      <div style="display:flex;gap:16px;margin-top:10px;font-size:12px;color:var(--text-muted);">
        <span>Total runs: <strong>${w.runsTotal?.toLocaleString()}</strong></span>
        <span>Today: <strong>${w.runsToday}</strong></span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   CREATIVES
───────────────────────────────────────── */
function renderCreatives() {
  const el = document.getElementById('creatives');
  if (!el) return;

  if (!Store.creatives.length) {
    el.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">No creatives yet. Add data to Store.creatives</div>';
    return;
  }

  el.innerHTML = Store.creatives.map(c => `
    <div class="creative-card">
      <div class="creative-preview">${c.emoji || '🎨'}</div>
      <div class="creative-info">
        <div class="creative-name">${c.name}</div>
        <div class="creative-meta">${c.channel} · ${c.type}</div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;">
          <span style="color:var(--text-muted)">CTR</span>
          <span style="font-weight:700;color:var(--green)">${c.ctr}</span>
        </div>
        <span class="badge badge-${c.status === 'active' ? 'green' : 'yellow'}" style="margin-top:8px;">${c.status}</span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   COPY BANK
───────────────────────────────────────── */
function renderCopyBank() {
  const body = document.getElementById('copy-body');
  if (!body) return;

  if (!Store.copyBank.length) {
    body.innerHTML = '<tr><td colspan="5" style="color:var(--text-muted);padding:20px;text-align:center;">No copy assets yet. Add data to Store.copyBank</td></tr>';
    return;
  }

  body.innerHTML = Store.copyBank.map(c => `
    <tr>
      <td><strong>${c.asset}</strong></td>
      <td><span class="badge badge-brand">${c.type}</span></td>
      <td style="color:var(--text-muted)">${c.channel}</td>
      <td style="max-width:300px;color:var(--text-muted);font-size:12px;">${c.content}</td>
      <td><span class="badge badge-${c.status === 'approved' ? 'green' : c.status === 'testing' ? 'yellow' : 'blue'}">${c.status}</span></td>
    </tr>
  `).join('');
}

/* ─────────────────────────────────────────
   INIT — runs on page load
───────────────────────────────────────── */
function init() {
  renderTicker();
  renderDashStats();
  renderDashCampaigns();
  renderRevenueChart();
  renderEventFeed();
  renderContacts();
  renderAdCards();
  renderABTests();
  renderFunnel();
  renderSequences();
  renderPipeline();
  renderLoyalty();
  renderRules();
  renderKPITable();
  renderAttribution();
  renderWorkflows();
  renderCreatives();
  renderCopyBank();

  // Delegate to module inits if available
  if (typeof initAcquisition  === 'function') initAcquisition();
  if (typeof initConversion   === 'function') initConversion();
  if (typeof initNurture      === 'function') initNurture();
  if (typeof initSales        === 'function') initSales();
  if (typeof initRetention    === 'function') initRetention();
  if (typeof initAnalytics    === 'function') initAnalytics();
  if (typeof initOrchestration=== 'function') initOrchestration();
}

document.addEventListener('DOMContentLoaded', init);