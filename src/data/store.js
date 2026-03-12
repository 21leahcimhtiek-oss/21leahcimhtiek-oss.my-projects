// ============================================================
// UNIFIED DATA STORE — Single source of truth for all 7 apps
// ============================================================

const Store = {
  // ── Contacts / Leads ──────────────────────────────────────
  contacts: [
    { id: 1, name: "Sarah Chen", email: "sarah@techstartup.io", phone: "+1-555-0101", company: "TechStartup", status: "lead", score: 82, tags: ["hot", "saas"], source: "google-ads", created: "2024-01-15", lastActivity: "2024-01-20", spend: 0, revenue: 0, stage: "nurture", emails_opened: 4, emails_clicked: 2 },
    { id: 2, name: "Marcus Webb", email: "marcus@growthhq.com", phone: "+1-555-0102", company: "GrowthHQ", status: "prospect", score: 67, tags: ["warm", "ecom"], source: "facebook-ads", created: "2024-01-12", lastActivity: "2024-01-19", spend: 0, revenue: 2400, stage: "sales", emails_opened: 7, emails_clicked: 5 },
    { id: 3, name: "Priya Patel", email: "priya@scalefast.co", phone: "+1-555-0103", company: "ScaleFast", status: "customer", score: 95, tags: ["vip", "repeat"], source: "organic", created: "2023-12-01", lastActivity: "2024-01-21", spend: 0, revenue: 8900, stage: "retention", emails_opened: 12, emails_clicked: 9 },
    { id: 4, name: "Tyler Brooks", email: "tyler@launchpad.io", phone: "+1-555-0104", company: "LaunchPad", status: "lead", score: 41, tags: ["cold", "saas"], source: "google-ads", created: "2024-01-18", lastActivity: "2024-01-18", spend: 0, revenue: 0, stage: "acquisition", emails_opened: 1, emails_clicked: 0 },
    { id: 5, name: "Zoe Martinez", email: "zoe@brandboost.co", phone: "+1-555-0105", company: "BrandBoost", status: "prospect", score: 74, tags: ["warm", "agency"], source: "tiktok-ads", created: "2024-01-10", lastActivity: "2024-01-20", spend: 0, revenue: 1200, stage: "nurture", emails_opened: 5, emails_clicked: 3 },
    { id: 6, name: "Devon King", email: "devon@pixelforge.dev", phone: "+1-555-0106", company: "PixelForge", status: "customer", score: 88, tags: ["vip", "agency"], source: "referral", created: "2023-11-15", lastActivity: "2024-01-22", spend: 0, revenue: 12600, stage: "retention", emails_opened: 18, emails_clicked: 14 },
    { id: 7, name: "Aisha Johnson", email: "aisha@funnelworks.com", phone: "+1-555-0107", company: "FunnelWorks", status: "lead", score: 55, tags: ["warm", "ecom"], source: "facebook-ads", created: "2024-01-16", lastActivity: "2024-01-19", spend: 0, revenue: 0, stage: "conversion", emails_opened: 2, emails_clicked: 1 },
    { id: 8, name: "Liam Torres", email: "liam@nextlevelco.com", phone: "+1-555-0108", company: "NextLevel Co", status: "prospect", score: 79, tags: ["hot", "saas"], source: "google-ads", created: "2024-01-08", lastActivity: "2024-01-21", spend: 0, revenue: 3600, stage: "sales", emails_opened: 6, emails_clicked: 4 },
  ],

  // ── Campaigns ─────────────────────────────────────────────
  campaigns: [
    { id: 1, name: "Q1 SaaS Blitz", channel: "google", status: "active", budget: 5000, spent: 2840, clicks: 1240, impressions: 48200, conversions: 87, ctr: 2.57, cpc: 2.29, roas: 4.2, startDate: "2024-01-01", endDate: "2024-03-31" },
    { id: 2, name: "Retargeting Wave", channel: "facebook", status: "active", budget: 2000, spent: 1120, clicks: 680, impressions: 22400, conversions: 54, ctr: 3.04, cpc: 1.65, roas: 5.8, startDate: "2024-01-10", endDate: "2024-02-28" },
    { id: 3, name: "TikTok Awareness", channel: "tiktok", status: "paused", budget: 1500, spent: 900, clicks: 2100, impressions: 89000, conversions: 32, ctr: 2.36, cpc: 0.43, roas: 2.1, startDate: "2024-01-05", endDate: "2024-02-15" },
    { id: 4, name: "Brand Launch Push", channel: "google", status: "active", budget: 3000, spent: 1670, clicks: 890, impressions: 31000, conversions: 61, ctr: 2.87, cpc: 1.88, roas: 3.7, startDate: "2024-01-15", endDate: "2024-03-15" },
  ],

  // ── Email Sequences ───────────────────────────────────────
  sequences: [
    { id: 1, name: "Welcome Series", status: "active", subscribers: 1240, emails: 5, openRate: 48.2, clickRate: 12.4, conversionRate: 6.8, revenue: 4200 },
    { id: 2, name: "Abandoned Cart Recovery", status: "active", subscribers: 340, emails: 3, openRate: 62.1, clickRate: 28.7, conversionRate: 18.4, revenue: 8900 },
    { id: 3, name: "Post-Purchase Upsell", status: "active", subscribers: 890, emails: 4, openRate: 55.3, clickRate: 19.2, conversionRate: 11.2, revenue: 6700 },
    { id: 4, name: "Re-Engagement Flow", status: "paused", subscribers: 560, emails: 6, openRate: 28.4, clickRate: 8.1, conversionRate: 3.2, revenue: 1100 },
    { id: 5, name: "Lead Nurture 14-Day", status: "active", subscribers: 2100, emails: 7, openRate: 41.7, clickRate: 15.8, conversionRate: 8.9, revenue: 12400 },
  ],

  // ── CRM Deals ─────────────────────────────────────────────
  deals: [
    { id: 1, contact: "Marcus Webb", company: "GrowthHQ", value: 4800, stage: "proposal", probability: 70, dueDate: "2024-02-01", owner: "You", notes: "Sent proposal Jan 19. Awaiting feedback." },
    { id: 2, contact: "Liam Torres", company: "NextLevel Co", value: 7200, stage: "negotiation", probability: 85, dueDate: "2024-01-28", owner: "You", notes: "Final pricing discussion in progress." },
    { id: 3, contact: "Aisha Johnson", company: "FunnelWorks", value: 2400, stage: "discovery", probability: 40, dueDate: "2024-02-10", owner: "You", notes: "Discovery call scheduled." },
    { id: 4, contact: "Tyler Brooks", company: "LaunchPad", value: 3600, stage: "qualified", probability: 55, dueDate: "2024-02-05", owner: "You", notes: "Qualified via form. Need demo." },
    { id: 5, contact: "Zoe Martinez", company: "BrandBoost", value: 5400, stage: "proposal", probability: 65, dueDate: "2024-01-30", owner: "You", notes: "Custom proposal requested." },
  ],

  // ── Workflows ─────────────────────────────────────────────
  workflows: [
    { id: 1, name: "Lead → Nurture Sequence", trigger: "Form Submitted", actions: ["Add Tag: lead", "Send Welcome Email", "Start 14-Day Nurture", "Notify Sales"], status: "active", runs: 1240, lastRun: "2024-01-22" },
    { id: 2, name: "High Score → Sales Alert", trigger: "Lead Score > 75", actions: ["Tag: hot-lead", "Assign to CRM", "Send Slack Alert", "Create Deal"], status: "active", runs: 87, lastRun: "2024-01-21" },
    { id: 3, name: "Customer Win → Upsell", trigger: "Deal Won", actions: ["Add to Retention List", "Start Post-Purchase Seq", "Add Loyalty Points"], status: "active", runs: 43, lastRun: "2024-01-20" },
    { id: 4, name: "Cart Abandon → Recovery", trigger: "Cart Abandoned", actions: ["Wait 1 hour", "Send Recovery Email 1", "Wait 24h", "Send Recovery Email 2"], status: "active", runs: 340, lastRun: "2024-01-22" },
    { id: 5, name: "Ad Click → Landing Page A/B", trigger: "Ad Click", actions: ["Route 50% to Page A", "Route 50% to Page B", "Track Conversion"], status: "paused", runs: 0, lastRun: "—" },
  ],

  // ── Analytics / Attribution ───────────────────────────────
  analytics: {
    totalRevenue: 142800,
    totalLeads: 1847,
    totalCustomers: 284,
    avgOrderValue: 503,
    cac: 48.20,
    ltv: 2840,
    roas: 4.1,
    funnel: {
      visitors: 48200,
      leads: 1847,
      prospects: 612,
      customers: 284,
    },
    channelAttribution: [
      { channel: "Google Ads", revenue: 58400, leads: 820, roas: 4.2 },
      { channel: "Facebook Ads", revenue: 41200, leads: 540, roas: 5.8 },
      { channel: "TikTok Ads", revenue: 12800, leads: 210, roas: 2.1 },
      { channel: "Organic", revenue: 18600, leads: 180, roas: null },
      { channel: "Referral", revenue: 11800, leads: 97, roas: null },
    ],
    monthlyRevenue: [
      { month: "Aug", revenue: 8200 },
      { month: "Sep", revenue: 11400 },
      { month: "Oct", revenue: 14800 },
      { month: "Nov", revenue: 19200 },
      { month: "Dec", revenue: 24600 },
      { month: "Jan", revenue: 28400 },
    ],
  },

  // ── Loyalty / Retention ───────────────────────────────────
  loyalty: [
    { id: 1, contact: "Priya Patel", points: 4450, tier: "Platinum", totalSpend: 8900, lastPurchase: "2024-01-18", nextReward: "Free month at 5000pts" },
    { id: 2, contact: "Devon King", points: 6300, tier: "Diamond", totalSpend: 12600, lastPurchase: "2024-01-22", nextReward: "VIP Access at 7000pts" },
    { id: 3, contact: "Marcus Webb", points: 1200, tier: "Silver", totalSpend: 2400, lastPurchase: "2024-01-15", nextReward: "10% off at 2000pts" },
    { id: 4, contact: "Zoe Martinez", points: 600, tier: "Bronze", totalSpend: 1200, lastPurchase: "2024-01-10", nextReward: "Free resource at 1000pts" },
    { id: 5, contact: "Liam Torres", points: 1800, tier: "Gold", totalSpend: 3600, lastPurchase: "2024-01-20", nextReward: "Free audit at 2500pts" },
  ],

  // ── Event Bus (cross-app communication) ───────────────────
  events: [
    { id: 1, type: "lead_captured", contact: "Tyler Brooks", source: "landing-page", timestamp: "2024-01-18 09:14", app: "conversion" },
    { id: 2, type: "email_opened", contact: "Sarah Chen", sequence: "Welcome Series", timestamp: "2024-01-20 11:32", app: "nurture" },
    { id: 3, type: "deal_created", contact: "Zoe Martinez", value: 5400, timestamp: "2024-01-20 14:08", app: "sales" },
    { id: 4, type: "ad_conversion", contact: "Liam Torres", campaign: "Q1 SaaS Blitz", timestamp: "2024-01-21 10:22", app: "acquisition" },
    { id: 5, type: "workflow_fired", workflow: "High Score → Sales Alert", contact: "Sarah Chen", timestamp: "2024-01-21 15:45", app: "orchestration" },
    { id: 6, type: "loyalty_points_added", contact: "Priya Patel", points: 450, timestamp: "2024-01-22 08:30", app: "retention" },
  ],
};

export default Store;