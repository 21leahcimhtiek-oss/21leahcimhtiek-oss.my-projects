/**
 * ═══════════════════════════════════════════════
 * MODULE: NURTURE
 * Handles email sequences, drip campaigns, SMS
 * ═══════════════════════════════════════════════
 */

/**
 * initNurture()
 * Called automatically by app.js on page load.
 */
function initNurture() {
  // TODO: Add nurture-specific initialization
  // Examples:
  //   - Sync sequences from email platform (ActiveCampaign, Klaviyo, etc.)
  //   - Load open/click rate stats
  //   - Set up send schedule display
}

/**
 * addSequence(sequence)
 * Adds a new email sequence to the store and re-renders.
 * @param {Object} sequence - Sequence object matching Store.sequences schema
 */
function addSequence(sequence) {
  Store.sequences.push({ id: Date.now(), ...sequence });
  renderSequences();
  showToast(`Sequence "${sequence.name}" added`);
}

/**
 * pauseSequence(id)
 * Pauses an email sequence by ID.
 */
function pauseSequence(id) {
  const s = Store.sequences.find(s => s.id === id);
  if (!s) return;
  s.status = 'paused';
  renderSequences();
  showToast(`Sequence "${s.name}" paused`);
}

/**
 * activateSequence(id)
 * Activates an email sequence by ID.
 */
function activateSequence(id) {
  const s = Store.sequences.find(s => s.id === id);
  if (!s) return;
  s.status = 'active';
  renderSequences();
  showToast(`Sequence "${s.name}" activated`);
}

/**
 * addStepToSequence(id, step)
 * Adds a step to an existing sequence.
 * @param {number} id - Sequence ID
 * @param {string} step - Step description (e.g. 'Day 7: Follow-up')
 */
function addStepToSequence(id, step) {
  const s = Store.sequences.find(s => s.id === id);
  if (!s) return;
  s.steps.push(step);
  renderSequences();
  showToast(`Step added to "${s.name}"`);
}

/**
 * enrollContact(contactId, sequenceId)
 * Enrolls a contact in an email sequence.
 * Hook this up to your email platform API.
 * @param {number} contactId
 * @param {number} sequenceId
 */
function enrollContact(contactId, sequenceId) {
  const contact  = Store.contacts.find(c => c.id === contactId);
  const sequence = Store.sequences.find(s => s.id === sequenceId);
  if (!contact || !sequence) return;

  // TODO: Call your email platform API here
  // Example:
  //   fetch('/api/sequences/enroll', {
  //     method: 'POST',
  //     body: JSON.stringify({ contactId, sequenceId })
  //   });

  showToast(`${contact.name} enrolled in "${sequence.name}"`);
}