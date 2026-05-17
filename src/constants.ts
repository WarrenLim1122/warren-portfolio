/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Single source of truth for all portfolio content.
 * Factual values are unchanged from the original; the data model is
 * extended (optional fields) and recruiter-facing framing copy is added.
 */

export interface PersonalInfo {
  name: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  university: string;
  tagline: string;
  /** Recruiter-facing one-liner — Warren may edit freely. */
  valueProp: string;
  availability: string;
  ethos: string;
  headshot: string;
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "Warren, Lim Zhan Feng",
  fullName: "Warren, Lim Zhan Feng",
  email: "warrenlimzf@gmail.com",
  phone: "+65 9454 0155",
  linkedin: "linkedin.com/in/warrenlimzf",
  linkedinUrl: "https://www.linkedin.com/in/warrenlimzf",
  university: "Nanyang Technological University",
  tagline:
    "Penultimate Banking and Finance Undergraduate at Nanyang Technological University",
  valueProp:
    "I model markets, value companies, and automate the analysis behind the call.",
  availability:
    "Open to 2027 graduate analyst programmes in asset management and investment banking.",
  ethos:
    "A finance undergraduate who came to the field with fresh eyes: versatile, open-minded, and driven to understand how capital actually shapes the world.",
  headshot: "/headshot.jpg",
};

/** Strongest proof, surfaced above the fold in the hero. */
export const TRUST_MARKERS = [
  "EAMC 2026 Champion",
  "FMVA® Certified",
  "Bloomberg Specialist",
] as const;

export const ADJECTIVES = ["Technical", "Analytical", "Versatile"] as const;

export interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  /** Pulled out as the big scannable figure (numeric counts up). */
  stat?: { value: string; label: string };
  tools?: string[];
  bullets: string[];
}

// Reverse-chronological — newest first (timeline renders top-down).
export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Pinnacle Capital Asia",
    role: "Investment Intern",
    duration: "MAY to AUG 2026",
    stat: { value: "Buy-side", label: "Investment Analysis" },
    tools: ["Financial Modelling", "Market Research", "Asset Allocation"],
    bullets: [
      "Conduct market and company research, covering financial and industry analysis to identify investment opportunities.",
      "Support the development of investment strategies based on market trends and asset-class performance.",
      "Maintain and update financial models, databases, and analytical tools for investment decision-making.",
      "Prepare presentations, client reports, and internal memos on portfolio performance and market developments.",
    ],
  },
  {
    company: "Whitman Independent Advisors",
    role: "Wealth Management Assistant",
    duration: "MAY to AUG 2025",
    stat: { value: "89%", label: "Efficiency Gain" },
    tools: ["Power Automate", "AI Builder", "Excel VBA"],
    bullets: [
      "Automated fund factsheet data extraction using Power Automate and AI Builder, reducing manual processing time from 3 minutes to 20 seconds per sheet (89% efficiency gain).",
      "Engineered an Excel VBA tool to automate cross-fund holdings analysis across 200+ unit trusts, slashing manual comparison time by 80% and enhancing visibility into institutional concentration risk.",
    ],
  },
  {
    company: "PropNex Malaysia",
    role: "Real Estate Negotiator",
    duration: "JAN to JUL 2024",
    stat: { value: "25+", label: "Transactions Closed" },
    tools: ["Market Benchmarking", "Pricing Strategy", "Yield Analysis"],
    bullets: [
      "Optimized pricing and negotiation strategies for 25+ high-value residential transactions through data-driven market benchmarking.",
      "Identified and matched Airbnb operators with high-potential assets, delivering an 8 to 12% improvement in projected rental yields.",
    ],
  },
];

export interface Project {
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  file: string;
  context: string;
  methodology: string;
  impact: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Acesis Welfare And Reward Drivers (“AWARD”) ETF",
    category: "Champion · Asset Management · EAMC 2026",
    thumbnail: "/acesis-icon.png",
    description:
      "Architected a 50-stock globally diversified portfolio focused on 'Employee Welfare' (Social Pillar). Recorded 97.1% returns in back-testing, outperforming the MSCI World Social Leaders Index by 6.59% with a 0.94 Sharpe ratio.",
    file: "/acesis-deck.pdf",
    context:
      "Built a fund thesis around the social pillar of ESG (employee welfare), a deliberately less-crowded, conviction-led angle for the Eurasia Asset Management Challenge.",
    methodology:
      "Constructed a 50-stock globally diversified portfolio, back-tested against the MSCI World Social Leaders Index, and evaluated risk-adjusted performance.",
    impact:
      "97.1% backtested return · +6.59% vs MSCI World Social Leaders · 0.94 Sharpe",
  },
  {
    title: "Sunway Healthcare Holdings Berhad (KLSE: SUNMED)",
    category: "Equity Research · SELL Initiation",
    thumbnail: "/sunway-icon.png",
    description:
      "Initiated SELL recommendation on premium healthcare IPO (RM2.9bn valuation) with 37% downside target. Utilized DCF and scenario modelling to expose margin compression risks from rapid bed capacity expansion and rising staff costs.",
    file: "/sunway-deck.pdf",
    context:
      "Independent equity research on a premium healthcare IPO carrying a RM2.9bn valuation.",
    methodology:
      "DCF and scenario modelling to stress margin compression from rapid bed-capacity expansion and rising staff costs.",
    impact: "SELL initiation · 37% downside target · DCF + scenario modelling",
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

// Regrouped into recruiter-legible buckets (same demonstrated capability).
export const SKILLS: SkillGroup[] = [
  {
    label: "Valuation & Modelling",
    items: [
      "DCF & LBO Modelling",
      "3-Statement Modelling",
      "Comparable & Scenario Analysis",
      "Equity Research & Initiation",
    ],
  },
  {
    label: "Data & Automation",
    items: [
      "Excel VBA Engineering",
      "Power Automate",
      "Microsoft AI Builder",
      "Google Data Analytics",
    ],
  },
  {
    label: "Platforms & Tools",
    items: [
      "Bloomberg Terminal",
      "S&P Capital IQ Pro",
      "Bloomberg ESG Analysis",
      "Advanced Excel",
    ],
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  file: string;
  image: string;
}

export interface CertificateCategory {
  category: string;
  items: Certificate[];
}

export const CERTIFICATES: CertificateCategory[] = [
  {
    category: "CFI Executive Suite",
    items: [
      { title: "Financial Modeling & Valuation Analysis (FMVA)®", issuer: "Corporate Finance Institute", date: "2026", file: "/fmva-final.pdf", image: "/fmva-final.jpg" },
      { title: "1. Financial Analysis Fundamentals", issuer: "CFI", date: "2025", file: "/cfi-1.pdf", image: "/cfi-1.jpg" },
      { title: "2. Introduction to 3 Statement Modeling", issuer: "CFI", date: "2025", file: "/cfi-2.pdf", image: "/cfi-2.jpg" },
      { title: "3. 3 Statement Modeling", issuer: "CFI", date: "2025", file: "/cfi-3.pdf", image: "/cfi-3.jpg" },
      { title: "4. Auditing and Balancing a 3-Statement Model", issuer: "CFI", date: "2025", file: "/cfi-4.pdf", image: "/cfi-4.jpg" },
      { title: "5. Operational Modeling", issuer: "CFI", date: "2025", file: "/cfi-5.pdf", image: "/cfi-5.jpg" },
      { title: "6. Introduction to Business Valuation", issuer: "CFI", date: "2025", file: "/cfi-6.pdf", image: "/cfi-6.jpg" },
      { title: "7. DCF Valuation Modeling", issuer: "CFI", date: "2025", file: "/cfi-7.pdf", image: "/cfi-7.jpg" },
      { title: "8. Comparable Valuation Fundamentals", issuer: "CFI", date: "2025", file: "/cfi-8.pdf", image: "/cfi-8.jpg" },
      { title: "9. Scenario & Sensitivity Analysis in Excel", issuer: "CFI", date: "2025", file: "/cfi-9.pdf", image: "/cfi-9.jpg" },
      { title: "10. Monthly Cash Flow Modeling", issuer: "CFI", date: "2025", file: "/cfi-10.pdf", image: "/cfi-10.jpg" },
      { title: "11. Budgeting and Forecasting", issuer: "CFI", date: "2025", file: "/cfi-11.pdf", image: "/cfi-11.jpg" },
      { title: "12. Excel Data Visualization & Dashboards", issuer: "CFI", date: "2025", file: "/cfi-12.pdf", image: "/cfi-12.jpg" },
      { title: "13. PowerPoint & Pitchbooks", issuer: "CFI", date: "2025", file: "/cfi-13.pdf", image: "/cfi-13.jpg" },
      { title: "14. Professional Ethics", issuer: "CFI", date: "2025", file: "/cfi-14.pdf", image: "/cfi-14.jpg" },
      { title: "E1. Advanced Excel Formulas & Functions", issuer: "CFI", date: "2025", file: "/cfi-e1.pdf", image: "/cfi-e1.jpg" },
      { title: "E2. Comparable Valuation Analysis", issuer: "CFI", date: "2025", file: "/cfi-e2.pdf", image: "/cfi-e2.jpg" },
      { title: "E3. Corporate & Business Strategy", issuer: "CFI", date: "2025", file: "/cfi-e3.pdf", image: "/cfi-e3.jpg" }
    ]
  },
  {
    category: "Bloomberg Specialist",
    items: [
      { title: "Bloomberg Finance Fundamentals", issuer: "Bloomberg LP", date: "2025", file: "/bloomberg-finance.pdf", image: "/bloomberg-finance.jpg" },
      { title: "Bloomberg ESG Analysis", issuer: "Bloomberg LP", date: "2025", file: "/bloomberg-esg.pdf", image: "/bloomberg-esg.jpg" },
      { title: "Bloomberg Spreadsheet Analysis", issuer: "Bloomberg LP", date: "2025", file: "/bloomberg-excel.pdf", image: "/bloomberg-excel.jpg" },
      { title: "Bloomberg Market Concepts (BMC)", issuer: "Bloomberg LP", date: "2025", file: "/bloomberg-bmc.pdf", image: "/bloomberg-bmc.jpg" }
    ]
  },
  {
    category: "Analytical Skills",
    items: [
      { title: "BAC Excel VBA Workshop Certificate", issuer: "BAC / NTU Banking & Finance", date: "2025", file: "/bac-excel-vba.pdf", image: "/bac-excel-vba.jpg" },
      { title: "Google Data Analytics Professional Certificate", issuer: "Google / Coursera", date: "2024", file: "/google-data-analytics.pdf", image: "/google-data-analytics.jpg" }
    ]
  },
];

/** Title of the headline credential, featured large in the carousel. */
export const FEATURED_CERT_TITLE =
  "Financial Modeling & Valuation Analysis (FMVA)®";

export interface CaseCompetition {
  event: string;
  placement: string;
  teamCount: string;
  team: string;
  pullQuote: string;
  quote: string;
  images: string[];
}

export const CASE_COMPETITION: CaseCompetition = {
  event: "Eurasia Asset Management Challenge 2026",
  placement: "Champions",
  teamCount: "1 of 101 teams",
  team: "Team Omicron",
  pullQuote: "For it is in giving, that we receive.",
  quote:
    "Grateful for the opportunity to have worked with Team Omicron. Our collective effort resulted in being awarded the top place in the 2026 challenge.",
  images: ["/win-1.jpg", "/win-2.jpg"],
};
