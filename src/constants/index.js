import {
  aws,
  cpp,
  python,
  docker,
  linux,
  postgresql,
  terraform,
  fastapi,
  spring,
  javascript,
  go,
  prometheus,
  grafana,
  react,
  typescript,
  java,
  march_networks,
  uottawa,
  portfolio_website,
  scdeepinsight,
  gymprog,
  semanticCache,
  springRabbitMQ,
  jobsRag,
  ai_agent
} from "../assets";


const technologies = [
  { name: "Python", icon: python },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "Java", icon: java },
  { name: "C++", icon: cpp },
  { name: "Go", icon: go },
  { name: "FastAPI", icon: fastapi },
  { name: "PostgreSQL", icon: postgresql },
  { name: "Docker", icon: docker },
  { name: "AWS", icon: aws },
  { name: "Terraform", icon: terraform },
  { name: "Prometheus", icon: prometheus },
  { name: "Grafana", icon: grafana },
  { name: "Linux", icon: linux },
  { name: "React", icon: react },
  { name: "Spring", icon: spring },
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
    name: "Semantic Caching Layer for LLM APIs",
    description:
      "A caching proxy that sits in front of any LLM API and returns stored responses for semantically similar questions, avoiding redundant API calls. Uses vector embeddings and cosine similarity to detect equivalent prompts, with TTL expiration, hit tracking, cache invalidation, and a live Prometheus/Grafana dashboard.",
    tags: [
      {
        name: "FastAPI",
        color: "text-blue-400",
      },
      {
        name: "Python",
        color: "text-green-500",
      },
      {
        name: "Docker",
        color: "text-yellow-300",
      },
    ],
    image: semanticCache,
    source_code_link: "https://github.com/Cnashn/semantic-cache",
  },
  {
    name: "Job Search RAG Pipeline",
    description:
      "A production-grade RAG system over 32 live Canadian tech job postings. Combines BM25 and dense vector search with Reciprocal Rank Fusion, cross-encoder reranking, and LLM-as-judge citation verification. Evaluated on a 50-question golden dataset: 0.63 composite score, 87% citation accuracy.",
    tags: [
      {
        name: "Python",
        color: "text-green-500",
      },
      {
        name: "FastAPI",
        color: "text-orange-400",
      },
      {
        name: "React",
        color: "text-blue-400",
      },
    ],
    image: jobsRag,
    source_code_link: "https://github.com/Cnashn/jobs-rag-pipeline",
  },
  {
    name: "Gym Progression App",
    description:
      "A full-stack workout tracking app that automatically progresses your weights based on performance, featuring a 17-exercise Push/Pull/Legs program, per-lift progress charts, and smart deload detection. Built with FastAPI, Neon (PostgreSQL), React, TypeScript, and Tailwind CSS, deployed on Render and Vercel.",
    tags: [
      {
        name: "FastAPI",
        color: "text-yellow-300",
      },
      {
        name: "React",
        color: "text-blue-400",
      },
      {
        name: "PostgreSQL",
        color: "text-orange-400",
      },
    ],
    image: gymprog,
    source_code_link: "https://github.com/Cnashn/Gym_Progression_App",
  },
  {
    name: "Spring RabbitMQ Orders",
    description:
      "An event-driven order processing microservice built with Spring Boot and RabbitMQ. Publishes order events to a topic exchange, consumes them asynchronously, retries failures with exponential backoff, routes exhausted messages to a dead-letter queue, and deduplicates events for idempotent processing.",
    tags: [
      {
        name: "Java",
        color: "text-orange-400",
      },
      {
        name: "Spring Boot",
        color: "text-blue-400",
      },
      {
        name: "RabbitMQ",
        color: "text-green-500",
      },
    ],
    image: springRabbitMQ,
    source_code_link: "https://github.com/Cnashn/spring-rabbitmq-orders",
  },
  {
    name: "Portfolio Website",
    description:
      "The site you're looking at. Bilingual EN/FR, built with React, Tailwind CSS, and Framer Motion, with scroll-driven animations and a hidden in-browser terminal running playable mini games.",
    tags: [
      {
        name: "JavaScript",
        color: "text-yellow-300",
      },
      {
        name: "React",
        color: "text-orange-400",
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
    name: "Your Daily Sports Agent",
    description:
      "An autonomous AI agent that runs daily via GitHub Actions, pulls live data from multiple sports APIs, and uses the Anthropic API to write a personal journal entry in a consistent voice. Zero manual input, fully self-contained from data fetch to git commit.",
    tags: [
      {
        name: "Python",
        color: "text-green-500",
      },
      {
        name: "Anthropic API",
        color: "text-orange-400",
      },
      {
        name: "GitHub Actions",
        color: "text-blue-400",
      },
    ],
    image: ai_agent,
    source_code_link: "https://github.com/Cnashn/your-daily-sports-agent",
  },
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
        color: "text-orange-400",
      },
      {
        name: "Deep Learning",
        color: "text-yellow-300",
      },
    ],
    image: scdeepinsight,
    source_code_link: "https://github.com/Cnashn/Cell-Type-Classification-with-scDeepInsight",
  },
];

export { technologies, experiences,  projects };