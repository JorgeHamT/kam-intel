type ErrorStateProps = {
  title: string;
  description: string;
};

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="rounded-[28px] border border-brand-200 bg-brand-50/70 p-6">
      <h3 className="text-lg font-semibold text-brand-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-brand-700">{description}</p>
    </div>
  );
}
