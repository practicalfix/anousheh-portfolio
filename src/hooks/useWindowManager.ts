import { useState, useCallback, useRef } from 'react';
import type { WindowState } from '../types/window';

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const activeZIndex = useRef(100);

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      // If already open, just bring to front (and unminimize if it was minimized)
      if (prev.some((w) => w.id === id)) {
        activeZIndex.current += 1;
        const newZ = activeZIndex.current;
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
        );
      }
      
      // Otherwise open new window with intelligent positioning
      activeZIndex.current += 1;
      const newZ = activeZIndex.current;
      
      const ww = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const wh = typeof window !== 'undefined' ? window.innerHeight : 800;
      
      // Assumed window size
      const safeW = Math.max(ww - 450, 50);
      const safeH = Math.max(wh - 350, 50);
      
      const slots = [
        { x: Math.min(50, safeW), y: Math.min(50, safeH) },
        { x: Math.max(50, safeW - 50), y: Math.min(50, safeH) },
        { x: Math.min(50, safeW), y: Math.max(50, safeH - 50) },
        { x: Math.max(50, safeW - 50), y: Math.max(50, safeH - 50) },
        { x: Math.min(safeW / 2, safeW), y: Math.min(safeH / 2, safeH) },
      ];

      let newPos = null;
      for (const slot of slots) {
        const isOccupied = prev.some(w => 
          Math.abs(w.position.x - slot.x) < 100 && 
          Math.abs(w.position.y - slot.y) < 100
        );
        if (!isOccupied) {
          newPos = slot;
          break;
        }
      }

      if (!newPos) {
        const staggerOffset = (prev.length * 40) % (Math.min(200, safeW, safeH));
        newPos = { x: 50 + staggerOffset, y: 50 + staggerOffset };
      }

      return [
        ...prev,
        {
          id,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: newPos,
          zIndex: newZ,
          size: { width: 400, height: 400 } // Default size
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    activeZIndex.current += 1;
    const newZ = activeZIndex.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id && !w.isMinimized ? { ...w, zIndex: newZ } : w))
    );
  }, []);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows((prev) => 
      prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    activeZIndex.current += 1;
    const newZ = activeZIndex.current;
    setWindows((prev) => prev.map(w => {
      if (w.id !== id) return w;
      
      if (w.isMaximized) {
        // Restore
        return {
          ...w,
          isMaximized: false,
          zIndex: newZ,
          position: w.previousPosition || w.position,
          size: w.previousSize || w.size
        };
      } else {
        // Maximize
        const ww = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const wh = typeof window !== 'undefined' ? window.innerHeight : 800;
        return {
          ...w,
          isMaximized: true,
          zIndex: newZ,
          previousPosition: w.position,
          previousSize: w.size,
          // Maximize within safe area (below menu, above dock)
          position: { x: 20, y: 60 },
          size: { width: ww - 40, height: wh - 160 }
        };
      }
    }));
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    updatePosition,
    updateSize,
    toggleMinimize,
    toggleMaximize
  };
}
