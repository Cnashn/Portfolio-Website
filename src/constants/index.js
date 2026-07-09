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
  redis,
  rabbitmq,
  kubernetes,
  github_actions,
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
  ai_agent,
  goGateway
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
  { name: "Redis", icon: redis },
  { name: "RabbitMQ", icon: rabbitmq },
  { name: "Kubernetes", icon: kubernetes },
  { name: "GitHub Actions", icon: github_actions },
];

const experiences = [
  {
    title: "IT Analyst",
    company_name: "University of Ottawa",
    icon: uottawa,
    iconBg: "#ffffffff",
    date: "September 2023 - April 2024",
    points: [
      "Eliminated manual corrections to meeting distribution lists by building a Python script that cross-referenced members across AWG, business analyst, and application manager groups and flagged discrepancies.",
      "Supported architecture governance across university IT initiatives by reviewing business and technical architecture documents and coordinating weekly AWG and monthly ARB review sessions with project managers.",
      "Researched and presented Generative AI adoption opportunities for the IT department to architects and stakeholders following an industry enterprise architecture event.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "March Networks",
    icon: march_networks,
    iconBg: "#ffffffff",
    date: "January 2023 - April 2023",
    points: [
      "Reduced manual compliance review by ~80% for legal and R&D teams by automating Black Duck report generation and formatting in Python, replacing manual downloads and Excel macro workflows.",
      "Cut release license reviews from manual inspection of 3,000+ components to an automated diff by building a Python tool that compared component, version, and license IDs across release versions and surfaced only medium and high risk licenses for legal sign-off.",
      "Reduced comparison runtime by ~50% on large releases by reworking the matching logic after one-by-one comparison proved too slow at scale.",
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
    name: "Go API Gateway",
    description:
      "An API gateway and reverse proxy written in Go with the standard library. Redis-backed token bucket rate limiting kept atomic with a Lua script, a hand-rolled per-upstream circuit breaker, and Prometheus/Grafana dashboards. In local load tests it processed 13,700 requests per second while enforcing route rate limits.",
    tags: [
      {
        name: "Go",
        color: "text-cyan-400",
      },
      {
        name: "Redis",
        color: "text-red-500",
      },
      {
        name: "Grafana",
        color: "text-orange-400",
      },
    ],
    image: goGateway,
    source_code_link: "https://github.com/Cnashn/gateway",
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