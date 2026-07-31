import React, { useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DesktopWindowProps {
  id: string;
  title: string;
  icon: string;
  position: { x: number; y: number };
  zIndex: number;
  isFocused: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function DesktopWindow({
  id,
  title,
  icon,
  position,
  zIndex,
  isFocused,
  isMaximized,
  isMinimized,
  onClose,
  onFocus,
  onMove,
  onMinimize,
  onMaximize,
  children,
  className
}: DesktopWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = titleBarRef.current;
    if (!bar) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const elementDrag = (e: MouseEvent) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      if (windowRef.current && !isMaximized) {
        const newY = windowRef.current.offsetTop - pos2;
        const newX = windowRef.current.offsetLeft - pos1;
        
        // Update local DOM immediately for smooth dragging
        windowRef.current.style.top = `${newY}px`;
        windowRef.current.style.left = `${newX}px`;
      }
    };

    const closeDragElement = () => {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
      
      // Sync final position to state
      if (windowRef.current) {
        onMove(id, {
          x: windowRef.current.offsetLeft,
          y: windowRef.current.offsetTop
        });
      }
    };

    const dragMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      if (isMaximized || window.innerWidth <= 768) return; // Disable dragging when maximized or on mobile
      pos3 = e.clientX;
      pos4 = e.clientY;
      onFocus(id);
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    };

    bar.addEventListener('mousedown', dragMouseDown);
    
    return () => {
      bar.removeEventListener('mousedown', dragMouseDown);
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    };
  }, [id, onFocus, onMove, isMaximized]);

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      onMouseDown={() => onFocus(id)}
      className={twMerge(
        clsx(
          "absolute pointer-events-auto bg-surface border-2 shadow-[8px_8px_0px_rgba(0,0,0,0.4)] flex flex-col max-w-[90vw]",
          isFocused ? "border-primary" : "border-outline-variant",
          isMaximized ? "top-14 left-4 right-4 bottom-28 w-auto max-w-none h-auto z-[9999]" : className || "w-[400px]",
          "max-md:!left-0 max-md:!top-0 max-md:!right-0 max-md:!w-full max-md:!h-[calc(100%-80px)] max-md:!max-w-none max-md:!z-[9999]"
        )
      )}
      style={isMaximized ? { zIndex } : { left: position.x, top: position.y, zIndex }}
    >
      <div 
        ref={titleBarRef}
        className={clsx(
          "window-title-bar h-8 flex items-center justify-between px-2 select-none shrink-0",
          isMaximized ? "cursor-default" : "cursor-move max-md:cursor-default",
          isFocused ? "bg-outline-variant" : "bg-surface-container-highest"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">{icon}</span>
          <span className="font-window-title text-window-title uppercase truncate w-48">{title}</span>
        </div>
        <div className="flex gap-1 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-5 h-5 bg-surface-variant border border-outline-variant/50 hover:bg-primary hover:text-on-primary hover:border-primary flex items-center justify-center text-[12px] transition-colors"
          >
            —
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            className="w-5 h-5 bg-surface-variant border border-outline-variant/50 hover:bg-primary hover:text-on-primary hover:border-primary flex items-center justify-center text-[12px] transition-colors"
          >
            □
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-5 h-5 bg-error/80 border border-outline-variant/50 hover:bg-error flex items-center justify-center text-[12px] text-on-error transition-colors"
          >
            X
          </button>
        </div>
      </div>
      
      <div className={clsx(
        "p-window-padding overflow-y-auto custom-scrollbar bg-surface text-on-surface flex-1",
        !isMaximized && (className?.includes('h-') ? "" : "max-h-[500px] max-md:max-h-none")
      )}>
        {children}
      </div>
    </div>
  );
}
