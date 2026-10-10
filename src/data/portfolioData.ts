export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  techStack: string[];
  category: 'ai' | 'backend' | 'systems';
  githubUrl: string;
  isAiFeatured?: boolean;
  metrics: string[];
  keyHighlights: string[];
  architectureSummary: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  capstoneProjects: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; context: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Abdul Rafay',
    githubUsername: 'RanaRafay-prog',
    headline: 'Software Engineering Student & Aspiring AI Engineer',
    bio: 'Software engineering student with hands-on experience building asynchronous AI workflows, graph-based decision engines, and token-aware metering architectures. Focused on the engineering layer of AI systems—correctness, state management, background reliability, and API mechanics.',
    email: 'ranarafay881@gmail.com',
    githubUrl: 'https://github.com/RanaRafay-prog',
    linkedinUrl: 'https://www.linkedin.com/in/abdul-rafay-7564033b5',
    location: 'Pakistan',
    statusNote: 'Open to AI Engineer, Backend, & Software Engineering Internships / Full-Time Roles',
  },

  experience: [
    {
      role: 'AI Engineering Intern',
      company: 'FlyRank AI',
      period: '2026',
      location: 'Remote',
      summary:
        'Engineered core backend and infrastructure components for AI products, focusing on usage metering, asynchronous execution, and multi-step AI decision pipelines.',
      bullets: [
        'Built an AI-token-aware Usage Metering and Billing Engine with idempotency guarantees (Idempotency-Key headers) to prevent duplicate charges across concurrent API calls.',
        'Implemented fine-grained AI token cost models that independently price cached prompt tokens, standard input tokens, and reasoning output tokens.',
        'Enforced plan quota rules with instant HTTP 402 (upgrade required) and 429 (rate/quota exceeded) error handling, backed by signature-verified Stripe webhooks.',
        'Architected asynchronous background job execution using FastAPI and Inngest, implementing the "accept fast (202) -> execute in background -> poll status" pattern with automatic retry and failure handlers.',
        'Engineered graph-based workflow prototypes coupling React Flow with LLM steps to execute deterministic YES/NO decision trees.'
      ],
      technologies: ['FastAPI', 'Inngest', 'Node.js', 'Express', 'Stripe API', 'OpenAI SDK', 'SQLite', 'React Flow', 'Docker'],
      capstoneProjects: ['flyrank-capstone-metering-billing', 'inngest-background-job'],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'ai-workflow-inngest',
      title: 'YES/NO AI Workflows',
      shortDesc: 'A visual canvas editor where graph nodes act as autonomous AI decision steps branching execution on YES/NO conditions.',
      problem:
        'Complex business rules often require sequential LLM reasoning, but naive single-prompt chains lack visual inspectability, retry resilience, and structured conditional branching.',
      solution:
        'Built a visual node graph using React Flow and Inngest. Each node prompts an LLM with strict binary validation. Executions run as durable Inngest step functions with automatic retry on malformed outputs, real-time edge highlighting, and state persistence.',
      techStack: ['Next.js 15', 'React Flow (@xyflow/react)', 'Inngest', 'OpenAI SDK', 'TypeScript', 'Tailwind CSS'],
      category: 'ai',
      githubUrl: 'https://github.com/RanaRafay-prog/ai-workflow-inngest',
      isAiFeatured: true,
      metrics: [
        'Deterministic binary evaluation step per node',
        '2x automated retry resilience via Inngest steps',
        '100% interactive visual canvas state with JSON serialization'
      ],
      keyHighlights: [
        'Visual interactive graph canvas to add, connect, and configure AI prompt nodes',
        'Durable step-based execution engine preventing workflow collapse on network failure',
        'Ordered execution trace visualization with green (YES) and red (NO) active paths',
        'Built-in JSON export, import, and localStorage state autosave'
      ],
      architectureSummary: 'Client Canvas (React Flow) -> /api/run -> Inngest Event Dispatch -> step.run() per node -> Strict YES/NO model constraint -> Edge Traversal -> Ordered Execution Trace'
    },
    {
      id: 'flyrank-capstone-metering-billing',
      title: 'AI Usage Metering & Billing Engine',
      shortDesc: 'Backend metering and monetization service enforcing AI-token-aware costs, quota tiers, and signature-verified Stripe webhooks.',
      problem:
        'Modern AI applications cannot bill on simple HTTP request counts; models differ significantly in prompt caching discounts and reasoning token costs, risking revenue leakage or runaway API costs.',
      solution:
        'Developed an enterprise-grade metering service that records billable events with exactly-once idempotency guarantees, calculates nuanced token costs (cached inputs vs. output reasoning), enforces 402/429 quotas, and syncs subscription states via Stripe webhooks.',
      techStack: ['Node.js', 'Express', 'Stripe API', 'SQLite (DatabaseSync)', 'Idempotency Header Pattern', 'Cron Jobs'],
      category: 'backend',
      githubUrl: 'https://github.com/RanaRafay-prog/flyrank-capstone-metering-billing',
      isAiFeatured: true,
      metrics: [
        'Exactly-once guarantee via Idempotency-Key headers',
        'Multi-tier token pricing (cached vs prompt vs reasoning)',
        'Zero duplicate webhooks via signature verification'
      ],
      keyHighlights: [
        'Idempotent ingestion on POST /generate preserving event state across retries',
        'Proactive quota enforcement before inference: returns 402 (Upgrade Needed) or 429 (Quota Exceeded)',
        'Fine-grained token billing accounting for discounted cached inputs and higher-cost reasoning tokens',
        'Automated usage alert cron job monitoring tenant thresholds and notifying operators'
      ],
      architectureSummary: 'Client Request -> Idempotency Check -> Quota Guard (services/quota.js) -> Meter Ingestion (usage_events) -> Stripe Webhook Verification -> Usage Rollup'
    },
    {
      id: 'inngest-background-job',
      title: 'Background Job API & Personal Study Coach',
      shortDesc: 'Asynchronous FastAPI service running long tasks in resilient Inngest background jobs, paired with an AI study coach workspace.',
      problem:
        'Synchronous HTTP endpoints that perform heavy compute or multi-second AI operations cause gateway timeouts, blocking connections and degrading user experience.',
      solution:
        'Engineered an event-driven FastAPI microservice implementing the "accept fast (202) -> work in background -> report status" architectural pattern, with automated retry policies and terminal failure handlers.',
      techStack: ['Python 3.10+', 'FastAPI', 'Inngest SDK', 'Uvicorn', 'Pydantic'],
      category: 'ai',
      githubUrl: 'https://github.com/RanaRafay-prog/inngest-background-job',
      isAiFeatured: true,
      metrics: [
        'Instant HTTP 202 response (<20ms) for 8+ second workloads',
        'Automated retry backoff with report_failed cleanup hook',
        'Scheduled recurring background jobs via cron triggers'
      ],
      keyHighlights: [
        'Decoupled request ingestion from compute-heavy processing',
        'Stateful job status polling endpoint (GET /reports/{id})',
        'Durable failure handlers marking internal state without crashing workers',
        'Event-driven triggers integrating cleanly with local and production Inngest dev servers'
      ],
      architectureSummary: 'FastAPI (POST /reports) -> Return 202 Accepted -> Trigger Inngest Event -> Worker step.sleep & compute -> report_failed hook -> GET /reports/{id} polling'
    },
    {
      id: 'pdf-report-generator',
      title: 'Headless Browser PDF Report Engine',
      shortDesc: 'High-throughput server-side PDF generator compiling SQLite order analytics into structured print-ready reports via Playwright.',
      problem:
        'Standard HTML-to-PDF tools produce broken CSS layouts, poorly formatted pagination, or require heavy third-party SaaS subscriptions for simple enterprise document delivery.',
      solution:
        'Built an Express service leveraging Playwright headless Chromium and Node.js DatabaseSync (native SQLite) to dynamically render and compile database analytics into high-fidelity PDF documents.',
      techStack: ['Node.js', 'Express', 'Playwright (Chromium)', 'SQLite (DatabaseSync)', 'HTML5 / CSS3'],
      category: 'backend',
      githubUrl: 'https://github.com/RanaRafay-prog/pdf-report-generator',
      metrics: [
        'Direct in-process SQLite queries with native DatabaseSync',
        'Pixel-accurate print styling with Playwright headless engine',
        'Automated file streaming and clean disk persistence'
      ],
      keyHighlights: [
        'Aggregation of revenue, order volume, and top products directly from transactional data',
        'Dynamic HTML template hydration with responsive print stylesheets',
        'Automated PDF file generation with file path metadata logging'
      ],
      architectureSummary: 'Express Request -> SQLite DatabaseSync query -> Render HTML report template -> Playwright Chromium page.pdf() -> File Storage -> Stream back to client'
    },
    {
      id: 'todo-api',
      title: 'JWT-Guarded Task Management REST API',
      shortDesc: 'PostgreSQL-backed CRUD microservice secured by Supabase Auth with containerized Docker Compose deployment and Swagger docs.',
      problem:
        'Secure multi-tenant data access requires strict stateless token verification and isolated persistence without coupling application logic directly to proprietary auth schemas.',
      solution:
        'Implemented a secure Express REST API that guards all task endpoints by verifying incoming Supabase JWTs on every request. Bundled with complete Swagger OpenAPI documentation and a ready-to-run Docker Compose environment.',
      techStack: ['Node.js', 'Express', 'Supabase Auth (JWT)', 'PostgreSQL (pg)', 'Docker Compose', 'Swagger UI'],
      category: 'backend',
      githubUrl: 'https://github.com/RanaRafay-prog/todo-api',
      metrics: [
        'Stateless JWT authorization on all protected routes',
        'Interactive OpenAPI / Swagger documentation out-of-the-box',
        'Single-command deployment with Docker Compose'
      ],
      keyHighlights: [
        'Guarded middleware verifying Bearer tokens against Supabase without storing user passwords',
        'Parameterized SQL queries guarding against injection vulnerabilities',
        'Docker Compose stack orchestration (Node API + PostgreSQL container)'
      ],
      architectureSummary: 'Client Header (Bearer JWT) -> Express Auth Middleware -> Supabase JWT Verification -> Parameterized PostgreSQL Query -> JSON Response'
    },
    {
      id: 'CafeManagementSystem',
      title: 'Cafe Management & POS System',
      shortDesc: 'Desktop point-of-sale and inventory control software built with Java Swing and relational database operations.',
      problem:
        'Small hospitality venues require fast, offline-capable order taking, category-based inventory tracking, and bill generation without fragile web dependencies.',
      solution:
        'Developed a multi-window Java desktop application implementing strict Data Access Object (DAO) architecture, user verification workflows, bill calculation, and tabular receipt viewing.',
      techStack: ['Java', 'Swing GUI', 'JDBC', 'MySQL', 'DAO Pattern'],
      category: 'systems',
      githubUrl: 'https://github.com/RanaRafay-prog/CafeManagementSystem',
      metrics: [
        'Modular DAO architecture isolating SQL logic from UI controllers',
        'Role-guarded user verification and password recovery flow',
        'Instant receipt generation with itemized cost calculation'
      ],
      keyHighlights: [
        'Full CRUD operations for product inventory and catalog categories',
        'Order placement interface with real-time total updates',
        'Historical order receipt lookups and admin verification screens'
      ],
      architectureSummary: 'Java Swing UI Layer -> Event Action Listeners -> DAO Abstraction Layer (BillDao, ProductDao) -> JDBC Connection Provider -> Relational Database'
    }
  ] as Project[],

  skills: [
    {
      title: 'Languages',
      skills: [
        { name: 'Python', context: 'FastAPI, Inngest SDK, Pydantic, Scripting' },
        { name: 'TypeScript', context: 'Next.js 15, React Flow, Type-safe APIs' },
        { name: 'JavaScript (ES6+)', context: 'Node.js, Express, Async/Await, Web APIs' },
        { name: 'Java', context: 'OOP, Swing GUI, JDBC, DAO Pattern' },
        { name: 'SQL', context: 'PostgreSQL, SQLite DatabaseSync, MySQL' },
        { name: 'HTML5 & CSS3', context: 'Modern semantic layouts, Tailwind CSS' },
      ],
    },
    {
      title: 'AI & Intelligent Systems',
      skills: [
        { name: 'OpenAI API & SDK', context: 'Prompt engineering, structured outputs, decision nodes' },
        { name: 'Agentic Workflows', context: 'Graph-based decision trees with React Flow & Inngest' },
        { name: 'AI Token Economics', context: 'Token metering, cached prompt vs. reasoning output pricing' },
        { name: 'Durable Step Retries', context: 'Inngest step.run validation & model error recovery' },
        { name: 'Evaluation & Parsing', context: 'Deterministic binary (YES/NO) and structured JSON extraction' },
      ],
    },
    {
      title: 'Backend & Frameworks',
      skills: [
        { name: 'FastAPI', context: 'High-performance async Python endpoints & Pydantic schemas' },
        { name: 'Node.js & Express', context: 'RESTful architecture, custom middleware, webhook ingestion' },
        { name: 'Next.js 15 & React', context: 'App router, interactive graph workspaces, client state' },
        { name: 'Swagger / OpenAPI', context: 'Interactive API documentation & schema specification' },
        { name: 'Tailwind CSS', context: 'Modern design systems, responsive layouts, dark themes' },
      ],
    },
    {
      title: 'Async, Cloud & Infrastructure',
      skills: [
        { name: 'Inngest', context: 'Event-driven background jobs, durable step functions, cron triggers' },
        { name: 'Stripe API', context: 'Signature-verified webhooks, checkout sessions, subscription sync' },
        { name: 'Docker & Compose', context: 'Multi-container orchestration for APIs and databases' },
        { name: 'Supabase Auth', context: 'Stateless JWT verification and user access policies' },
        { name: 'Playwright', context: 'Headless browser automation and server-side PDF generation' },
        { name: 'SQLite & PostgreSQL', context: 'Native Node DatabaseSync, pg connection pooling' },
      ],
    },
  ] as SkillCategory[],

  education: {
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'COMSATS University Islamabad, Wah Campus',
    focusAreas: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems & Concurrency',
      'Object-Oriented Software Design',
      'Artificial Intelligence & Applied ML'
    ],
    note: 'Active software engineering undergraduate student at COMSATS University Islamabad (Wah Campus) focusing on AI systems and backend infrastructure.',
  },

  achievements: [
    {
      title: 'FlyRank AI Internship Capstone Completion',
      organization: 'FlyRank AI',
      year: '2026',
      description:
        'Engineered the core Usage Metering & Billing Engine with token-aware cost pricing, idempotency guarantees, and Stripe integration; built resilient Inngest background job workers in Python.'
    },
    {
      title: 'Production-Ready Workflow Execution Graphs',
      organization: 'Open Source / GitHub',
      year: '2026',
      description:
        'Authored and published the YES/NO AI Workflows architecture combining React Flow visual canvases with Inngest durable steps and OpenAI decision evaluations.'
    },
    {
      title: 'Full-Stack & Backend Systems Track',
      organization: 'Verified Repositories',
      year: '2026',
      description:
        'Shipped 6 public open-source implementations spanning TypeScript, Python, Node.js, and Java demonstrating end-to-end reliability from database containerization to headless browser document generation.'
    }
  ]
};
