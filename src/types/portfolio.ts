export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  summary: string;
  location: string;
  links: {
    github: string;
    linkedin: string;
    leetcode: string;
    portfolio?: string;
  };
  languages: Language[];
  interests: string[];
}

export interface Language {
  name: string;
  level: string;
  certification?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  icon: string;
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  highlights: string[];
  year: number;
  images?: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
