# Roadmap de GanadoCuenta

> Que el ganadero sepa qué animal tiene, cuánto pesa, cuándo vacunarlo y cuánto ganó con cada venta, sin señal en el campo.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Registro de ganado: animales, vacunas, pesajes, partos y ventas, sin internet en el campo.
- **Usuario:** Ganadero o pequeño productor con 20 a 300 cabezas que trabaja en zonas sin cobertura.
- **Duración estimada:** ~16 días de trabajo efectivo (~4 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Animales y aretes | Animales y aretes. | 3 | 1 |
| 3 | Pesajes y sanidad | Pesajes y sanidad. | 4 | 2 |
| 4 | Eventos y ventas | Eventos y ventas. | 4 | 3 |
| 5 | Alertas y exportación CSV | Alertas y exportación CSV. | 3 | 4 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Animales y aretes

**Demo:** El arete duplicado se rechaza.

### Hito 3 — Pesajes y sanidad

**Demo:** La ganancia diaria coincide con los casos de prueba.

### Hito 4 — Eventos y ventas

**Demo:** Un parto crea la cría y la vincula correctamente.

### Hito 5 — Alertas y exportación CSV

**Demo:** El CSV abre bien en Excel y las alertas llegan en el teléfono.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Animales y aretes

- **Objetivo:** Animales y aretes.
- **Historias cubiertas:** HU-01 Registrar animales con arete
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El arete duplicado se rechaza.

### Fase 3 — Pesajes y sanidad

- **Objetivo:** Pesajes y sanidad.
- **Historias cubiertas:** HU-02 Registrar pesajes; HU-03 Control sanitario
- **Depende de:** fase 2.
- **Duración:** 4 días.
- **Criterio de salida:**
  - La ganancia diaria coincide con los casos de prueba.

### Fase 4 — Eventos y ventas

- **Objetivo:** Eventos y ventas.
- **Historias cubiertas:** HU-04 Registrar eventos; HU-05 Registrar ventas
- **Depende de:** fase 3.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Un parto crea la cría y la vincula correctamente.

### Fase 5 — Alertas y exportación CSV

- **Objetivo:** Alertas y exportación CSV.
- **Historias cubiertas:** HU-06 Alertas y exportación
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El CSV abre bien en Excel y las alertas llegan en el teléfono.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Animales y aretes
- [ ] **Fase 3:** Pesajes y sanidad
- [ ] **Fase 4:** Eventos y ventas
- [ ] **Fase 5:** Alertas y exportación CSV

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Registrar animales con arete | 2 | Animales y aretes |
| HU-02 Registrar pesajes | 3 | Pesajes y sanidad |
| HU-03 Control sanitario | 3 | Pesajes y sanidad |
| HU-04 Registrar eventos | 4 | Eventos y ventas |
| HU-05 Registrar ventas | 4 | Eventos y ventas |
| HU-06 Alertas y exportación | 5 | Alertas y exportación CSV |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 34 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 9 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
