import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type CriticalBannerProps = {
  headline: string;
  detected: string;
  whyItMatters: string;
  recommendation: string;
  nextStep: string;
};

export function CriticalBanner(props: CriticalBannerProps) {
  const { headline, detected, whyItMatters, recommendation, nextStep } = props;

  return (
    <section className="overflow-hidden rounded-[34px] border border-brand-200 bg-[linear-gradient(135deg,#211f23_0%,#312326_60%,#5a2c30_100%)] p-6 text-white shadow-panel md:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-100">
            <ExclamationTriangleIcon className="h-4 w-4" />
            Lectura del agente
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-[2.65rem]">
            {headline}
          </h2>
          <div className="mt-5 max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-100">
              Qué detectó
            </p>
            <p className="mt-3 text-sm leading-7 text-white/82">{detected}</p>
          </div>
        </div>

        <div className="grid max-w-xl gap-4 md:grid-cols-3 xl:w-[560px] xl:grid-cols-1">
          <AgentLine label="Por qué importa" value={whyItMatters} />
          <AgentLine label="Qué recomienda" value={recommendation} />
          <AgentLine label="Siguiente paso" value={nextStep} />
        </div>
      </div>
    </section>
  );
}

function AgentLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/85">{value}</p>
    </div>
  );
}
