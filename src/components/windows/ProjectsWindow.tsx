import { useState } from 'react';
import { projectsData } from '../../data/projects';
import type { Project } from '../../data/projects';
import placeholderImg from '../../assets/projects/placeholder.png';

interface ProjectCardProps {
  project: Project;
  onImageClick: (imgSrc: string) => void;
}

function ProjectCard({ project, onImageClick }: ProjectCardProps) {
  const images = project.images?.length ? project.images : [placeholderImg];

  return (
    <div className="bg-surface-container-low border border-outline-variant/30 rounded-sm p-4 flex flex-col sm:flex-row gap-4 hover:border-primary/50 transition-colors group">
      
      {/* Thumbnails (Horizontal Scroll if multiple) */}
      <div className="w-full sm:w-40 shrink-0 flex gap-2 overflow-x-auto snap-x custom-scrollbar pb-1">
        {images.map((imgSrc, idx) => (
          <div 
            key={idx} 
            onClick={() => onImageClick(imgSrc)}
            className="w-full shrink-0 relative overflow-hidden rounded-sm border border-outline-variant/30 aspect-video bg-surface-container-highest snap-center cursor-pointer"
          >
            <img 
              src={imgSrc} 
              alt={`${project.name} preview ${idx + 1}`} 
              className="w-full h-full object-cover transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 gap-2 justify-between">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-window-title text-primary uppercase text-xl font-bold tracking-widest truncate">
              {project.name}
            </h3>
            {/* Status Badge */}
            <span className={`text-[9px] font-label-pixel tracking-widest px-2.5 py-1 rounded-full shrink-0 uppercase border ${project.status === 'Completed' ? 'border-primary/60 text-primary bg-primary/10 shadow-[0_0_8px_rgba(var(--color-primary),0.2)]' : 'border-secondary/60 text-secondary bg-secondary/10 shadow-[0_0_8px_rgba(var(--color-secondary),0.2)]'}`}>
              {project.status}
            </span>
          </div>
          
          <p className="font-mono text-[13px] text-on-surface-variant leading-relaxed line-clamp-3 mb-3">
            {project.description}
          </p>
          
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((t, i) => (
              <span key={i} className="text-[10px] font-label-pixel tracking-wider px-2 py-1 bg-surface-container-highest text-on-surface border border-outline-variant/30 rounded-full shadow-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        {/* Actions / Buttons */}
        <div className="flex gap-3">
          {project.github ? (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest border border-outline-variant hover:border-primary/80 hover:bg-primary/10 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(var(--color-primary),0.2)] transition-all duration-300 rounded-sm text-xs font-window-title tracking-widest text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              GITHUB
            </a>
          ) : (
            <button 
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-sm text-xs font-window-title tracking-widest text-on-surface-variant opacity-50 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
              COMING SOON
            </button>
          )}
          {project.demo && (
            <a 
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 hover:border-primary hover:bg-primary/30 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(var(--color-primary),0.4)] transition-all duration-300 rounded-sm text-xs font-window-title tracking-widest text-primary"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              LIVE DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsWindow() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onImageClick={setSelectedImage} />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[80vw] max-h-[80vh] flex flex-col group" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center bg-surface-variant text-on-surface hover:bg-error hover:text-on-error border border-outline-variant transition-colors rounded-sm z-10 opacity-0 group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            
            {/* Image Container */}
            <div className="relative bg-surface p-2 border-2 border-outline-variant shadow-2xl rounded-sm">
              <img 
                src={selectedImage} 
                alt="Enlarged project screenshot" 
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
