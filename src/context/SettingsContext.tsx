import React, { createContext, useContext, useState, useEffect } from 'react';

export type AnimationSetting = 'normal' | 'reduced' | 'off';

export interface Settings {
  pixelCursor: boolean;
  crtScanlines: boolean;
  constellation: boolean;
  starTwinkling: boolean;
  cosmicEvents: boolean;
  animations: AnimationSetting;
}

const defaultSettings: Settings = {
  pixelCursor: true,
  crtScanlines: true,
  constellation: true,
  starTwinkling: true,
  cosmicEvents: true,
  animations: 'normal',
};

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SETTINGS_STORAGE_KEY = 'staros_settings';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to parse settings from localStorage', e);
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
