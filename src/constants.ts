/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PERSONAL_INFO = {
  name: "Warren, Lim Zhan Feng",
  fullName: "Warren, Lim Zhan Feng",
  email: "warrenlimzf@gmail.com",
  phone: "+65 9454 0155",
  linkedin: "linkedin.com/in/warrenlimzf",
  tagline: "Penultimate Banking and Finance Undergraduate at Nanyang Technological University",
  headshot: "/headshot.jpg",
};

export const EXPERIENCE = [
  {
    company: "Whitman Independent Advisors",
    role: "Wealth Management Assistant",
    duration: "MAY — AUG 2025",
    bullets: [
      "Automated fund factsheet data extraction using Power Automate and AI Builder, reducing manual processing time from 3 minutes to 20 seconds per sheet (89% efficiency gain).",
      "Engineered an Excel VBA tool to automate cross-fund holdings analysis across 200+ unit trusts, slashing manual comparison time by 80% and enhancing visibility into institutional concentration risk."
    ]
  },
  {
    company: "PropNex Malaysia",
    role: "Real Estate Negotiator",
    duration: "JAN — JUL 2024",
    bullets: [
      "Optimized pricing and negotiation strategies for 25+ high-value residential transactions through data-driven market benchmarking.",
      "Identified and MATCHED Airbnb operators with high-potential assets, delivering an 8–12% improvement in projected rental yields."
    ]
  }
];

export const PROJECTS = [
  {
    title: "Acesis Welfare And Reward Drivers (“AWARD”) ETF",
    category: "Champion | Asset Management | EAMC 2026",
    thumbnail: "/acesis-icon.png",
    description: "Architected a 50-stock globally diversified portfolio focused on 'Employee Welfare' (Social Pillar). Recorded 97.1% returns in back-testing, outperforming the MSCI World Social Leaders Index by 6.59% with a 0.94 Sharpe ratio.",
    file: "/acesis-deck.pdf"
  },
  {
    title: "Sunway Healthcare Holdings Berhad (KLSE: SUNMED)",
    category: "Equity Research | Case Study",
    thumbnail: "/sunway-icon.png",
    description: "Initiated SELL recommendation on premium healthcare IPO (RM2.9bn valuation) with 37% downside target. Utilized DCF and scenario modelling to expose margin compression risks from rapid bed capacity expansion and rising staff costs.",
    file: "/sunway-deck.pdf"
  }
];


export const SKILLS = [
  { label: "Technical", items: ["S&P Capital IQ Pro", "Bloomberg Terminal", "Excel VBA", "Intermediate DCF & LBO Modelling"] },
  { label: "Credentials", items: ["FMVA® Certification", "Bloomberg ESG Analysis", "Bloomberg Spreadsheet Specialist"] }
];

export const CERTIFICATES = [
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

export const CASE_COMPETITION = {
  team: "Team Omicron",
  quote: "Grateful for the opportunity to have worked with Team Omicron. Our collective effort resulted in being awarded the top place in the 2026 challenge.",
  images: [
    "/win-1.jpg",
    "/win-2.jpg"
  ]
};


