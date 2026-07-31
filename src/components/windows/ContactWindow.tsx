import { contactData } from '../../data/contact';
import type { ContactItem } from '../../data/contact';

function ContactCard({ item }: { item: ContactItem }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-sm hover:bg-surface-container-low hover:border-primary/30 transition-all duration-200">
      
      {/* Icon & Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-sm bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-window-title tracking-widest text-on-surface text-lg uppercase">{item.platform}</span>
          {item.username && (
            <span className="font-mono text-sm text-on-surface-variant mt-0.5">{item.username}</span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div>
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 hover:border-primary hover:bg-primary/30 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(var(--color-primary),0.4)] transition-all duration-300 rounded-sm text-xs font-window-title tracking-widest text-primary w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            {item.buttonLabel}
          </a>
        ) : (
          <button 
            disabled
            className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-sm text-xs font-window-title tracking-widest text-on-surface-variant opacity-50 cursor-not-allowed w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
            COMING SOON
          </button>
        )}
      </div>

    </div>
  );
}

export function ContactWindow() {
  return (
    <div className="flex flex-col gap-3">
      {contactData.map(item => (
        <ContactCard key={item.id} item={item} />
      ))}
    </div>
  );
}
