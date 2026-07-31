import { useEffect, useRef, useState } from 'react';

export function CharacterCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    setIsCoarse(coarseQuery.matches);
    const coarseListener = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    coarseQuery.addEventListener('change', coarseListener);
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    return () => {
      coarseQuery.removeEventListener('change', coarseListener);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId: number;
    let currentHoverState = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX - 16}px`;
      cursor.style.top = `${mouseY - 16}px`;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const updateCursorState = () => {
      const hoveredElement = document.elementFromPoint(mouseX, mouseY);
      const isClickable = hoveredElement && (
        hoveredElement.tagName === 'BUTTON' || 
        hoveredElement.closest('.cursor-pointer') || 
        hoveredElement.closest('a') ||
        hoveredElement.closest('.window-title-bar')
      );
      
      if (isClickable && !currentHoverState) {
        currentHoverState = true;
        setIsHovering(true);
      } else if (!isClickable && currentHoverState) {
        currentHoverState = false;
        setIsHovering(false);
      }
      animationFrameId = requestAnimationFrame(updateCursorState);
    };

    animationFrameId = requestAnimationFrame(updateCursorState);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCoarse]);

  if (isCoarse) return null;

  const scale = isHovering && !reducedMotion ? 1.2 : 1;
  const scaleY = isClicking && !reducedMotion ? 0.8 : 1;
  const earY = isHovering && !reducedMotion ? "8" : "10";

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="fixed w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center transition-transform duration-100 ease-out"
      style={{
        transform: `scale(${scale}, ${scaleY})`
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect id="body" x="8" y="14" width="16" height="12" fill="white" />
        <rect id="ear-l" x="8" y={earY} width="4" height="4" fill="white" className="transition-all duration-100" />
        <rect id="ear-r" x="20" y={earY} width="4" height="4" fill="white" className="transition-all duration-100" />
        <rect id="eye-l" x="11" y="17" width="2" height="2" fill="#131317" />
        <rect id="eye-r" x="19" y="17" width="2" height="2" fill="#131317" />
        <rect id="nose" x="15" y="19" width="2" height="1" fill="#FFB7C5" />
      </svg>
    </div>
  );
}
