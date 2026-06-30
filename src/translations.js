export const t = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      tech: "Tech",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      bio: "I'm a software engineer who builds and ships full-stack systems with a backend lean: async APIs, event-driven services, and LLM tooling in Python, Java, and TypeScript on PostgreSQL. I care about layered architecture, distributed systems design, and making software reliable over time.",
    },
    about: {
      sub: "Introduction",
      head: "Overview",
      body1: "I'm interested in how software systems behave in practice, especially as they grow in complexity and scale. Through co-op roles and personal projects, I've built async APIs, event-driven microservices, and LLM-powered tools, with an emphasis on observability, testing, and understanding systems end to end.",
      body2: "I recently graduated from the",
      body3: "University of Ottawa",
      body4: "and I'm looking for a software engineering role where I can contribute to production systems, collaborate with other engineers, and keep building on strong backend and distributed systems fundamentals, with LLM tooling as a supporting skill.",
    },
    experience: {
      sub: "What I have done so far",
      head: "Work Experience",
    },
    tech: {
      sub: "Technologies I use",
      head: "Tech Stack",
    },
    works: {
      sub: "Work Showcase",
      head: "Projects",
    },
    contact: {
      sub: "Get in Touch",
      head: "Contact",
      email_label: "cansahin2001@gmail.com",
      tagline: "Feel free to reach out with any inquiries or questions!",
      name: "Name",
      email: "Email Address",
      message: "Message",
      sending: "Sending...",
      sent_msg: "Message sent!",
      sent_btn: "Sent!",
      submit: "Submit",
    },
    experiences: [
      {
        title: "Software Engineer",
        company_name: "University of Ottawa",
        date: "September 2023 - April 2024",
        points: [
          "Eliminated manual QA steps by building Python validation and ingestion pipelines that standardized messy enterprise data into reliable, tested outputs.",
          "Informed platform consolidation decisions across 30+ IT initiatives by building automation that produced 20-30% efficiency estimates.",
          "Delivered structured data models, tests, and documentation that unblocked enterprise system design decisions and met compliance requirements across multiple initiatives.",
        ],
      },
      {
        title: "Software Developer",
        company_name: "March Networks",
        date: "January 2023 - April 2023",
        points: [
          "Reduced manual compliance toil by ~80% for legal and R&D teams by replacing manual Excel workflows with Python automation.",
          "Cut reporting runtime by ~50% by optimizing large-scale data-processing workflows under real production constraints.",
          "Improved consistency and auditability across 3,000+ components by refactoring production data-analysis services, reducing error-prone manual processes and standardizing outputs for downstream reporting.",
        ],
      },
    ],
    projects: [
      {
        name: "Semantic Caching Layer for LLM APIs",
        description:
          "A caching proxy that sits in front of any LLM API and returns stored responses for semantically similar questions, avoiding redundant API calls. Uses vector embeddings and cosine similarity to detect equivalent prompts, with TTL expiration, hit tracking, cache invalidation, and a live Prometheus/Grafana dashboard.",
      },
      {
        name: "Job Search RAG Pipeline",
        description:
          "A production-grade RAG system over 32 live Canadian tech job postings. Combines BM25 and dense vector search with Reciprocal Rank Fusion, cross-encoder reranking, and LLM-as-judge citation verification. Evaluated on a 50-question golden dataset: 0.63 composite score, 87% citation accuracy.",
      },
      {
        name: "Gym Progression App",
        description:
          "A full-stack workout tracking app that automatically progresses your weights based on performance, featuring a 17-exercise Push/Pull/Legs program, per-lift progress charts, and smart deload detection. Built with FastAPI, Neon (PostgreSQL), React, TypeScript, and Tailwind CSS, deployed on Render and Vercel.",
      },
      {
        name: "Spring RabbitMQ Orders",
        description:
          "An event-driven order processing microservice built with Spring Boot and RabbitMQ. Publishes order events to a topic exchange, consumes them asynchronously, retries failures with exponential backoff, routes exhausted messages to a dead-letter queue, and deduplicates events for idempotent processing.",
      },
      {
        name: "Portfolio Website",
        description:
          "Built a personal portfolio website to showcase projects and technical skills, focusing on responsive layout, component structure, and performance across devices.",
      },
      {
        name: "Cell Type Classification from Single-Cell RNA-seq Data",
        description:
          "A cell-type classification project using the scDeepInsight deep learning framework to identify cell types from single-cell RNA-sequencing data across multiple datasets.",
      },
    ],
  },

  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      work: "Expérience",
      tech: "Tech",
      projects: "Projets",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      bio: "Je suis un ingénieur logiciel qui conçoit et livre des systèmes full-stack avec une orientation backend : API asynchrones, services événementiels et outillage LLM en Python, Java et TypeScript sur PostgreSQL. Je me soucie de l'architecture en couches, de la conception de systèmes distribués et de la fiabilité du logiciel dans le temps.",
    },
    about: {
      sub: "Introduction",
      head: "Aperçu",
      body1: "Je m'intéresse au comportement des systèmes logiciels en pratique, notamment à mesure qu'ils gagnent en complexité et en échelle. À travers des stages coopératifs et des projets personnels, j'ai construit des API asynchrones, des microservices événementiels et des outils basés sur des LLM, avec un accent sur l'observabilité, les tests et la compréhension des systèmes de bout en bout.",
      body2: "J'ai récemment obtenu mon diplôme de l'",
      body3: "Université d'Ottawa",
      body4: "et je recherche un poste en ingénierie logicielle où je pourrai contribuer à des systèmes en production, collaborer avec d'autres ingénieurs, et continuer à renforcer de solides bases en backend et en systèmes distribués, avec l'outillage LLM comme compétence complémentaire.",
    },
    experience: {
      sub: "Mon parcours jusqu'ici",
      head: "Expérience professionnelle",
    },
    tech: {
      sub: "Technologies que j'utilise",
      head: "Stack technique",
    },
    works: {
      sub: "Vitrine de projets",
      head: "Projets",
    },
    contact: {
      sub: "Me contacter",
      head: "Contact",
      email_label: "cansahin2001@gmail.com",
      tagline: "N'hésitez pas à me contacter pour toute question ou demande!",
      name: "Nom",
      email: "Adresse courriel",
      message: "Message",
      sending: "Envoi en cours...",
      sent_msg: "Message envoyé !",
      sent_btn: "Envoyé !",
      submit: "Envoyer",
    },
    experiences: [
      {
        title: "Ingénieur logiciel",
        company_name: "Université d'Ottawa",
        date: "Septembre 2023 - Avril 2024",
        points: [
          "Élimination des étapes manuelles d'assurance qualité en construisant des pipelines Python de validation et d'ingestion qui standardisaient des données d'entreprise désordonnées en sorties fiables et testées.",
          "Décisions de consolidation de plateforme éclairées sur plus de 30 initiatives informatiques en construisant des automatisations produisant des estimations d'efficacité de 20 à 30 %.",
          "Livraison de modèles de données structurés, de tests et de documentation ayant débloqué des décisions de conception de systèmes d'entreprise et répondu aux exigences de conformité sur plusieurs initiatives.",
        ],
      },
      {
        title: "Développeur logiciel",
        company_name: "March Networks",
        date: "Janvier 2023 - Avril 2023",
        points: [
          "Réduction d'environ 80 % de la charge manuelle de conformité pour les équipes juridiques et R&D en remplaçant des flux de travail Excel manuels par de l'automatisation Python.",
          "Réduction d'environ 50 % du temps d'exécution des rapports en optimisant des flux de traitement de données à grande échelle sous des contraintes de production réelles.",
          "Amélioration de la cohérence et de l'auditabilité sur plus de 3 000 composants en refactorisant des services de production d'analyse de données, réduisant les processus manuels sujets aux erreurs et standardisant les sorties pour les rapports en aval.",
        ],
      },
    ],
    projects: [
      {
        name: "Couche de cache sémantique pour APIs LLM",
        description:
          "Un proxy de cache qui intercepte les requêtes vers une API LLM et retourne des réponses stockées pour des questions sémantiquement similaires, évitant les appels redondants. Utilise des embeddings vectoriels et la similarité cosinus pour détecter les requêtes équivalentes, avec expiration TTL, suivi des accès, invalidation du cache et un tableau de bord Prometheus/Grafana en temps réel.",
      },
      {
        name: "Pipeline RAG de recherche d'emploi",
        description:
          "Un système RAG de niveau production sur 32 offres d'emploi tech canadiennes en direct. Combine BM25 et recherche vectorielle dense avec Reciprocal Rank Fusion, reranking par cross-encoder et vérification de citations par LLM. Évalué sur 50 questions : score composite 0.63, précision des citations 87%.",
      },
      {
        name: "Application de progression en salle de sport",
        description:
          "Une application full-stack de suivi d'entraînement qui progresse automatiquement vos poids selon les performances, avec un programme Push/Pull/Jambes de 17 exercices, des graphiques de progression et une détection intelligente du déchargement. Construite avec FastAPI, Neon (PostgreSQL), React, TypeScript et Tailwind CSS.",
      },
      {
        name: "Spring RabbitMQ Orders",
        description:
          "Un microservice de traitement de commandes événementiel construit avec Spring Boot et RabbitMQ. Publie des événements de commande sur un topic exchange, les consomme de manière asynchrone, réessaie les échecs avec un backoff exponentiel, achemine les messages épuisés vers une dead-letter queue et déduplique les événements pour un traitement idempotent.",
      },
      {
        name: "Site web portfolio",
        description:
          "Création d'un site web portfolio personnel pour présenter des projets et des compétences techniques, en mettant l'accent sur la mise en page réactive, la structure des composants et les performances sur différents appareils.",
      },
      {
        name: "Classification de types cellulaires à partir de données scRNA-seq",
        description:
          "Un projet de classification de types cellulaires utilisant le cadre d'apprentissage profond scDeepInsight pour identifier les types cellulaires à partir de données de séquençage d'ARN à cellule unique sur plusieurs ensembles de données.",
      },
    ],
  },
};
