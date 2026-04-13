export function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />
      <div className="h-20 animate-pulse rounded-[24px] bg-slate-100" />
      <div className="grid gap-3 md:grid-cols-3">
        <div className="h-24 animate-pulse rounded-[24px] bg-slate-100" />
        <div className="h-24 animate-pulse rounded-[24px] bg-slate-100" />
        <div className="h-24 animate-pulse rounded-[24px] bg-slate-100" />
      </div>
    </div>
  );
}
