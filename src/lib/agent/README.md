# lib/agent

Motor lógico reusable del agente operativo de Rappi KAM Intelligence.

## Qué hace

- recibe métricas ya limpias y recalculadas
- detecta señales operativas por restaurante y portfolio
- calcula prioridad y severidad separando lógica estable de parámetros provisionales
- genera narrativa controlada en español
- agrega resultados por restaurante, KAM, portfolio y resumen global
- construye overlays de confianza y un alert feed reusable

## Qué no hace

- no parsea CSV ni XLSX
- no valida metodológicamente el dataset de punta a punta
- no renderiza UI ni devuelve JSX
- no conoce pantallas, cards, charts o tablas específicas
- no depende de Telegram ni integraciones externas

## Inputs esperados

- `RestaurantMetricsInput[]` con métricas recalculadas, flags de calidad y benchmark ya preparados
- `KamMetricsInput[]` opcional para contexto del portfolio
- overlays y diferencias original vs validado si la capa de datos los expone

## Outputs

- `RestaurantAssessment[]`
- `KamAssessment[]`
- `PortfolioAssessment`
- `DashboardAgentSummary`
- `AlertFeedItem[]`
- `AgentValidationOverlay[]`

## Parametrización provisional

- thresholds de señales y status en `config/thresholds.ts`
- pesos del priority score en `config/weights.ts`
- severity rules ligadas a thresholds provisionales
- penalizaciones de confianza en `config/confidence.ts`
- benchmark conflict logic y toggles en `config/feature-flags.ts`

## Qué ya consideramos estable

- la ubicación del motor en `src/lib/agent`, porque este repo usa convención `src/` y alias `@/* -> src/*`
- la separación por capas (`contracts`, `signals`, `scoring`, `recommendations`, `aggregation`, `config`, `helpers`)
- el contrato de entrada tipado y desacoplado de UI
- `runAgent(...)` como orquestador principal
- los outputs ricos por restaurante, KAM, portfolio, summary y alert feed
- la separación entre motor oficial y adapters/puentes temporales

Todo esto vive en `src/lib/agent/config/*` para evitar magic numbers.

## Nota de estructura

La especificación funcional hablaba de `lib/agent`, pero este repo ya estandariza el código de aplicación dentro de `src/`: el `tsconfig.json` define `@/* -> ./src/*`, y toda la app activa vive bajo `src/`. Por eso `src/lib/agent` es la ubicación correcta dentro de este repositorio; moverlo hoy a `lib/agent` rompería la convención actual en lugar de alinearla.

## mock-agent.ts

`mock-agent.ts` es un puente temporal para la UI demo existente.

- no forma parte del motor oficial exportado por `index.ts`
- ejecuta `runAgent(agentFixtures)` y adapta el primer resultado a un digest simplificado
- existe solo para compatibilidad transitoria mientras la UI migra a adapters fuera de `src/lib/agent`
- no debe usarse como contrato oficial del motor

## Pendientes a congelar

- pesos finales del priority score
- thresholds finales de severidad y prioridad
- confidence rules definitivas
- override rules finales
- benchmark logic definitiva contra `semaforo_riesgo`
