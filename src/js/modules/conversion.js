/**
 * ═══════════════════════════════════════════════
 * MODULE: CONVERSION
 * Handles A/B tests, funnels, landing pages
 * ═══════════════════════════════════════════════
 */

/**
 * initConversion()
 * Called automatically by app.js on page load.
 */
function initConversion() {
  // TODO: Add conversion-specific initialization
  // Examples:
  //   - Load A/B test results from analytics API
  //   - Initialize funnel tracking
  //   - Set up heatmap integrations
}

/**
 * addABTest(test)
 * Adds a new A/B test to the store and re-renders.
 * @param {Object} test - A/B test object matching Store.abTests schema
 */
function addABTest(test) {
  Store.abTests.push({ id: Date.now(), ...test });
  renderABTests();
  showToast(`A/B test "${test.name}" created`);
}

/**
 * declareWinner(testId, variant)
 * Marks a winner for an A/B test.
 * @param {number} testId
 * @param {string} variant - 'A' or 'B'
 */
function declareWinner(testId, variant) {
  const test = Store.abTests.find(t => t.id === testId);
  if (!test) return;
  test.winner = variant;
  renderABTests();
  showToast(`Winner declared: Variant ${variant} for "${test.name}"`);
}

/**
 * updateFunnel(steps)
 * Replaces funnel steps and re-renders.
 * @param {Array} steps - Array of funnel step objects
 */
function updateFunnel(steps) {
  Store.funnelSteps = steps;
  renderFunnel();
}

/**
 * renderLandingPages()
 * Renders landing page previews in the conversion view.
 * Customize this with your actual landing page data.
 */
function renderLandingPages() {
  const el = document.getElementById('landing-pages');
  if (!el) return;

  // TODO: Replace with real landing page data
  el.innerHTML = `
    <div style="color:var(--text-muted);font-size:13px;padding:12px 0;">
      No landing pages configured. Add your landing pages here.
    </div>
  `;

  // Example structure when data is available:
  // el.innerHTML = Store.landingPages.map(p => `
  //   <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);">
  //     <div>
  //       <div style="font-weight:700;">${p.name}</div>
  //       <div style="font-size:12px;color:var(--text-muted);">${p.url}</div>
  //     </div>
  //     <div style="display:flex;gap:16px;font-size:13px;">
  //       <span>CVR: <strong>${p.cvr}</strong></span>
  //       <span>Visits: <strong>${p.visits?.toLocaleString()}</strong></span>
  //     </div>
  //   </div>
  // `).join('');
}

// Run on init
document.addEventListener('DOMContentLoaded', renderLandingPages);