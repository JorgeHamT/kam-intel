# **Distribución de trabajo para el proyecto Rappi KAM Intelligence**

## **Chat 00 — HQ / Fuente de verdad del proyecto**

Este será el chat principal del proyecto.

### **Función**

Guardar y consolidar:

* visión general  
* alcance  
* decisiones oficiales  
* arquitectura de módulos  
* definición de KPIs  
* reglas del dataset  
* lógica del agente  
* naming  
* stack  
* roadmap  
* relación entre chats  
* criterios de entrega  
* qué ya se aprobó y qué no

### **Qué debe contener**

* resumen ejecutivo del proyecto  
* estructura completa de chats  
* links o referencias a outputs importantes  
* lista de decisiones congeladas  
* lista de pendientes  
* criterios de no desviación  
* escape pod de cada chat

### **Regla**

**Nada importante existe si no quedó asentado en Chat 00\.**

---

## **Chat 01 — Producto / Alcance / UX funcional**

### **Función**

Definir la app como producto.

### **Aquí se trabaja**

* objetivos del sistema  
* usuarios  
* casos de uso  
* alcance MVP  
* navegación final  
* módulos por pantalla  
* acciones reales vs placeholders  
* flujo de demo  
* estados de la app  
* experiencia general

### **Output esperado**

* spec funcional por pantalla  
* mapa de navegación  
* lista de componentes funcionales  
* criterios de UX

---

## **Chat 02 — Data / Dataset / KPIs / Validación**

### **Función**

Todo lo relacionado con el Excel y la lógica de datos.

### **Aquí se trabaja**

* auditoría del dataset  
* campos base confiables  
* campos recalculados  
* anomalías  
* flags de calidad  
* peer groups  
* KPIs derivados  
* revenue at risk  
* priority score  
* benchmark logic  
* comparación contra `semaforo_riesgo`

### **Output esperado**

* diccionario de datos  
* pipeline de limpieza  
* fórmulas oficiales  
* reglas de validación  
* tabla de métricas finales

### **Importancia**

Este chat es crítico porque de aquí sale la credibilidad de toda la demo.

---

## **Chat 03 — Lógica del agente / Priorización / Recomendaciones**

### **Función**

Diseñar el cerebro del sistema.

### **Aquí se trabaja**

* definición exacta de qué hace al sistema “agente”  
* señales detectadas  
* why flagged  
* why prioritized  
* recommended action  
* next best step  
* prioridad por KAM  
* prioridad por restaurante  
* clasificación Crítico / En Riesgo / Estable  
* plantillas de explicación

### **Output esperado**

* motor de decisión v1  
* reglas de scoring  
* reglas de override  
* librería de recomendaciones  
* narrativa defendible de “agente”

---

## **Chat 04 — Diseño visual / Design system / UI blueprint**

### **Función**

Aterrizar el sistema visual final.

### **Aquí se trabaja**

* consolidación de las pantallas de Stitch  
* design system  
* navegación oficial  
* sidebar/header  
* botones  
* cards  
* badges  
* tablas  
* charts  
* spacing  
* naming visual  
* placeholder del logo de Rappi

### **Output esperado**

* blueprint visual final  
* reglas de consistencia  
* lista de componentes UI  
* decisiones de estilo congeladas

### **Nota**

Aquí ya no se explora. Aquí se **consolida**.

---

## **Chat 05 — Arquitectura técnica / App shell / Stack**

### **Función**

Traducir producto \+ datos \+ lógica \+ UI a arquitectura real.

### **Aquí se trabaja**

* stack final  
* estructura del repo  
* rutas  
* componentes  
* tipos  
* manejo del dataset embebido  
* servicios  
* helpers  
* capa de análisis  
* capa de visualización  
* acciones globales de demo  
* escenarios  
* reset demo

### **Output esperado**

* arquitectura técnica del proyecto  
* árbol de carpetas  
* responsabilidades por módulo  
* estrategia de implementación

---

## **Chat 06 — Frontend / Pantallas / Implementación UI**

### **Función**

Construcción de la app visual.

### **Aquí se trabaja**

* implementación del dashboard  
* vista KAM  
* detalle KAM  
* restaurante  
* alertas  
* data validation  
* deck dentro del producto

### **Output esperado**

* prompts para Codex / v0  
* componentes React  
* páginas implementadas  
* wiring visual

---

## **Chat 07 — Motor de datos / Cálculos / Integración con UI**

### **Función**

Construcción del backend lógico local de la demo.

### **Aquí se trabaja**

* parsing del dataset  
* normalización  
* recálculos  
* scoring  
* benchmark logic  
* alert generation  
* output para UI  
* escenario base y escenarios alterados

### **Output esperado**

* funciones de cálculo  
* transformadores  
* utilidades  
* contratos de datos para frontend

---

## **Chat 08 — Demo / Escenarios / Reset / Presentación en vivo**

### **Función**

Asegurar que la demo no se rompa.

### **Aquí se trabaja**

* flujo exacto de demo  
* orden narrativo  
* escenario base  
* escenarios alternos  
* reset demo  
* botones globales  
* plan B si algo falla  
* script operativo de la presentación

### **Output esperado**

* demo flow paso a paso  
* checklist de corrida  
* fallback plan  
* historia de demo

---

## **Chat 09 — README / One-pager / Documentación de entrega**

### **Función**

Preparar los entregables escritos.

### **Aquí se trabaja**

* README del repo  
* one-pager  
* arquitectura resumida  
* decisiones tomadas  
* validación del dataset  
* mejoras futuras  
* instrucciones de uso  
* cómo correr la demo

### **Output esperado**

* README final  
* PDF o texto del one-pager  
* copy de entrega

---

## **Chat 10 — Deck interactivo / Storytelling de entrevista**

### **Función**

Construir la narrativa final para presentar.

### **Aquí se trabaja**

* deck dentro del producto  
* estructura de slides  
* problema  
* solución  
* agente  
* KPIs  
* validación  
* demo flow  
* cierre  
* preguntas esperadas

### **Output esperado**

* deck interactivo final  
* guion de presentación  
* estructura de respuestas para preguntas difíciles

---

## **Chat 11 — QA / Revisión crítica / Riesgos / Pulido final**

### **Función**

Ser el chat incómodo.

### **Aquí se trabaja**

* revisar incoherencias  
* detectar humo  
* detectar métricas mal justificadas  
* revisar consistencia visual  
* revisar consistencia narrativa  
* revisar riesgos de entrevista  
* hardening de demo

### **Output esperado**

* lista de errores  
* lista de ajustes finales  
* control de calidad final

---

# **Orden recomendado de trabajo**

Para no hacer bolas todo, yo lo atacaría así:

### **Fase 1**

* **Chat 00 — HQ**  
* **Chat 01 — Producto**  
* **Chat 02 — Data**  
* **Chat 03 — Lógica del agente**  
* **Chat 04 — UI blueprint**

### **Fase 2**

* **Chat 05 — Arquitectura técnica**  
* **Chat 06 — Frontend**  
* **Chat 07 — Motor de datos**

### **Fase 3**

* **Chat 08 — Demo**  
* **Chat 09 — README / one-pager**  
* **Chat 10 — Deck**  
* **Chat 11 — QA**

---

# **Cómo debe funcionar Chat 00**

Chat 00 debe arrancar con algo como esto:

## **Secciones fijas dentro de Chat 00**

1. **Objetivo del proyecto**  
2. **Caso elegido**  
3. **Qué es y qué no es la solución**  
4. **Decisiones congeladas**  
5. **Estructura de chats**  
6. **Dependencias entre chats**  
7. **KPIs oficiales**  
8. **Pantallas oficiales**  
9. **Stack oficial**  
10. **Entregables**  
11. **Pendientes críticos**  
12. **Escape pods**

---

# **Dependencias entre chats**

Esto importa mucho.

## **Chat 01 depende de:**

* Chat 00

## **Chat 02 depende de:**

* Chat 00

## **Chat 03 depende de:**

* Chat 00 \+ Chat 02

## **Chat 04 depende de:**

* Chat 00 \+ Chat 01

## **Chat 05 depende de:**

* Chat 00 \+ Chat 01 \+ Chat 02 \+ Chat 03 \+ Chat 04

## **Chat 06 depende de:**

* Chat 04 \+ Chat 05

## **Chat 07 depende de:**

* Chat 02 \+ Chat 03 \+ Chat 05

## **Chat 08 depende de:**

* Chat 06 \+ Chat 07

## **Chat 09 depende de:**

* Chat 00 \+ Chat 05 \+ Chat 08

## **Chat 10 depende de:**

* Chat 00 \+ Chat 08 \+ Chat 09

## **Chat 11 depende de:**

* todos

---

# **Regla para que no se pudran los chats**

Cada chat debe arrancar con:

* su objetivo  
* su alcance  
* lo que ya está congelado  
* lo que no puede cambiar  
* qué outputs debe producir  
* qué le va a reportar a Chat 00

---

# **Sistema de escape pod**

Sí conviene.

Cada chat debe poder generar un último bloque con:

1. estado actual  
2. decisiones tomadas  
3. pendientes  
4. bloqueos  
5. outputs creados  
6. qué necesita el siguiente chat

Así puedes abrir:

* `05.1`  
* `07.2`  
* `10.1`

sin perder continuidad.

---

# **Mi recomendación final de nomenclatura**

Yo usaría estos nombres exactos:

* **Anteproyecto**  
* **00 \- HQ / Fuente de Verdad**  
* **01 \- Producto / UX funcional**  
* **02 \- Data / KPIs / Validación**  
* **03 \- Agente / Scoring / Recomendaciones**  
* **04 \- UI / Design System / Blueprint**  
* **05 \- Arquitectura técnica / App Shell**  
* **06 \- Frontend / Pantallas**  
* **07 \- Motor de datos / Cálculos**  
* **08 \- Demo / Escenarios / Reset**  
* **09 \- README / One-pager / Entrega**  
* **10 \- Deck / Storytelling**  
* **11 \- QA / Pulido final**

