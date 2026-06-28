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
      bio: "I'm a software engineer based in Canada who builds backend systems and data-driven applications, with hands-on experience delivering complete web-based tools and applying machine learning in data-intensive projects. I care about clear abstractions, system behavior, and making software reliable over time.",
    },
    about: {
      sub: "Introduction",
      head: "Overview",
      body1: "I'm interested in how software systems behave in practice, especially as they grow in complexity and scale. Through academic and industry projects, I've worked on backend services, API-driven web applications, and data-intensive workflows, with an emphasis on writing maintainable code and understanding systems end to end.",
      body2: "I recently graduated from the",
      body3: "University of Ottawa",
      body4: "and I'm looking for a software engineering role where I can contribute to production systems, collaborate with other engineers, and continue developing strong backend and infrastructure fundamentals, with applied machine learning as a supporting skill.",
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
          "Designed and implemented Python-based data validation and ingestion pipelines to standardize enterprise architecture datasets, eliminating manual QA steps and improving governance review reliability.",
          "Developed automation for analysis workflows across 30+ IT initiatives, producing quantified efficiency estimates (20–30%) used in consolidation and modernization decisions.",
          "Collaborated with senior enterprise architects to deliver structured datasets and documentation supporting system design, compliance, and architecture standardization.",
        ],
      },
      {
        title: "Software Developer",
        company_name: "March Networks",
        date: "January 2023 - April 2023",
        points: [
          "Led the development of Python tooling to replace Excel-based compliance reporting workflows, reducing manual effort by ~80% for legal and R&D stakeholders.",
          "Maintained and evolved production data-processing scripts analyzing license and vulnerability data across 3,000+ components, improving consistency and auditability.",
          "Identified and optimized performance bottlenecks in large-scale data-processing workflows, reducing reporting runtime by ~50% under real production constraints.",
        ],
      },
    ],
    projects: [
      {
        name: "Cell Type Classification from Single-Cell RNA-seq Data",
        description:
          "A cell-type classification project using the scDeepInsight deep learning framework to identify cell types from single-cell RNA-sequencing data across multiple datasets.",
      },
      {
        name: "Portfolio Website",
        description:
          "Built a personal portfolio website to showcase projects and technical skills, focusing on responsive layout, component structure, and performance across devices.",
      },
      {
        name: "Gym Progression App",
        description:
          "A full-stack workout tracking app that automatically progresses your weights based on performance, featuring a 17-exercise Push/Pull/Legs program, per-lift progress charts, and smart deload detection. Built with FastAPI, Neon (PostgreSQL), React, TypeScript, and Tailwind CSS, deployed on Render and Vercel.",
      },
      {
        name: "Formula 1 Race Predictor",
        description:
          "Developed a Streamlit-based application that predicts Formula 1 race finishing order from starting grid positions using regression models trained on historical season data.",
      },
      {
        name: "Spring RabbitMQ Orders",
        description:
          "An event-driven order processing microservice built with Spring Boot and RabbitMQ. Publishes order events to a topic exchange, consumes them asynchronously, retries failures with exponential backoff, routes exhausted messages to a dead-letter queue, and deduplicates events for idempotent processing.",
      },
      {
        name: "Semantic Caching Layer for LLM APIs",
        description:
          "A caching proxy that sits in front of any LLM API and returns stored responses for semantically similar questions, avoiding redundant API calls. Uses vector embeddings and cosine similarity to detect equivalent prompts, with TTL expiration, hit tracking, cache invalidation, and a live Prometheus/Grafana dashboard.",
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
      bio: "Je suis un ingénieur logiciel basé au Canada qui conçoit des systèmes backend et des applications axées sur les données, avec une expérience pratique dans la livraison d'outils web complets et l'application de l'apprentissage automatique dans des projets intensifs en données. Je me soucie des abstractions claires, du comportement des systèmes et de la fiabilité du logiciel dans le temps.",
    },
    about: {
      sub: "Introduction",
      head: "Aperçu",
      body1: "Je m'intéresse au comportement des systèmes logiciels en pratique, notamment à mesure qu'ils gagnent en complexité et en échelle. À travers des projets académiques et industriels, j'ai travaillé sur des services backend, des applications web pilotées par API et des flux de travail intensifs en données, avec un accent sur l'écriture de code maintenable et la compréhension des systèmes de bout en bout.",
      body2: "J'ai récemment obtenu mon diplôme de l'",
      body3: "Université d'Ottawa",
      body4: "et je recherche un poste en ingénierie logicielle où je pourrai contribuer à des systèmes en production, collaborer avec d'autres ingénieurs, et continuer à développer de solides bases en backend et en infrastructure, avec l'apprentissage automatique appliqué comme compétence complémentaire.",
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
      tagline: "N'hésitez pas à me contacter pour toute question ou demande !",
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
          "Conception et mise en œuvre de pipelines Python de validation et d'ingestion de données pour standardiser les ensembles de données d'architecture d'entreprise, éliminant les étapes manuelles d'assurance qualité.",
          "Développement d'automatisations pour les flux d'analyse couvrant plus de 30 initiatives informatiques, produisant des estimations d'efficacité quantifiées (20–30 %) utilisées dans les décisions de consolidation.",
          "Collaboration avec des architectes d'entreprise seniors pour livrer des ensembles de données structurés et de la documentation soutenant la conception système, la conformité et la standardisation de l'architecture.",
        ],
      },
      {
        title: "Développeur logiciel",
        company_name: "March Networks",
        date: "Janvier 2023 - Avril 2023",
        points: [
          "Direction du développement d'outils Python pour remplacer les flux de rapports de conformité basés sur Excel, réduisant l'effort manuel d'environ 80 % pour les parties prenantes juridiques et R&D.",
          "Maintenance et évolution de scripts de traitement de données en production analysant les données de licences et de vulnérabilités sur plus de 3 000 composants, améliorant la cohérence et l'auditabilité.",
          "Identification et optimisation des goulots d'étranglement de performance dans les flux de traitement de données à grande échelle, réduisant le temps d'exécution des rapports d'environ 50 %.",
        ],
      },
    ],
    projects: [
      {
        name: "Classification de types cellulaires à partir de données scRNA-seq",
        description:
          "Un projet de classification de types cellulaires utilisant le cadre d'apprentissage profond scDeepInsight pour identifier les types cellulaires à partir de données de séquençage d'ARN à cellule unique sur plusieurs ensembles de données.",
      },
      {
        name: "Site web portfolio",
        description:
          "Création d'un site web portfolio personnel pour présenter des projets et des compétences techniques, en mettant l'accent sur la mise en page réactive, la structure des composants et les performances sur différents appareils.",
      },
      {
        name: "Application de progression en salle de sport",
        description:
          "Une application full-stack de suivi d'entraînement qui progresse automatiquement vos poids selon les performances, avec un programme Push/Pull/Jambes de 17 exercices, des graphiques de progression et une détection intelligente du déchargement. Construite avec FastAPI, Neon (PostgreSQL), React, TypeScript et Tailwind CSS.",
      },
      {
        name: "Prédicteur de courses de Formule 1",
        description:
          "Développement d'une application Streamlit qui prédit l'ordre d'arrivée des courses de Formule 1 à partir des positions de grille de départ, en utilisant des modèles de régression entraînés sur des données historiques.",
      },
      {
        name: "Spring RabbitMQ Orders",
        description:
          "Un microservice de traitement de commandes événementiel construit avec Spring Boot et RabbitMQ. Publie des événements de commande sur un topic exchange, les consomme de manière asynchrone, réessaie les échecs avec un backoff exponentiel, achemine les messages épuisés vers une dead-letter queue et déduplique les événements pour un traitement idempotent.",
      },
      {
        name: "Couche de cache semantique pour APIs LLM",
        description:
          "Un proxy de cache qui intercepte les requetes vers une API LLM et retourne des reponses stockees pour des questions semantiquement similaires, evitant les appels redondants. Utilise des embeddings vectoriels et la similarite cosinus pour detecter les requetes equivalentes, avec expiration TTL, suivi des acces, invalidation du cache et un tableau de bord Prometheus/Grafana en temps reel.",
      },
    ],
  },
};
