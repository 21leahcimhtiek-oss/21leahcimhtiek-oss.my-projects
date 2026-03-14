/**
 * ═══════════════════════════════════════════════
 * MODULE: SALES
 * Handles pipeline, deals, CRM sync
 * ═══════════════════════════════════════════════
 */

/**
 * initSales()
 * Called automatically by app.js on page load.
 */
function initSales() {
  // TODO: Add sales-specific initialization
  // Examples:
  //   - Sync deals from CRM (HubSpot, Salesforce, Pipedrive)
  //   - Load pipeline value totals
  //   - Set up deal activity feed
}

/**
 * addDeal(deal)
 * Adds a new deal to the pipeline and re-renders.
 * @param {Object} deal - Deal object matching Store.deals schema
 */
function addDeal(deal) {
  Store.deals.push({ id: Date.now(), ...deal });
  renderPipeline();
  showToast(`Deal "${deal.name}" added to pipeline`);
}

/**
 * moveDeal(id, newStage)
 * Moves a deal to a new pipeline stage.
 * @param {number} id - Deal ID
 * @param {string} newStage - Target stage name
 */
function moveDeal(id, newStage) {
  const deal = Store.deals.find(d => d.id === id);
  if (!deal) return;
  deal.stage = newStage;
  renderPipeline();
  showToast(`Deal "${deal.name}" moved to ${newStage}`);
}

/**
 * closeDeal(id, won)
 * Marks a deal as Closed Won or Closed Lost.
 * @param {number} id - Deal ID
 * @param {boolean} won - true = Won, false = Lost
 */
function closeDeal(id, won) {
  const deal = Store.deals.find(d => d.id === id);
  if (!deal) return;
  deal.stage = won ? 'Closed Won' : 'Closed Lost';
  renderPipeline();
  showToast(`Deal "${deal.name}" marked as ${won ? 'Won 🎉' : 'Lost'}`);
}

/**
 * getPipelineValue()
 * Returns total value of all open deals.
 * @returns {number}
 */
function getPipelineValue() {
  const openStages = ['Lead', 'Discovery', 'Proposal', 'Negotiation'];
  return Store.deals
    .filter(d => openStages.includes(d.stage))
    .reduce((sum, d) => sum + (d.value || 0), 0);
}

/**
 * getWeightedPipelineValue()
 * Returns probability-weighted pipeline value.
 * @returns {number}
 */
function getWeightedPipelineValue() {
  const openStages = ['Lead', 'Discovery', 'Proposal', 'Negotiation'];
  return Store.deals
    .filter(d => openStages.includes(d.stage))
    .reduce((sum, d) => sum + ((d.value || 0) * (d.probability || 0) / 100), 0);
}

/**
 * updateDealProbability(id, probability)
 * Updates the close probability for a deal.
 * @param {number} id
 * @param {number} probability - 0–100
 */
function updateDealProbability(id, probability) {
  const deal = Store.deals.find(d => d.id === id);
  if (!deal) return;
  deal.probability = Math.min(100, Math.max(0, probability));
  renderPipeline();
}