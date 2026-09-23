/* ------------------------------------------------------------------
   All copy lives here so marketing can edit without touching layout.
   Items marked  // REPLACE  are placeholders that need real data
   (client quotes, article titles, photos) before launch.
------------------------------------------------------------------- */

export const SITE = {
  name: "QWY Software",
  shortName: "QWY",
  url: "https://qwysoft.com",
  tagline: "Intelligent platforms for growth",
  description:
    "QWY Software builds the intelligent core of growing businesses: Odoo ERP implementation, custom web and mobile software, applied AI and dedicated engineering teams, from Technopark, Thiruvananthapuram.",
  email: "reachus@qwysoft.com",
  careersEmail: "careers@qwysoft.com",
  phone: "+91 889 100 1015",
  phoneHref: "tel:+918891001015",
  whatsappHref: "https://wa.me/918891001015",
  address: {
    street: "Floor No 1, Amstor, Technopark Phase 1",
    locality: "Kazhakkoottam, Thiruvananthapuram",
    region: "Kerala",
    postalCode: "695581",
    country: "IN",
  },
  social: [
    // REPLACE with the exact profile URLs
    { label: "LinkedIn", href: "https://www.linkedin.com/company/qwysoft" },
    { label: "Instagram", href: "https://www.instagram.com/qwysoft" },
    { label: "Facebook", href: "https://www.facebook.com/qwysoft" },
  ],
} as const;

/* ---------------- Navigation ---------------- */

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = {
  label: string;
  href?: string;
  columns?: { heading: string; links: NavLink[] }[];
  feature?: { title: string; body: string; href: string; cta: string; image?: { src: string; alt: string; width: number; height: number } };
};

// Mirrors the menu on qwysoft.com. Anchors point at homepage sections until
// dedicated pages exist; swap each href for its page URL (e.g. /services/odoo-implementation).
export const NAV: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    columns: [
      {
        heading: "Odoo ERP",
        links: [
          { label: "Odoo ERP", href: "#solutions", description: "Complete Odoo services" },
          { label: "Odoo Implementation", href: "#solutions" },
          { label: "Odoo Customization", href: "#solutions" },
          { label: "Odoo Migration", href: "#solutions" },
          { label: "Odoo Integration", href: "#solutions" },
          { label: "Odoo Development", href: "#solutions" },
          { label: "Odoo Support", href: "#solutions" },
        ],
      },
      {
        heading: "Custom software",
        links: [
          { label: "Custom Software Solutions", href: "#capabilities", description: "Solutions built around your business" },
        ],
      },
    ],
    feature: {
      title: "Odoo Silver Partner",
      body: "Implementation, customisation, migration and support from a certified Odoo partner in Technopark.",
      href: "#contact",
      cta: "Get a free consultation",
      image: { src: "/brand/odoo-logo.webp", alt: "Odoo Silver Partner", width: 1140, height: 1040 },
    },
  },
  {
    label: "Products",
    columns: [
      {
        heading: "Our products",
        links: [
          { label: "E-commerce", href: "#accelerators" },
          { label: "ERP", href: "#solutions" },
          { label: "DMS", href: "#accelerators" },
          { label: "Qmap", href: "#accelerators" },
        ],
      },
    ],
    feature: {
      title: "Our products",
      body: "Business applications designed to simplify operations.",
      href: "#accelerators",
      cta: "Explore products",
    },
  },
  { label: "Career", href: "/about#careers" },
  { label: "Insights", href: "#resources" },
];

/* ---------------- Hero ---------------- */

// Use \n inside `accent` or `title` to force a line break in the hero headline.
export type HeroSlide = { accent: string; title: string; body: string };

export const HERO = {
  eyebrow: "AI, ERP and custom software from Technopark",
  slides: [
    {
      accent: "Build Smarter",
      title: "Business\nOperations",
      body: "Transform operational data into intelligent business insights with AI-driven analytics, workflow automation, predictive forecasting and smart decision systems that improve efficiency at scale.",
    },
    {
      accent: "Future-Ready",
      title: "Enterprise\nTechnology",
      body: "Enterprise software powered by AI-enabled automation, predictive insights, intelligent workflows and real-time operational analytics, designed to streamline business operations and accelerate growth.",
    },
    {
      accent: "Intelligent\nPlatforms",
      title: "For Growth",
      body: "Build modern business applications with intelligent automation, smart document processing, conversational interfaces, advanced enterprise search and real-time operational visibility.",
    },
    {
      accent: "Smarter ERP.",
      title: "Better\nDecisions.",
      body: "Enhance your ERP ecosystem with AI-powered workflows, automated approvals, predictive forecasting, intelligent reporting and data-driven decision-making across business operations.",
    },
    {
      accent: "Engineering\nIntelligent",
      title: "Business Systems",
      body: "Develop scalable digital platforms that combine intelligent process automation, connected business workflows, operational analytics and AI-driven insights for smarter enterprise management.",
    },
  ] as HeroSlide[],
  primary: { label: "Get a free consultation", href: "#contact" },
  secondary: { label: "See the platform", href: "#platform" },
};

/* ---------------- Trust ---------------- */

export const STATS = [
  { value: 30, suffix: "+", label: "projects delivered" },
  { value: 6, suffix: "+", label: "years building for operations teams" },
  { value: 99, suffix: "%", label: "client satisfaction" },
];

export const INDUSTRIES = [
  "Manufacturing",
  "Retail & E-commerce",
  "Healthcare",
  "Logistics & Delivery",
  "Education",
  "Hospitality",
  "Food & Beverage",
  "Professional Services",
  "Trading",
  "Construction",
];

// Logos live in /public/brand/techs. Django's artwork includes Python.
export const STACK: { name: string; logo: string }[] = [
  { name: "Odoo", logo: "/brand/techs/odoo.png" },
  { name: "Python & Django", logo: "/brand/techs/django.png" },
  { name: "Angular", logo: "/brand/techs/angular.png" },
  { name: "PostgreSQL", logo: "/brand/techs/postgresql.png" },
  { name: "AWS", logo: "/brand/techs/aws.png" },
  { name: "Google Cloud", logo: "/brand/techs/google-cloud.png" },
  { name: "Android", logo: "/brand/techs/android.png" },
  { name: "iOS", logo: "/brand/techs/iOS.png" },
];

/* ---------------- Solutions (Odoo ERP) ---------------- */

export type SolutionKey = "trading" | "manufacturing" | "projects" | "restaurant" | "hr" | "crm" | "ecommerce" | "pos";

export type Solution = {
  key: SolutionKey;
  name: string;
  audience: string;
  body: string;
  modules: string[];
  metric: { value: string; label: string };
};

export const SOLUTIONS: Solution[] = [
  {
    key: "trading",
    name: "Trading & core ERP",
    audience: "Distributors and traders",
    body: "Sales, purchase, inventory and accounting in one place, with real-time visibility across every trading operation.",
    modules: ["Sales", "Purchase", "Inventory", "Accounting"],
    metric: { value: "1 ledger", label: "for every branch and warehouse" },
  },
  {
    key: "manufacturing",
    name: "Manufacturing",
    audience: "Plants and process makers",
    body: "From production planning to resource management: bills of materials, work orders and costing on one integrated system.",
    modules: ["MRP", "Quality", "Maintenance", "PLM"],
    metric: { value: "Live", label: "work-order costing" },
  },
  {
    key: "projects",
    name: "Project management",
    audience: "Services and delivery teams",
    body: "Projects, timesheets and finances in a single platform, so progress, people and project costs stay in control.",
    modules: ["Project", "Timesheets", "Invoicing", "Planning"],
    metric: { value: "Hours to invoice", label: "without re-keying" },
  },
  {
    key: "restaurant",
    name: "Restaurants",
    audience: "Single outlets to chains",
    body: "Billing, inventory, purchase and accounting from one system, so the kitchen and the books agree every night.",
    modules: ["POS", "Kitchen display", "Inventory", "Purchase"],
    metric: { value: "Daily", label: "food-cost variance" },
  },
  {
    key: "hr",
    name: "HR & payroll",
    audience: "People teams",
    body: "Employee records, recruitment, attendance and payroll in a unified system, posted straight to accounting.",
    modules: ["Employees", "Recruitment", "Attendance", "Payroll"],
    metric: { value: "One run", label: "from attendance to payslip" },
  },
  {
    key: "crm",
    name: "CRM",
    audience: "Sales teams",
    body: "Track leads, manage follow-ups and strengthen relationships with a CRM built for sharper sales engagement.",
    modules: ["Pipeline", "Activities", "Quotations", "Reporting"],
    metric: { value: "Every lead", label: "owned and followed up" },
  },
  {
    key: "ecommerce",
    name: "E-commerce",
    audience: "Online brands",
    body: "Run your store end to end, from orders and inventory to accounting, without juggling separate platforms.",
    modules: ["Website", "eCommerce", "Inventory", "Payments"],
    metric: { value: "Zero", label: "spreadsheets between store and stock" },
  },
  {
    key: "pos",
    name: "POS & retail billing",
    audience: "High-volume retail",
    body: "A connected POS, inventory, billing and accounting system built for counters that never slow down.",
    modules: ["POS", "Loyalty", "Inventory", "GST invoicing"],
    metric: { value: "Offline-safe", label: "billing at every counter" },
  },
];

/* ---------------- Accelerators ---------------- */

export type Hue = "peach" | "lavender" | "rose" | "blue" | "zari";

export const ACCELERATORS: { name: string; body: string; weeks: string; hue: Hue }[] = [
  { name: "CRM & HRMS modules", body: "Sales pipelines, people records, attendance and payroll, ready to configure.", weeks: "3–5 weeks", hue: "zari" },
  { name: "E-commerce & subscriptions", body: "Storefront, recurring billing and fulfilment wired to your ERP.", weeks: "6–8 weeks", hue: "peach" },
  { name: "Analytics & BI dashboards", body: "Governed metrics from Odoo and beyond, refreshed in near real time.", weeks: "3–4 weeks", hue: "lavender" },
  { name: "Marketplace frameworks", body: "Multi-vendor catalogue, commissions and payouts out of the box.", weeks: "8–10 weeks", hue: "rose" },
  { name: "Fleet management", body: "Live vehicle tracking, trip costing and hyperlocal delivery routing.", weeks: "5–6 weeks", hue: "blue" },
];

/* ---------------- Enterprise ---------------- */

export const ENTERPRISE = [
  { title: "Security", body: "Role-based access, encryption in transit and at rest, and audit trails on every record that matters." },
  { title: "Your data stays yours", body: "Deploy on your cloud account or ours. Source, schemas and credentials are handed over. No lock-in." },
  { title: "Scalability", body: "Architectures designed for the next order of magnitude, not just go-live day." },
  { title: "Governance", body: "Approval flows, maker-checker controls and change logs that satisfy your auditors." },
  { title: "Reliability", body: "Monitoring, backups and tested recovery, with continuous performance tuning after launch." },
  { title: "Open APIs", body: "REST and JSON-RPC endpoints, webhooks and documented contracts for every system we build." },
];

/* ---------------- Teams ---------------- */

export const TEAMS = [
  {
    key: "solutions",
    label: "Solutions engineering",
    points: [
      { title: "Frontend & backend development", body: "Intuitive interfaces on robust backends: secure, scalable, fast." },
      { title: "Scalable architecture", body: "Flexible systems that absorb growing demand and new integrations." },
      { title: "Performance optimisation", body: "Code, query and infrastructure tuning with continuous monitoring." },
    ],
  },
  {
    key: "qa",
    label: "QA, manual & automation",
    points: [
      { title: "Test strategy", body: "Risk-based plans that cover the flows your revenue depends on." },
      { title: "Automation suites", body: "Regression suites that run on every merge, not the night before release." },
      { title: "UAT support", body: "We sit with your users until sign-off is a formality." },
    ],
  },
  {
    key: "devops",
    label: "DevOps & cloud",
    points: [
      { title: "CI/CD pipelines", body: "Repeatable, reviewed deployments on AWS and Google Cloud." },
      { title: "Observability", body: "Logs, metrics and alerts wired before the first customer arrives." },
      { title: "Cost control", body: "Right-sized infrastructure, reviewed every quarter." },
    ],
  },
  {
    key: "ai",
    label: "AI / ML engineering",
    points: [
      { title: "Forecasting & prediction", body: "Demand, cash-flow and churn models trained on your own history." },
      { title: "Document intelligence", body: "Invoices, POs and forms read, validated and posted automatically." },
      { title: "Conversational interfaces", body: "Ask questions of your operations in plain language, with sources." },
    ],
  },
] as const;

/* ---------------- Engagement models (Pricing) ---------------- */

export const ENGAGEMENTS = [
  {
    name: "Scoped project",
    fit: "You know the outcome you need.",
    body: "Fixed scope, milestones and acceptance criteria. Ideal for Odoo implementations and new applications.",
    includes: ["Discovery workshop", "Fixed milestones", "90-day warranty"],
    featured: false,
  },
  {
    name: "Dedicated team",
    fit: "You have a roadmap, not a single project.",
    body: "Engineers, QA and DevOps working as an extension of your organisation, billed monthly.",
    includes: ["Named team", "Your sprint cadence", "Scale up or down monthly"],
    featured: true,
  },
  {
    name: "Accelerator licence",
    fit: "You want to be live this quarter.",
    body: "Start from a proven platform and customise the last mile to your operation.",
    includes: ["Pre-built modules", "Branded rollout", "Ongoing support plan"],
    featured: false,
  },
];

/* ---------------- Customer story ---------------- */
// REPLACE: use a real, approved client quote and metrics before launch.
export const STORY = {
  quote:
    "We used to close the month in eleven days. Now sales, stock and accounts live in one system. We close in three, and the forecast tells us what to reorder before our stores run out.",
  name: "Client name",
  role: "Head of Operations",
  company: "Multi-store retail group, Kerala",
  metrics: [
    { value: "11 → 3", label: "days to close the month" },
    { value: "38%", label: "fewer stock-outs in two quarters" },
  ],
};

/* ---------- Resources ---------- */
// Latest posts from the Insights page (qwysoft.com). `read` shows the publish date.
// The first item is featured. Covers live in /public/brand/blog. Point `href` at each post once the blog URLs are final.
export const RESOURCES: { kind: string; title: string; read: string; tone: Hue; image: string; href?: string }[] = [
  { kind: "Blog", title: "Integrating Odoo ERP with Custom Applications for Better Business Control", read: "September 18, 2026", tone: "lavender", image: "/brand/blog/1.webp" },
  { kind: "Blog", title: "How AI, ERP and Delivery Automation Together Drive Digital Transformation", read: "September 18, 2026", tone: "rose", image: "/brand/blog/2.webp" },
  { kind: "Blog", title: "Key Features Every Delivery Management Software Should Have", read: "August 31, 2026", tone: "blue", image: "/brand/blog/3.webp" },
  { kind: "Blog", title: "How Hyperlocal Delivery Businesses Can Scale with Technology", read: "August 31, 2026", tone: "peach", image: "/brand/blog/4.webp" },
  { kind: "Blog", title: "How AI Solutions Can Improve Customer Experience and Decision-Making", read: "August 19, 2026", tone: "zari", image: "/brand/blog/5.webp" },
];

/* ---------------- Culture ---------------- */
// Drop real photos into /public/images/life and list them here.
// The gallery only renders when this list is non-empty.
export const LIFE_PHOTOS: { src: string; alt: string }[] = [
  // { src: "/images/life/office-opening.jpg", alt: "Team at the Technopark office opening" },
];

/* ---------------- Footer ---------------- */
// Mixpanel-style footer: four columns, each stacking one or more groups.

export type FooterGroup = { heading: string; links: NavLink[] };

export const FOOTER_COLUMNS: FooterGroup[][] = [
  [
    {
      heading: "Odoo ERP",
      links: [
        { label: "Odoo Implementation", href: "#solutions" },
        { label: "Odoo Customization", href: "#solutions" },
        { label: "Odoo Migration", href: "#solutions" },
        { label: "Odoo Integration", href: "#solutions" },
        { label: "Odoo Development", href: "#solutions" },
        { label: "Odoo Support", href: "#solutions" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Custom Software Solutions", href: "#capabilities" },
        { label: "Applied AI", href: "#capabilities" },
        { label: "Dedicated Technology Teams", href: "#teams" },
      ],
    },
  ],
  [
    {
      heading: "Products",
      links: [
        { label: "E-commerce", href: "#accelerators" },
        { label: "ERP", href: "#solutions" },
        { label: "DMS", href: "#accelerators" },
        { label: "Qmap", href: "#accelerators" },
      ],
    },
    {
      heading: "Platforms",
      links: [
        { label: "Fleet Management System", href: "#accelerators" },
        { label: "Delivery Management System", href: "#accelerators" },
        { label: "E-Commerce Platform", href: "#accelerators" },
        { label: "Pre-built Accelerators", href: "#accelerators" },
      ],
    },
  ],
  [
    {
      heading: "Industries",
      links: [
        { label: "Manufacturing", href: "#solutions" },
        { label: "Retail & E-commerce", href: "#solutions" },
        { label: "Healthcare", href: "#solutions" },
        { label: "Logistics & Delivery", href: "#accelerators" },
        { label: "Education", href: "#solutions" },
        { label: "Hospitality", href: "#solutions" },
        { label: "Food & Beverage", href: "#solutions" },
        { label: "Professional Services", href: "#solutions" },
        { label: "Trading", href: "#solutions" },
        { label: "Construction", href: "#solutions" },
      ],
    },
  ],
  [
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Life at QWY", href: "/about#life" },
        { label: "Career", href: "/about#careers" },
        { label: "Insights", href: "#resources" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
];
