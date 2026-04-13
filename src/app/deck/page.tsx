"use client";

import { SectionCard } from "@/components/shared/section-card";
import { createDeckViewModel } from "@/features/deck/adapters/deck-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function DeckPage() {
  const snapshot = useDemoSnapshot();
  const viewModel = createDeckViewModel(snapshot);

  return (
    <SectionCard
      eyebrow="Deck"
      title="Deck interactivo"
      description="Ruta real y discreta desde el header para apoyar la demo sin competir con la navegación operativa."
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {viewModel.sections.map((section) => (
          <article
            key={section.id}
            className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5"
          >
            <h3 className="text-base font-semibold text-ink">{section.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{section.objective}</p>
            <p className="mt-4 text-sm font-medium text-brand-700">{section.status}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
