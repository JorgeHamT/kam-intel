# AGENTS.md

## Proyecto
**Rappi KAM Intelligence**

## Propósito de este archivo
Este archivo existe para que cualquier agente de código (Codex, Cursor, Windsurf, etc.) trabaje dentro del repo sin romper alcance, sin mezclar frentes y sin inventar decisiones que ya están congeladas.

No es una spec de producto completa.
No sustituye la fuente de verdad del proyecto.
Sirve como guía operativa para implementar con disciplina.

---

## 1) Fuente de verdad del proyecto
Antes de implementar cualquier cosa, asume como oficial lo siguiente:

- **Caso elegido:** Caso 02 — Agente de Inteligencia Operativa. fileciteturn0file3
- **Nombre del producto demo:** Rappi KAM Intelligence. fileciteturn0file3turn0file5
- **Idioma de la demo:** español. fileciteturn0file3
- **Tipo de solución:** web app funcional que debe sentirse como un **agente de inteligencia operativa**, no como un dashboard pasivo. fileciteturn0file3turn0file5
- **Stack base propuesto:** Next.js, TypeScript, Tailwind, Recharts, dataset embebido, Telegram opcional. fileciteturn0file3turn0file5
- **Pantallas base:** Dashboard General, Vista por KAM, Detalle de KAM, Vista por Restaurante, Alertas, Data Validation, Deck interactivo. fileciteturn0file3turn0file5
- **Principios clave:** no usar métricas no defendibles, no depender ciegamente de derivados del Excel, recalcular campos clave, mostrar la lógica del agente en UI, demo reiniciable. fileciteturn0file3turn0file5
- **Dataset posture:** usar campos base como fuente de verdad; usar `semaforo_riesgo` solo como benchmark comparativo, no como verdad central. fileciteturn0file3turn0file5

Si algo contradice esto, **no lo implementes**.

---

## 2) Regla principal de ejecución
**Nada importante debe inventarse.**

Si una decisión no está congelada, el agente debe:

1. implementar solo scaffolding seguro,
2. dejar placeholders explícitos,
3. no fingir precisión,
4. no cerrar lógica de negocio por su cuenta.

Ejemplos de cosas que **no** se deben inventar:

- KPIs finales no validados
- fórmulas metodológicas no cerradas
- scoring final del agente
- thresholds finales de severidad
- benchmark logic final
- recommended actions finales si no están cerradas
- claims narrativos que excedan lo implementado

---

## 3) Qué es y qué no es esta solución
### Sí es
Un sistema que:

1. observa datos de entrada,
2. valida y recalcula métricas clave,
3. detecta señales operativas,
4. clasifica severidad,
5. prioriza casos,
6. propone acciones,
7. genera alertas y vistas accionables. fileciteturn0file5

### No es
- un dashboard pasivo
- un backend enterprise completo
- una integración real con sistemas externos
- una plataforma de automatización full-stack
- una simulación inflada con métricas no defendibles

---

## 4) Estructura oficial de chats / frentes
El proyecto está dividido por chats/frentes. Cada agente debe respetar estos límites. La distribución oficial es esta: fileciteturn0file0turn0file2

### Chat 00 — HQ / Fuente de Verdad
Consolida visión, alcance, decisiones oficiales, dependencias, criterios de entrega y pendientes. **Nada importante existe si no quedó asentado aquí.** fileciteturn0file2

### Chat 01 — Producto / UX funcional
Define producto, navegación, módulos por pantalla, acciones reales vs simuladas y flujo funcional. fileciteturn0file0turn0file2

### Chat 02 — Data / KPIs / Validación
Define auditoría del dataset, campos confiables, limpieza, recálculo, KPIs defendibles, benchmark y validación. fileciteturn0file0turn0file2

### Chat 03 — Agente / Scoring / Recomendaciones
Define la lógica operativa del agente: señales, severidad, prioridad, why flagged, recommended action, next best step. fileciteturn0file0turn0file2

### Chat 04 — UI / Design System / Blueprint
Congela dirección visual, design system, shell visual, patrones UI y blueprint por pantalla. fileciteturn0file0turn0file2

### Chat 05 — Arquitectura técnica / App Shell
Traduce producto + datos + lógica + UI en arquitectura modular real, rutas, shell, capas y estrategia de implementación. fileciteturn0file0turn0file2

### Chat 06 — Frontend / Pantallas
Implementa pantallas, rutas, componentes, estados UI y wiring visual. fileciteturn0file0turn0file2

### Chat 07 — Motor de datos / Cálculos
Implementa el pipeline local del dataset: parsing, normalización, validación, recálculos, scoring estructural, alertas y payloads para UI. fileciteturn0file0turn0file2

### Chat 08 — Demo / Escenarios / Reset
Congela flujo de demo, escenarios, reset, plan B y operación en vivo. fileciteturn0file0turn0file2

### Chat 09 — README / One-pager / Entrega
Produce la documentación final de entrega. fileciteturn0file0turn0file2

### Chat 10 — Deck / Storytelling
Define la narrativa final, estructura del deck y guion de presentación. fileciteturn0file0turn0file2

### Chat 11 — QA / Pulido final
Filtro crítico final: detecta humo, inconsistencias y riesgos. fileciteturn0file0turn0file2

---

## 5) Regla de alcance por agente
Cada agente debe trabajar **solo en su frente**.

### Permitido
- crear archivos dentro de su frente
- editar archivos directamente relacionados con su frente
- agregar tipos compartidos solo si son realmente necesarios
- dejar TODOs explícitos cuando dependa de otro frente
- crear mocks o placeholders seguros cuando la lógica final no esté cerrada

### Prohibido
- tocar archivos de otros frentes sin necesidad real
- mezclar lógica de datos con UI
- cerrar fórmulas no congeladas
- inventar copy final de negocio
- cambiar navegación oficial por iniciativa propia
- meter dependencias nuevas sin justificar
- hacer refactors transversales “porque se ve mejor”

---

## 6) Orden recomendado de trabajo
Orden oficial sugerido: fileciteturn0file2

### Fase 1
- Chat 00 — HQ
- Chat 01 — Producto
- Chat 02 — Data
- Chat 03 — Agente
- Chat 04 — UI Blueprint

### Fase 2
- Chat 05 — Arquitectura técnica
- Chat 06 — Frontend
- Chat 07 — Motor de datos

### Fase 3
- Chat 08 — Demo
- Chat 09 — README / One-pager
- Chat 10 — Deck
- Chat 11 — QA

Si falta una dependencia crítica de una fase anterior, el agente no debe “rellenarla” inventando lógica.

---

## 7) Dependencias entre chats
Mapa oficial resumido: fileciteturn0file2

- Chat 01 depende de Chat 00
- Chat 02 depende de Chat 00
- Chat 03 depende de Chat 00 + Chat 02
- Chat 04 depende de Chat 00 + Chat 01
- Chat 05 depende de Chat 00 + Chat 01 + Chat 02 + Chat 03 + Chat 04
- Chat 06 depende de Chat 04 + Chat 05
- Chat 07 depende de Chat 02 + Chat 03 + Chat 05
- Chat 08 depende de Chat 06 + Chat 07
- Chat 09 depende de Chat 00 + Chat 05 + Chat 08
- Chat 10 depende de Chat 00 + Chat 08 + Chat 09
- Chat 11 depende de todos

---

## 8) Estrategia de repo y ramas
Estrategia sugerida de repo: fileciteturn0file1

### Ramas base
- `main` = estable
- `develop` = integración

### Ramas por frente
- `feature/ui-shell`
- `feature/data-engine`
- `feature/agent-logic`
- `feature/frontend-screens`
- `feature/demo-flow`
- `feature/deck-docs`

### Reglas
- trabajar por feature branch
- integrar en `develop`
- dejar `main` estable
- usar worktrees para frentes críticos en paralelo
- abrir **3 a 5 worktrees máximo** al inicio
- no abrir worktrees por cada microtarea fileciteturn0file1

---

## 9) Pantallas oficiales y propósito funcional
Semilla oficial del blueprint de pantallas: fileciteturn0file4

### Dashboard General
Vista ejecutiva global.
Módulos esperados incluyen KPIs principales, banner crítico, mapa LATAM, ciudades por riesgo, verticales por concentración de riesgo, KAMs bajo presión, señales detectadas, why flagged y resumen de alertas. fileciteturn0file4

### Vista KAM
Comparar managers y portfolios.
Debe soportar lectura comparativa y lógica de intervención. fileciteturn0file4

### Detalle de KAM
Control tower individual.
Debe mostrar perfil, KPIs de portfolio, summary, top accounts, inventory, charts defendibles, signals detected y recommended intervention. fileciteturn0file4

### Vista por Restaurante
Explicar riesgo y siguiente acción.
Debe mostrar score/status, KPIs clave, operational diagnosis, benchmark, why flagged, recommended action, next best step y business summary. fileciteturn0file4

### Alertas
Feed de alertas accionables.
Debe incluir filtros, alert cards, why flagged, priority score, next action, urgent queue y status de Telegram si existe. fileciteturn0file4

### Data Validation
Mostrar robustez metodológica.
Debe incluir resumen de validación, campos recalculados, anomalías, comparación entre semáforo original vs semáforo del agente y nota metodológica. fileciteturn0file4

### Deck
Presentación interactiva dentro del producto.
Debe cubrir problema, solución, validación, lógica del agente, overview de pantallas, demo flow y valor de negocio. fileciteturn0file4

---

## 10) Reglas de implementación técnica
### Reglas generales
- usar TypeScript estricto
- no usar `any` salvo justificación explícita
- mantener componentes pequeños
- no mezclar data logic con UI
- no hardcodear strings repetidos
- evitar duplicación innecesaria
- preferir utilidades puras para transforms
- dejar contratos claros entre capas
- no introducir backend innecesario
- no introducir integraciones externas frágiles como núcleo del sistema

### UI
- la UI debe expresar claramente la lógica del agente
- evitar módulos que aparenten precisión falsa
- no mostrar métricas no defendibles
- preferir placeholders honestos antes que simulaciones infladas
- mantener una estética sobria, premium y creíble, alineada con Rappi. fileciteturn0file3turn0file5

### Datos
- tratar el dataset embebido como entrada base
- recalcular campos clave antes de confiar en derivados del Excel. fileciteturn0file3turn0file5
- usar campos base como fuente de verdad. fileciteturn0file3
- usar `semaforo_riesgo` solo como comparación o benchmark. fileciteturn0file3turn0file5
- cuando no haya sustento suficiente, devolver estados tipo `insuficiente para concluir` en vez de fingir certeza

### Demo
- todo debe poder correrse en vivo
- la demo debe ser reiniciable. fileciteturn0file3turn0file5
- el sistema debe soportar baseline + escenarios + reset
- Telegram debe vivir desacoplado como módulo opcional, no como dependencia central. fileciteturn0file3turn0file5

---

## 11) Qué puede empezar a implementar un agente desde ya
Mientras no haya contradicción con la fuente de verdad, se puede avanzar en:

- app shell
- layout base
- sidebar fijo
- header funcional
- rutas base
- scaffolding de pantallas
- store global base
- tipos iniciales
- data engine base
- normalización y validación técnica
- adapters / view models
- mocks controlados
- baseline snapshot
- infraestructura de escenarios y reset
- estructura del deck interactivo
- skeletons, estados vacíos y estados de error

Esto es consistente con los alcances ya autorizados para Codex en los resúmenes transversales. fileciteturn0file0

---

## 12) Qué no debe implementar todavía un agente
No implementar todavía, salvo congelación explícita en la fuente de verdad:

- dataset real conectado con lógica no validada
- KPIs finales no defendibles
- scoring final del agente
- priority score final
- severidad final cerrada numéricamente
- benchmark logic final no validada
- recommended actions finales no cerradas
- next best step final no cerrado
- validación metodológica fingida
- deck final con claims definitivos
- copy ejecutivo final que dependa de resultados no cerrados
- integración real de Telegram como parte central
- refactors transversales fuera del frente asignado

---

## 13) Formato de trabajo esperado para agentes
Cada intervención grande debe dejar claro:

1. qué frente está tocando,
2. qué archivos creó o editó,
3. qué decisiones asumió,
4. qué dependencias siguen abiertas,
5. qué NO implementó porque no estaba congelado.

Si el agente trabaja desde un chat modular, debe producir al cierre un pequeño **escape pod** con:

- estado actual
- decisiones tomadas
- pendientes
- bloqueos
- outputs creados
- qué necesita el siguiente frente

Este sistema está recomendado oficialmente para no perder continuidad entre chats o subchats. fileciteturn0file2

---

## 14) Criterio de prudencia
Cuando haya duda entre:

- implementar algo “impresionante” pero frágil, o
- implementar algo más simple pero defendible,

elige lo segundo.

La regla del proyecto es **credibilidad primero, humo nunca**. fileciteturn0file5

---

## 15) Checklist rápido antes de hacer commit
Antes de cerrar trabajo, validar:

- ¿Respeté el alcance de mi frente?
- ¿Toqué solo los archivos necesarios?
- ¿Evité inventar lógica no congelada?
- ¿La UI no sobrepromete?
- ¿Los datos no dependen ciegamente de derivados del Excel?
- ¿La lógica del agente quedó visible donde corresponde?
- ¿Lo que hice soporta demo reiniciable?
- ¿Dejé claros los placeholders y dependencias abiertas?
- ¿Evité meter dependencias nuevas sin justificar?

Si alguna respuesta es “no”, no cierres como terminado.

---

## 16) En caso de conflicto entre instrucciones
Prioridad sugerida:

1. **Decisiones congeladas / fuente de verdad**
2. **Alcance del frente/chat correspondiente**
3. **Arquitectura modular y reglas de repo**
4. **Conveniencia de implementación**

Si algo no está claro, no improvises la lógica final: deja estructura segura y documenta el hueco.
