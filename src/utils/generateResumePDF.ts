import { jsPDF } from 'jspdf';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const downloadResumePDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(20, 20, 25);
  doc.text(PORTFOLIO_DATA.personal.name.toUpperCase(), margin, y);

  // Subtitle / Headline
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(50, 60, 80);
  doc.text('Software Engineering Student & Aspiring AI Engineer', margin, y);

  // Contact Strip
  y += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(90, 100, 115);
  const contactText = `${PORTFOLIO_DATA.personal.email}  |  github.com/${PORTFOLIO_DATA.personal.githubUsername}  |  linkedin.com/in/abdul-rafay-7564033b5  |  Lahore, Pakistan`;
  doc.text(contactText, margin, y);

  // Horizontal Divider
  y += 4;
  doc.setDrawColor(210, 215, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, margin + contentWidth, y);

  // SECTION HELPER
  const addSectionTitle = (title: string) => {
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, y);
    y += 1.5;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, y, margin + contentWidth, y);
    y += 3.5;
  };

  // SUMMARY
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryText =
    'Software engineering student with hands-on production experience designing and building asynchronous AI workflows, graph-based decision engines, and token-aware metering architectures. Proven capability in Python, FastAPI, TypeScript, Node.js, and Inngest durable steps, with a focus on systems reliability and API mechanics.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 3.8;

  // WORK EXPERIENCE
  addSectionTitle('Work Experience');
  const exp = PORTFOLIO_DATA.experience[0];
  if (exp) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.role, margin, y);

    const rightText = `${exp.company}  |  ${exp.period} (${exp.location})`;
    const rightTextWidth = doc.getTextWidth(rightText);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(rightText, margin + contentWidth - rightTextWidth, y);

    y += 4;
    const bullets = [
      'Engineered an AI-token-aware Usage Metering & Billing Engine with idempotency guarantees (Idempotency-Key headers) to prevent duplicate billing across concurrent API invocations.',
      'Implemented fine-grained token pricing models independently calculating discounted cached prompt tokens, standard input tokens, and reasoning output tokens.',
      'Enforced plan quota thresholds with proactive HTTP 402 (Upgrade Required) and 429 (Quota Exceeded) responses, synchronized via signature-verified Stripe webhooks.',
      'Architected event-driven asynchronous background jobs in FastAPI & Inngest following the "accept fast (202) -> execute in background -> poll status" pattern with automated retry backoff.',
      'Developed visual decision-tree prototypes coupling React Flow with LLM evaluation steps for deterministic YES/NO graph branching.',
    ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    bullets.forEach((bullet) => {
      const bulletLines = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 4);
      doc.text(bulletLines, margin + 2, y);
      y += bulletLines.length * 3.4;
    });
  }

  // PROJECTS
  addSectionTitle('Featured Engineering Projects');
  const featuredProjects = [
    {
      title: 'YES/NO AI Workflows',
      stack: 'Next.js 15, React Flow, Inngest, OpenAI SDK, TypeScript',
      bullets: [
        'Built a visual canvas graph where nodes execute autonomous binary AI evaluations with strict YES/NO validation.',
        'Engineered durable step execution via Inngest with 2x automated retry resilience on malformed model outputs and live trace visualization.',
      ],
    },
    {
      title: 'AI Usage Metering & Billing Engine (FlyRank Capstone)',
      stack: 'Node.js, Express, Stripe API, SQLite (DatabaseSync), Cron Jobs',
      bullets: [
        'Built production metering service recording billable events with exactly-once idempotency guarantees and cached token discounts.',
        'Enforced real-time quota guard middleware and integrated signature-verified Stripe webhooks for subscription synchronization.',
      ],
    },
    {
      title: 'Background Job API & Study Coach (FlyRank Capstone)',
      stack: 'Python 3.10+, FastAPI, Inngest SDK, Uvicorn',
      bullets: [
        'Engineered an asynchronous microservice returning instant HTTP 202 (<20ms) for heavy compute, backed by Inngest durable workers.',
        'Implemented stateful polling (GET /reports/{id}), failure recovery hooks (report_failed), and scheduled cron triggers.',
      ],
    },
    {
      title: 'Headless Browser PDF Report Engine',
      stack: 'Node.js, Express, Playwright Chromium, SQLite DatabaseSync',
      bullets: [
        'Built high-throughput server-side PDF generator compiling SQLite order analytics into structured print documents.',
      ],
    },
  ];

  featuredProjects.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const stackWidth = doc.getTextWidth(proj.stack);
    doc.text(proj.stack, margin + contentWidth - stackWidth, y);

    y += 3.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    proj.bullets.forEach((b) => {
      const bLines = doc.splitTextToSize(`•  ${b}`, contentWidth - 4);
      doc.text(bLines, margin + 2, y);
      y += bLines.length * 3.1;
    });
    y += 1;
  });

  // TECHNICAL SKILLS
  addSectionTitle('Technical Skills');
  const skillsList = [
    { label: 'Languages', value: 'Python, TypeScript, JavaScript (ES6+), Java, SQL, HTML5/CSS3' },
    { label: 'AI & Workflows', value: 'OpenAI SDK, Prompt Engineering, Agentic Decision Trees, Token Metering Economics, Inngest Steps' },
    { label: 'Backend & Cloud', value: 'FastAPI, Node.js, Express, Next.js 15, REST APIs, Stripe Webhooks, Docker, Supabase Auth, SQLite, PostgreSQL' },
  ];

  skillsList.forEach((s) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(`${s.label}: `, margin, y);
    const labelWidth = doc.getTextWidth(`${s.label}: `);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(s.value, margin + labelWidth, y);
    y += 3.6;
  });

  // EDUCATION
  addSectionTitle('Education & Academic Background');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(PORTFOLIO_DATA.education.degree, margin, y);

  const eduRight = PORTFOLIO_DATA.education.institution;
  const eduRightWidth = doc.getTextWidth(eduRight);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(eduRight, margin + contentWidth - eduRightWidth, y);

  y += 3.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Coursework: ${PORTFOLIO_DATA.education.focusAreas.join('  •  ')}`,
    margin,
    y
  );

  // Trigger browser download
  doc.save('Abdul_Rafay_AI_Engineer_Resume.pdf');
};
