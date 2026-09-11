export const profile = {
  name: "Rogie Josue Laura",
  title:
    "Web & Mobile Application Development | Data Entry & AI Evaluation | Web Research | IT",
  tagline:
    "Detail-oriented IT professional combining software development with data management, AI evaluation, and quality assurance.",
  location: "Philippines",
  timezone: "UTC+8 — Philippine Standard Time",
  email: "Rogie.josue.laura.30211111@gmail.com",
  phone: "09294426037",
  resumeUrl: "/resume.docx",
  photoUrl: "/profile.png",
  social: {
    github: "",
    linkedin: "",
  },
  about: [
    "Detail-oriented IT professional and software developer with practical experience in data management, web-based information systems, digital records, database administration, and AI-assisted workflows. Experienced in structured data, spreadsheets, web research, verification, quality checking, and reviewing AI-generated outputs.",
    "Able to work independently, follow detailed instructions, learn new platforms quickly, and deliver accurate and organized results. Combines software development experience with strong attention to detail for data entry, research, AI evaluation, quality assurance, and remote support.",
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
        "Quality Checking",
      ],
    },
    {
      category: "Technical",
      items: [
        "Next.js / React / TypeScript",
        "Flutter",
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
      title: "CFRAME",
      subtitle: "Custodial Facility, Records Admission and Monitoring Ecosystem",
      description:
        "Custodial records, admission, monitoring, and disposition management system for structured facility operations.",
      tech: ["Next.js", "Firebase", "Records Management"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      title: "PRISMS",
      subtitle: "Property & Inventory Records System",
      description:
        "Centralized property and inventory records system with dashboards, audit trails, reporting, and document management.",
      tech: ["React", "Supabase", "PostgreSQL"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      title: "PRO4A COMMAND",
      subtitle: "Operations Monitoring Dashboard",
      description:
        "Centralized operations monitoring dashboard for accomplishments, analytics, and management reporting.",
      tech: ["Next.js", "Dashboard", "Analytics"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      title: "PATROLLERS",
      subtitle: "GPS Activity Tracking System",
      description:
        "GPS-enabled activity tracking and real-time operations monitoring system for field operations.",
      tech: ["JavaScript", "GPS", "Real-time Monitoring"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      title: "Digital Records & Document Tracking",
      subtitle: "Electronic Document Management",
      description:
        "Electronic document tracking, searchable records, digital storage, and administrative reporting platform.",
      tech: ["PHP", "MySQL", "Document Management"],
      liveUrl: "",
      githubUrl: "",
    },
  ],
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
  dataAiCapabilities: [
    "Review structured and unstructured information against defined requirements.",
    "Identify inconsistencies, missing information, formatting issues, and possible factual errors.",
    "Evaluate AI-generated outputs for accuracy, relevance, consistency, logic, and potential hallucinations.",
    "Follow detailed rubrics, compare outputs, organize spreadsheet data, and perform online research and verification.",
  ],
  availability: {
    type: "Part-time / Project-based / Remote",
    roles:
      "Data Entry • AI Evaluation • Web Research • Non-Voice VA • Web & Mobile App Development",
  },
};

export type Profile = typeof profile;
