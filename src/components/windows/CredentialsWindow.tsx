import { credentialsData } from '../../data/credentials';
import type { Credential } from '../../data/credentials';

function CredentialCard({ credential }: { credential: Credential }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/30 rounded-sm p-4 flex flex-col sm:flex-row gap-4 hover:border-primary/50 transition-colors group">
      
      {/* Thumbnail placeholder */}
      <div className="w-full sm:w-32 shrink-0 relative overflow-hidden rounded-sm border border-outline-variant/30 aspect-square bg-surface-container-highest flex items-center justify-center">
        {credential.thumbnail ? (
          <img 
            src={credential.thumbnail} 
            alt={`${credential.issuer} logo`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="material-symbols-outlined text-outline-variant/50 text-3xl group-hover:text-primary/50 transition-colors">
            {credential.type === 'Badge' ? 'local_police' : 'workspace_premium'}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 gap-2 justify-between min-w-0">
        <div className="min-w-0">
          <div className="flex justify-between items-start gap-2 mb-2 min-w-0">
            <h3 className="font-window-title text-primary uppercase text-lg font-bold tracking-widest truncate">
              {credential.title}
            </h3>
            {/* Type Badge */}
            <span className={`text-[9px] font-label-pixel tracking-widest px-2.5 py-1 rounded-full shrink-0 uppercase border ${credential.type === 'Certificate' ? 'border-primary/60 text-primary bg-primary/10 shadow-[0_0_8px_rgba(var(--color-primary),0.2)]' : 'border-secondary/60 text-secondary bg-secondary/10 shadow-[0_0_8px_rgba(var(--color-secondary),0.2)]'}`}>
              {credential.type}
            </span>
          </div>
          
          <div className="flex items-center gap-2 mb-3 text-on-surface-variant font-mono text-[13px]">
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>{credential.issuer}</span>
            {credential.year && (
              <>
                <span className="text-outline-variant">•</span>
                <span>{credential.year}</span>
              </>
            )}
          </div>
          
          {/* Tech/Skills Pills (optional) */}
          {credential.skills && credential.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {credential.skills.map((s, i) => (
                <span key={i} className="text-[10px] font-label-pixel tracking-wider px-2 py-1 bg-surface-container-highest text-on-surface border border-outline-variant/30 rounded-full shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Actions / Buttons */}
        <div className="flex gap-3">
          {(credential.localFile || credential.externalUrl) ? (
            <a 
              href={credential.localFile || credential.externalUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 hover:border-primary hover:bg-primary/30 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(var(--color-primary),0.4)] transition-all duration-300 rounded-sm text-xs font-window-title tracking-widest text-primary"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              VIEW CREDENTIAL
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
        </div>
      </div>
    </div>
  );
}

export function CredentialsWindow() {
  return (
    <div className="flex flex-col gap-4">
      {credentialsData.map(cred => (
        <CredentialCard key={cred.id} credential={cred} />
      ))}
    </div>
  );
}
