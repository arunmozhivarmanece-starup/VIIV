/**
 * Career-path content. Deliberately contains NO salary figures, job counts or
 * hiring claims — only descriptions of the work and the skills involved.
 */

export type CareerPath = {
  id: string;
  title: string;
  short: string;
  whatYouDo: string;
  skills: string[];
  progression: string[];
};

export const careerPaths: CareerPath[] = [
  {
    id: "business-development",
    title: "Business Development",
    short: "Create and develop new opportunities.",
    whatYouDo:
      "Identify new markets, partners and customers, start conversations and turn interest into real business opportunities.",
    skills: ["Research", "Outreach", "Relationship building", "Pitching"],
    progression: ["BD Associate", "BD Executive", "BD Manager", "Head of Business Development"],
  },
  {
    id: "sales-development",
    title: "Sales Development",
    short: "Find, connect with and qualify potential customers.",
    whatYouDo:
      "Research prospects, reach out across calls, email and LinkedIn, and qualify whether a customer is a good fit before handing over to closers.",
    skills: ["Prospecting", "Cold calling", "Written outreach", "Qualification"],
    progression: ["SDR / BDR", "Senior SDR", "Account Executive", "Sales Manager"],
  },
  {
    id: "inside-sales",
    title: "Inside Sales",
    short: "Understand customer requirements and convert opportunities.",
    whatYouDo:
      "Run discovery conversations, present solutions remotely, handle objections and guide customers to a decision.",
    skills: ["Discovery", "Product pitching", "Objection handling", "Closing"],
    progression: ["Inside Sales Associate", "Senior Associate", "Team Lead", "Sales Manager"],
  },
  {
    id: "customer-success",
    title: "Customer Success",
    short: "Help customers realise value after purchasing.",
    whatYouDo:
      "Onboard new customers, understand their goals, solve problems early and make sure they get the outcome they paid for.",
    skills: ["Empathy", "Problem solving", "Communication", "Product knowledge"],
    progression: ["CS Associate", "Customer Success Manager", "Senior CSM", "Head of Customer Success"],
  },
  {
    id: "account-management",
    title: "Account Management",
    short: "Build long-term relationships and grow accounts.",
    whatYouDo:
      "Own relationships with existing customers, spot new needs, renew contracts and grow the value of each account over time.",
    skills: ["Relationship management", "Negotiation", "Business thinking", "Planning"],
    progression: ["Account Executive", "Account Manager", "Key Account Manager", "Director, Accounts"],
  },
  {
    id: "growth",
    title: "Growth",
    short: "Work across acquisition, experiments and revenue.",
    whatYouDo:
      "Run experiments across channels, analyse what brings customers in, and work with sales and marketing to grow revenue.",
    skills: ["Analytical thinking", "Experimentation", "Customer insight", "Tools & data"],
    progression: ["Growth Associate", "Growth Manager", "Senior Growth Manager", "Head of Growth"],
  },
];

/** Roles used by the hero ecosystem and the job-discovery simulation. */
export const heroRoles = [
  "Business Development",
  "Sales Development",
  "Inside Sales",
  "Customer Success",
  "Account Management",
  "Growth",
] as const;

export const discoveryRoles: { query: string; focus: string; skills: string[] }[] = [
  {
    query: "Business Development",
    focus: "Opening new opportunities with prospective customers and partners.",
    skills: ["Communication", "Research", "Pitching"],
  },
  {
    query: "Sales Development",
    focus: "Reaching out to prospects and qualifying their needs.",
    skills: ["Prospecting", "Calling", "CRM"],
  },
  {
    query: "Inside Sales",
    focus: "Consulting customers remotely and converting interest into decisions.",
    skills: ["Discovery", "Objection handling", "Closing"],
  },
  {
    query: "Customer Success",
    focus: "Helping customers get real value after they buy.",
    skills: ["Empathy", "Problem solving", "Product knowledge"],
  },
  {
    query: "Account Management",
    focus: "Growing long-term relationships with existing customers.",
    skills: ["Relationships", "Negotiation", "Planning"],
  },
];

export const graduateReality = [
  {
    title: "Applied Everywhere",
    body: "Sent dozens of applications but barely hearing back?",
    icon: "send",
  },
  {
    title: "Career Confusion",
    body: "Developer? MBA? Marketing? Sales? What should you actually choose?",
    icon: "compass",
  },
  {
    title: "No Experience",
    body: "Companies want experience before giving you experience.",
    icon: "loop",
  },
  {
    title: "Interview Struggle",
    body: "Getting interviews but finding it difficult to convert?",
    icon: "mic",
  },
  {
    title: "Skill Gap",
    body: "You studied subjects. Companies evaluate what you can actually do.",
    icon: "gap",
  },
] as const;

export const businessFunctions = [
  { name: "Engineering", role: "Builds the product.", highlight: false },
  { name: "Marketing", role: "Creates demand.", highlight: false },
  { name: "Business Development", role: "Creates opportunities.", highlight: true },
  { name: "Sales", role: "Converts opportunities into customers.", highlight: true },
  { name: "Customer Success", role: "Helps customers succeed.", highlight: true },
  { name: "Account Management", role: "Builds and grows relationships.", highlight: true },
  { name: "Revenue Operations", role: "Supports the revenue engine.", highlight: true },
] as const;
