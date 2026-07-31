export interface Credential {
  id: string;
  title: string;
  issuer: string;
  type: 'Certificate' | 'Badge';
  year?: string;
  thumbnail?: string;
  localFile: string | null;
  externalUrl: string | null;
  skills?: string[];
}

export const credentialsData: Credential[] = [
  {
    id: 'cert-1',
    title: 'Stay Ahead of the AI Curve',
    issuer: 'Coursera',
    type: 'Certificate',
    year: '2026',
    thumbnail: '/credentials/coursera.png',
    localFile: '/credentials/stay-ahead-ai.pdf',
    externalUrl: null,
    skills: ['AI', 'LLMs'],
  },
  {
    id: 'cert-2',
    title: 'Attention Mechanism',
    issuer: 'Google Cloud Skills Boost',
    type: 'Badge',
    year: '2026',
    thumbnail: '/credentials/google-cloud.png',
    localFile: null,
    externalUrl: 'https://www.skills.google/public_profiles/6b2d1042-9023-4357-8926-4dea18188e89/badges/25325941',
    skills: ['LLMs', 'Transformers'],
  },
  {
    id: 'cert-3',
    title: 'Gen AI: Navigate the Landscape',
    issuer: 'Google Cloud Skills Boost',
    type: 'Badge',
    year: '2026',
    thumbnail: '/credentials/google-cloud.png',
    localFile: null,
    externalUrl: 'https://www.skills.google/public_profiles/6b2d1042-9023-4357-8926-4dea18188e89/badges/25325442',
    skills: ['Google Cloud', 'Generative AI'],
  },
  {
    id: 'cert-4',
    title: 'Future Certifications',
    issuer: 'Coming Soon',
    type: 'Certificate',
    localFile: null,
    externalUrl: null,
  }
];
