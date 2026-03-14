/**
 * ═══════════════════════════════════════════════
 * MODULE: ANALYTICS
 * Handles KPIs, attribution, reporting
 * ═══════════════════════════════════════════════
 */

/**
 * initAnalytics()
 * Called automatically by app.js on page load.
 */
function initAnalytics() {
  // TODO: Add analytics-specific initialization
  // Examples:
  //   - Fetch KPI data from analytics platform (GA4, Mixpanel, etc.)
  //   - Load attribution model data
  //   - Set up auto-refresh intervals
}

/**
 * addKPI(kpi)
 * Adds a new KPI to the scorecard and re-renders.
 * @param {Object} kpi - KPI object matching Store.kpis schema
 */
function addKPI(kpi) {
  Store.kpis.push(kpi);
  renderKPITable();
  showToast(`KPI "${kpi.metric}" added`);
}

/**
 * updateKPI(metric, actual, status)
 * Updates the actual value and status for a KPI.
 * @param {string} metric - KPI metric name
 * @param {string} actual - Actual value (formatted string)
 * @param {string} status - 'hit' | 'warning' | 'miss'
 */
function updateKPI(metric, actual, status) {
  const kpi = Store.kpis.find(k => k.metric === metric);
  if (!kpi) return;
  kpi.actual = actual;
  kpi.status = status;
  renderKPITable();
}

/**
 * updateChannelRevenue(channel, revenue)
 * Updates revenue for a specific channel and re-renders charts.
 * @param {string} channel - Channel name
 * @param {number} revenue - Revenue value
 */
function updateChannelRevenue(channel, revenue) {
  const ch = Store.channelRevenue.find(r => r.channel === channel);
  if (ch) {
    ch.revenue = revenue;
  } else {
    Store.channelRevenue.push({ channel, revenue, color: 'var(--brand)' });
  }
  renderRevenueChart();
  renderAttribution();
}

/**
 * getTotalRevenue()
 * Returns sum of all channel revenues.
 * @returns {number}
 */
function getTotalRevenue() {
  return Store.channelRevenue.reduce((sum, r) => sum + (r.revenue || 0), 0);
}

/**
 * getTopChannel()
 * Returns the highest-revenue channel.
 * @returns {Object|null}
 */
function getTopChannel() {
  if (!Store.channelRevenue.length) return null;
  return Store.channelRevenue.reduce((top, r) => r.revenue > top.revenue ? r : top);
}

/**
 * getKPIScore()
 * Returns the percentage of KPIs with status 'hit'.
 * @returns {string} e.g. '7/10'
 */
function getKPIScore() {
  const hit   = Store.kpis.filter(k => k.status === 'hit').length;
  const total = Store.kpis.length;
  return `${hit}/${total}`;
}

/**
 * exportKPIs()
 * Exports KPI data as a CSV string.
 * @returns {string}
 */
function exportKPIs() {
  const header = 'Metric,Target,Actual,Status\n';
  const rows   = Store.kpis.map(k =>
    `"${k.metric}","${k.target}","${k.actual}","${k.status}"`
  ).join('\n');
  return header + rows;
}

/**
 * downloadKPIReport()
 * Triggers a CSV download of the KPI scorecard.
 */
function downloadKPIReport() {
  const csv  = exportKPIs();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'kpi-report.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('KPI report downloaded');
}