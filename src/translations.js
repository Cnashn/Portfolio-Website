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
      body4: "and I'm looking for a software engineering role where I can contribute to production systems, collaborate with other engineers, and keep building on strong backend and distributed systems fundamentals.",
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
        title: "IT Analyst",
        company_name: "University of Ottawa",
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
        date: "January 2023 - April 2023",
        points: [
          "Reduced manual compliance review by ~80% for legal and R&D teams by automating Black Duck report generation and formatting in Python, replacing manual downloads and Excel macro workflows.",
          "Cut release license reviews from manual inspection of 3,000+ components to an automated diff by building a Python tool that compared component, version, and license IDs across release versions and surfaced only medium and high risk licenses for legal sign-off.",
          "Reduced comparison runtime by ~50% on large releases by reworking the matching logic after one-by-one comparison proved too slow at scale.",
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
        name: "Your Daily Sports Agent",
        description:
          "An autonomous AI agent that runs daily via GitHub Actions, pulls live data from multiple sports APIs, and uses the Anthropic API to write a personal journal entry in a consistent voice. Zero manual input, fully self-contained from data fetch to git commit.",
      },
      {
        name: "Go API Gateway",
        description:
          "An API gateway and reverse proxy written in Go with the standard library. Redis-backed token bucket rate limiting kept atomic with a Lua script, a hand-rolled per-upstream circuit breaker, and Prometheus/Grafana dashboards. In local load tests it processed 13,700 requests per second while enforcing route rate limits.",
      },
      {
        name: "Cell Type Classification from Single-Cell RNA-seq Data",
        description:
          "A cell-type classification project using the scDeepInsight deep learning framework to identify cell types from single-cell RNA-sequencing data across multiple datasets.",
      },
      {
        name: "Portfolio Website",
        description:
          "The site you're looking at. Bilingual EN/FR, built with React, Tailwind CSS, and Framer Motion, with scroll-driven animations and a hidden in-browser terminal running playable mini games.",
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
      body4: "et je recherche un poste en ingénierie logicielle où je pourrai contribuer à des systèmes en production, collaborer avec d'autres ingénieurs, et continuer à renforcer de solides bases en backend et en systèmes distribués.",
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
        title: "Analyste TI",
        company_name: "Université d'Ottawa",
        date: "Septembre 2023 - Avril 2024",
        points: [
          "Élimination des corrections manuelles des listes de distribution de réunions en construisant un script Python qui croisait les membres entre les groupes AWG, analystes d'affaires et gestionnaires d'applications et signalait les écarts.",
          "Soutien à la gouvernance de l'architecture des initiatives informatiques de l'université en révisant des documents d'architecture d'affaires et technique et en coordonnant les séances de revue hebdomadaires de l'AWG et mensuelles de l'ARB avec les gestionnaires de projet.",
          "Recherche et présentation d'occasions d'adoption de l'IA générative pour le département informatique aux architectes et aux parties prenantes à la suite d'un événement de l'industrie en architecture d'entreprise.",
        ],
      },
      {
        title: "Développeur logiciel",
        company_name: "March Networks",
        date: "Janvier 2023 - Avril 2023",
        points: [
          "Réduction d'environ 80 % de la révision manuelle de conformité pour les équipes juridiques et R&D en automatisant la génération et le formatage des rapports Black Duck en Python, remplaçant les téléchargements manuels et les macros Excel.",
          "Passage de l'inspection manuelle de plus de 3 000 composants à une comparaison automatisée pour les revues de licences en construisant un outil Python qui comparait les composants, versions et identifiants de licence entre les versions de release et ne faisait ressortir que les licences à risque moyen et élevé pour approbation juridique.",
          "Réduction d'environ 50 % du temps de comparaison sur les grosses releases en retravaillant la logique de correspondance après que la comparaison un à un se soit révélée trop lente à grande échelle.",
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
        name: "Your Daily Sports Agent",
        description:
          "Un agent IA autonome qui s'exécute quotidiennement via GitHub Actions, récupère des données sportives en direct depuis plusieurs API, et utilise l'API Anthropic pour rédiger une entrée de journal personnelle dans une voix cohérente. Zéro intervention manuelle, entièrement autonome de la collecte de données jusqu'au commit Git.",
      },
      {
        name: "Passerelle API en Go",
        description:
          "Une passerelle API et un proxy inverse écrits en Go avec la bibliothèque standard. Limitation de débit par token bucket dans Redis, rendue atomique par un script Lua, un circuit breaker par service implémenté à la main, et des tableaux de bord Prometheus/Grafana. En tests de charge locaux, elle a traité 13 700 requêtes par seconde tout en appliquant les limites de débit.",
      },
      {
        name: "Classification de types cellulaires à partir de données scRNA-seq",
        description:
          "Un projet de classification de types cellulaires utilisant le cadre d'apprentissage profond scDeepInsight pour identifier les types cellulaires à partir de données de séquençage d'ARN à cellule unique sur plusieurs ensembles de données.",
      },
      {
        name: "Site web portfolio",
        description:
          "Le site que vous consultez. Bilingue EN/FR, construit avec React, Tailwind CSS et Framer Motion, avec des animations au défilement et un terminal caché dans le navigateur proposant des mini-jeux.",
      },
    ],
  },
};
