import { currentLearningData } from '../../data/currentLearning';
import type { LearningItem } from '../../data/currentLearning';

function LearningCard({ item }: { item: LearningItem }) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-surface-container-lowest border border-outline-variant/20 rounded-sm hover:bg-surface-container-low hover:border-primary/30 transition-all duration-200 group">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[14px] text-primary/70 group-hover:text-primary transition-colors">
          subdirectory_arrow_right
        </span>
        <span className="font-window-title tracking-widest text-on-surface text-sm">{item.title}</span>
      </div>
      {item.description && (
        <span className="font-mono text-xs text-on-surface-variant leading-relaxed mt-1 pl-6">
          {item.description}
        </span>
      )}
    </div>
  );
}

export function LearningWindow() {
  return (
    <div className="flex flex-col gap-6">
      {currentLearningData.map(section => (
        <section key={section.id} className="flex flex-col gap-3">
          {/* Section Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-xl">{section.icon}</span>
            <h2 className="font-window-title text-primary uppercase text-lg tracking-widest">
              {section.title}
            </h2>
          </div>
          
          {/* Items List */}
          <div className="flex flex-col gap-2 pl-1">
            {section.items.map((item, idx) => (
              <LearningCard key={idx} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
