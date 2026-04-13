"use client";

import { AgentWorkflow } from "@/components/shared/agent-workflow";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { SummaryStrip } from "@/components/shared/summary-strip";
import { getScenarioOption } from "@/lib/demo";
import { useDemoStore } from "@/lib/store/demo-store";

export default function DeckPage() {
  const scenario = useDemoStore((state) => state.scenario);
  const scenarioOption = getScenarioOption(scenario);
  const sections = [
    {
      id: "deck-01",
      title: "Problema y promesa",
      objective:
        "Abrir la narrativa antes de entrar al flujo operativo del producto.",
      status: "Visible para introducción previa a la demo",
    },
    {
      id: "deck-02",
      title: "Walkthrough oficial",
      objective:
        "Preparar el paso Dashboard -> KAM -> Detalle KAM -> Restaurante.",
      status: "Alineado con la app activa",
    },
    {
      id: "deck-03",
      title: "Defensa metodológica",
      objective:
        "Recordar que Validation entra como bloque de soporte y no como journey normal.",
      status: "Listo para usar como soporte si hace falta",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Deck"
        title="Deck interactivo"
        description="Ruta interna para apoyar el walkthrough de demo sin competir con la navegación operativa ni afirmar resultados todavía no congelados."
      >
        <SummaryStrip
          columns={3}
          items={[
            {
              id: "scenario",
              label: "Escenario activo",
              value: scenarioOption.label,
              detail: scenarioOption.subtitle,
              tone: "neutral",
            },
            {
              id: "sections",
              label: "Bloques visibles",
              value: `${sections.length}`,
              detail:
                "Soporte narrativo previo al flujo operativo, no pantalla núcleo del journey.",
              tone: "warning",
            },
            {
              id: "purpose",
              label: "Rol dentro del producto",
              value: "Acompañar demo",
              detail:
                "Sirve como apoyo de storytelling sin desplazar la lectura operativa.",
              tone: "stable",
            },
          ]}
        />
      </PageHeader>

      <SectionCard
        eyebrow="Estructura actual"
        title="Bloques visibles del deck"
        description="Cada tarjeta expresa qué parte del relato ya está presente y qué sigue deliberadamente abierto."
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.id}
              className="rounded-3xl border border-slate-100 bg-slate-50/70 p-5"
            >
              <h3 className="text-base font-semibold text-ink">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {section.objective}
              </p>
              <p className="mt-4 text-sm font-medium text-brand-700">
                {section.status}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>

      <AgentWorkflow
        eyebrow="Uso recomendado"
        title="Cómo presentar este deck sin sobreprometer"
        items={[
          {
            id: "problem",
            label: "Qué mostrar",
            description:
              "Usarlo para conectar problema, solución y flujo visual entre pantallas ya implementadas.",
            tone: "neutral",
          },
          {
            id: "limits",
            label: "Qué no fingir",
            description:
              "Evitar claims de scoring final, benchmark definitivo o validación metodológica cerrada.",
            tone: "warning",
          },
          {
            id: "next",
            label: "Siguiente paso",
            description:
              "Dejarlo listo para que storytelling final lo complete cuando los otros frentes congelen narrativa y evidencia.",
            tone: "critical",
          },
        ]}
      />
    </div>
  );
}
