import smartquizsystemImg from '../assets/projects/smartquizsystem-real.png';
import manhwavaultImg1 from '../assets/projects/manhwavault-1.png';
import manhwavaultImg2 from '../assets/projects/manhwavault-2.png';
import starosImg from '../assets/projects/staros-real.png';

export interface Project {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress';
  technologies: string[];
  description: string;
  images?: string[];
  github: string | null;
  demo: string | null;
}

export const projectsData: Project[] = [
  {
    id: 'smartquizsystem',
    name: 'SmartQuizSystem',
    status: 'Completed',
    technologies: ['Java', 'Java Swing', 'Google Gemini API', 'Ollama', 'HttpClient'],
    description: 'Terminal-inspired Java quiz application featuring AI-powered question generation with graceful fallback from Google Gemini to Ollama to an offline question bank.',
    images: [smartquizsystemImg],
    github: 'https://github.com/practicalfix/terminal-quiz-app.git',
    demo: null,
  },
  {
    id: 'diskette',
    name: 'diskette',
    status: 'In Progress',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    description: 'A clean and modern personal library for organizing and tracking manga, manhwa, and manhua.',
    images: [manhwavaultImg1, manhwavaultImg2],
    github: null,
    demo: null,
  },
  {
    id: 'staros',
    name: 'STAROS',
    status: 'In Progress',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    description: 'A desktop-inspired interactive portfolio designed to resemble a modern operating system while remaining fully responsive.',
    images: [starosImg],
    github: null,
    demo: null,
  }
];
