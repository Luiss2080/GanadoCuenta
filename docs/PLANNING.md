# Plan de desarrollo — GanadoCuenta

Guía para construir el MVP fase por fase. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por fase** con las tareas de abajo como checklist.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Cierre de fase:** lint, tipos y tests en verde, probar en el teléfono, actualizar [ROADMAP.md](ROADMAP.md) y el [CHANGELOG](../CHANGELOG.md), y fusionar a `main`.

### Definición de «terminado» (vale para toda fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos y mensajes de error en español.
- [ ] Los datos persisten al reiniciar la app.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.

**Tareas**

- [ ] `npm install` y `npx expo start` abren la app en Expo Go.
- [ ] Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque.
- [ ] Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] Confirmar que el CI de GitHub Actions pasa en verde.

**Cierre:** la app abre, navega entre secciones vacías y no da errores.

---

## Fase 2 — Animales y aretes

**Estimación:** 4 días.

**Objetivo:** animales identificados por arete, con especie, sexo y raza.

**Tareas**

- [ ] Consultas de `animales` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: animales identificados por arete, con especie, sexo y raza.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Animales identificados por arete, con especie, sexo y raza: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 3 — Pesajes y sanidad

**Estimación:** 4 días.

**Objetivo:** pesajes y ganancia de peso en el tiempo; sanidad: vacunas y desparasitaciones con próxima fecha.

**Tareas**

- [ ] Consultas de `pesajes` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `sanidad` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: pesajes y ganancia de peso en el tiempo.
- [ ] Pantalla(s) y formulario(s) para: sanidad: vacunas y desparasitaciones con próxima fecha.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Pesajes y ganancia de peso en el tiempo: funciona sin internet y persiste al reiniciar.
- [ ] Sanidad: vacunas y desparasitaciones con próxima fecha: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 4 — Eventos y ventas

**Estimación:** 3 días.

**Objetivo:** eventos: partos, traslados y bajas; ventas con comprador y monto.

**Tareas**

- [ ] Consultas de `eventos` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Consultas de `ventas` en `src/db/`: crear, listar, editar y borrar, con tipos TypeScript.
- [ ] Pantalla(s) y formulario(s) para: eventos: partos, traslados y bajas.
- [ ] Pantalla(s) y formulario(s) para: ventas con comprador y monto.
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Eventos: partos, traslados y bajas: funciona sin internet y persiste al reiniciar.
- [ ] Ventas con comprador y monto: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Fase 5 — Alertas y exportación CSV

**Estimación:** 3 días.

**Objetivo:** exportación CSV del hato.

**Tareas**

- [ ] Pantalla(s) y formulario(s) para: exportación CSV del hato.
- [ ] Alertas locales de próximas vacunas y desparasitaciones (expo-notifications).
- [ ] Validaciones de campos obligatorios y de formato (montos, fechas, teléfonos).
- [ ] Estado vacío y confirmación antes de borrar.
- [ ] Pruebas unitarias de la lógica nueva (por ejemplo en `src/lib/__tests__/`).

**Criterios de aceptación**

- [ ] Exportación CSV del hato: funciona sin internet y persiste al reiniciar.

**Cierre:** probado en teléfono real; ROADMAP y CHANGELOG actualizados.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio.
- [ ] Publicar el release con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.
