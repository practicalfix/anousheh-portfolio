import { clsx } from 'clsx';
import { useSettings } from '../../context/SettingsContext';
import type { AnimationSetting } from '../../context/SettingsContext';

const Toggle = ({ label, description, value, onChange }: { label: string, description: string, value: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex flex-col gap-2 p-3 hover:bg-surface-container-highest transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30 rounded-sm" onClick={() => onChange(!value)}>
    <div className="flex items-center justify-between">
      <span className="text-on-surface font-window-title uppercase tracking-widest">{label}</span>
      <div className={clsx("w-10 h-5 rounded-full relative transition-colors border border-outline-variant", value ? "bg-primary" : "bg-surface-container-highest")}>
        <div className={clsx("absolute top-[2px] left-[2px] w-4 h-4 rounded-full shadow-sm transition-transform", value ? "translate-x-5 bg-on-primary" : "translate-x-0 bg-outline-variant")} />
      </div>
    </div>
    <p className="text-on-surface-variant text-[11px] opacity-80">{description}</p>
  </div>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-3">
    <h2 className="text-primary uppercase tracking-widest text-xs font-bold border-b border-outline-variant/30 pb-2">{title}</h2>
    <div className="flex flex-col gap-1">
      {children}
    </div>
  </div>
);

export function SettingsWindow() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="p-4 flex flex-col gap-8 font-mono text-sm">
      
      {/* SECTION 1: Appearance */}
      <Section title="Appearance">
        <Toggle 
          label="Pixel Cursor" 
          description="Enable or disable the custom pixel cat cursor. Turning OFF restores the normal browser cursor."
          value={settings.pixelCursor} 
          onChange={(v) => updateSetting('pixelCursor', v)} 
        />
        <Toggle 
          label="CRT Scanlines" 
          description="Enable or disable CRT scanline overlay."
          value={settings.crtScanlines} 
          onChange={(v) => updateSetting('crtScanlines', v)} 
        />
        <Toggle 
          label="Constellation" 
          description="Show or hide the constellation overlay."
          value={settings.constellation} 
          onChange={(v) => updateSetting('constellation', v)} 
        />
      </Section>
      
      {/* SECTION 2: Background */}
      <Section title="Background">
        <Toggle 
          label="Star Twinkling" 
          description="Enable or disable star twinkling animation."
          value={settings.starTwinkling} 
          onChange={(v) => updateSetting('starTwinkling', v)} 
        />
        <Toggle 
          label="Cosmic Events" 
          description="Enable or disable terminal-triggered cosmic events."
          value={settings.cosmicEvents} 
          onChange={(v) => updateSetting('cosmicEvents', v)} 
        />
      </Section>

      {/* SECTION 3: Motion */}
      <Section title="Motion">
        <div className="flex flex-col gap-3 p-3 border border-transparent rounded-sm">
          <span className="text-on-surface font-window-title uppercase tracking-widest">Animations</span>
          <p className="text-on-surface-variant text-[11px] opacity-80 mb-2">Controls window open/close animations, hover transitions, and dock animations.</p>
          <div className="flex gap-2">
            {(['normal', 'reduced', 'off'] as AnimationSetting[]).map(option => (
              <button
                key={option}
                onClick={() => updateSetting('animations', option)}
                className={clsx(
                  "flex-1 py-1.5 px-3 text-center border text-[12px] uppercase tracking-widest transition-colors rounded-sm",
                  settings.animations === option 
                    ? "bg-primary text-on-primary border-primary" 
                    : "bg-surface-container-low border-outline-variant/50 text-on-surface hover:border-outline-variant"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 4: About STAROS */}
      <Section title="About STAROS">
        <div className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-sm flex flex-col gap-4 text-xs">
          <div>
            <span className="text-on-surface-variant block mb-1">Version:</span>
            <span className="text-primary font-window-title text-sm tracking-widest">STAROS v1.0</span>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-1">Built With:</span>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-1">Developer:</span>
            <span className="text-on-surface">Anousheh</span>
          </div>
        </div>
      </Section>
      
    </div>
  );
}
