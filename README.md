# AutoStack — Marketing Engine

A unified, modular marketing automation engine. Blank template — plug in your campaign data and go.

---

## 📁 File Structure

```
marketing-engine/
├── index.html                      # Main SPA shell — all 12 views
├── styles.css                      # Design system — customize CSS variables
├── src/
│   ├── data/
│   │   └── store.js                # Central data store — all campaign data lives here
│   └── js/
│       ├── app.js                  # Core app — navigation, renders, init
│       └── modules/
│           ├── acquisition.js      # Paid channels, campaign management
│           ├── conversion.js       # A/B tests, funnels, landing pages
│           ├── nurture.js          # Email sequences, drip campaigns
│           ├── sales.js            # Pipeline, deals, CRM sync
│           ├── retention.js        # Loyalty tiers, churn rules
│           ├── analytics.js        # KPIs, attribution, reporting
│           └── orchestration.js    # Automation workflows, triggers
└── README.md
```

---

## 🚀 Quick Start

### 1. Configure your brand
Open `styles.css` and update the CSS variables at the top:

```css
:root {
  --brand:       #6C63FF;   /* Your primary brand color */
  --brand-dark:  #4B44CC;
  --brand-light: #8B85FF;
  --amber:       #F59E0B;   /* Accent color */
}
```

### 2. Add your data
Open `src/data/store.js` and populate each array with your campaign data.
Every array is pre-commented with the expected schema. Example:

```js
contacts: [
  {
    id: 1,
    name: 'Jane Smith',
    email: 'jane@example.com',
    stage: 'Lead',
    score: 72,
    ltv: 1200,
    lastActivity: '2 hrs ago',
    tags: ['google-ads', 'webinar'],
  },
],
```

### 3. Update business info
In `index.html`, update the sidebar placeholders:
```html
<div class="logo-sub"><!-- Business Name --></div>
<div class="user-name"><!-- User Name --></div>
<div class="user-role"><!-- Role --></div>
```

### 4. Serve locally
```bash
python -m http.server 3333
# Open http://localhost:3333
```

---

## 🧩 Modules

| Module | View | Description |
|--------|------|-------------|
| `acquisition.js` | Acquisition | Paid ad channels — Google, Meta, LinkedIn, TikTok, YouTube, Display |
| `conversion.js` | Conversion | A/B tests, funnel tracking, landing pages |
| `nurture.js` | Nurture | Email sequences, drip campaigns, enrollment |
| `sales.js` | Sales Pipeline | Kanban deal pipeline, CRM sync |
| `retention.js` | Retention | Loyalty tiers, churn rules, win-back triggers |
| `analytics.js` | Analytics | KPI scorecard, channel attribution, CSV export |
| `orchestration.js` | Orchestration | Automation workflows, live event feed, ticker |

---

## 📊 Data Store Schema

All data lives in `src/data/store.js` in the global `Store` object. Every array is blank by default with commented schema examples.

| Store Key | Module | Description |
|-----------|--------|-------------|
| `Store.brand` | Global | Business name, color, logo |
| `Store.contacts` | Contacts | CRM contact records |
| `Store.campaigns` | Acquisition | Ad campaign data |
| `Store.sequences` | Nurture | Email sequences |
| `Store.deals` | Sales | Pipeline deals |
| `Store.workflows` | Orchestration | Automation workflows |
| `Store.loyalty` | Retention | Loyalty tier data |
| `Store.rules` | Retention | Automation rules |
| `Store.events` | Dashboard | Live event feed items |
| `Store.channelRevenue` | Analytics | Revenue by channel |
| `Store.kpis` | Analytics | KPI scorecard entries |
| `Store.creatives` | Creatives | Ad creative assets |
| `Store.copyBank` | Copy Bank | Headline/body copy assets |
| `Store.tickerItems` | Dashboard | Ticker bar items |
| `Store.abTests` | Conversion | A/B test results |
| `Store.funnelSteps` | Conversion | Funnel stage data |
| `Store.dashStats` | Dashboard | Stat card values |

---

## 🎨 Theming

Override brand colors per client by updating CSS variables in `styles.css`:

```css
/* Example: Hot pink brand */
--brand:       #FF1B6D;
--brand-dark:  #CC1558;
--brand-light: #FF4D8D;

/* Example: Violet brand */
--brand:       #7C3AED;
--brand-dark:  #5B21B6;
--brand-light: #9F67FF;
```

---

## 🔌 Integrations

Each module has clearly marked `TODO` comments for hooking up real APIs:

- **Ad Platforms**: Google Ads API, Meta Marketing API, LinkedIn Campaign Manager
- **Email**: ActiveCampaign, Klaviyo, Mailchimp, HubSpot
- **CRM**: HubSpot, Salesforce, Pipedrive
- **Automation**: n8n, Make (Integromat), Zapier
- **Analytics**: Google Analytics 4, Mixpanel, Triple Whale

---

## 📐 Views

| View | Nav Label | Description |
|------|-----------|-------------|
| `dashboard` | Dashboard | Stats, revenue chart, campaigns, event feed |
| `contacts` | Contacts | Searchable contact table with scoring |
| `acquisition` | Acquisition | Ad channel cards with budget/performance |
| `conversion` | Conversion | A/B tests, funnel, landing pages |
| `nurture` | Nurture | Email sequences with step visualization |
| `sales` | Sales Pipeline | Kanban board with deal cards |
| `retention` | Retention | Loyalty tiers + automated rules |
| `analytics` | Analytics | KPI scorecard + channel attribution |
| `orchestration` | Orchestration | Workflow builder cards |
| `creatives` | Creatives | Ad creative asset grid |
| `copy` | Copy Bank | Headline/body copy table |

---

## 🛠 Built With

- Vanilla HTML + CSS + JavaScript (zero dependencies)
- CSS custom properties for theming
- Single shared `Store` object as data layer
- Modular JS files per functional area

---

*AutoStack — built by SuperNinja*