import type { Profile, Skill, Project, Experience, Education } from '../types/portfolio';

export const profile: Profile = {
  name: 'Ramesh Kanna',
  title: 'Full Stack Developer',
  tagline: 'Django • React • Scalable Web Applications • Performance Optimization',
  email: 'rameshkanna788@gmail.com',
  phone: '+91-637-467-5973',
  summary: `Full Stack Developer with 2+ years of experience building production web applications using Django, React, and PostgreSQL. Skilled in developing REST APIs, implementing real-time features, and optimizing application performance. Strong foundation in end-to-end feature development, from database design to responsive frontend interfaces. 200+ LeetCode problems solved demonstrating advanced algorithmic proficiency.`,
  location: 'Puducherry, India',
  links: {
    github: 'https://github.com/rameshkanna74',
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
    'Full Stack Development',
    'Real-time Applications',
    'Performance Optimization',
    'Technical Blogging & Open Source',
  ],
};

export const skills: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'Frontend', level: 90, icon: 'vscode-icons:file-type-reactjs', yearsOfExperience: 2 },
  { id: 'redux', name: 'Redux', category: 'Frontend', level: 85, icon: 'logos:redux' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'Frontend', level: 90, icon: 'vscode-icons:file-type-js-official' },
  { id: 'html5', name: 'HTML5', category: 'Frontend', level: 90, icon: 'vscode-icons:file-type-html' },
  { id: 'css3', name: 'CSS3', category: 'Frontend', level: 85, icon: 'vscode-icons:file-type-css' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: 'devicon:tailwindcss' },
  
  // Backend
  { id: 'python', name: 'Python', category: 'Backend', level: 95, icon: 'vscode-icons:file-type-python', yearsOfExperience: 2 },
  { id: 'django', name: 'Django', category: 'Backend', level: 95, icon: 'simple-icons:django', yearsOfExperience: 2 },
  { id: 'drf', name: 'Django Rest Framework', category: 'Backend', level: 90, icon: 'simple-icons:django' },
  { id: 'fastapi', name: 'FastAPI', category: 'Backend', level: 85, icon: 'devicon:fastapi' },
  { id: 'celery', name: 'Celery', category: 'Backend', level: 85, icon: 'simple-icons:celery' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', level: 90, icon: 'devicon:postgresql' },
  { id: 'redis', name: 'Redis', category: 'Database', level: 85, icon: 'devicon:redis' },
  { id: 'sql-opt', name: 'SQL Optimization', category: 'Database', level: 85, icon: 'mdi:database-search' },
  { id: 'db-design', name: 'Database Design', category: 'Database', level: 85, icon: 'mdi:database-edit' },
  
  // Tools & DevOps
  { id: 'git', name: 'Git', category: 'Tools & DevOps', level: 90, icon: 'devicon:git' },
  { id: 'docker', name: 'Docker', category: 'Tools & DevOps', level: 85, icon: 'devicon:docker' },
  { id: 'linux', name: 'Linux', category: 'Tools & DevOps', level: 90, icon: 'devicon:linux' },
  { id: 'nginx', name: 'Nginx', category: 'Tools & DevOps', level: 80, icon: 'devicon:nginx' },
  { id: 'aws', name: 'AWS (EC2, S3)', category: 'Tools & DevOps', level: 75, icon: 'devicon:amazonwebservices' },
  
  // Core Competencies
  { id: 'rest-api', name: 'REST APIs', category: 'Core Competencies', level: 95, icon: 'mdi:api' },
  { id: 'websockets', name: 'WebSockets', category: 'Core Competencies', level: 85, icon: 'mdi:web' },
  { id: 'jwt', name: 'JWT Authentication', category: 'Core Competencies', level: 90, icon: 'mdi:shield-key' },
  { id: 'perf-opt', name: 'Performance Optimization', category: 'Core Competencies', level: 90, icon: 'mdi:speedometer' },
];

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Full-featured e-commerce platform with product catalog, shopping cart, and Stripe integration',
    longDescription: `Built a full-featured e-commerce platform with a product catalog, shopping cart, and integrated Stripe payment processing. Developed a React SPA with Redux for state management, implementing responsive design for mobile and desktop users. Designed RESTful APIs for order management, payment processing, and inventory tracking with proper error handling.`,
    tech: ['Django', 'React', 'PostgreSQL', 'Redux', 'Stripe API'],
    highlights: [
      'Built full-featured e-commerce platform with Stripe payment processing',
      'Developed React SPA with Redux for state management',
      'Designed RESTful APIs for order management and inventory tracking',
    ],
    year: 2024,
  },
  {
    id: 'chat-app',
    title: 'Real-Time Chat Application',
    category: 'Full Stack',
    description: 'Real-time messaging system using Django Channels and WebSockets',
    longDescription: `Built a real-time messaging system using Django Channels and WebSockets, supporting concurrent user connections. Implemented Redis as a channel layer backend for message routing and delivery across multiple server instances. Developed WebSocket features including typing indicators, read receipts, and instant message notifications.`,
    tech: ['Django Channels', 'React', 'WebSockets', 'Redis'],
    highlights: [
      'Built real-time messaging system supporting concurrent connections',
      'Implemented Redis channel layer for message routing',
      'Developed typing indicators, read receipts, and instant notifications',
    ],
    year: 2024,
  },
];

export const experience: Experience[] = [
  {
    id: 'freelance',
    company: 'Freelance Full Stack Developer',
    position: 'Independent Contractor',
    location: 'Remote',
    startDate: 'July 2025',
    endDate: 'Present',
    description: 'Providing full-stack development services to clients, specializing in Python/Django backends and modern frontend frameworks. Building custom web applications, MVPs, and enterprise solutions.',
    achievements: [
      'Developing custom web applications using Django, FastAPI, React, and Vue.js',
      'Architecting scalable backend systems with PostgreSQL, Redis, and RESTful APIs',
      'Implementing responsive frontends with modern UI/UX best practices',
      'Providing technical consulting and code optimization services',
      'Managing multiple client projects with agile methodologies',
    ],
    tech: ['Python', 'Django', 'FastAPI', 'React', 'Vue.js', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'pixirus',
    company: 'Pixirus Content and Services LLP',
    position: 'Full Stack Developer',
    location: 'Puducherry, India',
    startDate: '2023-10',
    endDate: '2025-06',
    description: 'Developed and deployed full-stack features for a Django + React platform',
    achievements: [
      'Developed and deployed full-stack features for a Django + React platform, handling complete development lifecycle from database schema to UI components',
      'Built real-time analytics dashboard using Django REST Framework and React, automating previously manual reporting processes',
      'Optimized database queries and implemented Redis caching, reducing average page load times from 2.1s to 1.3s',
      'Containerized application using Docker, streamlining deployment workflow and ensuring environment consistency',
      'Collaborated with cross-functional teams to translate business requirements into technical solutions',
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Django REST Framework'],
  },
  {
    id: 'appxperts',
    company: 'AppXperts',
    position: 'Python Developer',
    location: 'Puducherry, India',
    startDate: '2022-11',
    endDate: '2023-07',
    description: 'Developed REST APIs for an education platform serving thousands of users',
    achievements: [
      'Developed REST APIs using Django REST Framework for education platform, maintaining response times under 300ms',
      'Implemented query optimization strategies including select_related, prefetch_related, and database indexing',
      'Built JWT-based authentication system with role-based access control, securing user data',
      'Contributed to backend architecture supporting multi-tenant system with thousands of daily active users',
      'Participated in code reviews and resolved production issues, ensuring system stability',
    ],
    tech: ['Django REST Framework', 'PostgreSQL', 'JWT', 'Python'],
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
