import { useState, useEffect } from 'react';

const BOOT_TEXT = [
  "INITIALIZING STAROS KERNEL v1.0.0...",
  "LOADING BIOS MODULES... [OK]",
  "MOUNTING VIRTUAL FILESYSTEM... [OK]",
  "INITIALIZING COSMIC RENDERER... [OK]",
  "LOADING USER PROFILE: ANOUSHEH...",
  "ESTABLISHING NEURAL LINK... [OK]",
  "BYPASSING SECURITY PROTOCOLS... [WARNING: UNAUTHORIZED ACCESS DETECTED]",
  "ACCESS GRANTED.",
  "STARTING WINDOW MANAGER..."
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(c => !c), 400);
    return () => clearInterval(cursorInterval);
  }, []);

  // Scroll text
  useEffect(() => {
    let currentLine = 0;
    
    const nextLine = () => {
      if (currentLine < BOOT_TEXT.length) {
        setLines(prev => [...prev, BOOT_TEXT[currentLine]]);
        currentLine++;
        
        // Randomize delay slightly to look like actual loading
        const delay = Math.random() * 200 + 100;
        setTimeout(nextLine, delay);
      } else {
        // Finished scrolling, wait a moment then complete
        setTimeout(onComplete, 800);
      }
    };
    
    setTimeout(nextLine, 500); // Initial delay
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-black z-[99999] p-8 font-mono text-[#4af626] overflow-hidden flex flex-col">
      <div className="scanline-effect opacity-30 pointer-events-none absolute inset-0"></div>
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-end text-sm md:text-base leading-relaxed tracking-wider drop-shadow-[0_0_8px_rgba(74,246,38,0.8)]">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        <div className="mb-1">
          {showCursor ? <span className="inline-block w-2.5 h-4 bg-[#4af626] translate-y-0.5"></span> : <span className="inline-block w-2.5 h-4 translate-y-0.5"></span>}
        </div>
      </div>
    </div>
  );
}
