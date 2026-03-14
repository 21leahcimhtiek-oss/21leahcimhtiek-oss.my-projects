/**
 * ═══════════════════════════════════════════════
 * MODULE: ORCHESTRATION
 * Handles automation workflows, triggers, actions
 * ═══════════════════════════════════════════════
 */

/**
 * initOrchestration()
 * Called automatically by app.js on page load.
 */
function initOrchestration() {
  // TODO: Add orchestration-specific initialization
  // Examples:
  //   - Sync workflows from automation platform (n8n, Make, Zapier)
  //   - Load workflow run history
  //   - Set up real-time run counter
}

/**
 * addWorkflow(workflow)
 * Adds a new automation workflow and re-renders.
 * @param {Object} workflow - Workflow object matching Store.workflows schema
 */
function addWorkflow(workflow) {
  Store.workflows.push({ id: Date.now(), runsTotal: 0, runsToday: 0, status: 'active', ...workflow });
  renderWorkflows();
  showToast(`Workflow "${workflow.name}" created`);
}

/**
 * pauseWorkflow(id)
 * Pauses a workflow by ID.
 */
function pauseWorkflow(id) {
  const wf = Store.workflows.find(w => w.id === id);
  if (!wf) return;
  wf.status = 'paused';
  renderWorkflows();
  showToast(`Workflow "${wf.name}" paused`);
}

/**
 * activateWorkflow(id)
 * Activates a workflow by ID.
 */
function activateWorkflow(id) {
  const wf = Store.workflows.find(w => w.id === id);
  if (!wf) return;
  wf.status = 'active';
  renderWorkflows();
  showToast(`Workflow "${wf.name}" activated`);
}

/**
 * removeWorkflow(id)
 * Removes a workflow by ID.
 */
function removeWorkflow(id) {
  const index = Store.workflows.findIndex(w => w.id === id);
  if (index === -1) return;
  const name = Store.workflows[index].name;
  Store.workflows.splice(index, 1);
  renderWorkflows();
  showToast(`Workflow "${name}" removed`);
}

/**
 * triggerWorkflow(id)
 * Manually triggers a workflow run.
 * Hook this up to your automation platform API.
 * @param {number} id - Workflow ID
 */
function triggerWorkflow(id) {
  const wf = Store.workflows.find(w => w.id === id);
  if (!wf) return;

  // TODO: Call your automation platform API here
  // Example (n8n):
  //   fetch(`https://your-n8n-instance/webhook/${wf.webhookId}`, { method: 'POST' });
  // Example (Make/Zapier):
  //   fetch(wf.webhookUrl, { method: 'POST' });

  wf.runsTotal = (wf.runsTotal || 0) + 1;
  wf.runsToday = (wf.runsToday || 0) + 1;
  renderWorkflows();
  showToast(`Workflow "${wf.name}" triggered`);
}

/**
 * addStepToWorkflow(id, step)
 * Adds a step to an existing workflow.
 * @param {number} id - Workflow ID
 * @param {string} step - Step label (e.g. 'Send SMS')
 */
function addStepToWorkflow(id, step) {
  const wf = Store.workflows.find(w => w.id === id);
  if (!wf) return;
  wf.steps.push(step);
  renderWorkflows();
  showToast(`Step added to "${wf.name}"`);
}

/**
 * getActiveWorkflows()
 * Returns all currently active workflows.
 * @returns {Array}
 */
function getActiveWorkflows() {
  return Store.workflows.filter(w => w.status === 'active');
}

/**
 * getTotalWorkflowRuns()
 * Returns total runs across all workflows.
 * @returns {number}
 */
function getTotalWorkflowRuns() {
  return Store.workflows.reduce((sum, w) => sum + (w.runsTotal || 0), 0);
}

/**
 * addTickerEvent(icon, text)
 * Adds a live event to the ticker bar.
 * @param {string} icon - Emoji icon
 * @param {string} text - Event description
 */
function addTickerEvent(icon, text) {
  Store.tickerItems.unshift({ icon, text });
  if (Store.tickerItems.length > 20) Store.tickerItems.pop(); // cap at 20
  renderTicker();
}

/**
 * addLiveEvent(text, color)
 * Adds a live event to the dashboard event feed.
 * @param {string} text - Event description
 * @param {string} color - Dot color (hex or CSS var)
 */
function addLiveEvent(text, color = 'var(--brand)') {
  Store.events.unshift({
    id:    Date.now(),
    text,
    time:  'Just now',
    color,
  });
  if (Store.events.length > 20) Store.events.pop(); // cap at 20
  renderEventFeed();
  addTickerEvent('🔔', text);
}