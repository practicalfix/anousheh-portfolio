

export function DefaultWindow({ title }: { title: string }) {
  return (
    <div className="p-4 text-on-surface-variant font-label-pixel text-sm space-y-4">
      <p>&gt; Initializing {title}...</p>
      <p>&gt; Module under construction. Please check back later.</p>
    </div>
  );
}
