// src/lib/data.ts
// Single source of truth. All data extracted strictly from resume.pdf.

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  headline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  fullAddress: string;
  resumeSummary: string;
  oneMoreLine: string;
  quote: string;
  github: string;
  linkedin: string;
  resumePath: string;
  cgpa: string;
  degree: string;
  specialization: string;
  university: string;
  graduationDate: string;
  validTill: string;
  department: string;
  idNo: string;
  currentCompany: string;
  currentRole: string;
}

export interface NavItem {
  label: string;
  href: string;
  num: string;
}

export interface Skill {
  num: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Data Science' | 'Web & Backend' | 'Databases' | 'Tools & Cloud' | 'Concepts';
  logoKey: string;
  isBrand: boolean;
  projects: string[];
}

export interface Project {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  uiType: 'chat' | 'bi' | 'pharmacy' | 'rental' | 'sales';
}

export interface Certification {
  id: string;
  index: string;
  title: string;
  issuer: string;
  logoKey: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  place: string;
  detail: string;
  type: 'education' | 'experience' | 'leadership' | 'next';
  badge?: string;
}

export interface Achievement {
  index: string;
  org: string;
  logoKey: string;
  glowColor: string;
  label: string;
  caption: string;
  detail: string;
  value: number;
  valueDisplay: string;
  unit: string;
}

export const PROFILE: Profile = {
  name: "Shahaam Marzook",
  firstName: "SHAHAAM",
  lastName: "MARZOOK",
  role: "Forward Deployment Engineer",
  headline: "Forward Deployment Engineer & Data Scientist.",
  email: "shahaammarzook@gmail.com",
  phone: "+94 76 750 0331",
  phoneHref: "tel:+94767500331",
  location: "Rajagiriya, Sri Lanka",
  fullAddress: "50/26/A, Kreedapitiya Road, Obeysekarapura, Rajagiriya",
  resumeSummary:
    "BSc (Hons) in Information Technology graduate specializing in Data Science, with a CGPA of 3.1/4.0. Passionate about developing and designing technology-driven solutions to real-world problems, with a strong interest in data engineering, data analytics, and AI. Currently working on an Agentic AI-based travel planning project, gaining hands-on experience in building intelligent, data-driven solutions. Eager to apply my technical knowledge, problem-solving skills, and passion for data to contribute to impactful engineering solutions.",
  oneMoreLine:
    "Passionate about developing and designing technology-driven solutions to real-world problems, with a strong interest in data engineering, data analytics, and AI.",
  quote:
    "Applying rigorous technical knowledge and a passion for data to build intelligent, impactful engineering solutions.",
  github: "https://github.com/ShahaamM",
  linkedin: "https://www.linkedin.com/in/shahaam-marzook/",
  resumePath: "/resume.pdf",
  cgpa: "3.1 / 4.0",
  degree: "Bachelors in Information Technology",
  specialization: "Data Science",
  university: "Sri Lanka Institute Of Information Technology",
  graduationDate: "October 2026",
  validTill: "2026",
  department: "Data Science & AI",
  idNo: "DS-2026-SM",
  currentCompany: "Al-Thario",
  currentRole: "Forward Deployment Engineer",
};

export const NAV: NavItem[] = [
  { label: "About", href: "#about", num: "01" },
  { label: "Skills", href: "#skills", num: "02" },
  { label: "Work", href: "#work", num: "03" },
  { label: "Experience", href: "#experience", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

export const SKILL_GROUPS: Skill[] = [
  // Languages
  { num: 1, symbol: "Py", name: "Python", family: "Languages", logoKey: "python", isBrand: true, projects: ["Ask Git", "Agentic AI Project", "HospitalDW"] },
  { num: 2, symbol: "R", name: "R", family: "Languages", logoKey: "r", isBrand: true, projects: ["Data Science Projects"] },
  { num: 3, symbol: "Sq", name: "SQL", family: "Languages", logoKey: "sql", isBrand: true, projects: ["HospitalDW", "RentalPro", "SAD"] },
  { num: 4, symbol: "Jv", name: "Java", family: "Languages", logoKey: "java", isBrand: true, projects: ["Academic Systems"] },
  { num: 5, symbol: "Cs", name: "C#", family: "Languages", logoKey: "csharp", isBrand: true, projects: ["Enterprise Applications"] },
  
  // Data Science
  { num: 6, symbol: "Pd", name: "Pandas", family: "Data Science", logoKey: "pandas", isBrand: true, projects: ["HospitalDW", "SAD Analytics"] },
  { num: 7, symbol: "Np", name: "NumPy", family: "Data Science", logoKey: "numpy", isBrand: true, projects: ["HospitalDW", "ML Pipeline"] },
  { num: 8, symbol: "Sk", name: "Scikit-learn", family: "Data Science", logoKey: "scikitlearn", isBrand: true, projects: ["Predictive Analytics"] },
  { num: 9, symbol: "Mp", name: "Matplotlib", family: "Data Science", logoKey: "matplotlib", isBrand: true, projects: ["Data Visualizations"] },
  { num: 10, symbol: "Sb", name: "Seaborn", family: "Data Science", logoKey: "matplotlib", isBrand: true, projects: ["Statistical Charts"] },
  { num: 11, symbol: "Et", name: "SSIS ETL", family: "Data Science", logoKey: "microsoftsqlserver", isBrand: true, projects: ["HospitalDW Data Pipeline"] },
  { num: 12, symbol: "Ol", name: "OLAP", family: "Data Science", logoKey: "sql", isBrand: false, projects: ["HospitalDW Cube"] },
  { num: 13, symbol: "Rg", name: "RAG", family: "Data Science", logoKey: "langchain", isBrand: false, projects: ["Ask Git"] },
  { num: 14, symbol: "Ai", name: "Agentic AI", family: "Data Science", logoKey: "langchain", isBrand: false, projects: ["Travel Planning Project"] },

  // Web & Backend
  { num: 15, symbol: "Re", name: "React", family: "Web & Backend", logoKey: "react", isBrand: true, projects: ["Ask Git", "KMP Pharmacy", "RentalPro"] },
  { num: 16, symbol: "Nd", name: "Node.js", family: "Web & Backend", logoKey: "nodejs", isBrand: true, projects: ["KMP Pharmacy", "RentalPro"] },
  { num: 17, symbol: "Ex", name: "Express.js", family: "Web & Backend", logoKey: "express", isBrand: true, projects: ["KMP Pharmacy"] },
  { num: 18, symbol: "Fa", name: "FastAPI", family: "Web & Backend", logoKey: "fastapi", isBrand: true, projects: ["Ask Git"] },
  { num: 19, symbol: "Ch", name: "Chart.js", family: "Web & Backend", logoKey: "chartjs", isBrand: true, projects: ["Al-Thario Dashboard"] },

  // Databases
  { num: 20, symbol: "My", name: "MySQL", family: "Databases", logoKey: "mysql", isBrand: true, projects: ["RentalPro"] },
  { num: 21, symbol: "Sl", name: "SQLite", family: "Databases", logoKey: "sqlite", isBrand: true, projects: ["Ask Git Cache"] },
  { num: 22, symbol: "Mg", name: "MongoDB", family: "Databases", logoKey: "mongodb", isBrand: true, projects: ["KMP Pharmacy"] },
  { num: 23, symbol: "Cr", name: "ChromaDB", family: "Databases", logoKey: "chromadb", isBrand: true, projects: ["Ask Git Vector Store"] },
  { num: 24, symbol: "Ss", name: "SQL Server", family: "Databases", logoKey: "microsoftsqlserver", isBrand: true, projects: ["HospitalDW"] },

  // Tools & Cloud
  { num: 25, symbol: "Bi", name: "Power BI", family: "Tools & Cloud", logoKey: "powerbi", isBrand: true, projects: ["HospitalDW", "SAD"] },
  { num: 26, symbol: "Xl", name: "Excel", family: "Tools & Cloud", logoKey: "excel", isBrand: true, projects: ["SAD", "Superstore Analytics"] },
  { num: 27, symbol: "Pp", name: "PowerPoint", family: "Tools & Cloud", logoKey: "powerpoint", isBrand: true, projects: ["Executive Briefings"] },
  { num: 28, symbol: "Lc", name: "LangChain", family: "Tools & Cloud", logoKey: "langchain", isBrand: true, projects: ["Ask Git", "Agentic AI"] },
  { num: 29, symbol: "Az", name: "Azure", family: "Tools & Cloud", logoKey: "azure", isBrand: true, projects: ["Cloud Deployments"] },
  { num: 30, symbol: "Gt", name: "Git", family: "Tools & Cloud", logoKey: "git", isBrand: true, projects: ["Ask Git", "All Projects"] },
  { num: 31, symbol: "Vc", name: "VS Code", family: "Tools & Cloud", logoKey: "vscode", isBrand: true, projects: ["Full Stack Development"] },
  { num: 32, symbol: "Pc", name: "PyCharm", family: "Tools & Cloud", logoKey: "pycharm", isBrand: true, projects: ["Python & AI Development"] },
  { num: 33, symbol: "Jp", name: "Jupyter", family: "Tools & Cloud", logoKey: "jupyter", isBrand: true, projects: ["Data Science Notebooks"] },
  { num: 34, symbol: "Ij", name: "IntelliJ", family: "Tools & Cloud", logoKey: "intellij", isBrand: true, projects: ["Java & Enterprise Dev"] },

  // Concepts
  { num: 35, symbol: "Dw", name: "Data Warehousing", family: "Concepts", logoKey: "microsoftsqlserver", isBrand: false, projects: ["HospitalDW"] },
  { num: 36, symbol: "Ba", name: "Business Analytics", family: "Concepts", logoKey: "powerbi", isBrand: false, projects: ["SAD", "Al-Thario Dashboard"] },
  { num: 37, symbol: "Fd", name: "Forward Deployment", family: "Concepts", logoKey: "git", isBrand: false, projects: ["Al-Thario Operations"] },
  { num: 38, symbol: "Qa", name: "Testing & QA", family: "Concepts", logoKey: "vscode", isBrand: false, projects: ["Al-Thario Support"] },
  { num: 39, symbol: "Sa", name: "System Architecture", family: "Concepts", logoKey: "react", isBrand: false, projects: ["Rental Lifecycle System"] },
  { num: 40, symbol: "Pm", name: "People Management", family: "Concepts", logoKey: "aiesec", isBrand: false, projects: ["AIESEC & IEEE Leadership"] },
];

export const PROJECTS: Project[] = [
  {
    id: "ask-git",
    index: "01",
    kicker: "AI & LangChain / RAG",
    title: "Ask Git: Git Repository Management Tool",
    description: "Ask Git is a tool to chat with any GitHub repository using RAG (Retrieval-Augmented Generation). It indexes codebase architectures and documentation, enabling conversational code navigation.",
    features: [
      "Natural language codebase interrogation",
      "ChromaDB vector embedding store",
      "FastAPI & Uvicorn asynchronous backend",
      "Interactive conversational React UI"
    ],
    tech: ["FastAPI", "Uvicorn", "React", "OpenAI", "LangChain", "ChromaDB"],
    github: null,
    uiType: "chat"
  },
  {
    id: "hospital-dw",
    index: "02",
    kicker: "Data Warehousing & BI",
    title: "HospitalDW: Data Warehousing & BI Solution",
    description: "HospitalDW is a system to store and manage hospital data and create easy-to-understand reports. Used SQL Server and Power BI to track appointments, billing, departments, and overall hospital performance.",
    features: [
      "Enterprise star-schema warehouse model",
      "Automated SSIS ETL data integration",
      "Interactive executive Power BI dashboards",
      "Multi-departmental clinical & billing metrics"
    ],
    tech: ["SQL Server", "Power BI", "Visual Studio", "SSIS ETL", "OLAP"],
    github: null,
    uiType: "bi"
  },
  {
    id: "kmp-pharmacy",
    index: "03",
    kicker: "Full Stack MERN Platform",
    title: "KMP Pharmacy: Pharmacy Management System",
    description: "Developed a personalized Pharmacy Management system to manage pharmaceutical products, maintain product and supplier information, track stock levels, and record sales.",
    features: [
      "Pharmaceutical catalog & inventory audit",
      "Supplier ledger & replenishment tracking",
      "Point-of-sale receipting & sales records",
      "Node & Express authenticated REST APIs"
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    github: null,
    uiType: "pharmacy"
  },
  {
    id: "rental-pro",
    index: "04",
    kicker: "Rental Management Architecture",
    title: "RentalPro: Rental Management System",
    description: "RentalPro is a web-based system to manage rental properties, customers, and rental information.",
    features: [
      "Property directory & tenancy records",
      "Customer booking & schedule manager",
      "Normalized MySQL transactional database",
      "Production deployment via Namecheap"
    ],
    tech: ["React", "Node.js", "MySQL", "Namecheap"],
    github: null,
    uiType: "rental"
  },
  {
    id: "sad",
    index: "05",
    kicker: "Sales Analytics Intelligence",
    title: "SAD: Sales Analytics Dashboard",
    description: "Created a comprehensive dashboard using the Sample Superstore dataset to visualize sales performance and regional trends.",
    features: [
      "Regional sales & margin distribution",
      "Dynamic segment & category filtering",
      "Time-series revenue & seasonal trends",
      "Executive KPI scorecards & visual summaries"
    ],
    tech: ["Power BI", "Excel", "Data Modeling"],
    github: null,
    uiType: "sales"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert-1", index: "01", title: "Power BI for Beginners", issuer: "Simplilearn", logoKey: "simplilearn" },
  { id: "cert-2", index: "02", title: "Data Science Orientation", issuer: "Coursera", logoKey: "coursera" },
  { id: "cert-3", index: "03", title: "Introduction to R", issuer: "Great Learning", logoKey: "greatlearning" },
  { id: "cert-4", index: "04", title: "SQL for Data Science", issuer: "Great Learning", logoKey: "greatlearning" },
  { id: "cert-5", index: "05", title: "Microsoft Azure Essentials", issuer: "Great Learning", logoKey: "greatlearning" },
  { id: "cert-6", index: "06", title: "Python for Beginners", issuer: "University of Moratuwa", logoKey: "sliit" },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "edu-sliit",
    year: "2022 — 2026",
    title: "BSc (Hons) in Information Technology",
    place: "Sri Lanka Institute of Information Technology (SLIIT)",
    detail: "Specializing in Data Science. Achieved a CGPA of 3.1 / 4.0. Core expertise in data engineering, data analytics, predictive modeling, and intelligent AI-driven systems.",
    type: "education",
    badge: "CGPA 3.1 / 4.0"
  },
  {
    id: "lead-sliit-ieee",
    year: "2023 — 2025",
    title: "Executive Committee & Volunteer Leadership",
    place: "Data Science Community, Faculty of Computing & IEEE",
    detail: "Served as Treasurer (Executive Committee) for Data Science Student Community of SLIIT; Committee Member for Faculty of Computing; Lead of Volunteer Management Team for IEEE Student Community.",
    type: "leadership",
    badge: "Treasurer & Team Lead"
  },
  {
    id: "lead-aiesec",
    year: "2024 — 2025",
    title: "Business Manager & International Relations",
    place: "AIESEC in Sri Lanka & AIESEC in SLIIT",
    detail: "Served as Business Manager 2025 for AIESEC in Sri Lanka and International Relations Manager for AIESEC in SLIIT, driving cross-functional collaboration and global partner engagement.",
    type: "leadership",
    badge: "Business Manager 2025"
  },
  {
    id: "exp-al-thario",
    year: "2025 — 2026",
    title: "Forward Deployment Engineer",
    place: "Al-Thario",
    detail: "Architected a comprehensive rental lifecycle system automating operations from customer onboarding to final financial settlements. Built an interactive analytics dashboard featuring real-time data visualizations (utilizing Chart.js/ApexCharts) for revenue trends and material utilization. Performed manual testing and troubleshooting; assisted with application deployment, configuration, and production support.",
    type: "experience",
    badge: "Full Lifecycle Engineering"
  },
  {
    id: "next-role",
    year: "2026 — Beyond",
    title: "Next — Your team?",
    place: "Ready for high-impact deployment",
    detail: "Available for Forward Deployment Engineer, Data Scientist, and AI / Full-Stack Engineering roles to build scalable, mission-critical systems.",
    type: "next"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    index: "01 / 05",
    org: "Academic Excellence",
    logoKey: "sliit",
    glowColor: "rgba(0, 164, 239, 0.2)",
    label: "Degree Standing",
    caption: "BSc (Hons) Information Technology",
    detail: "Specializing in Data Science at SLIIT Malabe",
    value: 3.1,
    valueDisplay: "3.1",
    unit: "CGPA"
  },
  {
    index: "02 / 05",
    org: "Al-Thario Engineering",
    logoKey: "chartjs",
    glowColor: "rgba(255, 99, 132, 0.2)",
    label: "Forward Deployment",
    caption: "Rental Lifecycle System & Analytics",
    detail: "Automated onboarding to settlements with real-time analytics",
    value: 100,
    valueDisplay: "100%",
    unit: "Automated"
  },
  {
    index: "03 / 05",
    org: "Software & BI Systems",
    logoKey: "python",
    glowColor: "rgba(55, 118, 171, 0.2)",
    label: "Engineered Solutions",
    caption: "Production & Academic Platforms",
    detail: "Ask Git, HospitalDW, KMP Pharmacy, RentalPro, SAD",
    value: 5,
    valueDisplay: "05",
    unit: "Systems"
  },
  {
    index: "04 / 05",
    org: "Continuous Learning",
    logoKey: "azure",
    glowColor: "rgba(0, 127, 255, 0.2)",
    label: "Professional Certifications",
    caption: "Simplilearn, Coursera, Great Learning, UoM",
    detail: "Power BI, Azure, SQL Data Science, R, Python",
    value: 6,
    valueDisplay: "06",
    unit: "Certificates"
  },
  {
    index: "05 / 05",
    org: "Community Leadership",
    logoKey: "aiesec",
    glowColor: "rgba(3, 126, 243, 0.2)",
    label: "Executive Offices",
    caption: "AIESEC, IEEE & SLIIT Communities",
    detail: "Business Manager 2025, IR Manager, Treasurer, Lead",
    value: 5,
    valueDisplay: "05",
    unit: "Roles"
  }
];
