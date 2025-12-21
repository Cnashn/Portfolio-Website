import {

  aws,
  cpp,
  python,
  docker,
  scikit_learn,
  git,
  postgresql,
  spark,
  terraform,
  fastapi,
  pytorch,
  reactjs,
  tailwind,
  streamlit,
  march_networks,
  uottawa,
  portfolio_website,
  scdeepinsight,
  f1,
} from "../assets";


const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "PyTorch",
    icon: pytorch,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "Scikit-Learn",
    icon: scikit_learn,
  },
  {
    name: "FastAPI",
    icon: fastapi,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  {
    name: "Apache Spark",
    icon: spark,
  },
  {
    name: "Terraform",
    icon: terraform,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Streamlit",
    icon: streamlit,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
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
    name: "Cell Type Classification from Single-Cell RNA-seq Data",
    description:
      "A cell-type classification project using the scDeepInsight deep learning framework to identify cell types from single-cell RNA-sequencing data across multiple datasets.",
    tags: [
      {
        name: "Python",
        color: "text-green-500",
      },
      {
        name: "PyTorch",
        color: "text-orange-400",
      },
      {
        name: "Scikit-Learn",
        color: "text-blue-400",
      },
    ],
    image: scdeepinsight,
    source_code_link: "https://github.com/Cnashn/Cell-Type-Classification-with-scDeepInsight",
  },
  {
    name: "Portfolio Website",
    description:
      "A personal portfolio built with React JS and Vite, using Tailwind CSS for styling, to showcase my projects and technical skills in one place.",
    tags: [
      {
        name: "React JS",
        color: "text-yellow-300",
      },
      {
        name: "Vite",
        color: "text-blue-400",
      },
      {
        name: "Tailwind CSS",
        color: "text-green-500",
      },
    ],
    image: portfolio_website,
    source_code_link: "https://github.com/Cnashn/Portfolio-Website",
  },
  {
    name: "Formula 1 Race Predictor",
    description:
      "Streamlit app that predicts race finishing order from grid positions using a 2025 season data.",
    tags: [
      {
        name: "Python",
        color: "text-blue-400",
      },
      {
        name: "Scikit-Learn",
        color: "text-yellow-300",
      },
      {
        name: "Streamlit",
        color: "text-orange-400",
      },
    ],
    image: f1,
    source_code_link: "https://github.com/Cnashn/f1_race_predictor",
  },
];

export { technologies, experiences,  projects };