\# Rappi KAM Intelligence — Project Overview

\#\# Qué estamos construyendo

Estamos desarrollando una demo web funcional para el challenge técnico de Rappi 2026, específicamente para el \*\*Caso 02 — Agente de Inteligencia Operativa\*\*.

La solución se llama provisionalmente \*\*Rappi KAM Intelligence\*\* y consiste en un sistema de inteligencia operativa para Key Account Managers (KAMs) que analiza un dataset de restaurantes, detecta cuentas en riesgo, clasifica la severidad, prioriza intervenciones y genera alertas accionables con contexto de negocio.

El objetivo no es construir solo un dashboard, sino un \*\*agente de inteligencia operativa\*\* que:

\- procese señales del dataset  
\- recalcule métricas clave en vez de confiar ciegamente en derivados del Excel  
\- detecte riesgo compuesto  
\- priorice restaurantes y portfolios de KAM  
\- explique por qué una cuenta fue marcada  
\- recomiende la siguiente mejor acción  
\- permita demo en vivo con un flujo claro y reiniciable

\#\# Qué problema resuelve

Hoy el monitoreo de restaurantes es reactivo: el KAM se entera de los problemas cuando ya afectaron rating, ventas o retención.

La solución busca convertir señales operativas dispersas en decisiones accionables para que el KAM pueda:

\- detectar deterioro temprano  
\- entender qué está pasando  
\- priorizar qué cuentas atender primero  
\- actuar sin necesidad de abrir múltiples dashboards

\#\# Qué tipo de sistema es

Este proyecto debe presentarse como un \*\*agente de inteligencia operativa\*\*, no como un dashboard pasivo.

El sistema:  
1\. observa datos de entrada  
2\. valida y recalcula métricas clave  
3\. detecta señales de riesgo  
4\. clasifica severidad  
5\. prioriza casos  
6\. propone acciones  
7\. genera alertas y vistas accionables

\#\# Datos y postura metodológica

El dataset del Excel se toma como fuente base, pero \*\*no se asume que todos los campos derivados sean correctos\*\*.

Se detectaron inconsistencias en:  
\- campos derivados precalculados  
\- fechas futuras en algunos registros  
\- posible semáforo presembrado como referencia

Por ello, la solución implementa una capa de validación y recalculo antes del análisis.

\#\# Principios del proyecto

1\. \*\*Nada de humo\*\*  
 No se deben mostrar métricas, señales o narrativas que no puedan defenderse con el dataset o con derivados razonables.

2\. \*\*La lógica del agente debe ser visible\*\*  
 La interfaz debe mostrar cosas como:  
 \- Signals detected  
 \- Why flagged  
 \- Recommended action  
 \- Next best step  
 \- KAM briefing  
 \- Priority score

3\. \*\*Demo primero\*\*  
 La solución debe poder correrse en vivo y reiniciarse fácilmente.

4\. \*\*Diseño premium pero creíble\*\*  
 La interfaz debe verse moderna, ejecutiva y alineada visualmente con Rappi, pero sin exagerar capacidades que no existen.

5\. \*\*Todo debe estar alineado al negocio\*\*  
 No se trata de solo visualizar datos, sino de mostrar consecuencias, impacto y acciones.

\#\# Stack propuesto

La solución se perfila como una web app desplegable, de preferencia en Vercel, con:  
\- Next.js  
\- TypeScript  
\- Tailwind  
\- Recharts  
\- dataset embebido  
\- lógica de cálculo local  
\- opcionalmente Telegram como canal de alertas

\#\# Pantallas principales

Las pantallas base definidas son:

1\. Dashboard General  
2\. Vista por KAM  
3\. Detalle de KAM  
4\. Vista por Restaurante  
5\. Pantalla de Alertas  
6\. Data Validation  
7\. Deck interactivo dentro del mismo proyecto

\#\# Resultado esperado

Al final del proyecto debe existir:

\- una demo web funcional y accesible por navegador  
\- un sistema que procese el dataset real y genere prioridades accionables  
\- una narrativa clara de agente de inteligencia operativa  
\- un README sólido  
\- un one-pager  
\- un deck interactivo  
\- un flujo de demo robusto y reiniciable
