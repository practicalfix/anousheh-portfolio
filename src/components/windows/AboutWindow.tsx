

// The custom pixel art avatar for the about me section
function ProfileAvatar() {
  return (
    <div className="w-32 h-32 bg-surface-container-low border-2 border-outline-variant flex items-center justify-center shrink-0 relative overflow-hidden group p-1">
      {/* Decorative frame elements */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary m-1 opacity-50 z-10" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary m-1 opacity-50 z-10" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary m-1 opacity-50 z-10" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary m-1 opacity-50 z-10" />
      
      {/* Pixel Art Image */}
      <img 
        src="/src/assets/profile/about-me.png" 
        alt="Anousheh Pixel Art" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function AboutWindow() {
  return (
    <div className="flex flex-col gap-8 text-sm">
      
      {/* Main Profile Section */}
      <div className="flex gap-6">
        <ProfileAvatar />
        
        <div className="flex flex-col flex-1">
          <div className="mb-4">
            <h1 className="font-window-title text-2xl tracking-widest text-primary mb-1">ANOUSHEH</h1>
            <h2 className="font-label-pixel text-[10px] tracking-[0.2em] uppercase text-on-surface-variant border-b border-outline-variant/30 pb-2">
              COMPUTER SCIENCE ENGINEERING STUDENT
            </h2>
          </div>
          
          <div className="text-on-surface opacity-90 leading-relaxed font-mono text-[13px] space-y-4">
            <p>
              Hi, I'm Anousheh.
            </p>
            <p>
              I'm a Computer Science Engineering student interested in understanding how things work and turning ideas into things I can actually build. I'm currently strengthening my programming fundamentals while exploring web development and building projects along the way.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent my-2" />

      {/* Secondary Section */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-pixel text-[10px] tracking-[0.2em] text-primary">BEYOND CODE</h3>
        <div className="font-mono text-[13px] text-on-surface-variant flex flex-wrap gap-x-3 gap-y-2 items-center">
          <span>Sketching</span>
          <span className="text-outline-variant text-[10px]">■</span>
          <span>Rock music</span>
          <span className="text-outline-variant text-[10px]">■</span>
          <span>Building things</span>
        </div>
      </div>
      
    </div>
  );
}
