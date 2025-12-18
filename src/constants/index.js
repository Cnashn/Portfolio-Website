import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  march_networks,
  uottawa,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];



const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Technical Analyst",
    company_name: "University of Ottawa",
    icon: uottawa,
    iconBg: "#ffffffff",
    date: "September 2023 - April 2024",
    points: [
      "Built Python automation pipelines to clean, validate, and merge enterprise architecture datasets, eliminating manual QC workflows and improving data reliability for governance reviews.",
      "Analyzed workflow and communication data across 30+ IT initiatives, identifying 15 duplicated processes and quantifying 20–30% potential efficiency gains through system automation.",
      "Converted 50+ unstructured BAD/TAD architecture documents into structured, queryable datasets, enabling dependency analysis, risk scoring, and early automation feasibility assessments.",
      " Delivered data-driven technical briefs and analytical summaries to 5 senior enterprise architects, directly supporting Architecture Review Board (ARB) decisionsand modernization roadmaps",
      "Researched and evaluated 10+ ML and GenAI use cases across enterprise workflows, producing actionable recommendations for early-stage innovation initiatives."
    ],
  },
  {
    title: "Software Developer",
    company_name: "March Networks",
    icon: march_networks,
    iconBg: "#ffffffff",
    date: "January 2023 - April 2023",
    points: [
      "Developed a CSV comparison and validation tool to detect high-risk license changes, supporting compliance checks and accelerating software release approvals.",
      "Optimized large-scale data processing workflows through algorithmic improvements and edge-case handling, reducing runtime by ~50% for critical reporting tasks.",
      "Replaced Excel macros with tested Python pipelines to process license and vulnerability data for 3,000+ components, improving scalability and long-termmaintainability.",
      "Automated Black Duck compliance report generation using Python, reducing manual processing effort by ~80% and improving data consistency for legal and R&D teams.",
    ],
  },
];



const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { technologies, experiences,  projects };