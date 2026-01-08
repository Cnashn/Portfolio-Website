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
    title: "Software Engineer",
    company_name: "University of Ottawa",
    icon: uottawa,
    iconBg: "#ffffffff",
    date: "September 2023 - April 2024",
    points: [
      "Developed Python scripts and data validation logic to improve the reliability of enterprise architecture datasets, eliminating manual QA steps and ensuring consistent inputs for governance reviews.",
      "Implemented analysis scripts to surface duplicated workflows across 30+ IT initiatives, supporting consolidation discussions and contributing quantified efficiency estimates (20–30%).",
      "Generated structured datasets and technical documentation consumed by senior enterprise architects to evaluate modernization and standards compliance in system design reviews.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "March Networks",
    icon: march_networks,
    iconBg: "#ffffffff",
    date: "January 2023 - April 2023",
    points: [
      "Automated compliance reporting by developing Python tooling that replaced Excel-based workflows, reducing manual effort by ~80% for legal and R&D teams.",
      "Improved consistency of license and vulnerability analysis across 3,000+ components by developing and maintaining production data-processing scripts.",
      "Reduced reporting runtime by ~50% by optimizing data-processing logic and algorithms in large-scale compliance workflows.",
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