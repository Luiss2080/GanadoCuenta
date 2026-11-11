# Plan de desarrollo — GanadoCuenta

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Animales y aretes | 3 | 5 |
| 3 | Pesajes y sanidad | 4 | 9 |
| 4 | Eventos y ventas | 4 | 13 |
| 5 | Alertas y exportación CSV | 3 | 16 |

Total: **16 días** (~4 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Animales y aretes

**Estimación:** 3 días. **Rama sugerida:** `fase-2-animales-y-aretes`.

**Objetivo:** Animales y aretes.

**Historias que se completan:** HU-01 (Registrar animales con arete).

**Tareas**

- [ ] **F2-T1** CRUD de animales con arete único.
- [ ] **F2-T2** Lista con filtros y búsqueda por arete.
- [ ] **F2-T3** Ficha de animal.
- [ ] **F2-T4** Estado activo o inactivo.
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — el formulario de animal → ingreso un arete que ya existe → la app rechaza el duplicado y muestra el animal existente.
- [ ] HU-01 — el hato vacío → abro la app → veo el estado vacío con «Agregar animal».

**Criterio de salida:**

- [ ] El arete duplicado se rechaza.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Pesajes y sanidad

**Estimación:** 4 días. **Rama sugerida:** `fase-3-pesajes-y-sanidad`.

**Objetivo:** Pesajes y sanidad.

**Historias que se completan:** HU-02 (Registrar pesajes), HU-03 (Control sanitario).

**Tareas**

- [ ] **F3-T1** Registro de pesajes y función de ganancia diaria con pruebas.
- [ ] **F3-T2** Gráfico simple de peso en la ficha.
- [ ] **F3-T3** Registro de vacunas y desparasitaciones con próxima fecha.
- [ ] **F3-T4** Lista «próximos tratamientos» ordenada por urgencia.
- [ ] **F3-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-02 — un animal con 2 pesajes → abro su ficha → veo la ganancia diaria de peso y la curva simple.
- [ ] HU-02 — un peso menor o igual a 0 → intento guardar → la app lo rechaza.
- [ ] HU-03 — una vacuna aplicada hoy con próxima en 6 meses → la registro → queda en el historial y en la lista de próximos.

**Criterio de salida:**

- [ ] La ganancia diaria coincide con los casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Eventos y ventas

**Estimación:** 4 días. **Rama sugerida:** `fase-4-eventos-y-ventas`.

**Objetivo:** Eventos y ventas.

**Historias que se completan:** HU-04 (Registrar eventos), HU-05 (Registrar ventas).

**Tareas**

- [ ] **F4-T1** Eventos: parto, traslado y baja.
- [ ] **F4-T2** Parto que crea la cría vinculada a la madre en una transacción.
- [ ] **F4-T3** Registro de ventas con comprador y monto.
- [ ] **F4-T4** Cambio de estado del animal al vender o dar de baja.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — una vaca → registro un parto con cría hembra → se crea la cría vinculada a la madre y el evento queda en el historial.
- [ ] HU-05 — un animal activo → registro su venta por 3.500 Bs → pasa a «vendido» y suma al total de ventas del período.

**Criterio de salida:**

- [ ] Un parto crea la cría y la vincula correctamente.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Alertas y exportación CSV

**Estimación:** 3 días. **Rama sugerida:** `fase-5-alertas-y-exportacion-csv`.

**Objetivo:** Alertas y exportación CSV.

**Historias que se completan:** HU-06 (Alertas y exportación).

**Tareas**

- [ ] **F5-T1** Notificaciones locales de sanidad con expo-notifications.
- [ ] **F5-T2** Exportación CSV del hato con expo-file-system y expo-sharing.
- [ ] **F5-T3** Pruebas del generador CSV.
- [ ] **F5-T4** Pantalla Ajustes: días de aviso.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-06 — sanidad que vence en 10 días → llega la fecha del aviso → recibo una notificación local con arete y tratamiento.
- [ ] HU-06 — el hato con 100 animales → toco «Exportar CSV» → se genera un archivo con una fila por animal.

**Criterio de salida:**

- [ ] El CSV abre bien en Excel y las alertas llegan en el teléfono.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Animales y aretes

- **Día 3** (día 1 de la fase): `F2-T1` CRUD de animales con arete único.; `F2-T2` Lista con filtros y búsqueda por arete.; `F2-T3` Ficha de animal..
- **Día 4** (día 2 de la fase): `F2-T4` Estado activo o inactivo.; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Pesajes y sanidad

- **Día 6** (día 1 de la fase): `F3-T1` Registro de pesajes y función de ganancia diaria con pruebas.; `F3-T2` Gráfico simple de peso en la ficha..
- **Día 7** (día 2 de la fase): `F3-T3` Registro de vacunas y desparasitaciones con próxima fecha.; `F3-T4` Lista «próximos tratamientos» ordenada por urgencia..
- **Día 8** (día 3 de la fase): `F3-T5` Validaciones, estados vacíos y mensajes en español; `F3-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 9** (día 4 de la fase): `F3-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Eventos y ventas

- **Día 10** (día 1 de la fase): `F4-T1` Eventos: parto, traslado y baja.; `F4-T2` Parto que crea la cría vinculada a la madre en una transacción..
- **Día 11** (día 2 de la fase): `F4-T3` Registro de ventas con comprador y monto.; `F4-T4` Cambio de estado del animal al vender o dar de baja..
- **Día 12** (día 3 de la fase): `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 13** (día 4 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Alertas y exportación CSV

- **Día 14** (día 1 de la fase): `F5-T1` Notificaciones locales de sanidad con expo-notifications.; `F5-T2` Exportación CSV del hato con expo-file-system y expo-sharing.; `F5-T3` Pruebas del generador CSV..
- **Día 15** (día 2 de la fase): `F5-T4` Pantalla Ajustes: días de aviso.; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 16** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
