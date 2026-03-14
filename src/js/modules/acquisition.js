/**
 * ═══════════════════════════════════════════════
 * MODULE: ACQUISITION
 * Handles paid ad channels, campaign management
 * ═══════════════════════════════════════════════
 */

/**
 * initAcquisition()
 * Called automatically by app.js on page load.
 * Add any acquisition-specific setup here.
 */
function initAcquisition() {
  // TODO: Add acquisition-specific initialization
  // Examples:
  //   - Fetch live campaign data from ad APIs
  //   - Set up real-time spend tracking
  //   - Initialize channel-specific charts
}

/**
 * refreshCampaigns()
 * Re-fetches and re-renders campaign data.
 * Hook this up to a refresh button or polling interval.
 */
function refreshCampaigns() {
  // TODO: Fetch updated campaign data
  // Example:
  //   fetch('/api/campaigns')
  //     .then(r => r.json())
  //     .then(data => { Store.campaigns = data; renderAdCards(); });
  renderAdCards();
  showToast('Campaigns refreshed');
}

/**
 * pauseCampaign(id)
 * Pauses a campaign by ID.
 */
function pauseCampaign(id) {
  const c = Store.campaigns.find(c => c.id === id);
  if (!c) return;
  c.status = 'paused';
  renderAdCards();
  showToast(`Campaign "${c.name}" paused`);
}

/**
 * activateCampaign(id)
 * Activates a campaign by ID.
 */
function activateCampaign(id) {
  const c = Store.campaigns.find(c => c.id === id);
  if (!c) return;
  c.status = 'active';
  renderAdCards();
  showToast(`Campaign "${c.name}" activated`);
}

/**
 * addCampaign(campaign)
 * Adds a new campaign to the store and re-renders.
 * @param {Object} campaign - Campaign object matching Store.campaigns schema
 */
function addCampaign(campaign) {
  Store.campaigns.push({ id: Date.now(), ...campaign });
  renderAdCards();
  renderDashCampaigns();
  showToast(`Campaign "${campaign.name}" added`);
}