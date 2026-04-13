import { AgentCard } from "@/components/shared/agent-card";
import { SectionCard } from "@/components/shared/section-card";

type AgentWorkflowItem = {
  id: string;
  label: string;
  description: string;
  tone?: "critical" | "warning" | "neutral";
};

type AgentWorkflowProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: AgentWorkflowItem[];
};

export function AgentWorkflow({
  eyebrow = "Patrón del agente",
  title,
  description,
  items,
}: AgentWorkflowProps) {
  return (
    <SectionCard eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <AgentCard
            key={item.id}
            label={`${index + 1}. ${item.label}`}
            tone={item.tone ?? "neutral"}
          >
            {item.description}
          </AgentCard>
        ))}
      </div>
    </SectionCard>
  );
}
