import {
  aws,
  cpp,
  python,
  docker,
  linux,
  git,
  postgresql,
  terraform,
  fastapi,
  pytorch,
  react,
  typescript,
  java,
  streamlit,
  march_networks,
  uottawa,
  portfolio_website,
  scdeepinsight,
  f1,
  carquery
} from "../assets";


const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "C++",
    icon: cpp,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React",
    icon: react,
  },
  {
    name: "PyTorch",
    icon: pytorch,
  },
  
  {
    name: "FastAPI",
    icon: fastapi,
  },
  {
    name: "Linux",
    icon: linux,
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
  
  
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "University of Ottawa",
    icon: uottawa,
    iconBg: "#ffffffff",
    date: "September 2023 - April 2024",
    points: [
      "Designed and implemented Python-based data validation and ingestion pipelines to standardize enterprise architecture datasets, eliminating manual QA steps and improving governance review reliability.",
      "Developed automation for analysis workflows across 30+ IT initiatives, producing quantified efficiency estimates (20–30%) used in consolidation and modernization decisions.",
      "Collaborated with senior enterprise architects to deliver structured datasets and documentation supporting system design, compliance, and architecture standardization.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "March Networks",
    icon: march_networks,
    iconBg: "#ffffffff",
    date: "January 2023 - April 2023",
    points: [
      "Led the development of Python tooling to replace Excel-based compliance reporting workflows, reducing manual effort by ~80% for legal and R&D stakeholders.",
      "Maintained and evolved production data-processing scripts analyzing license and vulnerability data across 3,000+ components, improving consistency and auditability.",
      "Identified and optimized performance bottlenecks in large-scale data-processing workflows, reducing reporting runtime by ~50% under real production constraints.",
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
        color: "text-blue-400",
      },
      {
        name: "PyTorch",
        color: "text-yellow-300",
      },
      {
        name: "Deep Learning",
        color: "text-green-500",
      },
    ],
    image: scdeepinsight,
    source_code_link: "https://github.com/Cnashn/Cell-Type-Classification-with-scDeepInsight",
  },
  {
    name: "Portfolio Website",
    description:
      "Built a personal portfolio website to showcase projects and technical skills, focusing on responsive layout, component structure, and performance across devices.",
    tags: [
      {
        name: "JavaScript",
        color: "text-yellow-300",
      },
      {
        name: "React",
        color: "text-green-500",
      },
      {
        name: "Tailwind CSS",
        color: "text-orange-400",
      },
    ],
    image: portfolio_website,
    source_code_link: "https://github.com/Cnashn/Portfolio-Website",
  },
  {
    name: "Formula 1 Race Predictor",
    description:
      "Developed a Streamlit-based application that predicts Formula 1 race finishing order from starting grid positions using regression models trained on historical season data.",
    tags: [
      {
        name: "Python",
        color: "text-green-500",
      },
      {
        name: "Scikit-Learn",
        color: "text-orange-400",
      },
      {
        name: "Streamlit",
        color: "text-blue-400",
      },
    ],
    image: f1,
    source_code_link: "https://github.com/Cnashn/f1_race_predictor",
  },

  {
    name: "CarQuery",
    description:
      "Built a chat-based used-car search tool using the Yellowcake API to extract live listings and return low-mileage results filtered by make, model, color, and source, displaying results in a sortable table.",
    tags: [
      {
        name: "TypeScript",
        color: "text-orange-400",
      },
      {
        name: "React",
        color: "text-blue-400",
      },
      {
        name: "YellowCake API",
        color: "text-yellow-300",
      },
    ],
    image: carquery,
    source_code_link: "https://github.com/Cnashn/CarQuery",
  }
];

export { technologies, experiences,  projects };