import { skillsData } from '../../data/skills';
import type { SkillLevel, Skill } from '../../data/skills';

function getBadgeColor(level?: SkillLevel) {
  switch (level) {
    case 'Advanced': return 'text-primary bg-primary/10 border-primary/50';
    case 'Intermediate': return 'text-secondary bg-secondary/10 border-secondary/50';
    case 'Beginner': return 'text-orange-300 bg-orange-300/10 border-orange-300/50';
    case 'Learning': return 'text-emerald-300 bg-emerald-300/10 border-emerald-300/50';
    default: return 'text-on-surface-variant bg-surface-container-highest border-outline-variant/30';
  }
}

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-surface-container-lowest border border-outline-variant/20 rounded-sm hover:bg-surface-container-low transition-colors duration-200">
      <div className="flex justify-between items-start gap-2">
        <span className="font-window-title tracking-widest text-on-surface text-sm">{skill.name}</span>
        {skill.level && (
          <span className={`text-[9px] font-label-pixel tracking-widest px-2 py-0.5 rounded-sm uppercase border ${getBadgeColor(skill.level)}`}>
            {skill.level}
          </span>
        )}
      </div>
      {skill.description && (
        <span className="font-mono text-xs text-on-surface-variant line-clamp-2">
          {skill.description}
        </span>
      )}
    </div>
  );
}

export function SkillsWindow() {
  return (
    <div className="flex flex-col gap-6">
      {skillsData.map(category => (
        <section key={category.id} className="flex flex-col gap-3">
          {/* Category Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-xl">{category.icon}</span>
            <h2 className="font-window-title text-primary uppercase text-lg tracking-widest">
              {category.title}
            </h2>
          </div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.skills.map((skill, idx) => (
              <SkillItem key={idx} skill={skill} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
