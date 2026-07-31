export interface ContactItem {
  id: string;
  platform: string;
  username?: string;
  url: string | null;
  icon: string;
  buttonLabel: string;
}

export const contactData: ContactItem[] = [
  {
    id: 'github',
    platform: 'GitHub',
    username: 'practicalfix',
    url: 'https://github.com/practicalfix',
    icon: 'code',
    buttonLabel: 'OPEN GITHUB'
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    username: 'Anousheh Qureshi',
    url: 'https://www.linkedin.com/in/anousheh-qureshi-2002a1345',
    icon: 'work',
    buttonLabel: 'OPEN LINKEDIN'
  },
  {
    id: 'resume',
    platform: 'Resume',
    url: null, // User can upload PDF later
    icon: 'description',
    buttonLabel: 'DOWNLOAD RESUME'
  }
];
