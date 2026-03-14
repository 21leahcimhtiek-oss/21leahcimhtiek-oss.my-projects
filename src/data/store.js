/**
 * ═══════════════════════════════════════════════
 * AUTOSTACK — CENTRAL DATA STORE
 * Blank template — replace all placeholder values
 * ═══════════════════════════════════════════════
 */

const Store = {

  /* ─────────────────────────────────────────
     BRAND / BUSINESS CONFIG
  ───────────────────────────────────────── */
  brand: {
    name:     '<!-- Business Name -->',
    tagline:  '<!-- Tagline -->',
    color:    '#6C63FF',   // CSS var --brand
    logo:     '⚡',
    currency: '$',
    timezone: 'UTC',
  },

  /* ─────────────────────────────────────────
     CONTACTS
     Fields: id, name, email, stage, score, ltv, lastActivity, tags
  ───────────────────────────────────────── */
  contacts: [
    // {
    //   id: 1,
    //   name: 'Jane Smith',
    //   email: 'jane@example.com',
    //   stage: 'Lead',        // Lead | MQL | SQL | Customer | Churned
    //   score: 72,
    //   ltv: 1200,
    //   lastActivity: '2 hrs ago',
    //   tags: ['tag1', 'tag2'],
    // },
  ],

  /* ─────────────────────────────────────────
     CAMPAIGNS (ACQUISITION)
     Fields: id, name, channel, budget, spent, impressions, clicks, conversions, cpa, status
  ───────────────────────────────────────── */
  campaigns: [
    // {
    //   id: 1,
    //   name: 'Campaign Name',
    //   channel: 'Google',     // Google | LinkedIn | Meta | TikTok | YouTube | Display | Email | SMS
    //   budget: 5000,
    //   spent: 3200,
    //   impressions: 120000,
    //   clicks: 3400,
    //   conversions: 87,
    //   cpa: 36.78,
    //   status: 'active',      // active | paused | draft | ended
    // },
  ],

  /* ─────────────────────────────────────────
     EMAIL SEQUENCES (NURTURE)
     Fields: id, name, trigger, steps[], openRate, clickRate, status
  ───────────────────────────────────────── */
  sequences: [
    // {
    //   id: 1,
    //   name: 'Welcome Sequence',
    //   trigger: 'New signup',
    //   steps: ['Day 0: Welcome', 'Day 3: Tutorial', 'Day 7: Check-in'],
    //   openRate: '48%',
    //   clickRate: '12%',
    //   status: 'active',
    // },
  ],

  /* ─────────────────────────────────────────
     DEALS (SALES PIPELINE)
     Fields: id, name, value, stage, owner, closeDate, probability
  ───────────────────────────────────────── */
  deals: [
    // {
    //   id: 1,
    //   name: 'Acme Corp',
    //   value: 12000,
    //   stage: 'Discovery',   // Lead | Discovery | Proposal | Negotiation | Closed Won | Closed Lost
    //   owner: 'Sales Rep',
    //   closeDate: '2026-04-01',
    //   probability: 40,
    // },
  ],

  /* ─────────────────────────────────────────
     AUTOMATION WORKFLOWS (ORCHESTRATION)
     Fields: id, name, trigger, steps[], status, runsTotal, runsToday
  ───────────────────────────────────────── */
  workflows: [
    // {
    //   id: 1,
    //   name: 'Lead Nurture Flow',
    //   trigger: 'Form submit',
    //   steps: ['Tag lead', 'Send email', 'Wait 3d', 'Score +10'],
    //   status: 'active',
    //   runsTotal: 1240,
    //   runsToday: 34,
    // },
  ],

  /* ─────────────────────────────────────────
     LOYALTY TIERS (RETENTION)
     Fields: id, tier, count, benefits[], color
  ───────────────────────────────────────── */
  loyalty: [
    // {
    //   id: 1,
    //   tier: 'Bronze',
    //   count: 320,
    //   benefits: ['Email support', 'Basic reports'],
    //   color: '#CD7F32',
    // },
  ],

  /* ─────────────────────────────────────────
     AUTOMATION RULES (RETENTION)
     Fields: id, name, condition, action, status
  ───────────────────────────────────────── */
  rules: [
    // {
    //   id: 1,
    //   name: 'Churn Risk Alert',
    //   condition: 'No login for 14 days',
    //   action: 'Send win-back email',
    //   status: true,   // true = on, false = off
    // },
  ],

  /* ─────────────────────────────────────────
     LIVE EVENTS (DASHBOARD FEED)
     Fields: id, text, time, color
  ───────────────────────────────────────── */
  events: [
    // {
    //   id: 1,
    //   text: 'New lead signed up via Google Ads',
    //   time: 'Just now',
    //   color: '#10B981',
    // },
  ],

  /* ─────────────────────────────────────────
     CHANNEL REVENUE (DASHBOARD CHART)
     Fields: channel, revenue, color
  ───────────────────────────────────────── */
  channelRevenue: [
    // { channel: 'Google',   revenue: 42000, color: '#4285F4' },
    // { channel: 'LinkedIn', revenue: 28000, color: '#0A66C2' },
    // { channel: 'Meta',     revenue: 21000, color: '#1877F2' },
    // { channel: 'Email',    revenue: 18000, color: '#10B981' },
    // { channel: 'Organic',  revenue: 15000, color: '#6C63FF' },
  ],

  /* ─────────────────────────────────────────
     KPI SCORECARD (ANALYTICS)
     Fields: metric, target, actual, unit, status
  ───────────────────────────────────────── */
  kpis: [
    // {
    //   metric: 'Monthly Revenue',
    //   target: '$50,000',
    //   actual: '$47,200',
    //   unit: '$',
    //   status: 'warning',   // hit | warning | miss
    // },
  ],

  /* ─────────────────────────────────────────
     AD CREATIVES (CREATIVES VIEW)
     Fields: id, name, channel, type, emoji, ctr, status
  ───────────────────────────────────────── */
  creatives: [
    // {
    //   id: 1,
    //   name: 'Hero Banner A',
    //   channel: 'Meta',
    //   type: 'Image',        // Image | Video | Carousel | Story | Text
    //   emoji: '🎯',
    //   ctr: '3.2%',
    //   status: 'active',
    // },
  ],

  /* ─────────────────────────────────────────
     COPY BANK (COPY VIEW)
     Fields: id, asset, type, channel, content, status
  ───────────────────────────────────────── */
  copyBank: [
    // {
    //   id: 1,
    //   asset: 'Headline 1',
    //   type: 'Headline',     // Headline | Description | CTA | Subject | Body | Script
    //   channel: 'Google',
    //   content: 'Automate Your Marketing in Minutes',
    //   status: 'approved',   // approved | draft | testing | paused
    // },
  ],

  /* ─────────────────────────────────────────
     TICKER ITEMS (DASHBOARD TICKER BAR)
     Fields: icon, text
  ───────────────────────────────────────── */
  tickerItems: [
    // { icon: '🟢', text: 'Campaign live' },
    // { icon: '📧', text: 'Email sequence started' },
    // { icon: '💰', text: 'New deal closed' },
  ],

  /* ─────────────────────────────────────────
     A/B TESTS (CONVERSION)
     Fields: id, name, variantA, variantB, winner, lift
  ───────────────────────────────────────── */
  abTests: [
    // {
    //   id: 1,
    //   name: 'Landing Page Hero',
    //   variantA: { label: 'Control',   cvr: '3.2%' },
    //   variantB: { label: 'Variant B', cvr: '4.8%' },
    //   winner: 'B',
    //   lift: '+50%',
    // },
  ],

  /* ─────────────────────────────────────────
     FUNNEL STEPS (CONVERSION)
     Fields: label, value, pct
  ───────────────────────────────────────── */
  funnelSteps: [
    // { label: 'Impressions', value: '120,000', pct: '100%' },
    // { label: 'Clicks',      value: '3,400',   pct: '2.8%'  },
    // { label: 'Leads',       value: '680',      pct: '20%'   },
    // { label: 'MQLs',        value: '204',      pct: '30%'   },
    // { label: 'Customers',   value: '41',       pct: '20%'   },
  ],

  /* ─────────────────────────────────────────
     DASHBOARD STAT CARDS
     Fields: label, value, change, dir
  ───────────────────────────────────────── */
  dashStats: [
    // { label: 'Monthly Revenue', value: '$0',  change: '+0%', dir: 'up' },
    // { label: 'Active Leads',    value: '0',   change: '+0%', dir: 'up' },
    // { label: 'Avg CPA',         value: '$0',  change: '-0%', dir: 'down' },
    // { label: 'Conversion Rate', value: '0%',  change: '+0%', dir: 'up' },
  ],

};