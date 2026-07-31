import type { ScatteredIconData } from '../../data/portfolio';
import { PixelFolderSVG } from './PixelFolderSVG';

interface DesktopIconProps {
  data: ScatteredIconData;
  onOpen: (id: string) => void;
}

export function DesktopIcon({ data, onOpen }: DesktopIconProps) {
  return (
    <div
      className="absolute max-md:!relative max-md:!left-auto max-md:!top-auto max-md:!transform-none max-md:hover:!scale-105 group flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105"
      onClick={() => onOpen(data.windowId)}
      style={{
        left: `${data.position.x}%`,
        top: `${data.position.y}%`,
        transform: data.transform
      }}
    >
      <div className="w-28 h-28 md:w-32 md:h-32 drop-shadow-xl flex items-center justify-center">
        <PixelFolderSVG className="w-full h-full" variant={data.variant} />
      </div>
      <span className="font-label-pixel text-label-pixel px-3 py-1 bg-surface-container-lowest text-on-surface border-2 border-outline-variant/60 shadow-[3px_3px_0px_rgba(0,0,0,0.8)] group-hover:bg-primary group-hover:text-on-primary transition-colors whitespace-nowrap">
        {data.label}
      </span>
    </div>
  );
}
