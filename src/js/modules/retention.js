/**
 * ═══════════════════════════════════════════════
 * MODULE: RETENTION
 * Handles loyalty tiers, churn prevention, rules
 * ═══════════════════════════════════════════════
 */

/**
 * initRetention()
 * Called automatically by app.js on page load.
 */
function initRetention() {
  // TODO: Add retention-specific initialization
  // Examples:
  //   - Sync loyalty data from membership platform
  //   - Load churn risk scores
  //   - Set up win-back campaign triggers
}

/**
 * addLoyaltyTier(tier)
 * Adds a new loyalty tier and re-renders.
 * @param {Object} tier - Tier object matching Store.loyalty schema
 */
function addLoyaltyTier(tier) {
  Store.loyalty.push({ id: Date.now(), ...tier });
  renderLoyalty();
  showToast(`Loyalty tier "${tier.tier}" added`);
}

/**
 * updateTierCount(tierId, count)
 * Updates the member count for a loyalty tier.
 * @param {number} tierId
 * @param {number} count
 */
function updateTierCount(tierId, count) {
  const tier = Store.loyalty.find(t => t.id === tierId);
  if (!tier) return;
  tier.count = count;
  renderLoyalty();
}

/**
 * addRule(rule)
 * Adds a new automation rule and re-renders.
 * @param {Object} rule - Rule object matching Store.rules schema
 */
function addRule(rule) {
  Store.rules.push({ id: Date.now(), status: true, ...rule });
  renderRules();
  showToast(`Rule "${rule.name}" added`);
}

/**
 * removeRule(id)
 * Removes a rule by ID and re-renders.
 * @param {number} id
 */
function removeRule(id) {
  const index = Store.rules.findIndex(r => r.id === id);
  if (index === -1) return;
  const name = Store.rules[index].name;
  Store.rules.splice(index, 1);
  renderRules();
  showToast(`Rule "${name}" removed`);
}

/**
 * getChurnRiskContacts()
 * Returns contacts flagged as churn risk.
 * Customize the churn criteria to match your business logic.
 * @returns {Array}
 */
function getChurnRiskContacts() {
  // TODO: Customize churn risk logic
  // Example: contacts with score < 30 or stage = Churned
  return Store.contacts.filter(c => c.score < 30 || c.stage === 'Churned');
}

/**
 * triggerWinBack(contactId)
 * Triggers a win-back sequence for a contact.
 * Hook this up to your email platform API.
 * @param {number} contactId
 */
function triggerWinBack(contactId) {
  const contact = Store.contacts.find(c => c.id === contactId);
  if (!contact) return;

  // TODO: Call your email/SMS platform API here
  // Example:
  //   fetch('/api/winback', {
  //     method: 'POST',
  //     body: JSON.stringify({ contactId })
  //   });

  showToast(`Win-back triggered for ${contact.name}`);
}

/**
 * scoreContact(contactId, points)
 * Adds or subtracts points from a contact's score.
 * @param {number} contactId
 * @param {number} points - Positive to add, negative to subtract
 */
function scoreContact(contactId, points) {
  const contact = Store.contacts.find(c => c.id === contactId);
  if (!contact) return;
  contact.score = Math.max(0, Math.min(100, (contact.score || 0) + points));
  renderContacts();
}