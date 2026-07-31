import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import type { WindowState } from '../../types/window';
import { windowContents } from '../../data/portfolio';

export function MenuBar() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0') + ':' +
        now.getSeconds().toString().padStart(2, '0')
      );
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-desktop-margin left-desktop-margin right-desktop-margin z-50 flex items-center justify-between px-window-padding h-12 bg-surface-container/60 backdrop-blur-md border border-outline-variant/30 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-stack-sm">
        <img alt="Pixel Star Logo" className="h-6 w-auto object-contain" src="/assets/logo.png" />
        <span className="font-window-title text-window-title uppercase tracking-widest text-on-surface">StarOS v1.0.0</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest/40 rounded-sm border border-outline-variant/20">
          <span className="material-symbols-outlined text-[16px] text-primary">routine</span>
          <span className="font-label-pixel text-label-pixel text-on-surface">STABLE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-on-surface">wifi</span>
          <span className="font-label-pixel text-label-pixel tabular-nums text-on-surface">{time}</span>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-2 border border-outline-variant/50">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}

interface DockProps {
  windows: WindowState[];
  onOpen: (id: string) => void;
  onRestore: (id: string) => void;
}

export function Dock({ windows, onOpen, onRestore }: DockProps) {
  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-3 bg-surface-container-low/80 backdrop-blur-xl border-2 border-outline-variant/30 rounded-xl shadow-2xl z-50">
      <nav className="flex items-center gap-4">
        {/* Core Apps */}
        <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors flex flex-col items-center gap-1 text-on-surface" onClick={() => onOpen('about')}>
          <span className="material-symbols-outlined">grid_view</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors flex flex-col items-center gap-1 text-on-surface" onClick={() => onOpen('terminal')}>
          <span className="material-symbols-outlined">terminal</span>
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors flex flex-col items-center gap-1 text-on-surface" onClick={() => onOpen('settings')}>
          <span className="material-symbols-outlined">settings</span>
        </button>

        {/* Dynamic Open Windows */}
        {windows.length > 0 && <div className="w-[2px] h-8 bg-outline-variant/50 mx-2" />}
        
        {windows.map(win => {
          const content = windowContents[win.id];
          if (!content) return null;
          return (
            <button 
              key={win.id}
              onClick={() => win.isMinimized ? onRestore(win.id) : onRestore(win.id)}
              className={clsx(
                "p-2 rounded-lg transition-colors flex items-center justify-center relative",
                win.isMinimized ? "bg-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high" : "bg-primary text-on-primary shadow-[0_0_15px_rgba(197,195,229,0.3)]"
              )}
            >
              <span className="material-symbols-outlined">{content.icon}</span>
              {/* Active dot indicator */}
              {!win.isMinimized && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(197,195,229,0.8)]" />}
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
