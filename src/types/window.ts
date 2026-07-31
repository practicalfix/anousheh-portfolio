export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  position: { x: number; y: number };
  previousPosition?: { x: number; y: number };
  size?: { width: number; height: number };
  previousSize?: { width: number; height: number };
  zIndex: number;
}
