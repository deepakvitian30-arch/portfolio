export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  category: string;
  status: 'Deployed Live' | 'Completed' | 'Prototype' | 'Campus Initiative';
  techStack: string[];
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  images?: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillGroup {
  tier: 'Intermediate' | 'Beginner' | 'Applied Experience';
  description: string;
  skills: { name: string; focus: string; icon?: string }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Leadership' | 'Certification' | 'Technical Workshop';
  description: string;
  highlight: string;
}

export const PERSONAL_INFO = {
  name: "Deepak Subramaniam",
  role: "Aspiring Full-Stack Developer | IT Student at VIT Vellore",
  headline: "Building ideas into digital experiences.",
  supportingText: "I'm a first-year Information Technology student exploring full-stack development, intelligent systems, and creative web experiences. I build practical projects that solve real problems.",
  institution: "Vellore Institute of Technology (VIT), Vellore",
  program: "B.Tech in Information Technology",
  year: "First-Year Undergraduate (Class of 2030)",
  location: "Vellore, Tamil Nadu, India",
  aboutBio: "I am a first-year IT student at VIT Vellore with an intense curiosity for how digital systems work end-to-end. My journey centers on writing clean code, understanding distributed backend architectures, and crafting responsive, intuitive user interfaces. Rather than theoretical exercises, I prioritize building functional applications—from clinical decision-support concepts to campus logistics pipelines. When I am not debugging or shipping code, I participate in hackathons, explore emerging technologies, and collaborate with peer developers.",
  socials: {
    github: "https://github.com/deepakvitian30-arch",
    linkedin: "https://linkedin.com/in/deepak-subramaniam-97b615421",
    email: "deepakvitian30@gmail.com"
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "dosesense",
    title: "DoseSense",
    tagline: "Healthcare Decision-Support & Non-Adherence Risk Intelligence",
    badge: "HackGrid 2026 Shortlisted",
    category: "Healthcare Decision Support / Full-Stack",
    status: "Deployed Live",
    techStack: ["React", "Python", "FastAPI", "SQL", "Tailwind CSS"],
    overview: "A healthcare decision-support system designed to identify possible medication non-adherence patterns and prioritize high-risk cases for clinician review without directly querying the patient.",
    problem: "Patients frequently hesitate to admit missed dosages during doctor consultations due to reporting bias or fear of judgment, leading to preventable complications and delayed medical interventions.",
    solution: "Analyzes non-intrusive behavioral timeline indicators—such as prescription refill intervals, clinic check-in cadences, and vital trends—to compute transparent risk indices for care teams.",
    highlights: [
      "Dynamic patient risk queue with explainable contributing indicators",
      "Interactive multi-signal timeline comparing prescribed regimens against observed intervals",
      "FastAPI backend microservice evaluating signal deviation in real time",
      "Relational SQL schema tracking cohorts, prescriptions, and physician reviews"
    ],
    githubUrl: "https://github.com/deepakvitian30-arch",
    liveUrl: "https://dosesense.onrender.com",
    images: [
      "/assets/chart_signals.png",
      "/assets/chart_metrics_comparison.png",
      "/assets/chart_pr_curve.png"
    ],
    metrics: [
      { label: "Signal Modeling", value: "Multi-Source Timeline" },
      { label: "Inquiry Paradigm", value: "Zero Direct Survey" },
      { label: "Role", value: "Clinical Decision Support" }
    ]
  },
  {
    id: "vitidy",
    title: "VITidy",
    tagline: "Hostel Operations & Cleaning Management Portal",
    badge: "Campus Infrastructure Initiative",
    category: "Operations Management / Full-Stack",
    status: "Deployed Live",
    techStack: ["React 18", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
    overview: "A structured hostel cleaning coordination platform designed to organize student cleaning requests and streamline housekeeping management across residential hostel blocks.",
    problem: "Hostel requests across thousands of residents traditionally rely on chaotic informal WhatsApp groups and physical logs, causing missed requests, lack of status tracking, and chaotic staff routing.",
    solution: "A role-based web platform with database-enforced room authentication where students submit categorized tickets (washroom, washbasin, room maintenance) on a first-come, first-served queue.",
    highlights: [
      "Database-enforced room isolation preventing student spoofing across blocks",
      "First-come, first-served queue prioritizing urgent clogs and routine maintenance",
      "Role-Based Access Control (Admin, Staff, and Student accounts)",
      "JWT-authenticated sessions with persistent PostgreSQL + Prisma schema"
    ],
    githubUrl: "https://github.com/deepakvitian30-arch",
    liveUrl: "https://grand-strudel-4b5b74.netlify.app"
  },
  {
    id: "ennaval",
    title: "ENNAVAL",
    tagline: "Haute Couture & Beauty Luxury Digital Experience",
    badge: "Production Client Web Experience",
    category: "3D E-Commerce / Creative Web",
    status: "Completed",
    techStack: ["Three.js", "WebGL", "React", "Vite", "Tailwind CSS", "Lucide React"],
    overview: "A completed luxury boutique website created for founders Pavithran & Nandhini, curating handcrafted silk sarees, bridal ethnic ensembles, and botanical beauty collections through an editorial high-fashion aesthetic.",
    problem: "Standard e-commerce catalog templates fail to capture the lustrous texture, fluid drape, and heritage exclusivity required by high-end South Indian handloom couture.",
    solution: "Engineered an interactive 3D WebGL fabric simulation capturing dynamic silk sheen, an interactive gold particle field, a curated 34-collection taxonomy, and instant WhatsApp concierge purchasing.",
    highlights: [
      "Interactive Three.js WebGL silk drape simulation with vertex deformation",
      "Silk-shimmer hover effect capturing gold zari thread specular highlights",
      "Comprehensive 34 luxury collections taxonomy across sarees, ethnic, and cosmetics",
      "Instant WhatsApp concierge order checkout compiling itemized inquiries"
    ],
    githubUrl: "https://github.com/deepakvitian30-arch/ennaval",
    liveUrl: "https://ennaval.vercel.app"
  },
  {
    id: "parking",
    title: "Parking Management System",
    tagline: "Automated Vehicle Bay Allocation & Tariff Engine Prototype",
    badge: "Academic Systems Prototype",
    category: "Systems Engineering / Prototype",
    status: "Prototype",
    techStack: ["Python", "HTML5", "CSS3", "JavaScript", "SQLite"],
    overview: "A transport operations prototype built to model dynamic vehicle bay allocation, live slot tracking, and duration-based tariff calculations across multiple vehicle classifications.",
    problem: "Manual parking token systems cause severe vehicular congestion, allocation delays, and billing discrepancies in busy multi-tier parking garages.",
    solution: "A digital slot allocation station featuring automated nearest-bay assignment, real-time occupancy monitoring, and verified prototype tariff calculations.",
    highlights: [
      "Prototype tariff configuration: Car (₹200), Bike (₹100), Tempo (₹300)",
      "Visual bay occupancy grid with instant vacancy indicators",
      "Duration duration calculation engine computing stay charges upon departure",
      "Lightweight SQLite schema maintaining active vehicle session records"
    ],
    githubUrl: "https://github.com/deepakvitian30-arch"
  },
  {
    id: "change-detector",
    title: "Website Change Detector",
    tagline: "Autonomous DOM Surveillance & Delta Diffing Engine",
    badge: "Production Client Web System",
    category: "Full-Stack Automation / Intelligence",
    status: "Deployed Live",
    techStack: ["Next.js", "React", "Python", "FastAPI", "Tailwind CSS", "MongoDB", "Webhooks"],
    overview: "Built for Vinnovate, this platform monitors public web applications, detects meaningful DOM and content changes, filters out dynamic noise, and visualizes text and visual comparisons through an interactive dashboard with alert integrations.",
    problem: "Tracking critical updates, price modifications, or policy revisions across public websites manually is prone to human error and latency.",
    solution: "An automated scheduling pipeline that fetches website DOM snapshots, computes normalized deltas, filters noise (timestamps/ads), and delivers actionable visual diffs and webhook notifications.",
    highlights: [
      "Text and visual DOM diffing algorithms filtering non-structural noise",
      "Persistent snapshot version history with side-by-side visual comparisons",
      "Interactive monitoring status dashboard with live polling indicators",
      "Instant multi-channel webhook and email update notifications"
    ],
    githubUrl: "https://github.com/deepakvitian30-arch/website-change-detector",
    liveUrl: "https://frontend-hr2dbs9ky-deepakvitian30-arch.vercel.app/"
  }
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    tier: "Intermediate",
    description: "Solid foundations built through daily coding, coursework, and backend application development.",
    skills: [
      { name: "Python", focus: "Data Structures, Logic, FastAPI backends, Scripting" },
      { name: "SQL", focus: "Relational Modeling, PostgreSQL, Queries, Joins" },
      { name: "HTML5", focus: "Semantic DOM, Accessibility standards, Web markup" },
      { name: "CSS3", focus: "Modern Grid, Flexbox, Responsive Layouts, UI Tokens" }
    ]
  },
  {
    tier: "Beginner",
    description: "Active programming languages and engineering tools being mastered in ongoing undergraduate studies.",
    skills: [
      { name: "C", focus: "Pointers, Memory management, Computational logic" },
      { name: "C++", focus: "Object-oriented programming, STL, Problem solving" },
      { name: "JavaScript", focus: "ES6+, Async/Await, DOM manipulation, Browser APIs" },
      { name: "REST APIs", focus: "Endpoint design, HTTP conventions, JSON payloads" },
      { name: "GitHub", focus: "Version control, Branching, Pull requests, Git workflows" }
    ]
  },
  {
    tier: "Applied Experience",
    description: "Frameworks and libraries actively used across shipped web projects and deployed portals.",
    skills: [
      { name: "React", focus: "Component architecture, State hooks, Interactive UIs" },
      { name: "FastAPI", focus: "High-performance Python asynchronous APIs, Pydantic" },
      { name: "Tailwind CSS", focus: "Utility-first modern styling, responsive layouts" },
      { name: "Three.js / WebGL", focus: "3D scene composition, Lighting, Interactive canvas" }
    ]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "hackgrid",
    title: "HackGrid Shortlisted Finalist",
    category: "Hackathon",
    description: "Shortlisted finalist at HackGrid for DoseSense—an innovative healthcare decision-support concept analyzing medication non-adherence patterns from behavioral signals.",
    highlight: "Hackathon Finalist"
  },
  {
    id: "sports-captain",
    title: "School Sports Captain",
    category: "Leadership",
    description: "Elected School Sports Captain; coordinated inter-house athletic tournaments, captained sporting contingents, and promoted team discipline.",
    highlight: "Student Leadership"
  },
  {
    id: "mcet-workshop",
    title: "Five-Day Mobile App Workshop (MCET)",
    category: "Technical Workshop",
    description: "Completed an intensive 5-day hands-on workshop focused on mobile application development architecture and UI lifecycle at MCET.",
    highlight: "MCET Workshop"
  },
  {
    id: "drone-workshop",
    title: "Drone Engineering & Flight Workshop",
    category: "Technical Workshop",
    description: "Participated in an engineering workshop covering unmanned aerial vehicle (UAV) aerodynamics, hardware architecture, and flight telemetry systems.",
    highlight: "Emerging Tech"
  },
  {
    id: "certifications",
    title: "Programming Course Certifications",
    category: "Certification",
    description: "Completed rigorous foundational programming certifications in Python, C, C++, and Java, establishing strong multi-paradigm problem-solving skills.",
    highlight: "Python • C • C++ • Java"
  }
];
