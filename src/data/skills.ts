export type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner' | 'Learning' | undefined;

export interface Skill {
  name: string;
  level?: SkillLevel;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    icon: 'code',
    skills: [
      { name: 'Java', level: 'Advanced' },
      { name: 'C', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Learning' },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'web',
    skills: [
      { name: 'React', level: 'Learning' },
      { name: 'Next.js', level: 'Learning' },
      { name: 'Tailwind CSS', level: 'Learning' },
    ]
  },
  {
    id: 'frameworks-technologies',
    title: 'Frameworks & Technologies',
    icon: 'api',
    skills: [
      { name: 'Google Gemini API', level: 'Learning' },
      { name: 'Ollama', level: 'Learning' },
    ]
  },
  {
    id: 'development-tools',
    title: 'Development Tools',
    icon: 'build',
    skills: [
      { name: 'Git', level: 'Learning' },
    ]
  }
];
