export type Project = {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  overview: string;
  purpose?: string;
  features: string[];
  role: string;
  technology: string[];
  category: "web" | "mobile" | "fullstack" | "saas";
  screenshots?: string[];
  liveUrl?: string;
  githubUrl?: string;
  qrCodeUrl?: string;
  apkDownloadUrl?: string;
  installNote?: string;
};

export const profile = {
  name: "Rogie Josue Laura",
  roleRows: [
    ["Web & Mobile Application Development"],
    ["Data Entry & AI Evaluation", "Web Research"],
    ["IT / Web Development", "QA Evaluation"],
    ["Web & Mobile Application Testing"],
    ["Database Management"],
  ],
  tagline:
    "Detail-oriented IT professional combining software development with data management, AI evaluation, and quality assurance.",
  location: "Philippines",
  timezone: "UTC+8 — Philippine Standard Time",
  email: "Rogie.josue.laura.30211111@gmail.com",
  resumeUrl: "/resume.docx",
  photoUrl: "/profile.png",
  social: {
    linkedin: "",
  },
  about: [
    "Detail-oriented IT professional and software developer with practical experience in data management, web-based information systems, digital records, database administration, and AI-assisted workflows. Experienced in developing custom web and mobile applications, SaaS solutions, database-driven systems, dashboards, and real-time monitoring applications tailored to organizational and operational requirements. Also experienced in structured data, spreadsheets, web research, verification, quality checking, and reviewing AI-generated outputs.",
    "Able to work independently, follow detailed instructions, learn new platforms quickly, and deliver accurate and organized results. Combines software development experience with strong attention to detail for data entry, research, AI evaluation, software and application testing, quality assurance, and remote support.",
  ],
  skills: [
    {
      category: "Data & Operations",
      items: [
        "Data Entry & Processing",
        "Excel / Google Sheets",
        "SEO",
        "Web Research",
        "Data Verification",
        "AI Output Evaluation",
        "Data / Image Annotation",
        "Records Management",
        "Database Management",
        "Quality Checking",
        "Web & Mobile Application Testing",
        "QA Evaluation",
      ],
    },
    {
      category: "Technical",
      items: [
        "Next.js / React / TypeScript",
        "Flutter / Dart",
        "JavaScript / HTML / CSS",
        "Firebase / Firestore",
        "Supabase / PostgreSQL",
        "PHP / MySQL",
        "GitHub / Vercel",
        "Microsoft Office",
      ],
    },
    {
      category: "Strengths",
      items: [
        "Detail-oriented",
        "Accuracy-focused",
        "Organized & consistent",
        "Fast learner",
        "Independent worker",
        "Follows detailed instructions",
      ],
    },
  ],
  projects: [
    {
      id: "pinoy-up",
      title: "Pinoy-Up",
      subtitle: "Forex Scalping SaaS — Mobile App",
      shortDescription:
        "Freemium forex signals app with Supabase auth, PayMongo subscriptions, and broker integration.",
      overview:
        "Pinoy-Up is a mobile-first SaaS platform for forex scalping signals, subscription plans (Free, Basic, Pro), and one-time boosts. Users connect brokers such as OANDA and Vantage, view plan-based technical indicators, and upgrade via GCash, QR Ph, or card through PayMongo. Built as a production-ready freemium product with Supabase backend, edge functions, and Flutter cross-platform client.",
      purpose:
        "Designed to deliver actionable trading signals with tiered access, ad-supported free tier, and monetization through subscriptions and in-app purchases for the Philippine market.",
      features: [
        "Freemium plans: Free, Basic, Pro with tiered indicators",
        "PayMongo checkout — GCash, QR Ph, card (test mode)",
        "Supabase auth with instant signup and profile sync",
        "Boost shop — Pro Pass, Ad-Free, Extra Pair slots",
        "OANDA Practice/Live API integration",
        "Vantage MT4/MT5 via MetaApi",
        "Unity rewarded ads for free-tier unlock",
        "Single-device session guard",
        "Real-time signal cards with blur/ad gate on Free plan",
      ],
      role: "Product design, Supabase schema, PayMongo integration, edge functions, Flutter mobile app, testing, and deployment.",
      technology: [
        "Flutter",
        "Dart",
        "Supabase",
        "PostgreSQL",
        "PayMongo",
        "Edge Functions",
        "OANDA API",
        "MetaApi",
        "Unity Ads",
      ],
      category: "saas",
      screenshots: ["/projects/pinoyup-logo.png"],
      apkDownloadUrl: "/projects/pinoyup-release.apk",
      qrCodeUrl: "/projects/pinoyup-install-qr.png",
      installNote:
        "Android test build. Scan the QR code or tap Download APK. Enable “Install unknown apps” if prompted. iOS coming later via TestFlight.",
    },
    {
      id: "pinoy-stocks",
      title: "PinoyStocks",
      subtitle: "Inventory System with POS — SaaS",
      shortDescription:
        "Cloud-based inventory and point-of-sale platform for product tracking, sales, and store operations.",
      overview:
        "PinoyStocks is a SaaS inventory management system with an integrated point-of-sale (POS) module designed to help businesses track stock levels, process sales, and monitor store activity from a centralized web platform. It combines product catalog management, real-time inventory updates, and checkout workflows in one organized system.",
      purpose:
        "Built to replace manual stock lists and disconnected cash registers with a single digital platform that improves stock accuracy, sales recording, and day-to-day store accountability.",
      features: [
        "Product catalog and SKU management",
        "Stock in / stock out tracking",
        "Low-stock alerts and inventory levels",
        "Integrated POS checkout",
        "Sales transactions and receipts",
        "Daily sales summary and reporting",
        "User roles and access control",
        "Searchable inventory records",
        "Dashboard for store overview",
      ],
      role: "System design, database structure, inventory and POS workflow development, UI implementation, testing, and deployment.",
      technology: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "SaaS",
        "POS",
      ],
      category: "saas",
    },
    {
      id: "cframe",
      title: "CFRAME",
      subtitle:
        "Custodial Facility, Records Admission and Monitoring Ecosystem",
      shortDescription:
        "Web-based custodial records and monitoring system for Persons Under Police Custody (PUPC).",
      overview:
        "CFRAME is a web-based custodial records and monitoring system designed to digitize and centralize the management of Persons Under Police Custody (PUPC). It provides an organized platform for recording admission details, custody information, case-related records, monitoring activities, and release or transfer status.",
      purpose:
        "The system was developed to improve the accuracy, accessibility, accountability, and organization of custodial records while reducing reliance on manual and paper-based processes.",
      features: [
        "PUPC registration and digital profiling",
        "Admission and custody records",
        "Case and offense information",
        "Custodial monitoring",
        "Release and disposition status",
        "Transfer records",
        "Searchable digital records",
        "User access and administrative controls",
        "Records history and monitoring",
        "Dashboard and reporting",
      ],
      role: "System concept development, database and workflow design, UI/UX planning, full-stack development, testing, and implementation.",
      technology: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
      ],
      category: "web",
    },
    {
      id: "prisms",
      title: "PRISMS",
      subtitle: "Property Records Information Support Management System",
      shortDescription:
        "Centralized, QR-enabled property and inventory records management system.",
      overview:
        "PRISMS is a centralized, QR-enabled property and inventory records management system developed to improve the recording, monitoring, inspection, and accountability of organizational assets. The platform consolidates property information into a searchable digital database and provides tools for inventory management, inspection, reporting, and audit activities.",
      features: [
        "Centralized property database",
        "QR-enabled asset identification",
        "Vehicle, firearm, equipment, and facility records",
        "Accountable officer assignment",
        "Inventory and inspection monitoring",
        "Audit trail",
        "Request-for-deletion workflow",
        "Archives and record restoration",
        "Role-based user access",
        "Reports and dashboard analytics",
        "Database backup and restoration",
      ],
      role: "System design, database architecture, workflow development, frontend/backend development, testing, and continuous improvement.",
      technology: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "QR Technology",
      ],
      category: "web",
    },
    {
      id: "pro4a-command",
      title: "PRO4A COMMAND",
      subtitle: "Centralized Operations Monitoring and Management Dashboard",
      shortDescription:
        "Centralized operations monitoring platform for accomplishments, analytics, and decision support.",
      overview:
        "PRO4A COMMAND is a centralized operations monitoring and management platform designed to consolidate operational accomplishments and provide management with timely information for monitoring, analysis, reporting, and decision support. Instead of relying on multiple disconnected reports, authorized units can submit information through a centralized system where data can be consolidated and presented through dashboards and analytical reports.",
      features: [
        "Centralized accomplishment reporting",
        "Unit/station data submission",
        "Operational monitoring dashboard",
        "Consolidated reports",
        "Performance monitoring",
        "Data filtering and analytics",
        "Management-level statistics",
        "Role-based access",
        "Historical records",
        "Decision-support information",
      ],
      role: "Project concept development, system architecture, database design, dashboard development, workflow implementation, testing, and deployment support.",
      technology: [
        "Next.js",
        "React",
        "Firebase",
        "Firestore",
        "Dashboard Analytics",
        "Vercel",
      ],
      category: "web",
    },
    {
      id: "patrollers",
      title: "PATROLLERS",
      subtitle:
        "Police Activity Tracking and Realtime Operations Live Locator and Enhanced Response System",
      shortDescription:
        "Location-enabled operational monitoring platform with real-time patrol visibility and coordinated response support.",
      overview:
        "PATROLLERS is a location-enabled operational monitoring and response platform designed to provide real-time visibility of deployed mobile patrol personnel and support coordinated response operations. The system combines mobile location reporting with a centralized monitoring interface, allowing authorized personnel to view field resources and operational activities through an interactive map.",
      features: [
        "Mobile-based GPS location reporting",
        "Real-time patrol monitoring",
        "Interactive map visualization",
        "Field personnel/location tracking",
        "Operational status monitoring",
        "Alert and response support",
        "Central monitoring dashboard",
        "Mobile-friendly interface",
        "Location data management",
        "Scalable cloud-based architecture",
      ],
      role: "System concept and architecture, mobile/web workflow design, GPS integration, database design, frontend/backend development, testing, and deployment.",
      technology: [
        "JavaScript",
        "Firebase",
        "GPS / Geolocation",
        "Leaflet",
        "Mobile Web",
        "Real-Time Monitoring",
      ],
      category: "fullstack",
    },
    {
      id: "patrollers-mobile",
      title: "PATROLLERS Mobile",
      subtitle: "GPS Field Reporting Mobile Application",
      shortDescription:
        "Mobile app component for real-time GPS location reporting and field patrol operations.",
      overview:
        "PATROLLERS Mobile is the field operations component of the PATROLLERS platform, enabling deployed personnel to report GPS location data in real time from mobile devices. It supports coordinated patrol monitoring, operational visibility, and response workflows through a mobile-first interface connected to the central monitoring dashboard.",
      features: [
        "Real-time GPS location reporting",
        "Mobile patrol status updates",
        "Field personnel location transmission",
        "Operational activity logging",
        "Mobile-friendly responsive interface",
        "Cloud-synced location data",
        "Integration with central monitoring map",
        "Secure authenticated access",
      ],
      role: "Mobile workflow design, GPS integration, UI development, Firebase integration, testing, and deployment support.",
      technology: [
        "Flutter",
        "Dart",
        "Firebase",
        "GPS / Geolocation",
        "Mobile Development",
      ],
      category: "mobile",
    },
    {
      id: "digital-records",
      title: "Digital Records & Document Tracking",
      subtitle: "Electronic Document Management and Tracking Platform",
      shortDescription:
        "Digital records and document tracking solution for organized, searchable electronic workflows.",
      overview:
        "A digital records and document tracking solution designed to transform traditional paper-based document workflows into an organized and searchable electronic records environment. The platform supports document registration, digital storage, tracking, retrieval, and administrative monitoring to improve efficiency and records accountability.",
      features: [
        "Electronic document registration",
        "Digital file storage",
        "Searchable document database",
        "Document tracking",
        "QR-enabled tracking capability",
        "Records categorization",
        "User access management",
        "Status monitoring",
        "Administrative reporting",
        "Document history and audit information",
      ],
      role: "System analysis, workflow design, database development, user-interface development, testing, and implementation.",
      technology: [
        "PHP",
        "MySQL",
        "JavaScript",
        "Document Management",
        "QR Technology",
      ],
      category: "web",
    },
  ] satisfies Project[],
  experience: [
    {
      role: "ICT Project Developer / IT Professional",
      company: "Philippine National Police — PRO CALABARZON, Philippines",
      period: "Present",
      highlights: [
        "Develop and maintain web-based information, monitoring, and records-management systems.",
        "Design databases, dashboards, administrative interfaces, reports, and role-based workflows.",
        "Manage structured records and perform data verification, testing, quality checking, and troubleshooting.",
        "Use Firebase, Supabase, Vercel, GitHub, and related web/cloud technologies.",
        "Use AI-assisted development workflows while personally reviewing, testing, and validating final outputs.",
        "Support automation and digital transformation of manual administrative processes.",
      ],
    },
  ],
  education: [
    {
      period: "2000 — 2002",
      degree: "Associate in Computer Technology",
      school: "Cavite State University Rosario Campus",
    },
    {
      period: "2002 — 2005",
      degree: "BS in Computer Engineering",
      school: "San Sebastian College Recoletos de Cavite",
    },
    {
      period: "2005 — 2009",
      degree: "BS in Computer Science",
      school: "STI College Bacoor",
    },
  ],
  certificates: [
    {
      title: "Basic and Advance Java Programming",
      institution: "Informatics Cavite",
    },
    {
      title: "Computer Ethical Hacking and Penetration Testing",
      institution: "NEXXUS IT Training Center",
    },
    {
      title: "Certified Google IT Support",
      institution: "Coursera",
    },
    {
      title: "Digital Forensic Investigation Course",
      institution: "National Forensic Science Training Institute",
    },
    {
      title: "Introduction to Cyber Crime Investigation",
      institution: "PNP - Anti Cyber Crime Group",
    },
  ],
  dataAiCapabilities: [
    "Review structured and unstructured information against defined requirements.",
    "Identify inconsistencies, missing information, formatting issues, and possible factual errors.",
    "Evaluate AI-generated outputs for accuracy, relevance, consistency, logic, and potential hallucinations.",
    "Follow detailed rubrics, compare outputs, organize spreadsheet data, and perform online research and verification.",
  ],
  availability: {
    type: ["Part-time", "Project-based", "Remote"],
    roleRows: [
      ["Data Entry", "AI Evaluation"],
      ["Web Research", "Database Management"],
      ["Web & Mobile App Development"],
      ["Web & Mobile Application Testing", "QA Evaluation"],
    ],
  },
};

export type Profile = typeof profile;
