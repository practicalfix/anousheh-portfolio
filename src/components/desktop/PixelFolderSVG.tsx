

export type FolderVariant = 'lavender' | 'violet' | 'indigo' | 'pink' | 'lilac' | 'magenta';

const colorMap: Record<FolderVariant, { outline: string, body: string, details: string, back: string }> = {
  lavender: { outline: '#c5c3e5', body: '#483795', details: '#311c7e', back: '#353439' },
  violet: { outline: '#dcb8ff', body: '#3a2b7a', details: '#231551', back: '#2a2638' },
  indigo: { outline: '#b3d4ff', body: '#2d4b7a', details: '#162e52', back: '#252936' },
  pink: { outline: '#ffb3d9', body: '#6a326a', details: '#451a45', back: '#382538' },
  lilac: { outline: '#e6ccff', body: '#49618a', details: '#2b3e61', back: '#2b2c36' },
  magenta: { outline: '#e5a5ff', body: '#5c225c', details: '#3d123d', back: '#331f33' },
};

export function PixelFolderSVG({ className = "", variant = 'lavender' }: { className?: string, variant?: FolderVariant }) {
  const colors = colorMap[variant];

  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', filter: 'drop-shadow(6px 6px 0px rgba(0,0,0,0.5))' }}
      className={className}
    >
      {/* Back tab outline */}
      <rect x="4" y="4" width="10" height="2" fill={colors.outline} />
      <rect x="4" y="4" width="2" height="6" fill={colors.outline} />
      <rect x="14" y="6" width="2" height="4" fill={colors.outline} />
      <rect x="16" y="6" width="12" height="2" fill={colors.outline} />
      <rect x="28" y="6" width="2" height="6" fill={colors.outline} />
      
      {/* Back inner */}
      <rect x="6" y="6" width="8" height="4" fill={colors.back} />
      <rect x="16" y="8" width="12" height="4" fill={colors.back} />
      
      {/* White paper sticking out */}
      <rect x="8" y="8" width="16" height="4" fill="#e4e1e8" />
      <rect x="10" y="10" width="12" height="1" fill="#928f98" />

      {/* Front Cover Outline */}
      <rect x="2" y="12" width="28" height="16" fill={colors.outline} />
      
      {/* Front Cover Inner */}
      <rect x="4" y="14" width="24" height="12" fill={colors.body} />
      
      {/* Front cover details to give it depth and texture */}
      <rect x="6" y="16" width="6" height="2" fill={colors.details} />
      <rect x="24" y="16" width="2" height="2" fill={colors.details} />
      <rect x="4" y="24" width="24" height="2" fill={colors.details} />
    </svg>
  );
}
