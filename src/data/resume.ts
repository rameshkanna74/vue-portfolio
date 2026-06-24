import type { Profile, Skill, Project, Experience, Education } from '../types/portfolio';

export const profile: Profile = {
  name: 'Ramesh Kanna',
  title: 'DevOps Engineer',
  tagline: 'Cloud Infrastructure • CI/CD • Docker & Kubernetes • AWS',
  email: 'rameshkanna788@gmail.com',
  phone: '+91-637-467-5973',
  summary: `DevOps Engineer with 3+ years of hands-on experience automating deployments, managing cloud infrastructure on AWS, and building CI/CD pipelines. Proficient in Docker, Linux, Python scripting, and infrastructure-as-code practices. Proven track record of improving system reliability and deployment velocity — reducing release cycles and backend latency by up to 40%. Passionate about automation, observability, and building scalable, resilient systems.`,
  location: 'Puducherry, India',
  links: {
    github: 'https://github.com/rameshkanna788',
    linkedin: 'https://www.linkedin.com/in/ramesh-kanna-046142241/',
    leetcode: 'https://leetcode.com/rameshkanna726',
    portfolio: 'https://rameshkanna77.pythonanywhere.com/',
  },
  languages: [
    { name: 'Tamil', level: 'Native' },
    { name: 'English', level: 'Professional' },
    { name: 'Japanese', level: 'Conversational', certification: 'NAT 3Q Certification (Currently studying for JLPT N2)' },
  ],
  interests: [
    'Cloud Architecture',
    'Infrastructure as Code',
    'System Reliability',
    'Container Orchestration',
  ],
};

export const skills: Skill[] = [
  // Cloud & Infra
  { id: 'aws', name: 'AWS (EC2, S3, IAM, CloudWatch, RDS)', category: 'Cloud & Infra', level: 85, icon: 'devicon:amazonwebservices', yearsOfExperience: 3 },
  { id: 'linux', name: 'Linux (Ubuntu/CentOS)', category: 'Cloud & Infra', level: 90, icon: 'devicon:linux', yearsOfExperience: 3 },
  { id: 'networking', name: 'Networking Basics', category: 'Cloud & Infra', level: 80, icon: 'mdi:network' },

  // Containers
  { id: 'docker', name: 'Docker', category: 'Containers', level: 90, icon: 'devicon:docker', yearsOfExperience: 3 },
  { id: 'docker-compose', name: 'Docker Compose', category: 'Containers', level: 90, icon: 'devicon:docker' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Containers', level: 75, icon: 'devicon:kubernetes' },

  // CI/CD
  { id: 'github-actions', name: 'GitHub Actions', category: 'CI/CD', level: 85, icon: 'devicon:githubactions' },
  { id: 'jenkins', name: 'Jenkins', category: 'CI/CD', level: 75, icon: 'devicon:jenkins' },
  { id: 'git', name: 'Git', category: 'CI/CD', level: 95, icon: 'devicon:git', yearsOfExperience: 3 },
  { id: 'bash', name: 'Bash Scripting', category: 'CI/CD', level: 85, icon: 'devicon:bash', yearsOfExperience: 3 },

  // IaC & Config
  { id: 'terraform', name: 'Terraform', category: 'IaC & Config', level: 75, icon: 'devicon:terraform' },
  { id: 'ansible', name: 'Ansible', category: 'IaC & Config', level: 70, icon: 'devicon:ansible' },

  // Monitoring
  { id: 'cloudwatch', name: 'AWS CloudWatch', category: 'Monitoring', level: 85, icon: 'logos:aws-cloudwatch' },
  { id: 'prometheus', name: 'Prometheus', category: 'Monitoring', level: 75, icon: 'devicon:prometheus' },
  { id: 'grafana', name: 'Grafana', category: 'Monitoring', level: 75, icon: 'devicon:grafana' },

  // Languages
  { id: 'python', name: 'Python', category: 'Languages', level: 95, icon: 'vscode-icons:file-type-python', yearsOfExperience: 3 },
  { id: 'sql', name: 'SQL', category: 'Languages', level: 90, icon: 'devicon:postgresql' },
  { id: 'yaml', name: 'YAML', category: 'Languages', level: 95, icon: 'mdi:code-json' },
];

export const projects: Project[] = [
  {
    id: 'dockerized-deployment-pipeline',
    title: 'Dockerized Deployment Pipeline',
    category: 'DevOps',
    description: 'Automated build-test-deploy pipeline reducing deployment time from 25m to <5m.',
    longDescription: `Containerized a multi-service Django + PostgreSQL + Redis application using Docker Compose with isolated networks and volume persistence. Automated the build-test-deploy pipeline via GitHub Actions, triggering on push to main and deploying to AWS EC2 with a zero-downtime rolling restart strategy. This eliminated manual deployment steps and standardized the release workflow.`,
    tech: ['Python', 'Docker', 'GitHub Actions', 'AWS EC2', 'Docker Compose'],
    highlights: [
      'Containerized a multi-service application with Docker Compose',
      'Automated CI/CD pipeline using GitHub Actions for zero-downtime deployments',
      'Reduced deployment time from 25 minutes to under 5 minutes',
    ],
    year: 2024,
    businessProblem: 'Manual deployment steps were error-prone and took 25+ minutes per release, causing developer friction and deployment anxiety.',
    architecture: [
      { id: 'gh', label: 'GitHub Actions', icon: 'mdi:github', type: 'CI/CD', desc: 'Runs tests and builds Docker images' },
      { id: 'ec2', label: 'AWS EC2', icon: 'mdi:aws', type: 'Compute', desc: 'Docker host running the application stack' },
      { id: 'db', label: 'PostgreSQL', icon: 'mdi:database', type: 'Database', desc: 'Persistent volume managed by Docker' },
      { id: 'redis', label: 'Redis', icon: 'mdi:memory', type: 'Cache', desc: 'In-memory caching layer' }
    ],
    pipeline: [
      { name: 'Source', status: 'success', duration: '12s', icon: 'mdi:git' },
      { name: 'Build', status: 'success', duration: '1m 45s', icon: 'mdi:docker' },
      { name: 'Test', status: 'success', duration: '45s', icon: 'mdi:flask-outline' },
      { name: 'Deploy', status: 'success', duration: '2m 10s', icon: 'mdi:rocket-launch' }
    ],
    monitoringStrategy: 'Basic health checks via GitHub Actions and EC2 CloudWatch metrics.',
    securityControls: ['IAM Roles for EC2', 'Security Groups restricting DB access', 'Secrets managed via GitHub Secrets'],
    businessImpact: [
      { metric: 'Deployment Time', value: '-80%', label: 'from 25m to <5m' },
      { metric: 'Downtime', value: 'Zero', label: 'Rolling updates' }
    ],
    lessonsLearned: ['Managing persistent volumes in Docker Compose across restarts requires strict volume mapping definitions.']
  },
  {
    id: 'async-document-processing',
    title: 'Async Document Processing System',
    category: 'Cloud & Backend',
    description: 'Scalable async pipeline processing 50K+ documents using Celery, Redis, and AWS S3.',
    longDescription: `Engineered a scalable async pipeline capable of processing over 50,000 documents using Celery workers, a Redis broker, and AWS S3 for artifact storage. Configured AWS CloudWatch alarms and structured log streams to proactively alert on worker failures and queue backlogs. Implemented a robust dead-letter queue strategy to ensure zero document loss during service restarts or network anomalies.`,
    tech: ['Django', 'Celery', 'Redis', 'AWS S3', 'AWS CloudWatch'],
    highlights: [
      'Engineered an async pipeline processing 50K+ documents using Celery and Redis',
      'Configured CloudWatch alarms for proactive failure alerting',
      'Implemented dead-letter queues to ensure zero document loss',
    ],
    year: 2024,
    businessProblem: 'Synchronous document processing was causing API timeouts and dropped requests under heavy load (50K+ docs).',
    architecture: [
      { id: 'api', label: 'Django API', icon: 'mdi:api', type: 'Frontend', desc: 'Receives documents and pushes to queue' },
      { id: 'redis', label: 'Redis Broker', icon: 'mdi:memory', type: 'Message Broker', desc: 'Task queue and message broker' },
      { id: 'worker', label: 'Celery Workers', icon: 'mdi:cog', type: 'Compute', desc: 'Scalable async processing nodes' },
      { id: 's3', label: 'AWS S3', icon: 'mdi:aws', type: 'Storage', desc: 'Final document storage' }
    ],
    monitoringStrategy: 'AWS CloudWatch for queue length metrics and worker health; structured logging for task tracing.',
    reliabilityStrategy: 'Dead-letter queues (DLQ) implemented to catch failed tasks for manual replay, ensuring zero data loss.',
    businessImpact: [
      { metric: 'Throughput', value: '50K+', label: 'Documents processed reliably' },
      { metric: 'Data Loss', value: '0%', label: 'Due to DLQ implementation' }
    ],
    lessonsLearned: ['Idempotency is critical in distributed task queues; workers must handle duplicate tasks gracefully.']
  },
];

export const experience: Experience[] = [
  {
    id: 'freelance',
    company: 'Self-Employed (Freelance)',
    position: 'DevOps Engineer',
    location: 'Remote',
    startDate: '2025-06',
    endDate: 'Present',
    description: 'Architected and deployed production-grade applications across cloud and containerized environments for multiple clients.',
    achievements: [
      'Automated deployment pipelines using GitHub Actions and Bash scripts, reducing manual release effort by ~40% and eliminating deployment errors',
      'Containerized backend applications with Docker and Docker Compose, enabling consistent dev/staging/production environments',
      'Provisioned and managed AWS infrastructure (EC2, S3, IAM roles) to host client applications with 99%+ uptime',
      'Optimized backend performance via query tuning and Redis caching, achieving <100ms API response times under concurrent load',
      'Implemented environment-based config management, separating secrets via .env and AWS parameter store best practices',
      'Shipped client-specific integrations with zero-downtime deployment strategies',
    ],
    tech: ['Docker', 'AWS', 'GitHub Actions', 'Bash', 'Redis', 'Python'],
  },
  {
    id: 'pixirus',
    company: 'Pixirus Content & Services LLP',
    position: 'Backend Python Engineer',
    location: 'Puducherry, India',
    startDate: '2023-10',
    endDate: '2025-06',
    description: 'Managed backend infrastructure supporting a 50K+ document processing pipeline on Linux-based AWS servers.',
    achievements: [
      'Deployed and maintained Django/FastAPI services on AWS EC2 Linux instances, managing process supervision with systemd and Nginx',
      'Built distributed async pipelines using Celery + Redis, reliably processing 50,000+ documents with failure recovery and retry logic',
      'Reduced database query time by 35% through ORM optimization, indexing strategy, and connection pooling',
      'Monitored application health using AWS CloudWatch alarms and structured logging, cutting incident response time significantly',
      'Maintained deployment scripts and environment configs across dev/staging/prod, standardizing release processes via Bash automation',
    ],
    tech: ['AWS EC2', 'Linux', 'Python', 'Celery', 'Redis', 'CloudWatch', 'Nginx', 'Bash'],
  },
  {
    id: 'appxperts',
    company: 'AppXperts',
    position: 'Backend Python Engineer',
    location: 'Puducherry, India',
    startDate: '2022-11',
    endDate: '2023-07',
    description: 'Developed and operated backend APIs serving 10,000+ users on Linux-hosted infrastructure.',
    achievements: [
      'Deployed and operated REST APIs on Linux servers using Gunicorn + Nginx, maintaining stable uptime for 10K+ active users',
      'Improved API throughput by 30% by resolving N+1 query bottlenecks and integrating Redis caching for high-frequency endpoints',
      'Architected scalable backend workflows processing 50,000+ enrollment records with optimized bulk ORM operations and pagination',
      'Participated in code review and release cycles, enforcing Git branching standards and contributing to structured deployment checklists',
    ],
    tech: ['Linux', 'Nginx', 'Gunicorn', 'PostgreSQL', 'Redis', 'Git', 'Python'],
  },
];

export const education: Education[] = [
  {
    institution: 'Christ Institute of Technology',
    degree: 'B.Tech',
    field: 'Electronics and Communication Engineering',
    location: 'Puducherry, India',
    startDate: '2018-07',
    endDate: '2022-08',
    gpa: '8.01/10.0',
  },
];
