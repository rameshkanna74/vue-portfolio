import type { Profile, Skill, Project, Experience, Education } from '../types/portfolio';

export const profile: Profile = {
  name: 'ラメシュ・カンナ',
  title: 'フルスタックデベロッパー',
  tagline: 'Django • React • スケーラブルなWebアプリケーション • パフォーマンス最適化',
  email: 'rameshkanna788@gmail.com',
  phone: '+91-637-467-5973',
  summary: `Django、React、PostgreSQLを使用した商用Webアプリケーション開発で2年以上の経験を持つフルスタックデベロッパー。REST APIの開発、リアルタイム機能の実装、アプリケーションのパフォーマンス最適化に精通。データベース設計からレスポンシブなフロントエンドインターフェースまで、エンドツーエンドの機能開発に強みを持つ。LeetCodeで200問以上を解決し、高度なアルゴリズム能力を実証しています。`,
  location: 'インド ポンディシェリー',
  links: {
    github: 'https://github.com/rameshkanna74',
    linkedin: 'https://www.linkedin.com/in/ramesh-kanna-046142241/',
    leetcode: 'https://leetcode.com/rameshkanna726',
    portfolio: 'https://rameshkanna77.pythonanywhere.com/',
  },
  languages: [
    { name: 'タミル語', level: 'ネイティブ' },
    { name: '英語', level: 'ビジネスレベル' },
    { name: '日本語', level: '日常会話レベル', certification: 'NAT-TEST 3級取得済み（現在JLPT N2を勉強中）' },
  ],
  interests: [
    'フルスタック開発',
    'リアルタイムアプリケーション',
    'パフォーマンス最適化',
    '技術ブログ & オープンソース',
  ],
};

export const skills: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'フロントエンド', level: 90, icon: 'vscode-icons:file-type-reactjs', yearsOfExperience: 2 },
  { id: 'redux', name: 'Redux', category: 'フロントエンド', level: 85, icon: 'logos:redux' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'フロントエンド', level: 90, icon: 'vscode-icons:file-type-js-official' },
  { id: 'html5', name: 'HTML5', category: 'フロントエンド', level: 90, icon: 'vscode-icons:file-type-html' },
  { id: 'css3', name: 'CSS3', category: 'フロントエンド', level: 85, icon: 'vscode-icons:file-type-css' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'フロントエンド', level: 90, icon: 'devicon:tailwindcss' },
  
  // Backend
  { id: 'python', name: 'Python', category: 'バックエンド', level: 95, icon: 'vscode-icons:file-type-python', yearsOfExperience: 2 },
  { id: 'django', name: 'Django', category: 'バックエンド', level: 95, icon: 'simple-icons:django', yearsOfExperience: 2 },
  { id: 'drf', name: 'Django Rest Framework', category: 'バックエンド', level: 90, icon: 'simple-icons:django' },
  { id: 'fastapi', name: 'FastAPI', category: 'バックエンド', level: 85, icon: 'devicon:fastapi' },
  { id: 'celery', name: 'Celery', category: 'バックエンド', level: 85, icon: 'simple-icons:celery' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'データベース', level: 90, icon: 'devicon:postgresql' },
  { id: 'redis', name: 'Redis', category: 'データベース', level: 85, icon: 'devicon:redis' },
  { id: 'sql-opt', name: 'SQL最適化', category: 'データベース', level: 85, icon: 'mdi:database-search' },
  { id: 'db-design', name: 'データベース設計', category: 'データベース', level: 85, icon: 'mdi:database-edit' },
  
  // Tools & DevOps
  { id: 'git', name: 'Git', category: 'ツール & DevOps', level: 90, icon: 'devicon:git' },
  { id: 'docker', name: 'Docker', category: 'ツール & DevOps', level: 85, icon: 'devicon:docker' },
  { id: 'linux', name: 'Linux', category: 'ツール & DevOps', level: 90, icon: 'devicon:linux' },
  { id: 'nginx', name: 'Nginx', category: 'ツール & DevOps', level: 80, icon: 'devicon:nginx' },
  { id: 'aws', name: 'AWS (EC2, S3)', category: 'ツール & DevOps', level: 75, icon: 'devicon:amazonwebservices' },
  
  // Core Competencies
  { id: 'rest-api', name: 'REST APIs', category: 'コアコンピテンシー', level: 95, icon: 'mdi:api' },
  { id: 'websockets', name: 'WebSockets', category: 'コアコンピテンシー', level: 85, icon: 'mdi:web' },
  { id: 'jwt', name: 'JWT認証', category: 'コアコンピテンシー', level: 90, icon: 'mdi:shield-key' },
  { id: 'perf-opt', name: 'パフォーマンス最適化', category: 'コアコンピテンシー', level: 90, icon: 'mdi:speedometer' },
];

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'Eコマースプラットフォーム',
    category: 'フルスタック',
    description: '商品カタログ、ショッピングカート、Stripe決済を統合したフル機能のEコマースプラットフォーム',
    longDescription: `商品カタログ、ショッピングカート、Stripe決済処理を統合したフル機能のEコマースプラットフォームを構築しました。状態管理にReduxを使用したReact SPAを開発し、モバイルおよびデスクトップユーザー向けのレスポンシブデザインを実装しました。注文管理、決済処理、在庫追跡のためのRESTful APIを、適切なエラー処理を含めて設計しました。`,
    tech: ['Django', 'React', 'PostgreSQL', 'Redux', 'Stripe API'],
    highlights: [
      'Stripe決済処理を備えたフル機能のEコマースプラットフォームを構築',
      '状態管理にReduxを使用したReact SPAを開発',
      '注文管理と在庫追跡のためのRESTful APIを設計',
    ],
    year: 2024,
  },
  {
    id: 'chat-app',
    title: 'リアルタイムチャットアプリケーション',
    category: 'フルスタック',
    description: 'Django ChannelsとWebSocketsを使用したリアルタイムメッセージングシステム',
    longDescription: `Django ChannelsとWebSocketsを使用して、同時ユーザー接続をサポートするリアルタイムメッセージングシステムを構築しました。複数のサーバーインスタンス間でのメッセージルーティングと配信のために、Redisをチャネルレイヤーバックエンドとして実装しました。タイピングインジケーター、既読確認、インスタントメッセージ通知などのWebSocket機能を開発しました。`,
    tech: ['Django Channels', 'React', 'WebSockets', 'Redis'],
    highlights: [
      '同時接続をサポートするリアルタイムメッセージングシステムを構築',
      'メッセージルーティング用のRedisチャネルレイヤーを実装',
      'タイピングインジケーター、既読確認、インスタント通知を開発',
    ],
    year: 2024,
  },
];

export const experience: Experience[] = [
  {
    id: 'pixirus',
    company: 'Pixirus Content and Services LLP',
    position: 'フルスタックデベロッパー',
    location: 'インド ポンディシェリー',
    startDate: '2023-10',
    endDate: '2025-06',
    description: 'Django + Reactプラットフォームのフルスタック機能の開発とデプロイを担当',
    achievements: [
      'Django + Reactプラットフォームのフルスタック機能の開発とデプロイを担当し、データベーススキーマからUIコンポーネントまでの開発ライフサイクル全体を管理',
      'Django REST FrameworkとReactを使用してリアルタイム分析ダッシュボードを構築し、以前は手動だったレポートプロセスを自動化',
      'データベースクエリを最適化し、Redisキャッシュを実装することで、平均ページロード時間を2.1秒から1.3秒に短縮',
      'Dockerを使用してアプリケーションをコンテナ化し、デプロイワークフローを合理化して、環境の一貫性を確保',
      'クロスファンクショナルチームと連携し、ビジネス要件を技術的なソリューションに落とし込み、機能をリリース',
    ],
    tech: ['Django', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Django REST Framework'],
  },
  {
    id: 'appxperts',
    company: 'AppXperts',
    position: 'Python開発者',
    location: 'インド ポンディシェリー',
    startDate: '2022-11',
    endDate: '2023-07',
    description: '数千人のユーザーにサービスを提供する教育プラットフォーム向けのREST APIを開発',
    achievements: [
      '教育プラットフォーム向けにDjango REST Frameworkを使用してREST APIを開発し、レスポンス時間を300ミリ秒未満に維持',
      'select_related、prefetch_related、データベースインデックス作成などのクエリ最適化戦略を実装',
      'ロールベースのアクセス制御を備えたJWTベースの認証システムを構築し、ユーザーデータを保護',
      '数千人のアクティブユーザーを抱えるマルチテナントシステムをサポートするバックエンドアーキテクチャに貢献',
      'コードレビューに参加し、本番環境の問題を解決することで、システムの安定性を確保',
    ],
    tech: ['Django REST Framework', 'PostgreSQL', 'JWT', 'Python'],
  },
];

export const education: Education[] = [
  {
    institution: 'Christ Institute of Technology',
    degree: '学士（B.Tech）',
    field: '電子通信工学科',
    location: 'インド ポンディシェリー',
    startDate: '2018-07',
    endDate: '2022-08',
    gpa: '8.01/10.0',
  },
];
