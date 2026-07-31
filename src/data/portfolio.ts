import type { DesktopIconData, WindowContentData } from '../types/portfolio';

import type { FolderVariant } from '../components/desktop/PixelFolderSVG';

// Adding position (x, y percentages) for scattering
export interface ScatteredIconData extends DesktopIconData {
  position: { x: number; y: number }; // percentages
  variant: FolderVariant;
}

export const desktopIcons: ScatteredIconData[] = [
  { id: 'icon-about', label: 'ABOUT ME', bgPosition: '', windowId: 'about', transform: 'rotate(-2deg)', position: { x: 15, y: 20 }, variant: 'lavender' },
  { id: 'icon-projects', label: 'PROJECTS', bgPosition: '', windowId: 'projects', transform: 'rotate(1.5deg)', position: { x: 45, y: 20 }, variant: 'violet' },
  { id: 'icon-skills', label: 'SKILLS', bgPosition: '', windowId: 'skills', transform: 'rotate(-1deg)', position: { x: 75, y: 20 }, variant: 'indigo' },
  { id: 'icon-learning', label: 'CURRENTLY EXPLORING', bgPosition: '', windowId: 'learning', transform: 'rotate(2deg)', position: { x: 25, y: 60 }, variant: 'pink' },
  { id: 'icon-certs', label: 'CERTIFICATES', bgPosition: '', windowId: 'certificates', transform: 'rotate(-3deg)', position: { x: 55, y: 60 }, variant: 'lilac' },
  { id: 'icon-contact', label: 'CONTACT', bgPosition: '', windowId: 'contact', transform: 'rotate(1deg)', position: { x: 85, y: 60 }, variant: 'magenta' }
];

export const bottomIcons = [
  { id: 'icon-readme', label: 'Readme.txt', icon: 'description', windowId: 'readme', transform: '' }
];

export const windowContents: Record<string, WindowContentData> = {
  about: { id: 'about', title: 'ABOUT ME', icon: 'person' },
  readme: { id: 'readme', title: 'README.txt', icon: 'info' },
  projects: { id: 'projects', title: 'PROJECTS', icon: 'folder_open' },
  skills: { id: 'skills', title: 'System Capabilities', icon: 'settings_system_daydream' },
  learning: { id: 'learning', title: 'CURRENTLY EXPLORING', icon: 'school' },
  certificates: { id: 'certificates', title: 'Credential Manager', icon: 'workspace_premium' },
  contact: { id: 'contact', title: 'CONTACT', icon: 'mail' },
  trash: { id: 'trash', title: 'TRASH', icon: 'delete' },
  terminal: { id: 'terminal', title: 'TERMINAL', icon: 'terminal' },
  settings: { id: 'settings', title: 'SETTINGS', icon: 'settings' }
};
