# Caso 02 Data Dictionary

Fuente oficial: `data/Rappi_AI_Builder_Challenge_Dataset.xlsx`  
Hoja: `Caso2_Restaurantes`

## Campos base

| Excel                    | Naming interno              | Tipo normalizado     | Regla clave                                                  |
| ------------------------ | --------------------------- | -------------------- | ------------------------------------------------------------ |
| `restaurant_id`          | `restaurantId`              | `string`             | Identificador único esperado por fila.                       |
| `nombre`                 | `restaurantName`            | `string`             | Nombre limpio, sin alterar el original crudo.                |
| `ciudad`                 | `city`                      | `string`             | Base para agregados y peer groups.                           |
| `vertical`               | `vertical`                  | `string`             | Base para agregados y peer groups.                           |
| `rating_actual`          | `currentRating`             | `number \| null`     | Rango esperado `0-5`.                                        |
| `rating_prom_30d`        | `rating30dAvg`              | `number \| null`     | Rango esperado `0-5`.                                        |
| `delta_rating`           | `deltaRatingOriginal`       | `number \| null`     | Se conserva como valor fuente, no como verdad absoluta.      |
| `tasa_cancelacion_pct`   | `cancellationRatePct`       | `number \| null`     | Rango esperado `0-100`.                                      |
| `tiempo_entrega_avg_min` | `avgDeliveryTimeMin`        | `number \| null`     | Minutos promedio de entrega.                                 |
| `ordenes_7d`             | `orders7d`                  | `number \| null`     | Entero esperado.                                             |
| `ordenes_7d_anterior`    | `orders7dPrevious`          | `number \| null`     | Entero esperado.                                             |
| `var_ordenes_pct`        | `ordersVariancePctOriginal` | `number \| null`     | Se conserva y se compara con el recálculo oficial.           |
| `quejas_7d`              | `complaints7d`              | `number \| null`     | Entero esperado.                                             |
| `nps_score`              | `npsScore`                  | `number \| null`     | Rango esperado `-100` a `100`.                               |
| `valor_ticket_prom_mxn`  | `avgTicketMxn`              | `number \| null`     | Ticket promedio usado en `gmv_proxy_7d`.                     |
| `kam_asignado`           | `kamAssigned`               | `string`             | Base para agregados por KAM.                                 |
| `activo_desde`           | `activeSince`               | `YYYY-MM-DD \| null` | Fecha validada contra `reference_date` del dataset.          |
| `semaforo_riesgo`        | `riskTrafficLightOriginal`  | `string`             | Solo benchmark comparativo; no determina cálculos oficiales. |

## Campos recalculados oficiales

| Campo                 | Fórmula                                                    |
| --------------------- | ---------------------------------------------------------- |
| `deltaRatingRecalc`   | `currentRating - rating30dAvg`                             |
| `varOrdenesPctRecalc` | `((orders7d - orders7dPrevious) / orders7dPrevious) * 100` |
| `ageDaysRecalc`       | `referenceDate - activeSince`                              |
| `gmvProxy7d`          | `orders7d * avgTicketMxn`                                  |

## Tolerancias congeladas de reconciliación

- `delta_rating` vs `deltaRatingRecalc`: `0.05`
- `var_ordenes_pct` vs `varOrdenesPctRecalc`: `0.50`
- Regla de estado:
  - `exact_match`: diferencia absoluta `= 0`
  - `approximate_match`: diferencia absoluta `> 0` y `<= tolerancia`
  - `mismatch`: diferencia absoluta `> tolerancia`

## Flags de calidad

- `validation_range`
  - `missing_required_value`: falta un valor obligatorio.
  - `invalid_number`: string numérico no interpretable.
  - `invalid_integer`: campo entero con decimal.
  - `out_of_range`: valor fuera del rango esperado.
  - `duplicate_restaurant_id`: duplicado de `restaurantId`.
  - `risk_label_unrecognized`: semáforo no normalizable.
- `temporal_date`
  - `invalid_date`: fecha inválida o no ISO.
- `reconciliation`
  - `delta_rating_mismatch`: diferencia entre original y recálculo oficial bajo tolerancia final.
  - `var_ordenes_pct_mismatch`: diferencia entre original y recálculo oficial bajo tolerancia final.
  - `var_ordenes_pct_requires_fallback`: no hay base válida para recalcular variación.
- `benchmark_coverage`
  - `benchmark_fallback_applied`: el peer group cayó a un fallback.
  - `benchmark_group_small`: grupo usable con cautela por tamaño `<8`.

## Reference Date y trazabilidad temporal

- `referenceDateUsed` se deriva como `max(activo_desde válido)` si no se pasa override.
- `referenceDateSource` reporta `max_active_since` cuando la fecha sale del dataset y `option` cuando entra por override manual.
- `ageDaysRecalc` se calcula contra el corte interno del dataset, no contra la fecha real del sistema.
- Metodológicamente se interpreta como una foto operativa con fecha futura / fecha de corte interna.
- Esta nota queda expuesta tanto en `metadata` como en `summary`.

## Reporting de mismatches

- El output resume categorías de mismatch para `deltaRating` y `varOrdenesPct`.
- Categorías disponibles:
  - `rounding_or_precision`
  - `materially_different_formula`
  - `percentage_convention`
  - `outlier_original_derived`
  - `not_applicable`

## Supuestos y pendientes

- `reference_date` no viene explícita en la hoja; el pipeline usa por defecto el máximo `activo_desde` válido del dataset y permite override por opción.
- Los peer groups usan esta cascada: `city + vertical` → `vertical` → `city` → `global`.
- Con `n >= 8` el benchmark se marca `reliable`; con `5-7`, `caution`; con menos de `5` se sigue forzando fallback hasta llegar a `global`.
- `semaforo_riesgo` se preserva y se normaliza solo para comparación y distribuciones, nunca para scoring o recomendaciones.
