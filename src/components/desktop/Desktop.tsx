import { useState, useEffect } from 'react';
import { Dock } from '../ui/MenuBar';
import { CosmicBackground } from '../background/CosmicBackground';
import { CharacterCursor } from '../cursor/CharacterCursor';
import { DesktopIcon } from './DesktopIcon';
import { DesktopWindow } from './DesktopWindow';
import { useWindowManager } from '../../hooks/useWindowManager';
import { useSettings } from '../../context/SettingsContext';
import { desktopIcons, bottomIcons, windowContents } from '../../data/portfolio';

// Window content imports
import { AboutWindow } from '../windows/AboutWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { LearningWindow } from '../windows/LearningWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { DefaultWindow } from '../windows/DefaultWindow';
import { TrashWindow } from '../windows/TrashWindow';
import { CredentialsWindow } from '../windows/CredentialsWindow';
import { TerminalWindow } from '../windows/TerminalWindow';
import { SettingsWindow } from '../windows/SettingsWindow';
import { ReadmeWindow } from '../windows/ReadmeWindow';



function DesktopHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full p-8 pointer-events-none z-20 flex justify-between items-start">
      <div className="font-window-title text-4xl text-primary tracking-[0.3em] drop-shadow-[0_0_15px_rgba(157,143,255,0.5)] uppercase opacity-90">
        ANOUSHEH
      </div>
      <div className="font-mono text-xl text-on-surface-variant tracking-widest bg-surface-container-low/30 px-4 py-2 rounded border border-outline-variant/20 backdrop-blur-md">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

export function Desktop() {
  const { windows, openWindow, closeWindow, focusWindow, updatePosition, toggleMinimize, toggleMaximize } = useWindowManager();
  const { settings } = useSettings();

  return (
    <div className={`bg-background font-body-md text-on-surface select-none overflow-hidden h-screen w-screen relative ${settings.pixelCursor ? 'custom-cursor-enabled' : ''} ${settings.animations === 'off' ? 'animations-off' : settings.animations === 'reduced' ? 'animations-reduced' : ''}`}>
      {settings.crtScanlines && <div className="scanline-effect"></div>}
      <div className="boot-sequence relative w-full h-full flex flex-col">
        <main className="flex-1 relative w-full h-full">
          <div className="flex flex-col w-full h-full relative overflow-hidden">
            <CosmicBackground />
            {settings.pixelCursor && <CharacterCursor />}
            
            <DesktopHeader />

            {/* Desktop Icons - Scattered Layout */}
            <div className="absolute inset-0 z-20 pointer-events-auto max-md:flex max-md:flex-wrap max-md:content-start max-md:justify-center max-md:gap-8 max-md:p-6 max-md:pt-32">
              {desktopIcons.map(icon => (
                <DesktopIcon key={icon.id} data={icon} onOpen={openWindow} />
              ))}
            </div>

            {/* Bottom Left Corner Icons */}
            <div className="absolute bottom-32 left-12 z-20 flex flex-col gap-6 items-center pointer-events-auto">
              {bottomIcons.map(icon => (
                <div key={icon.id} className="group flex flex-col items-center gap-1 cursor-pointer" onClick={() => openWindow(icon.windowId)} style={{ transform: icon.transform }}>
                  {(icon as any).icon ? (
                    <span className="material-symbols-outlined text-[40px] text-tertiary-fixed-dim group-hover:text-secondary transition-colors">{(icon as any).icon}</span>
                  ) : (
                    <div className="w-14 h-14 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/assets/folder-sprite.png')", backgroundPosition: (icon as any).bgPosition, backgroundSize: '600% 100%' }}></div>
                  )}
                  <span className="font-label-pixel text-label-pixel bg-surface-container-low px-1 group-hover:bg-primary group-hover:text-on-primary transition-colors">{icon.label}</span>
                </div>
              ))}
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none z-30" id="window-layer">
              {windows.map(win => {
                const content = windowContents[win.id];
                if (!content) return null;
                return (
                  <DesktopWindow
                    key={win.id}
                    id={win.id}
                    title={content.title}
                    icon={content.icon}
                    position={win.position}
                    zIndex={win.zIndex}
                    className={
                      win.id === 'about' ? 'w-[520px]' : 
                      win.id === 'terminal' || win.id === 'projects' || win.id === 'certificates' || win.id === 'skills' || win.id === 'learning' || win.id === 'contact' ? 'w-[650px]' : 
                      undefined
                    }
                    isFocused={Math.max(...windows.map(w => w.zIndex)) === win.zIndex && !win.isMinimized}
                    isMaximized={win.isMaximized || false}
                    isMinimized={win.isMinimized || false}
                    onClose={closeWindow}
                    onFocus={focusWindow}
                    onMove={updatePosition}
                    onMinimize={toggleMinimize}
                    onMaximize={toggleMaximize}
                  >
                    {win.id === 'about' ? <AboutWindow /> : 
                     win.id === 'projects' ? <ProjectsWindow /> : 
                     win.id === 'skills' ? <SkillsWindow /> :
                     win.id === 'learning' ? <LearningWindow /> :
                     win.id === 'certificates' ? <CredentialsWindow /> :
                     win.id === 'contact' ? <ContactWindow /> :
                     win.id === 'trash' ? <TrashWindow /> :
                     win.id === 'terminal' ? <TerminalWindow /> :
                     win.id === 'settings' ? <SettingsWindow /> : 
                     win.id === 'readme' ? <ReadmeWindow /> : null}
                    {/* Fallback for un-implemented windows */}
                    {win.id !== 'about' && win.id !== 'projects' && win.id !== 'skills' && win.id !== 'learning' && win.id !== 'contact' && win.id !== 'terminal' && win.id !== 'settings' && win.id !== 'certificates' && win.id !== 'trash' && win.id !== 'readme' && (
                      <DefaultWindow title={content.title} />
                    )}
                  </DesktopWindow>
                );
              })}
            </div>
            
            
          </div>
        </main>
        
        <Dock 
          windows={windows} 
          onOpen={openWindow} 
          onRestore={(id) => {
            const win = windows.find(w => w.id === id);
            if (win?.isMinimized) {
              toggleMinimize(id);
            }
            focusWindow(id);
          }}
        />
      </div>
    </div>
  );
}
