export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  category: string;
  status: 'Deployed Live' | 'Completed' | 'Prototype' | 'Campus Initiative';
  techStack: string[];
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
  images?: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillGroup {
  tier: 'Intermediate' | 'Beginner' | 'Applied Experience';
  description: string;
  skills: { name: string; focus: string; icon?: string }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Leadership' | 'Certification' | 'Technical Workshop';
  description: string;
  highlight: string;
}
