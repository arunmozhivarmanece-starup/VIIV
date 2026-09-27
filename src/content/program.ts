/**
 * VIIV Full-Stack Sales — program content.
 * Edit curriculum, process and proof-of-work outputs here.
 */

export const program = {
  label: "VIIV by Varman",
  name: "Full-Stack Sales",
  headline: "Learn the Complete Modern Sales Journey.",
  description:
    "A practical career-focused program designed to help aspiring business professionals learn sales from first conversation to customer conversion — while building communication, business, technology and career-readiness skills.",
  pillars: [
    { title: "Learn", body: "Structured modules from sales foundations to AI-assisted selling." },
    { title: "Practice", body: "Roleplays, mock calls and drills — not just recorded videos." },
    { title: "Prove", body: "Assessments and a portfolio that show what you can do." },
    { title: "Prepare", body: "Resume, LinkedIn, Naukri and interview readiness." },
  ],
} as const;

export type SalesModule = {
  number: string;
  title: string;
  summary: string;
  topics: string[];
};

export const salesModules: SalesModule[] = [
  {
    number: "01",
    title: "Foundation",
    summary: "The mindset and fundamentals every business professional needs.",
    topics: ["Communication", "Business Fundamentals", "Customer Psychology", "Sales Mindset"],
  },
  {
    number: "02",
    title: "Prospecting",
    summary: "Find the right people and start the right conversations.",
    topics: ["Lead Generation", "Cold Calling", "LinkedIn Prospecting", "WhatsApp", "Email Outreach"],
  },
  {
    number: "03",
    title: "Discovery",
    summary: "Understand the customer before you ever pitch.",
    topics: ["Customer Research", "Discovery Questions", "Need Identification", "Need Creation"],
  },
  {
    number: "04",
    title: "Pitching",
    summary: "Communicate value in a way that is relevant to the customer.",
    topics: ["Product Pitch", "Storytelling", "Consultative Selling", "Demonstration"],
  },
  {
    number: "05",
    title: "Objection Handling",
    summary: "Respond to real concerns with clarity and confidence.",
    topics: ["Price", "Trust", "Competition", "Timing", "Need", "Decision-Making"],
  },
  {
    number: "06",
    title: "Conversion",
    summary: "Move conversations to a decision — ethically.",
    topics: ["Follow-Up", "Negotiation", "Urgency", "Closing", "Commitment"],
  },
  {
    number: "07",
    title: "Sales Technology",
    summary: "Work like a modern sales team.",
    topics: ["CRM", "Pipeline Management", "Sales Automation", "AI for Sales", "Productivity Tools"],
  },
  {
    number: "08",
    title: "Career Readiness",
    summary: "Present yourself professionally and prepare for interviews.",
    topics: ["Resume", "Naukri", "LinkedIn", "Mock Interviews", "Interview Preparation", "Professional Communication"],
  },
];

export const salesProcess = [
  { step: "Discovery", detail: "Ask the right questions to understand the customer's situation." },
  { step: "Need Creation", detail: "Help the customer see the problem — and the cost of ignoring it." },
  { step: "Product Pitching", detail: "Connect your solution to what the customer actually needs." },
  { step: "Objection Handling", detail: "Address concerns on price, trust, timing and competition." },
  { step: "Urgency", detail: "Show why acting now matters — honestly." },
  { step: "Closing", detail: "Guide the customer to a clear decision." },
  { step: "Follow-Up Commitment", detail: "Confirm next steps and keep the relationship moving." },
] as const;

export const whySales = {
  flow: ["Product", "Marketing", "Opportunity", "Conversation", "Customer", "Revenue"],
  intersection: ["People", "Business", "Communication", "Revenue"],
  industries: [
    "SaaS",
    "EdTech",
    "FinTech",
    "Healthcare",
    "E-commerce",
    "Automotive",
    "Real Estate",
    "Media",
    "Technology",
    "Startups",
  ],
} as const;

export const skillGap = {
  college: ["Theory", "Assignments", "Exams", "Degree"],
  workplace: [
    "Communication",
    "Customer Understanding",
    "Business Thinking",
    "Problem Solving",
    "CRM",
    "AI Tools",
    "Negotiation",
    "Execution",
  ],
} as const;

export const learnByDoing = {
  activities: [
    "Live Roleplays",
    "Mock Calls",
    "Discovery Practice",
    "Pitch Challenges",
    "Objection Handling Drills",
    "Negotiation Practice",
    "CRM Exercises",
    "AI Workflows",
    "Sales Assignments",
    "Mock Interviews",
  ],
  loop: ["Practice", "Feedback", "Improve", "Repeat"],
} as const;

export const viivMethod = [
  { stage: "Discover", line: "Understand the career.", detail: "Explore business and revenue roles and where you fit." },
  { stage: "Learn", line: "Build the skills.", detail: "Structured modules across the complete sales journey." },
  { stage: "Practice", line: "Apply the skills.", detail: "Roleplays, mock calls, drills and real-world simulations." },
  { stage: "Prove", line: "Show what you can do.", detail: "Assessments, recorded pitches and a sales portfolio." },
  { stage: "Launch", line: "Prepare for career opportunities.", detail: "Profiles, interview preparation and job-search strategy." },
] as const;

export const proofOfWork = [
  { title: "Sales Portfolio", kind: "Portfolio" },
  { title: "Recorded Sales Pitch", kind: "Recording" },
  { title: "Discovery Call Assessment", kind: "Assessment" },
  { title: "Objection Handling Assessment", kind: "Assessment" },
  { title: "CRM Project", kind: "Project" },
  { title: "Sales Case Study", kind: "Project" },
  { title: "Professional LinkedIn Profile", kind: "Profile" },
  { title: "Optimised Naukri Profile", kind: "Profile" },
  { title: "Interview Readiness", kind: "Readiness" },
] as const;

export const careerReadiness = [
  { stage: "Profile", items: ["Resume", "Naukri", "LinkedIn"] },
  { stage: "Preparation", items: ["Mock Interviews", "Communication", "Role Understanding"] },
  { stage: "Proof", items: ["Projects", "Assessments", "Portfolio"] },
  { stage: "Opportunity Readiness", items: ["Job Search Strategy", "Interview Preparation", "Professional Follow-Up"] },
] as const;

export const transformation = [
  { stage: "Degree", line: "What you studied." },
  { stage: "Career Clarity", line: "Know which roles fit you." },
  { stage: "Skills", line: "Learn what companies look for." },
  { stage: "Practice", line: "Apply it until it feels natural." },
  { stage: "Proof", line: "Build evidence of what you can do." },
  { stage: "Interview Readiness", line: "Walk in prepared." },
  { stage: "Career", line: "Pursue the opportunities that fit." },
] as const;
