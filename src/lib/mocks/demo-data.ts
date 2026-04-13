import type {
  AgentSignal,
  AlertSummaryItem,
  DataValidationIssue,
  DeckSection,
  KamPressureItem,
  KamRecord,
  Kpi,
  RestaurantRecord,
} from "@/types/domain";

export const topKpis: Kpi[] = [
  {
    id: "revenue-at-risk",
    label: "Revenue en riesgo",
    value: "$2.4M",
    delta: "+12% vs. escenario base",
    insight: "Mock controlado para ilustrar presión comercial sin fórmula final.",
    tone: "critical",
  },
  {
    id: "high-priority-kams",
    label: "KAMs bajo presión",
    value: "5",
    delta: "2 requieren follow-up hoy",
    insight: "Señal compuesta provisional mientras llega el scoring oficial.",
    tone: "warning",
  },
  {
    id: "restaurants-flagged",
    label: "Restaurantes señalados",
    value: "18",
    delta: "6 con acción recomendada pendiente",
    insight: "Lista priorizada por reglas mock del agente.",
    tone: "warning",
  },
  {
    id: "data-health",
    label: "Salud del dato",
    value: "91%",
    delta: "3 reglas de validación abiertas",
    insight: "Indicador visual temporal, no métrica oficial de calidad.",
    tone: "stable",
  },
];

export const kamPressureItems: KamPressureItem[] = [
  {
    id: "maria-salgado",
    name: "María Salgado",
    segment: "Top Restaurants CDMX",
    pressureLabel: "Alta presión por caída de activación",
    focus: "4 cuentas concentran la señal crítica del día.",
    nextStep: "Validar si la caída es operativa o de carga de datos.",
  },
  {
    id: "diego-rivera",
    name: "Diego Rivera",
    segment: "QSR Norte",
    pressureLabel: "Riesgo medio con tendencia negativa",
    focus: "Aumentaron alertas en restaurantes con promo activa.",
    nextStep: "Revisar cobertura de promos y owners asignados.",
  },
  {
    id: "valeria-gomez",
    name: "Valeria Gómez",
    segment: "Long tail premium",
    pressureLabel: "Señal temprana de churn comercial",
    focus: "Hay dos cuentas clave con actividad inconsistente.",
    nextStep: "Preparar secuencia de recovery con narrativa del agente.",
  },
];

export const agentSignals: AgentSignal[] = [
  {
    id: "signal-01",
    title: "Caída coordinada en activación de restaurantes prioritarios",
    detection: "El agente mock detectó 6 restaurantes con caída sostenida en un mismo bloque KAM.",
    whyItMatters: "Podría escalar en revenue at risk si la tendencia coincide con campañas activas.",
    recommendation: "Abrir revisión táctica de cobertura y validar integridad de inputs.",
    nextStep: "Entrar a Alertas y asignar responsables antes del siguiente refresh.",
    tone: "critical",
  },
  {
    id: "signal-02",
    title: "Brecha de dato en campos operativos críticos",
    detection: "Se marcaron registros con campos de promo y owner desalineados.",
    whyItMatters: "La priorización final del agente depende de que estos campos estén consistentes.",
    recommendation: "Escalar a Validación de datos para cerrar reglas abiertas primero.",
    nextStep: "Revisar la cola de issues en Data Validation.",
    tone: "warning",
  },
];

export const alertSummary: AlertSummaryItem[] = [
  {
    id: "alert-01",
    title: "Restaurantes sin owner operativo",
    owner: "Ops Support",
    status: "Pendiente",
    eta: "Hoy 16:00",
    restaurantId: "burger-lab-cdmx",
  },
  {
    id: "alert-02",
    title: "Desviación entre promo activa y performance",
    owner: "KAM Lead",
    status: "En seguimiento",
    eta: "Hoy 18:30",
    restaurantId: "taco-hub-monterrey",
  },
  {
    id: "alert-03",
    title: "Campos base con cobertura incompleta",
    owner: "Data QA",
    status: "Bloqueando score final",
    eta: "Mañana 10:00",
    restaurantId: "pasta-social-polanco",
  },
];

export const kams: KamRecord[] = [
  {
    id: "maria-salgado",
    name: "María Salgado",
    portfolio: "Top Restaurants CDMX",
    restaurantsAtRisk: 6,
    openAlerts: 4,
    narrative: "Concentra la mayor presión comercial del mock actual.",
  },
  {
    id: "diego-rivera",
    name: "Diego Rivera",
    portfolio: "QSR Norte",
    restaurantsAtRisk: 4,
    openAlerts: 3,
    narrative: "Tiene señales cruzadas entre promo y activación.",
  },
  {
    id: "valeria-gomez",
    name: "Valeria Gómez",
    portfolio: "Long tail premium",
    restaurantsAtRisk: 3,
    openAlerts: 2,
    narrative: "Prioridad media con necesidad de validación operativa.",
  },
];

export const restaurants: RestaurantRecord[] = [
  {
    id: "burger-lab-cdmx",
    name: "Burger Lab Roma",
    city: "CDMX",
    kamId: "maria-salgado",
    status: "Crítico",
    whyFlagged: "Disminución simultánea en activación y cobertura de owner.",
    recommendation: "Validar insumo operativo y definir recuperación comercial.",
  },
  {
    id: "taco-hub-monterrey",
    name: "Taco Hub Norte",
    city: "Monterrey",
    kamId: "diego-rivera",
    status: "En riesgo",
    whyFlagged: "Promoción activa con performance por debajo del patrón esperado.",
    recommendation: "Revisar ejecución promo y acciones del KAM.",
  },
  {
    id: "pasta-social-polanco",
    name: "Pasta Social Polanco",
    city: "CDMX",
    kamId: "valeria-gomez",
    status: "Monitoreo",
    whyFlagged: "La narrativa depende de validar el input de coverage.",
    recommendation: "Esperar limpieza de dato antes de escalar prioridad final.",
  },
];

export const validationIssues: DataValidationIssue[] = [
  {
    id: "dq-01",
    rule: "Owner operativo no puede venir vacío",
    affectedField: "owner_name",
    severity: "critical",
    status: "Abierta",
    note: "Impacta la capacidad de asignar next best step real.",
  },
  {
    id: "dq-02",
    rule: "Promo activa debe tener fecha de vigencia consistente",
    affectedField: "promo_window",
    severity: "warning",
    status: "En revisión",
    note: "Evita falsos positivos en alertas promocionales.",
  },
  {
    id: "dq-03",
    rule: "Canal comercial debe mapear a catálogo vigente",
    affectedField: "channel_type",
    severity: "info",
    status: "Pendiente",
    note: "Preparado para integración del motor de datos.",
  },
];

export const deckSections: DeckSection[] = [
  {
    id: "deck-01",
    title: "Narrativa ejecutiva",
    objective: "Explicar qué detecta el agente y cómo prioriza.",
    status: "Ruta real con contenido stub controlado",
  },
  {
    id: "deck-02",
    title: "Flujo de demo",
    objective: "Guiar el walkthrough desde dashboard hasta detalle.",
    status: "Listo para conectar con Demo Flow",
  },
  {
    id: "deck-03",
    title: "Dependencias del motor",
    objective: "Mostrar qué parte es mock y qué dependerá de cálculos oficiales.",
    status: "Visible para evitar sobreventa funcional",
  },
];
