# Rappi KAM Intelligence

Demo web funcional para el challenge técnico de Rappi 2026, enfocada en el Caso 02 — Agente de Inteligencia Operativa. La solución está pensada para ayudar a Key Account Managers (KAMs) a detectar restaurantes en riesgo, priorizar atención y entender por qué una cuenta fue marcada y cuál debería ser la siguiente acción.

## Qué es este proyecto

Rappi KAM Intelligence es una aplicación web construida para demostrar una capa de inteligencia operativa sobre un dataset de restaurantes. No se plantea como dashboard pasivo, sino como una interfaz que:

observa y organiza señales relevantes del dataset
recalcula campos clave en lugar de confiar ciegamente en derivados heredados
prioriza cuentas y portfolios
hace visible la lógica del agente en la UI
permite mostrar escenarios comparables y una demo reiniciable
Problema que busca resolver

En el contexto del caso, el monitoreo de restaurantes es reactivo: el KAM suele enterarse de deterioros cuando ya impactaron rating, ventas o retención. Esta demo busca convertir señales operativas dispersas en una lectura priorizada y accionable, para que el KAM pueda saber:

qué revisar primero
por qué esa cuenta requiere atención
qué cambió frente al benchmark base
cuál sería la siguiente intervención razonable
Por qué no es solo un dashboard

La propuesta del proyecto es que el sistema se sienta como un agente de inteligencia operativa. Eso implica que no solo muestra datos: también estructura señales, compara escenarios, prioriza casos y presenta explicaciones operativas dentro de la interfaz. Entre los patrones que el proyecto busca expresar están:

signals detected
why flagged
recommended action
next best step
priority score
KAM briefing
Postura metodológica

La demo parte del dataset del caso, pero no asume que todos los campos derivados del Excel sean confiables. La postura del proyecto es:

usar campos base como fuente principal de verdad
recalcular métricas derivadas relevantes
tratar activo_desde con cautela
usar semaforo_riesgo solo como benchmark comparativo
evitar métricas, insights o claims que no puedan defenderse con el dataset o con derivados razonables

Esta postura existe para evitar humo y mantener la credibilidad de la demo.

## Escenarios oficiales de la demo

La app trabaja con 3 escenarios visibles:

1) Dataset original

Lectura base del dataset heredado. Funciona como punto de referencia y benchmark inicial.

2) Evaluación del agente

Reinterpretación del mismo dataset usando la lógica propia del sistema para priorizar, explicar riesgo y mostrar una lectura más operativa.

3) Crisis operativa

Versión agravada del escenario para mostrar sensibilidad del sistema, aparición de alertas y cambios visibles en la priorización.

## Pantallas principales

Las pantallas base del proyecto son:

Dashboard General
Vista por KAM
Detalle de KAM
Vista por Restaurante
Alertas
Data Validation

A nivel de implementación actual, el proyecto contiene rutas y módulos para dashboard, KAMs, restaurantes, alertas, validación de datos y deck, además de features específicas para detalle de KAM y detalle de restaurante.

## Stack técnico

### Base tecnológica del proyecto:

Next.js
TypeScript
Tailwind CSS
Dataset embebido
Deploy web
Telegram opcional como canal adicional

### Dependencias observables en el repo actual:

Next.js 15.3.8
React 19
React DOM 19
TypeScript 5
Tailwind CSS 3
Zustand 5
Heroicons
Estructura general del proyecto

El repo está organizado para separar interfaz, lógica y datos. A nivel alto:

src/app
Rutas de la aplicación con App Router
src/features
Features por pantalla o dominio visual, por ejemplo:
alerts
dashboard
deck
kam-detail
kams
restaurant-detail
restaurants
validation
src/lib/agent
Lógica del agente y pruebas relacionadas
src/lib/data
Capa de datos y pruebas del caso
src/lib/demo
Manejo de escenarios de demo y estado comparativo
src/lib/store y src/store
Estado y utilidades relacionadas
data/
Dataset embebido (.csv y .xlsx)
docs/
Documentos base del proyecto:
overview
decisiones congeladas
arquitectura de chats
estrategia del repo
blueprint de pantallas
public/
Recursos estáticos como logo y avatares

Además, el proyecto conserva una estrategia de trabajo por frentes con worktrees para módulos como ui-shell, data-engine, agent-logic y demo-flow.

## Cómo correrlo localmente
Requisitos
Node.js instalado
npm disponible
Instalación
npm install
Desarrollo
npm run dev
Build de producción
npm run build
Ejecutar build
npm run start
Lint
npm run lint
Typecheck
npm run typecheck
Formateo
npm run format
npm run format:check
Pruebas disponibles
npm run test:data
npm run test:agent

Scripts confirmados en package.json.

## Navegación sugerida para la demo

Un recorrido razonable para mostrar la solución es:

Data Validation
Para explicar la postura metodológica y dejar claro que la demo no confía ciegamente en derivados heredados.
Dashboard
Para mostrar visión ejecutiva global, concentración de riesgo y señales principales.
Vista KAM
Para comparar portfolios y managers.
Detalle de KAM
Para mostrar profundidad operativa y foco individual.
Vista por Restaurante
Para explicar riesgo, benchmark y siguiente acción.
Alertas
Para mostrar cola accionable y priorización.

Cómo usar los escenarios

La demo permite alternar entre escenarios para comparar cómo cambia la lectura operativa del sistema:

usa Dataset original para mostrar la base heredada
cambia a Evaluación del agente para enseñar la reinterpretación propia
usa Crisis operativa para evidenciar sensibilidad, alertas y cambios en la prioridad

La app también incluye una acción de reinicio de demo para regresar a un estado limpio de presentación. Esto es coherente con uno de los principios congelados del proyecto: la demo debe ser reiniciable.

### Nota sobre fechas visibles en la app

En algunas vistas puede aparecer una fecha como “Última actualización: diciembre 2027”. Esto no es un error de interfaz: responde a la temporalidad del dataset utilizado, que contiene registros ubicados en noviembre de 2027. Por esa razón, la demo conserva esa referencia temporal para no falsear el contexto de los datos.

Qué sí hace la demo
procesa un dataset embebido del caso
organiza señales de riesgo y prioridades
permite comparar una lectura base contra una lectura del agente
muestra pantallas enfocadas en operación, no solo en visualización
soporta una demo navegable y reiniciable
mantiene separadas la capa visual, la lógica del agente y la capa de datos a nivel de repo
Qué no hace la demo
no se conecta a sistemas productivos reales de Rappi
no usa datos en tiempo real
no automatiza intervenciones reales sobre restaurantes
no pretende probar causalidad dura ni predicción completa si el dataset no lo soporta
no convierte semaforo_riesgo en fuente absoluta de verdad
no promete capacidades externas que no estén realmente implementadas
Limitaciones conocidas

Esta es una demo funcional, no un sistema productivo. Por eso:

la calidad del análisis depende del dataset embebido disponible
algunos outputs son demostrativos y están acotados a la lógica definida para el caso
Telegram es opcional, no el núcleo del sistema
el valor principal está en la priorización operativa defendible, no en vender automatización inflada
Mejoras futuras razonables

Si este proyecto evolucionara más allá del challenge, las extensiones razonables serían:

integración con fuentes reales y actualizadas
histórico temporal más robusto
configuración de umbrales y señales por segmento
feedback loop del KAM sobre recomendaciones
trazabilidad más profunda de decisiones del agente
notificaciones reales multicanal
refinamiento del motor de scoring y explicación
Estado del entregable

El resultado esperado del proyecto era contar con:

una demo web funcional
un sistema que procese el dataset y genere prioridades accionables
una narrativa clara de agente de inteligencia operativa
un README sólido
un one-pager
un deck interactivo
un flujo de demo reiniciable

La app publicada cumple con el objetivo central de presentar una web app funcional para el caso planteado, con estructura modular, escenarios visibles y una narrativa de inteligencia operativa defendible.

### Documentos base del proyecto

En docs/ se incluyen documentos que sirvieron como marco del proyecto:

PROJECT_OVERVIEW.md
CHAT_ARCHITECTURE.md
DECISIONS_FROZEN_V1.md
SCREEN_BLUEPRINT_SEED.md
REPO_STRATEGY.md
Deploy

La demo está desplegada en Vercel y accesible por navegador en https://rappi-kam-intel.vercel.app

### Licencia

Pendiente de definir.
