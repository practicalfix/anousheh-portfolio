export interface LearningItem {
  title: string;
  description?: string;
}

export interface LearningSection {
  id: string;
  title: string;
  icon: string;
  items: LearningItem[];
}

export const currentLearningData: LearningSection[] = [
  {
    id: 'currently-studying',
    title: 'Currently Studying',
    icon: 'school',
    items: [
      { title: 'Operating Systems' },
      { title: 'Computer Architecture' },
      { title: 'Web Development' },
    ]
  },
  {
    id: 'currently-exploring',
    title: 'Currently Exploring',
    icon: 'explore',
    items: [
      { title: 'Frappe Framework' },
      { title: 'Docker Containerization' },
      { title: 'CI/CD Pipelines' },
    ]
  },
  {
    id: 'upcoming-goals',
    title: 'Upcoming Goals',
    icon: 'track_changes',
    items: [
      { title: 'Complete STAROS and deploy Diskette together' },
      { title: 'Strengthen React and TypeScript through real projects' },
      { title: 'Master Data Structures & Algorithms (DSA)' },
      { title: 'Explore Cybersecurity fundamentals' },
    ]
  }
];
